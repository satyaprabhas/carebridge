/**
 * Feature: 10-caresheet-export
 * Backend Printable PDF Generation with PDFKit
 */

const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');

// Fallback demo data if payload is empty
const defaultData = {
  patientName: "Suresh",
  patientId: "CB-DEMO-001",
  age: 55,
  gender: "Male",
  admissionDate: "2026-10-05",
  dischargeDate: "2026-10-10",
  diagnosis: "Fictional example of recovery following uncomplicated admission.",
  allergies: ["Not provided in this fictional sample"],
  medicines: [
    {
      name: "Sample Med A (Demo Tab)",
      dose: "500 mg",
      timing: "Twice daily with meals",
      duration: "5 days",
      instructions: "Take with food."
    }
  ],
  dietInstructions: "Eat light digestible meals.",
  homeCare: [
    "Rest adequately and avoid strenuous physical exertion for 7 days."
  ],
  followUp: {
    date: "2026-10-18",
    doctor: "Dr. Sarah Jenkins, MD",
    department: "Internal Medicine",
    hospital: "Metropolitan General Hospital"
  },
  warningSignsUrgent: [
    "Sudden high fever (>101°F) or severe chills",
    "Severe sharp chest pain or shortness of breath"
  ]
};

// POST /api/generate-caresheet
router.post('/generate-caresheet', (req, res) => {
  try {
    const patientData = (req.body && Object.keys(req.body).length > 0) ? req.body : defaultData;

    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      bufferPages: true
    });

    const filename = `CareSheet-${(patientData.patientName || 'Patient').replace(/\s+/g, '_')}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    doc.pipe(res);

    const primaryBlue = '#1976D2';
    const darkBlue = '#0D47A1';
    const lightBlueBg = '#E3F2FD';
    const darkGray = '#263238';
    const medGray = '#455A64';
    const lightGray = '#ECEFF1';
    const urgentRed = '#C62828';
    const urgentRedBg = '#FFEBEE';
    const softGreenBg = '#E8F5E9';
    const darkGreen = '#2E7D32';

    // Header Banner
    doc.rect(40, 40, 515, 65).fill(lightBlueBg);
    doc.rect(40, 40, 515, 4).fill(primaryBlue);

    doc.fillColor(primaryBlue).font('Helvetica-Bold').fontSize(22).text('CareBridge', 55, 52);
    doc.font('Helvetica').fontSize(11).fillColor(medGray).text('Your Personal Post-Discharge Care Companion', 55, 78);
    doc.font('Helvetica-Bold').fontSize(10).fillColor(darkBlue).text('DISCHARGE CARE SHEET', 400, 56, { align: 'right', width: 140 });

    const todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    doc.font('Helvetica').fontSize(9).fillColor(medGray).text(`Generated: ${todayDate}`, 400, 72, { align: 'right', width: 140 });

    let yPos = 120;

    function drawSectionHeader(title, y) {
      doc.rect(40, y, 515, 22).fill(primaryBlue);
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(11).text(title.toUpperCase(), 48, y + 6);
      return y + 28;
    }

    function checkPageBreak(space = 60) {
      if (yPos + space > 780) {
        doc.addPage();
        yPos = 40;
      }
    }

    // 1. Patient Information
    yPos = drawSectionHeader('Patient Information & Discharge Summary', yPos);
    doc.rect(40, yPos, 515, 70).fillAndStroke('#F8FAFC', lightGray);

    doc.fillColor(darkGray).font('Helvetica-Bold').fontSize(10);
    doc.text('Patient Name:', 50, yPos + 8);
    doc.font('Helvetica').text(patientData.patientName || 'N/A', 130, yPos + 8);

    doc.font('Helvetica-Bold').text('Patient ID:', 330, yPos + 8);
    doc.font('Helvetica').text(patientData.patientId || 'N/A', 410, yPos + 8);

    doc.font('Helvetica-Bold').text('Age / Gender:', 50, yPos + 24);
    doc.font('Helvetica').text(`${patientData.age || 'N/A'} yrs / ${patientData.gender || 'N/A'}`, 130, yPos + 24);

    doc.font('Helvetica-Bold').text('Discharge Date:', 330, yPos + 24);
    doc.font('Helvetica').text(patientData.dischargeDate || 'N/A', 410, yPos + 24);

    doc.font('Helvetica-Bold').text('Diagnosis:', 50, yPos + 44);
    doc.font('Helvetica').text(patientData.diagnosis || 'N/A', 130, yPos + 44, { width: 410 });

    yPos += 80;

    // 2. Medications Table
    checkPageBreak(120);
    yPos = drawSectionHeader('Prescribed Medications & Schedule', yPos);

    doc.rect(40, yPos, 515, 20).fill(lightBlueBg);
    doc.fillColor(darkBlue).font('Helvetica-Bold').fontSize(9);
    doc.text('Medication & Dose', 46, yPos + 5, { width: 130 });
    doc.text('Timing', 180, yPos + 5, { width: 140 });
    doc.text('Duration', 325, yPos + 5, { width: 65 });
    doc.text('Special Instructions', 395, yPos + 5, { width: 155 });
    yPos += 22;

    const medicines = patientData.medicines || [];
    medicines.forEach((med, idx) => {
      checkPageBreak(35);
      const rowBg = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
      doc.rect(40, yPos, 515, 26).fillAndStroke(rowBg, lightGray);

      doc.fillColor(darkGray).font('Helvetica-Bold').fontSize(9);
      doc.text(`${med.name} (${med.dose || ''})`, 46, yPos + 6, { width: 130 });

      doc.font('Helvetica').fontSize(8.5);
      doc.text(med.timing || '-', 180, yPos + 6, { width: 140 });
      doc.text(med.duration || '-', 325, yPos + 6, { width: 65 });
      doc.text(med.instructions || 'As directed', 395, yPos + 6, { width: 155 });
      yPos += 26;
    });

    yPos += 14;

    // 3. Diet & Home Care
    checkPageBreak(100);
    yPos = drawSectionHeader('Diet & Daily Home Care Instructions', yPos);

    doc.rect(40, yPos, 515, 34).fillAndStroke(softGreenBg, '#C8E6C9');
    doc.fillColor(darkGreen).font('Helvetica-Bold').fontSize(9.5).text('Dietary Recommendations:', 48, yPos + 6);
    doc.fillColor(darkGray).font('Helvetica').fontSize(8.5).text(patientData.dietInstructions || 'Follow balanced diet as advised.', 48, yPos + 18, { width: 495 });
    yPos += 42;

    const homeCare = patientData.homeCare || [];
    homeCare.forEach((item) => {
      checkPageBreak(20);
      doc.fillColor(primaryBlue).font('Helvetica-Bold').fontSize(10).text('•', 48, yPos);
      doc.fillColor(darkGray).font('Helvetica').fontSize(8.5).text(item, 60, yPos, { width: 485 });
      yPos += 16;
    });

    yPos += 10;

    // 4. Warning Signs
    checkPageBreak(90);
    yPos = drawSectionHeader('When to Seek Immediate Medical Help', yPos);
    doc.rect(40, yPos, 515, 20).fill(urgentRedBg);
    doc.fillColor(urgentRed).font('Helvetica-Bold').fontSize(9.5).text('EMERGENCY: Seek immediate medical attention if you experience:', 48, yPos + 5);
    yPos += 24;

    const urgent = patientData.warningSignsUrgent || [];
    urgent.forEach((sign) => {
      checkPageBreak(18);
      doc.fillColor(urgentRed).font('Helvetica-Bold').fontSize(8.5).text(`!  ${sign}`, 48, yPos, { width: 495 });
      yPos += 16;
    });

    // Footers
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.rect(40, 785, 515, 1).fill('#CFD8DC');
      doc.fillColor(medGray).font('Helvetica-Oblique').fontSize(7.5).text(
        'This care sheet is generated from available discharge instructions and does not replace medical advice.',
        40, 792, { width: 430, align: 'left' }
      );
      doc.font('Helvetica').fontSize(8).fillColor(medGray).text(`Page ${i + 1} of ${range.count}`, 470, 792, { width: 85, align: 'right' });
    }

    doc.end();

  } catch(err) {
    console.error('Care sheet generation error:', err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'PDF creation failed.' });
    }
  }
});

module.exports = router;
