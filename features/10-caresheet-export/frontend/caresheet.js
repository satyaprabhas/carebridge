/**
 * Feature: 10-caresheet-export
 * Frontend PDF Export Communication Controller
 */

export function initCareSheetExport(getCurrentPatientData) {
  async function downloadCareSheet() {
    const btn = document.getElementById('btn-generate-pdf') || document.getElementById('btn-header-care-sheet');
    const originalText = btn ? btn.textContent : '';
    if (btn) {
      btn.disabled = true;
      btn.textContent = '⏳ Generating PDF...';
    }

    try {
      const patientData = (typeof getCurrentPatientData === 'function') 
        ? getCurrentPatientData() 
        : getCurrentPatientData;

      const response = await fetch('/api/generate-caresheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData || {})
      });

      if (!response.ok) throw new Error('PDF generation failed on server');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      const safeName = (patientData?.patientName || 'Patient').replace(/\s+/g, '_');
      a.download = `CareSheet-${safeName}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch(err) {
      console.error('Care sheet download error:', err);
      alert('Could not download care sheet. Please try again or check backend server.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    }
  }

  document.getElementById('btn-generate-pdf')?.addEventListener('click', downloadCareSheet);
  document.getElementById('btn-header-care-sheet')?.addEventListener('click', downloadCareSheet);
  document.getElementById('dash-btn-caresheet')?.addEventListener('click', downloadCareSheet);

  return { downloadCareSheet };
}
