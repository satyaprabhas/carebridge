/**
 * Feature: 06-diet-plan
 * Backend Diet Plan API Router
 * Supports 60+ dynamic clinical conditions and medication side-effect remedies
 */

const express = require('express');
const router = express.Router();
const { CLINICAL_DISEASES_DB, matchDiseaseCondition } = require('./diseasesData');

const MEDICATION_REMEDIES = [
  {
    pattern: /aspirin|ecosprin|disprin/i,
    name: "Aspirin (Blood Thinner)",
    sideEffect: "Stomach lining irritation, gastric burning, micro-ulceration, and nausea.",
    remedy: "Take after food with water. Eat soothing mucilage foods (warm oatmeal, ripe bananas, tender coconut water).",
    include: "Warm oatmeal, ripe bananas, coconut water, steamed gourd",
    avoid: "Taking on an empty stomach, sour citrus juices, hot spices, alcohol"
  },
  {
    pattern: /clopidogrel|plavix/i,
    name: "Clopidogrel (Antiplatelet)",
    sideEffect: "Increased bleeding time, easy bruising, mild abdominal distress.",
    remedy: "Pair with bland, cooked convalescent meals. Avoid taking with unverified high-dose herbal blood-thinners.",
    include: "Boiled rice and dal, steamed pumpkin, light broths",
    avoid: "High-dose Ginkgo Biloba, excess raw garlic supplements, alcohol"
  },
  {
    pattern: /atorvastatin|rosuvastatin|simvastatin|lipitor/i,
    name: "Atorvastatin / Statins (Cholesterol)",
    sideEffect: "Muscle aches (myopathy), liver metabolism load. Dangerous interaction with grapefruit.",
    remedy: "STRICT WARNING: Avoid Grapefruit and grapefruit juice completely (blocks CYP3A4 enzyme). Support muscle health with CoQ10 foods and water.",
    include: "Steamed broccoli, lentils, soaked walnuts, chia seeds, adequate water (2L/day)",
    avoid: "Grapefruit & Grapefruit Juice (STRICTLY PROHIBITED), excessive saturated animal fat"
  },
  {
    pattern: /metoprolol|atenolol|bisoprolol|carvedilol|betaloc/i,
    name: "Metoprolol (Beta-Blocker)",
    sideEffect: "Fatigue, slowed heart rate, postural dizziness, mild potassium retention.",
    remedy: "Eat regular small meals to prevent sudden energy dips. Avoid excessive caffeine which opposes heart-rate regulation.",
    include: "Whole grains, moong dal, magnesium-rich soaked almonds, clear broths",
    avoid: "Excessive coffee, tea or energy drinks; skipping meals; unverified potassium supplements"
  },
  {
    pattern: /ramipril|enalapril|lisinopril|telmisartan|losartan/i,
    name: "Ramipril (ACE-Inhibitor)",
    sideEffect: "Hyperkalemia (high blood potassium), dry cough, postural dizziness.",
    remedy: "STRICT WARNING: Do NOT use potassium-based salt substitutes (like Lite Salt / NoSalt). Moderate intake of heavy potassium foods.",
    include: "Steamed squash, light rice and dal, peeled apples, adequate plain water",
    avoid: "Potassium-based salt substitutes (Lite Salt), excessive dried apricots, unmonitored banana binging"
  },
  {
    pattern: /pantoprazole|omeprazole|rabeprazole|esomeprazole|pan-40/i,
    name: "Pantoprazole (Antacid / PPI)",
    sideEffect: "Reduced gastric acid; lowers absorption of Vitamin B12, Calcium, and Iron over extended use.",
    remedy: "Take 30 minutes before breakfast. Include fortified foods, curd/yogurt, and soaked seeds to support micronutrient absorption.",
    include: "Fresh homemade curd/yogurt, soaked almonds, fortified oats, stewed apples",
    avoid: "Taking immediately after meals (must take on empty stomach), late-night heavy oily dinners"
  },
  {
    pattern: /paracetamol|acetaminophen|tylenol|dolo/i,
    name: "Paracetamol / Dolo (Pain / Fever)",
    sideEffect: "Hepatic metabolic load if combined with alcohol or prolonged fasting.",
    remedy: "Always drink water; take with light crackers, toast, or khichdi.",
    include: "Clear vegetable soups, toast, warm water, electrolyte fluids",
    avoid: "Alcohol (severe risk of liver toxicity), exceeding 4000 mg daily"
  },
  {
    pattern: /amoxicillin|azithromycin|ciprofloxacin|cefixime|augmentin/i,
    name: "Antibiotics",
    sideEffect: "Depletion of gut flora, loose stools, abdominal cramping.",
    remedy: "Consume probiotic foods (fresh curd, buttermilk) separated by 2 hours from the antibiotic dose.",
    include: "Fresh unsweetened curd/yogurt, probiotic buttermilk, rice gruel (kanji)",
    avoid: "Taking at the exact same minute as high-calcium dairy (separate by 2 hours), alcohol"
  },
  {
    pattern: /furosemide|lasix|torsemide|hydrochlorothiazide/i,
    name: "Furosemide / Diuretics (Lasix)",
    sideEffect: "Excessive urinary fluid loss, loss of electrolytes (potassium, sodium, magnesium), dehydration.",
    remedy: "Monitor fluid output. Replenish natural electrolytes with coconut water or diluted lemon water under doctor supervision.",
    include: "Diluted lemon water with a pinch of rock salt, coconut water (if potassium is normal)",
    avoid: "Excess salt (defeats water removal), dehydrating alcohol"
  }
];

