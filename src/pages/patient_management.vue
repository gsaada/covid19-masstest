<template>
  <q-page class="q-pa-sm">
    <q-table
      title="patient Management"
      :data="data"
      :hide-header="mode === 'grid'"
      :columns="columns"
      row-key="name"
      :grid="mode=='grid'"
      :filter="filter"
      :pagination.sync="pagination"
    >
      <template v-slot:top-right="props">
        <q-btn @click="newPatientClicked" outline color="primary" label="Add New" class="q-mr-xs" />

        <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          v-if="mode === 'list'"
        >
          <q-tooltip
            :disable="$q.platform.is.mobile"
            v-close-popup
          >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}</q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          dense
          :icon="mode === 'grid' ? 'list' : 'grid_on'"
          @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
          v-if="!props.inFullscreen"
        >
          <q-tooltip
            :disable="$q.platform.is.mobile"
            v-close-popup
          >{{mode==='grid' ? 'List' : 'Grid'}}</q-tooltip>
        </q-btn>

        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>
    </q-table>
    <q-dialog v-model="new_patient">
      <q-card v-if="patient_modal_questanire" style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            Add new patient
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator class="separator_padding" inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md" @submit="onSubmit">
            <q-list>
              <q-item>
                <div class="row">
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Patient Name</q-item-label>
                    <q-input dense outlined v-model="patient.name" label="Patient Name" ref="patientName" :rules="[ val => val && val.length > 0 || 'Please type something']"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Patient Id</q-item-label>
                    <q-input dense outlined v-model="patient.id" label="patient ID" ref="patientId" :rules="[val => val !== null && val !== '' || 'Please type patient id', val => val > 0 && val < 999999999999 || 'Please type a patient id']"/>
                  </q-item-section>
                </div>
              </q-item>
              <q-item>
                <div class="row">
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Age</q-item-label>
                    <q-input
                      ref="patientAge"
                      dense outlined
                      lazy-rules
                      type="number"
                      v-model="patient.patient_information.age"
                      label="Your age *"
                      :rules="[
                        val => val !== null && val !== '' || 'Please type your age',
                        val => val > 0 && val < 100 || 'Please type a real age'
                      ]"
                    ></q-input>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Gender</q-item-label>
                      <div class="q-gutter-sm">
                        <q-radio v-model="patient.patient_information.gender" val="male" label="Male"></q-radio>
                        <q-radio v-model="patient.patient_information.gender" val="female" label="Female"></q-radio>
                      </div>
                  </q-item-section>
                </div>
              </q-item>
              <q-separator class="separator_padding" inset></q-separator>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Corona Positive</q-item-label>
                  <q-toggle
                    v-model="patient.corona_status.corona_positive"
                    checked-icon="check"
                    color="red"
                    unchecked-icon="clear"
                  ></q-toggle>
                </q-item-section>
              </q-item>
              <q-separator class="separator_padding" inset></q-separator>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Medical Preconditions</q-item-label>
                    <q-checkbox v-model="patient.medical_preconditions.htn" label="Hypertension"></q-checkbox>
                    <q-checkbox v-model="patient.medical_preconditions.dm" label="Diabetes"></q-checkbox>
                    <q-checkbox v-model="patient.medical_preconditions.smoker" label="Smoker"></q-checkbox>
                    <q-checkbox v-model="patient.medical_preconditions.cad" label="Cardiovascular Disease"></q-checkbox>
                    <q-checkbox v-model="patient.medical_preconditions.chf" label="Heart Failure"></q-checkbox>
                    <q-checkbox v-model="patient.medical_preconditions.copd" label="COPD"></q-checkbox>
                    <q-checkbox v-model="patient.medical_preconditions.cld" label="Cirrhosis Chronic Liver Disease"></q-checkbox>
                    <q-checkbox v-model="patient.medical_preconditions.dementia" label="Dementia"></q-checkbox>
                    <q-checkbox v-model="patient.medical_preconditions.cancer" label="Cancer"></q-checkbox>
                    <q-checkbox v-model="patient.medical_preconditions.aids" label="Aids"></q-checkbox>
                    <q-checkbox v-model="patient.medical_preconditions.ckd" label="Chronic Kidney Disease"></q-checkbox>
                    <q-checkbox v-model="patient.medical_preconditions.hd" label="Kidney Failure / Dialysis"></q-checkbox>
                </q-item-section>
              </q-item>
              <q-separator class="separator_padding" inset></q-separator>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-sm">(Optional)</q-item-label>
                  <div class="row">
                    <q-item-section>
                      <q-item-label class="q-pb-xs">Temperature</q-item-label>
                      <q-input
                        dense outlined
                        lazy-rules
                        type="number"
                        v-model="patient.clinical_status.temperature"
                      ></q-input>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="q-pb-xs">Pulse</q-item-label>
                      <q-input
                        dense outlined
                        lazy-rules
                        type="number"
                        v-model="patient.clinical_status.pulse"
                      ></q-input>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="q-pb-xs">Respiratory rate</q-item-label>
                      <q-input
                        dense outlined
                        lazy-rules
                        type="number"
                        v-model="patient.clinical_status.respiratory_rate"
                      ></q-input>
                    </q-item-section>
                  </div>
                  <div class="row">
                    <q-checkbox v-model="patient.other_considerations.mobility_problem" label="Mobility oroblem"></q-checkbox>
                    <q-checkbox v-model="patient.other_considerations.potential_for_home_quarentine" label="potential home quarentine"></q-checkbox>
                    <q-checkbox v-model="patient.other_considerations.pregnent_healthy" label="Pregnent healthy"></q-checkbox>
                    <q-checkbox v-model="patient.other_considerations.youngs_with_asthma" label="Youngs with asthma"></q-checkbox>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator class="separator_padding" inset></q-separator>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Comments</q-item-label>
                  <q-input
                    v-model="patient.comments"
                    filled
                    type="textarea"
                  ></q-input>
                </q-item-section>
              </q-item>
              <!-- <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Last Call</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="patient.last_call"
                    mask="date"
                    label="Last Call"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="lastCallProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="patient.last_call"
                            @input="() => $refs.lastCallProxy.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item> -->
            </q-list>
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn label="Get Results" type="submit" color="primary"/>
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
      <q-card v-else-if="patient_modal_results" style="width: 600px; max-width: 60vw; height:800px">
        <div>
          <q-card-section>
            <transition
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <div v-show="showSimulatedReturnData">
                <div style="display: flex;flex-direction: column;align-items: center;">
                  <q-item-label class="q-pb-xs" style="padding: 20px;font-weight: bold;">Recommendation: {{computedRecommendation}}</q-item-label>
                  <q-separator class="separator_padding" inset></q-separator>
                </div>
                <div style="display: flex;flex-direction: column;align-items: center;">
                  <q-item-label class="q-pb-xs">Risk Score</q-item-label>
                  <!-- <q-rating
                    v-model="ratingModel"
                    max="5"
                    size="3em"
                    color="red-5"
                    icon="warning"
                    icon-selected="warning"
                    readonly
                  ></q-rating> -->
                  <q-knob
                    readonly
                    v-model="ratingModel"
                    show-value
                    size="90px"
                    :thickness="0.22"
                    color="orange"
                    track-color="orange-3"
                    class="text-orange q-ma-md"
                  ></q-knob>
                </div>
                <q-separator class="separator_padding" inset></q-separator>
                <q-splitter v-model="splitterModel" style="height: 250px">
                  <template v-slot:before>
                    <div class="q-pa-md">
                      <q-tree
                        ref="qTree"
                        v-if="simple[0].children"
                        :nodes="simple"
                        node-key="label"
                        selected-color="primary"
                        :selected.sync="selected"
                        default-expand-all
                      ></q-tree>
                    </div>
                  </template>
                  <template v-slot:after>
                    <q-tab-panels
                      v-model="selected"
                      animated
                      transition-prev="jump-up"
                      transition-next="jump-up"
                    >
                      <!-- <q-tab-panel name="Recommendations">
                        <div class="text-h4 q-mb-md">Welcome</div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                      </q-tab-panel> -->

                      <!-- <q-tab-panel name="Food">
                        <div class="text-h4 q-mb-md">Food</div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                      </q-tab-panel>

                      <q-tab-panel name="Room service">
                        <div class="text-h4 q-mb-md">Room service</div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                      </q-tab-panel>

                      <q-tab-panel name="Room view">
                        <div class="text-h4 q-mb-md">Room view</div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                      </q-tab-panel> -->
                    </q-tab-panels>
                  </template>
                </q-splitter>
                
                  <q-item-label class="q-pb-xs">Doctor comments</q-item-label>
                  <q-input
                    v-model="doctor_comments"
                    filled
                    type="textarea"
                  ></q-input>
                <q-card-actions align="center" class="bg-white text-teal row">
                    <q-btn color="primary" icon="home" label="Home" @click="resetData" v-close-popup></q-btn>
                    <q-btn color="secondary" icon="hotel" label="Hotel" v-close-popup></q-btn>
                    <q-btn color="red" icon="local_hospital" label="Hospitle" v-close-popup></q-btn>
                </q-card-actions>
              </div>
            </transition>
          </q-card-section>
          <q-inner-loading :showing="loadingVisible">
            <q-spinner-gears size="200px" color="primary"></q-spinner-gears>
          </q-inner-loading>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { exportFile } from 'quasar'
