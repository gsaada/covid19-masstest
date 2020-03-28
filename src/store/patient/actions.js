import axios from 'axios'

const body = {
  patient_id: '341351516', // X
  doctor_number: '123456', // X
  patient_information: {
    age: 20, // X
    gender: '', // X
    ethnicity: ''
  },
  corona_status: {
    corona_positive: 1 // X bool
  },
  medical_preconditions: {
    htn: 0, // x
    dm: 1, // x
    smoker: 0, // x
    cad: 1, // x
    chf: 0, // x
    copd: 0, // x
    ckd: 0, // x
    hd: 1, // x
    cld: 0, // x
    dementia: 0, // x
    cancer: 1, // x
    aids: 0, // x
    ic: 0,
    tb: 0,
    dyspnea: 0
  },
  clinical_status: { // optional
    temperature: 0, // X
    pulse: 0, // x
    respiratory_rate: 0, // x
    auscultation: 0,
    mental_status: 0,
    oxygen_saturation: 0
  },
  treatment: {
    psychiatric_treatment: 0,
    anti_inflamatory_regular_treatment: 0,
    growth_hormone_children: 0,
    immuno_depressant_drugs: 0
  },
  other_considerations: { // X bool optional
    mobility_problem: 0,
    potential_for_home_quarentine: 1,
    pregnent_healthy: 0,
    youngs_with_asthma: 0
  }
}

export function sendPatientData ({ commit }, patientData) {
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.headers.common['x-api-key'] = 'inawDBjEa12HYpdIvkUDpaxAcdKA3l4Da7aWcTr7'

  const PatienDataToRequest = preparePatientData(patientData)
  axios.post('https://cn8pc7plbl.execute-api.eu-west-1.amazonaws.com/staging/getPatientModelRecommendation', PatienDataToRequest, { crossdomain: true }).then((response) => {
    commit('setPatientResults', response.data.recommendation)
  })
    .catch((err) => {
      console.log(err)
    })
}
function preparePatientData (patientData) {
  const patientBody = Object.assign({}, body)
  patientBody.patient_id = patientData.id
  patientBody.patient_information = changeObjectBolleansToNumbers(patientData.patient_information)
  patientBody.corona_status = Object.assign(patientData.corona_status, changeObjectBolleansToNumbers(patientData.corona_status))
  patientBody.medical_preconditions = Object.assign(patientData.medical_preconditions, changeObjectBolleansToNumbers(patientData.medical_preconditions))
  patientBody.clinical_status = Object.assign(patientBody.clinical_status, changeObjectBolleansToNumbers(patientData.clinical_status))
  patientBody.other_considerations = Object.assign(patientData.other_considerations, changeObjectBolleansToNumbers(patientData.other_considerations))
  console.log(patientBody.medical_preconditions)
  return patientBody
}

function changeObjectBolleansToNumbers (object) {
  const returnObject = {}
  for (const [key, value] of Object.entries(object)) {
    returnObject[key] = Number(value)
  }
  return returnObject
}
