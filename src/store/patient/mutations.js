// import Vue from 'vue'

export function setPatientResults (state, patientResults) {
// transaction_id: (...)
// recommendation: (...)
// contributing_factors: (...)
// risk_score: (...)
  state.results = patientResults
}