function evaluateMedicationRemedies(medicinesList) {
  const remedies = [];
  const seenPatterns = new Set();

  if (Array.isArray(medicinesList)) {
    medicinesList.forEach(m => {
      const name = typeof m === 'string' ? m : (m?.name || '');
      MEDICATION_REMEDIES.forEach((rem, idx) => {
        if (rem.pattern.test(name) && !seenPatterns.has(idx)) {
          seenPatterns.add(idx);
          remedies.push({
            medName: name,
            remedyTitle: rem.name,
            sideEffect: rem.sideEffect,
            remedy: rem.remedy,
            include: rem.include,
            avoid: rem.avoid
          });
        }
      });
    });
  }

  return remedies;
}

// GET /api/diet-plan
router.get('/', (req, res) => {
  const conditionKey = matchDiseaseCondition(req.query.condition || '');
  const basePlan = CLINICAL_DISEASES_DB[conditionKey] || CLINICAL_DISEASES_DB.general_convalescence;

  res.status(200).json({
    success: true,
    conditionKey,
    totalConditionsSupported: Object.keys(CLINICAL_DISEASES_DB).length,
    data: basePlan
  });
});

// POST /api/diet-plan/generate
router.post('/generate', (req, res) => {
  const { diagnosis, medicines, dietInstructions } = req.body || {};
  const conditionKey = matchDiseaseCondition(diagnosis);
  const basePlan = JSON.parse(JSON.stringify(CLINICAL_DISEASES_DB[conditionKey] || CLINICAL_DISEASES_DB.general_convalescence));
  const medRemedies = evaluateMedicationRemedies(medicines);

  // Inject specific medication cautions into avoid/eat lists
  medRemedies.forEach(r => {
    if (r.remedyTitle.includes('Statin')) {
      basePlan.avoid.unshift({
        food: "Grapefruit & Grapefruit Juice",
        reason: "STRICT DRUG INTERACTION: Blocks CYP3A4 enzyme, leading to dangerously elevated statin levels in blood and muscle toxicity."
      });
    }
    if (r.remedyTitle.includes('ACE-Inhibitor')) {
      basePlan.avoid.unshift({
        food: "Potassium Salt Substitutes (Lite Salt / NoSalt)",
        reason: "STRICT DRUG INTERACTION: High risk of dangerous hyperkalemia (cardiac arrhythmia) when combined with ACE inhibitors."
      });
    }
    if (r.remedyTitle.includes('Aspirin')) {
      basePlan.eat.unshift({
        food: "Warm Oatmeal & Soothing Bananas",
        reason: "TABLET REMEDY: Protects stomach lining against micro-ulceration and acid burning caused by daily Aspirin."
      });
    }
  });

  if (dietInstructions && typeof dietInstructions === 'string' && dietInstructions.trim().length > 3) {
    basePlan.customHospitalAdvice = dietInstructions.trim();
  }

  res.status(200).json({
    success: true,
    conditionKey,
    totalConditionsSupported: Object.keys(CLINICAL_DISEASES_DB).length,
    data: {
      ...basePlan,
      conditionName: basePlan.name,
      medicationRemedies: medRemedies
    }
  });
});

module.exports = router;
