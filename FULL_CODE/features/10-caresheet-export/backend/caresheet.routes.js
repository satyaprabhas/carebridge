/**
 * Feature: 10-caresheet-export
 * Backend Printable PDF Generation with PDFKit
 * Supports pure English or pure Telugu (100% clean Telugu without English parenthesis clutter)
 */

const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Fallback demo data if payload is empty
const defaultData = {
  patientName: "Suresh",
  patientId: "CB-DEMO-001",
  age: 55,
  gender: "Male",
  admissionDate: "2026-10-05",
  dischargeDate: "2026-10-10",
  diagnosis: "రక్తపోటు మరియు మధుమేహం నుండి కోలుకునే ప్రక్రియ.",
  allergies: ["ఎటువంటి తీవ్రమైన అలెర్జీలు నమోదు కాలేదు"],
  medicines: [
    {
      name: "Paracetamol",
      dose: "650 mg",
      timing: "Twice daily after food (1-0-1)",
      duration: "5 days",
      instructions: "నీటితో తీసుకోండి."
    },
    {
      name: "Pantoprazole",
      dose: "40 mg",
      timing: "Once daily before breakfast (1-0-0)",
      duration: "7 days",
      instructions: "ఉదయం ఖాళీ కడుపుతో తీసుకోండి."
    }
  ],
  dietInstructions: "తేలికగా జీర్ణమయ్యే సమతుల్య ఆహారం. తక్కువ ఉప్పు మరియు నూనె.",
  homeCare: [
    "పూర్తిగా విశ్రాంతి తీసుకోండి, కష్టమైన పనులు చేయవద్దు.",
    "రక్తపోటు మరియు చక్కెర స్థాయిలను క్రమం తప్పకుండా చూసుకోండి.",
    "శస్త్రచికిత్స లేదా గాయం ఉన్న భాగాన్ని శుభ్రంగా ఉంచండి."
  ],
  followUp: {
    date: "2026-11-05",
    doctor: "Dr. Sarah Jenkins",
    department: "జనరల్ మెడిసిన్",
    hospital: "కేర్‌బ్రిడ్జ్ ఆసుపత్రి"
  },
  warningSignsUrgent: [
    "ఆకస్మిక అధిక జ్వరం (>101°F) లేదా తీవ్రమైన చలి",
    "తీవ్రమైన ఛాతీ నొప్పి లేదా ఊపిరి ఆడకపోవడం",
    "నిరంతర వాంతులు లేదా నీరు కూడా తాగలేకపోవడం"
  ]
};

// Check if Windows Nirmala Telugu font exists
const NIRMALA_FONT_PATH = 'C:\\Windows\\Fonts\\Nirmala.ttc';
const hasTeluguFont = fs.existsSync(NIRMALA_FONT_PATH);

// Helper translations for Telugu Care Sheet (100% pure Telugu - no English parentheses)
const TELUGU_STRINGS = {
  sheetTitle: 'డిశ్చార్జ్ సంరక్షణ పత్రం',
  subtitle: 'మీ వ్యక్తిగత పోస్ట్-డిశ్చార్జ్ గృహ సంరక్షణ మార్గదర్శిని',
  generated: 'రూపొందించిన తేదీ:',
  secPatientInfo: 'రోగి సమాచారం మరియు డిశ్చార్జ్ సారాంశం',
  name: 'రోగి పేరు:',
  id: 'రోగి ఐడి:',
  ageGender: 'వయస్సు / లింగం:',
  disDate: 'డిశ్చార్జ్ తేదీ:',
  diagnosis: 'రోగ నిర్ధారణ:',
  allergies: 'అలెర్జీలు:',
  secMeds: 'సూచించిన మందుల వివరాలు మరియు సమయ పట్టిక',
  colMed: 'మందు పేరు & మోతాదు',
  colTiming: 'తీసుకోవాల్సిన సమయం',
  colDuration: 'వ్యవధి',
  colInstructions: 'ప్రత్యేక సూచనలు',
  secDietHomeCare: 'ఆహారం మరియు రోజువారీ గృహ సంరక్షణ సూచనలు',
  dietTitle: 'సిఫార్సు చేయబడిన ఆహార సూచనలు:',
  secWarnings: 'తక్షణ అత్యవసర వైద్య సహాయం ఎప్పుడు పొందాలి',
  emergencyNotice: 'అత్యవసరం: ఈ క్రింది లక్షణాలు కనిపిస్తే వెంటనే ఆసుపత్రికి వెళ్ళండి:',
  secFollowup: 'తదుపరి డాక్టర్ సంప్రదింపు:',
  footerText: 'ఈ కేర్ షీట్ మీ ఆసుపత్రి డిశ్చార్జ్ వివరాల ఆధారంగా రూపొందించబడింది. అత్యవసర సమయాల్లో వైద్యుడిని సంప్రదించండి.'
};

