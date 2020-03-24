export default function () {
  return {
    patient_id: '1234', // string uuid
    patient_information:
    {
      age: 50,
      gender: 'male'
    },
    corona_status:
    {
      corona_positive: 1
    },
    medical_preconditions:
    {
      hypertension: 0,
      diabetes: 1,
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
      background_family_conditions: 'cancer' // String
    },
    clinical_status:
    {
      temperature: 37,
      pulse: 80,
      respiratory_rate: 12,
      auscultation: 0, // 0 - 4 levels - not preformed, clear, minor, severe
      mental_status: 0 // 0 - 4 levels - alert, verbl, pain, unresponsive
    },
    treatment:
    {
      psychiatric_treatment: 0,
      anti_inflamatory_regular_treatment: 0,
      growth_hormone_children: 0,
      immuno_depressant_drugs: 0
    },
    other_considerations:
    {
      mobility_problem: 0,
      potential_for_home_quarentine: 1,
      pregnent_healthy: 0,
      youngs_with_asthma: 0
    }
  }
}
