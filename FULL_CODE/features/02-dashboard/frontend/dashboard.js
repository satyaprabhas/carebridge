/**
 * Feature: 02-dashboard
 * Frontend Dashboard Component Logic
 */

export function renderDashboard(patientData) {
  if (!patientData) return;

  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || 'N/A';
  };

  // Populate hero card
  setEl('dash-patient-name', patientData.patientName);
  setEl('dash-patient-id', patientData.patientId);
  setEl('dash-patient-age', patientData.age ? `${patientData.age} Yrs` : 'N/A');
  setEl('dash-discharge-date', patientData.dischargeDate);
  setEl('dash-diagnosis', patientData.diagnosis);

  const allergiesText = Array.isArray(patientData.allergies)
    ? patientData.allergies.join(', ')
    : (patientData.allergies || 'None Known');
  setEl('dash-allergies', allergiesText);

  // Populate 4 Quick Metric Summary Cards
  const firstMed = patientData.medicines && patientData.medicines[0];
  if (firstMed) {
    setEl('dash-sum-medicine', `${firstMed.name} (${firstMed.dose})`);
  }

  if (patientData.followUp) {
    const f = patientData.followUp;
    setEl('dash-sum-followup', `${f.date || 'TBD'} (${f.time || 'TBD'})`);
  }
}
