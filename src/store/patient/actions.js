import axios from 'axios'
import request from 'request'

const body = {
  patient_id: '341351516',
  doctor_number: '123456',
  patient_information: {
    age: 20,
    gender: '',
    ethnicity: ''
  },
  corona_status: {
    corona_positive: 1
  },
  medical_preconditions: {
    htn: 0,
    dm: 1,
    smoker: 0,
    cad: 1,
    chf: 0,
    copd: 0,
    ckd: 0,
    hd: 1,
    cld: 0,
    dementia: 0,
    cancer: 1,
    aids: 0,
    ic: 0,
    tb: 0,
    dyspnea: 0
  },
  clinical_status: {
    temperature: 0,
    pulse: 0,
    respiratory_rate: 0,
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
  other_considerations: {
    mobility_problem: 0,
    potential_for_home_quarentine: 1,
    pregnent_healthy: 0,
    youngs_with_asthma: 0
  }
}

export function sendPatientData () {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  // axios.defaults.headers.common['x-api-token'] = 'inawDBjEa12HYpdIvkUDpaxAcdKA3l4Da7aWcTr7'

  axios.post('https://cn8pc7plbl.execute-api.eu-west-1.amazonaws.com/staging/getPatientModelRecommendation', body).then((response) => {
    console.log(response.data)
  })
    .catch((err) => {
      console.log(err)
      // this.$q.notify({
      //   color: 'negative',
      //   position: 'top',
      //   message: 'Loading failed',
      //   icon: 'report_problem'
      // })
    })
}

export function sendPatientData2 () {
  return new Promise(function (resolve, reject) {
    var options = {
      method: 'POST',
      url: 'https://cn8pc7plbl.execute-api.eu-west-1.amazonaws.com/staging/getPatientModelRecommendation',
      headers:
      {
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: body,
      json: true
    }
    request(options, function (error, response, body) {
      if (error) { reject(error) }
      resolve(body)
    })
  })
}

export function sendPatientData3 () {
  var data = JSON.stringify({
    patient_id: '341351516',
    doctor_number: '123456',
    patient_information: {
      age: 20,
      gender: '',
      ethnicity: ''
    },
    corona_status: {
      corona_positive: 1
    },
    medical_preconditions: {
      htn: 0,
      dm: 1,
      smoker: 0,
      cad: 1,
      chf: 0,
      copd: 0,
      ckd: 0,
      hd: 1,
      cld: 0,
      dementia: 0,
      cancer: 1,
      aids: 0,
      ic: 0,
      tb: 0,
      dyspnea: 0
    },
    clinical_status: {
      temperature: 0,
      pulse: 0,
      respiratory_rate: 0,
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
    other_considerations: {
      mobility_problem: 0,
      potential_for_home_quarentine: 1,
      pregnent_healthy: 0,
      youngs_with_asthma: 0
    }
  })

  var xhr = new XMLHttpRequest()
  xhr.withCredentials = true

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      console.log(this.responseText)
    }
  })

  xhr.open('POST', 'https://cn8pc7plbl.execute-api.eu-west-1.amazonaws.com/staging/getPatientModelRecommendation')
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
  xhr.setRequestHeader('Access-Control-Allow-Headers', '*')
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', '*/*')
  xhr.setRequestHeader('Cache-Control', 'no-cache')
  xhr.setRequestHeader('Postman-Token', 'a58bde6d-95cc-4752-ae14-eb202d3042d0,2ac48080-6cbc-40d2-bb90-e3ad5a9a50f2')
  xhr.setRequestHeader('Host', 'cn8pc7plbl.execute-api.eu-west-1.amazonaws.com')
  xhr.setRequestHeader('Accept-Encoding', 'gzip, deflate')
  xhr.setRequestHeader('Content-Length', '860')
  xhr.setRequestHeader('Connection', 'keep-alive')
  xhr.setRequestHeader('cache-control', 'no-cache')

  xhr.send(data)
}

// https://cn8pc7plbl.execute-api.eu-west-1.amazonaws.com/staging
// /getPatientModelRecommendation
// POST
// x-api-token : inawDBjEa12HYpdIvkUDpaxAcdKA3l4Da7aWcTr7