// POST /api/generate-caresheet
router.post('/generate-caresheet', (req, res) => {
  try {
    const patientData = (req.body && Object.keys(req.body).length > 0) ? req.body : defaultData;
    const isTelugu = (patientData.lang === 'te');

    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      bufferPages: true
    });

    let fontRegular = 'Helvetica';
    let fontBold = 'Helvetica-Bold';

    if (hasTeluguFont) {
      try {
        doc.registerFont('TeluguFont', NIRMALA_FONT_PATH, 'NirmalaUI');
        doc.registerFont('TeluguFont-Bold', NIRMALA_FONT_PATH, 'NirmalaUI-Bold');
        if (isTelugu) {
          fontRegular = 'TeluguFont';
          fontBold = 'TeluguFont-Bold';
        }
      } catch (fontErr) {
        console.warn('Could not register Nirmala font:', fontErr.message);
      }
    }

    const filename = `CareSheet-${isTelugu ? 'TE-' : ''}${(patientData.patientName || 'Patient').replace(/\s+/g, '_')}.pdf`;
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
    doc.rect(40, 40, 515, 68).fill(lightBlueBg);
    doc.rect(40, 40, 515, 4).fill(primaryBlue);

    doc.fillColor(primaryBlue).font(fontBold).fontSize(20).text('CareBridge', 55, 50);
    doc.font(fontRegular).fontSize(10).fillColor(medGray).text(
      isTelugu ? TELUGU_STRINGS.subtitle : 'Your Personal Post-Discharge Care Companion',
      55, 75, { width: 330 }
    );

    doc.font(fontBold).fontSize(10).fillColor(darkBlue).text(
      isTelugu ? TELUGU_STRINGS.sheetTitle : 'DISCHARGE CARE SHEET',
      380, 52, { align: 'right', width: 165 }
    );

    const todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    doc.font(fontRegular).fontSize(8.5).fillColor(medGray).text(
      `${isTelugu ? TELUGU_STRINGS.generated : 'Generated:'} ${todayDate}`,
      380, 68, { align: 'right', width: 165 }
    );

    let yPos = 120;

    function drawSectionHeader(title, y) {
      doc.rect(40, y, 515, 22).fill(primaryBlue);
      doc.fillColor('#FFFFFF').font(fontBold).fontSize(10.5).text(title, 48, y + 5);
      return y + 28;
    }

    function checkPageBreak(space = 60) {
      if (yPos + space > 780) {
        doc.addPage();
        yPos = 40;
      }
    }

    // 1. Patient Information
    yPos = drawSectionHeader(
      isTelugu ? TELUGU_STRINGS.secPatientInfo : 'PATIENT INFORMATION & DISCHARGE SUMMARY',
      yPos
    );
    doc.rect(40, yPos, 515, 72).fillAndStroke('#F8FAFC', lightGray);

    doc.fillColor(darkGray).font(fontBold).fontSize(9.5);
    doc.text(isTelugu ? TELUGU_STRINGS.name : 'Patient Name:', 50, yPos + 8);
    doc.font(fontRegular).text(patientData.patientName || 'N/A', 145, yPos + 8);

    doc.font(fontBold).text(isTelugu ? TELUGU_STRINGS.id : 'Patient ID:', 330, yPos + 8);
    doc.font(fontRegular).text(patientData.patientId || 'N/A', 415, yPos + 8);

    doc.font(fontBold).text(isTelugu ? TELUGU_STRINGS.ageGender : 'Age / Gender:', 50, yPos + 24);
    const genderText = isTelugu ? (patientData.gender === 'Female' ? 'స్త్రీ' : 'పురుషుడు') : (patientData.gender || 'N/A');
    doc.font(fontRegular).text(`${patientData.age || 'N/A'} ${isTelugu ? 'సంవత్సరాలు' : 'yrs'} / ${genderText}`, 145, yPos + 24);

    doc.font(fontBold).text(isTelugu ? TELUGU_STRINGS.disDate : 'Discharge Date:', 330, yPos + 24);
    doc.font(fontRegular).text(patientData.dischargeDate || 'N/A', 415, yPos + 24);

    doc.font(fontBold).text(isTelugu ? TELUGU_STRINGS.diagnosis : 'Diagnosis:', 50, yPos + 44);
    doc.font(fontRegular).text(patientData.diagnosis || 'N/A', 145, yPos + 44, { width: 395 });

    yPos += 82;

    // 2. Medications Table
    checkPageBreak(120);
    yPos = drawSectionHeader(
      isTelugu ? TELUGU_STRINGS.secMeds : 'PRESCRIBED MEDICATIONS & SCHEDULE',
      yPos
    );

    doc.rect(40, yPos, 515, 20).fill(lightBlueBg);
    doc.fillColor(darkBlue).font(fontBold).fontSize(9);
    doc.text(isTelugu ? TELUGU_STRINGS.colMed : 'Medication & Dose', 46, yPos + 5, { width: 130 });
    doc.text(isTelugu ? TELUGU_STRINGS.colTiming : 'Timing', 180, yPos + 5, { width: 140 });
    doc.text(isTelugu ? TELUGU_STRINGS.colDuration : 'Duration', 325, yPos + 5, { width: 65 });
    doc.text(isTelugu ? TELUGU_STRINGS.colInstructions : 'Special Instructions', 395, yPos + 5, { width: 155 });
    yPos += 22;

    const medicines = patientData.medicines || [];
    medicines.forEach((med, idx) => {
      checkPageBreak(35);
      const rowBg = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
      doc.rect(40, yPos, 515, 26).fillAndStroke(rowBg, lightGray);

      doc.fillColor(darkGray).font(fontBold).fontSize(9);
      doc.text(`${med.name} (${med.dose || ''})`, 46, yPos + 6, { width: 130 });

      doc.font(fontRegular).fontSize(8.5);
      doc.text(med.timing || '-', 180, yPos + 6, { width: 140 });
      doc.text(med.duration || '-', 325, yPos + 6, { width: 65 });
      doc.text(med.instructions || (isTelugu ? 'డాక్టర్ సూచించిన విధంగా' : 'As directed'), 395, yPos + 6, { width: 155 });
      yPos += 26;
    });

    yPos += 14;

    // 3. Diet & Home Care
    checkPageBreak(100);
    yPos = drawSectionHeader(
      isTelugu ? TELUGU_STRINGS.secDietHomeCare : 'DIET & DAILY HOME CARE INSTRUCTIONS',
      yPos
    );

    doc.rect(40, yPos, 515, 34).fillAndStroke(softGreenBg, '#C8E6C9');
    doc.fillColor(darkGreen).font(fontBold).fontSize(9.5).text(
      isTelugu ? TELUGU_STRINGS.dietTitle : 'Dietary Recommendations:',
      48, yPos + 6
    );
    doc.fillColor(darkGray).font(fontRegular).fontSize(8.5).text(
      patientData.dietInstructions || (isTelugu ? 'సమతుల్య, తేలికగా జీర్ణమయ్యే ఆహారం తీసుకోండి.' : 'Follow balanced diet as advised.'),
      48, yPos + 18, { width: 495 }
    );
    yPos += 42;

    const homeCare = patientData.homeCare || [];
    homeCare.forEach((item) => {
      checkPageBreak(20);
      doc.fillColor(primaryBlue).font(fontBold).fontSize(10).text('•', 48, yPos);
      doc.fillColor(darkGray).font(fontRegular).fontSize(8.5).text(item, 60, yPos, { width: 485 });
      yPos += 16;
    });

    yPos += 10;

    // 4. Follow-up details
    if (patientData.followUp && patientData.followUp.date) {
      checkPageBreak(40);
      doc.rect(40, yPos, 515, 24).fillAndStroke('#FFF8E1', '#FFE082');
      doc.fillColor('#F57F17').font(fontBold).fontSize(9).text(
        isTelugu ? TELUGU_STRINGS.secFollowup : 'Follow-up Appointment:',
        48, yPos + 6
      );
      doc.fillColor(darkGray).font(fontRegular).fontSize(8.5).text(
        `${patientData.followUp.date} | ${patientData.followUp.doctor || 'Physician'} (${patientData.followUp.department || 'Hospital'})`,
        185, yPos + 6, { width: 360 }
      );
      yPos += 30;
    }

    // 5. Warning Signs
    checkPageBreak(90);
    yPos = drawSectionHeader(
      isTelugu ? TELUGU_STRINGS.secWarnings : 'WHEN TO SEEK IMMEDIATE MEDICAL HELP',
      yPos
    );
    doc.rect(40, yPos, 515, 20).fill(urgentRedBg);
    doc.fillColor(urgentRed).font(fontBold).fontSize(9).text(
      isTelugu ? TELUGU_STRINGS.emergencyNotice : 'EMERGENCY: Seek immediate medical attention if you experience:',
      48, yPos + 5
    );
    yPos += 24;

    const urgent = patientData.warningSignsUrgent || [];
    urgent.forEach((sign) => {
      checkPageBreak(18);
      doc.fillColor(urgentRed).font(fontBold).fontSize(8.5).text(`!  ${sign}`, 48, yPos, { width: 495 });
      yPos += 16;
    });

    // Footers
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.rect(40, 785, 515, 1).fill('#CFD8DC');
      doc.fillColor(medGray).font(fontRegular).fontSize(7.5).text(
        isTelugu ? TELUGU_STRINGS.footerText : 'This care sheet is generated from available discharge instructions and does not replace medical advice.',
        40, 792, { width: 430, align: 'left' }
      );
      doc.font(fontRegular).fontSize(8).fillColor(medGray).text(
        isTelugu ? `పేజీ ${i + 1} / ${range.count}` : `Page ${i + 1} of ${range.count}`,
        470, 792, { width: 85, align: 'right' }
      );
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