import { mapState, mapActions, mapGetters } from 'vuex'

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== undefined ? formatFn(val) : val

  formatted =
    formatted === undefined || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}
const defaultPatientData = {
  patient_information: {
    age: undefined,
    gender: undefined
  },
  corona_status: {
    corona_positive: false
  },
  medical_preconditions: {
    htn: false,
    dm: false,
    smoker: false,
    cad: false,
    chf: false,
    copd: false,
    ckd: false,
    hd: false,
    cld: false,
    dementia: false,
    cancer: false,
    aids: false
  },
  clinical_status: {
    temperature: 0,
    pulse: 0,
    respiratory_rate: 0
  },
  other_considerations: {
    mobility_problem: false,
    potential_for_home_quarentine: false,
    pregnent_healthy: false,
    youngs_with_asthma: false
  }
}

export default {
  data () {
    return {
      filter: '',
      patient: {
        patient_information: {
          age: undefined,
          gender: undefined
        },
        corona_status: {
          corona_positive: false
        },
        medical_preconditions: {
          htn: false,
          dm: false,
          smoker: false,
          cad: false,
          chf: false,
          copd: false,
          ckd: false,
          hd: false,
          cld: false,
          dementia: false,
          cancer: false,
          aids: false
        },
        clinical_status: {
          temperature: 0,
          pulse: 0,
          respiratory_rate: 0
        },
        other_considerations: {
          mobility_problem: false,
          potential_for_home_quarentine: false,
          pregnent_healthy: false,
          youngs_with_asthma: false
        }
      },
      doctor_comments: '',
      new_patient: false,
      patient_modal_questanire: false,
      patient_modal_results: false,
      showSimulatedReturnData: false,
      loadingVisible: false,
      mode: 'list',
      ratingModel: 3,
      splitterModel: 50,
      selected: 'Food',
      simple: [
        {
          label: 'Contributing factors',
          children: []
        }
      ],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Patient Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'city',
          align: 'left',
          label: 'City',
          field: 'city',
          sortable: true
        },
        {
          name: 'state',
          align: 'left',
          label: 'State',
          field: 'state',
          sortable: true
        },
        {
          name: 'last_call',
          align: 'left',
          label: 'Last Call',
          field: 'last_call',
          sortable: true
        }
      ],
      data: [
        {
          name: 'Jada Conolly',
          city: 'GILBERT',
          state: 'AZ',
          last_call: '12-09-2019'
        },
        {
          name: 'Kiley Ibbotson',
          city: 'LA MESA',
          state: 'CA',
          last_call: '09-02-2019'
        },
        {
          name: 'Leslie Tecklenburg',
          city: 'SAN DIEGO',
          state: 'CA',
          last_call: '03-25-2019'
        },
        {
          name: 'Lia Whitledge',
          city: 'PHOENIX',
          state: 'AZ',
          last_call: '03-18-2019'
        },
        {
          name: 'Sam Wileman',
          city: 'MESA',
          state: 'AZ',
          last_call: '04-09-2019'
        },
        {
          name: 'Edgar Colmer',
          city: 'PHOENIX',
          state: 'AZ',
          last_call: '09-03-2019'
        },
        {
          name: 'Kaiden Rozelle',
          city: 'LAKEWOOD',
          state: 'CA',
          last_call: '01-12-2019'
        },
        {
          name: 'Leslie Stopher',
          city: 'YUMA',
          state: 'AZ',
          last_call: '04-15-2019'
        },
        {
          name: 'Miguel Subasic',
          city: 'TEMPE',
          state: 'AZ',
          last_call: '11-09-2019'
        },
        {
          name: 'Reese Vandygriff',
          city: 'LAKEWOOD',
          state: 'CA',
          last_call: '01-01-2019'
        },
        {
          name: 'Griffin Troglen',
          city: 'YUMA',
          state: 'AZ',
          last_call: '04-12-2019'
        },
        {
          name: 'Zachary Wehrley',
          city: 'TEMPE',
          state: 'AZ',
          last_call: '10-09-2019'
        },
        {
          name: 'Kyle Wahlert',
          city: 'LAKEWOOD',
          state: 'CA',
          last_call: '01-02-2019'
        }
      ],
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  methods: {
    ...mapActions({
      sendPatientData: 'patient/sendPatientData'
    }),
    resetData () {
      this.patient = defaultPatientData;
    },
    newPatientClicked () {
      this.new_patient = true
      this.patient_modal_questanire = true
    },
    onSubmit (evt) {
      this.$refs.patientName.validate()
      this.$refs.patientAge.validate()
      this.$refs.patientId.validate()

      if (false) {
      // if (this.$refs.patientId.hasError || this.$refs.patientName.hasError || this.$refs.patientAge.hasError) {
        this.formHasError = true
      } else {
        this.patient_modal_questanire = false
        this.patient_modal_results = true
        this.showTextLoading()
        this.sendPatientData(this.patient)
      }
    },
    exportTable () {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.data.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === undefined ? col.name : col.field],
                  col.format
                )
              )
              .join(',')
          )
        )
        .join('\r\n')

      const status = exportFile('patient-management.csv', content, 'text/csv')

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    },
    showTextLoading () {
      this.loadingVisible = true
      this.showSimulatedReturnData = false
    }
  },
  computed: {
    ...mapState({}),
    ...mapGetters({
      patientData: 'patient/patient',
      patientResults: 'patient/patientResults'
    }),
    computedRecommendation () {
      return this.patientResults && this.patientResults.recommendation && this.patientResults.recommendation.toUpperCase()
    }
  },
  watch: {
    patientResults (val) {
      if (val) {
        this.$nextTick(function () {
          this.ratingModel = 0
          if (this.patientResults) {
            this.ratingModel = parseFloat(this.patientResults.risk_score.toFixed(1))
            for (const key in this.patientResults.contributing_factors) {
              this.simple[0].children.push({ label: `${key}: ${this.patientResults.contributing_factors[key]}`, icon: 'warning' })
            }
            this.$refs.qTree.expandAll()
          }
          this.loadingVisible = false
          this.showSimulatedReturnData = true
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.checkbox_flex{
  justify-content: space-between;
}
.separator_padding{
  margin-bottom: 15px;
  margin-top: 5px;
}
</style>
