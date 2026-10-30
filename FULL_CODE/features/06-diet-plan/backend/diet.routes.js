/**
 * Feature: 06-diet-plan
 * Backend Diet Plan API Router
 * Supports 60+ dynamic clinical conditions and medication side-effect remedies
 */

const express = require('express');
const router = express.Router();
const { CLINICAL_DISEASES_DB, matchDiseaseCondition } = require('./diseasesData');

const { MEDICATION_REMEDIES, evaluateMedicationRemedies } = require('./medicationRemediesData');


const commonIndianEat = [
  { food: "Moong Dal Khichdi", reason: "Light, easily digestible protein and carbohydrate blend gentle on the stomach." },
  { food: "Boiled White / Brown Rice", reason: "Clean, easily absorbed energy without gastrointestinal strain." },
  { food: "Steamed Lauki (Bottle Gourd) & Turai", reason: "High water content and cooling properties that soothe the digestive tract." },
  { food: "Fresh Homemade Dahi (Curd)", reason: "Probiotics replenish healthy gut flora post-antibiotics and improve digestion." },
  { food: "Chaas (Fresh Buttermilk with Jeera)", reason: "Hydrates, reduces acidity, and calms medication stomach burning." },
  { food: "Dalia (Broken Wheat Porridge)", reason: "High soluble fiber supporting regular bowel movements during bed rest." },
  { food: "Ripe Bananas (Kela)", reason: "Natural potassium and gentle pectin fiber that soothe digestive mucosa." },
  { food: "Clear Moong Dal Soup & Vegetable Shorba", reason: "Provides systemic hydration, minerals, and light protein." },
  { food: "Fresh Soft Paneer (Cottage Cheese)", reason: "Clean lean protein vital for post-operative wound healing and cellular repair." },
  { food: "Boiled Egg Whites", reason: "Pure albumin protein that accelerates tissue regeneration and surgical healing." },
  { food: "Tender Coconut Water (Nariyal Pani)", reason: "Natural isotonic electrolytes balancing sodium, potassium, and magnesium." },
  { food: "Plain Toast / Rusk", reason: "Absorbs excess gastric acid and prevents morning nausea." },
  { food: "Steamed Pumpkin (Kaddu) & Carrots", reason: "Rich in beta-carotene and vitamin A for tissue recovery and immune defense." },
  { food: "Warm Water with Roasted Cumin (Jeera)", reason: "Relieves gas, abdominal bloating, and post-meal heaviness." }
];

const commonIndianLimit = [
  { food: "Full-Fat Buffalo Milk & Malai", reason: "Heavy saturated fats slow down stomach emptying; prefer skimmed cow's milk." },
  { food: "Tea & Filter Coffee", reason: "Limit to 1 small cup; excess caffeine causes dehydration and increases acidity." },
  { food: "Cooking Oil & Desi Ghee", reason: "Limit to 1-2 teaspoons daily; avoid heavy greasy tadkas during recovery." },
  { food: "Table Salt (Sodium)", reason: "Keep under 1 teaspoon daily to prevent fluid retention and ankle swelling." },
  { food: "Whole Egg Yolks", reason: "Limit to 1 egg daily; egg whites preferred to prevent digestive heaviness." },
  { food: "Refined Flour (Maida, White Bread)", reason: "Lacks fiber and can induce post-operative constipation." },
  { food: "Raw Crunchy Salads", reason: "Difficult for healing intestines to digest; prefer boiled or steamed vegetables." },
  { food: "Heavy Pulses (Rajma, Chana, Urad)", reason: "Produces gas and abdominal fullness; prefer light moong dal." }
];

const commonIndianAvoid = [
  { food: "Deep-Fried Snacks (Samosas, Pakoras, Vada)", reason: "Trans fats and oxidized oils trigger acute indigestion, reflux, and inflammation." },
  { food: "Heavily Spiced & Oily Curries", reason: "Hot red chilies, garam masala, and excess garlic irritate stomach lining." },
  { food: "Pickles (Achar), Papads & Salted Chips", reason: "Extreme sodium concentration increases blood pressure and causes water retention." },
  { food: "Alcohol & Tobacco (Strict Prohibition)", reason: "Interferes with medication clearance, burdens liver, and stops healing." },
  { food: "Carbonated Sodas & Fizzy Drinks", reason: "Carbonic acid and high refined sugar produce acute abdominal gas." },
  { food: "Street Food & Roadside Chaat", reason: "High risk of bacterial food poisoning and waterborne infections during recovery." },
  { food: "Very Sour Foods (Imli, Raw Mango, Vinegar)", reason: "High acid concentration aggravates post-discharge reflux and heartburn." },
  { food: "Late-Night Heavy Dinners", reason: "Disrupts sleep and triggers nocturnal acid reflux; finish dinner 2 hours before bed." }
];

function enrichDietPlan(plan) {
  if (!plan) return plan;
  // Clinical protocols in CLINICAL_DISEASES_DB now carry 10-14 rich condition-tailored items.
  // Fallback items are merged only if a condition list is sparse (< 8 items).
  const mergeItems = (baseItems, defaultItems, minCount) => {
    const result = Array.isArray(baseItems) ? [...baseItems] : [];
    if (result.length >= minCount) return result;
    const seen = new Set(result.map(i => (i.food || i.name || '').toLowerCase().trim()));
    for (const item of defaultItems) {
      const key = item.food.toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
      if (result.length >= minCount) break;
    }
    return result;
  };
  plan.eat = mergeItems(plan.eat, commonIndianEat, 8);
  plan.limit = mergeItems(plan.limit, commonIndianLimit, 4);
  plan.avoid = mergeItems(plan.avoid, commonIndianAvoid, 4);
  return plan;
}

// GET /api/diet-plan
router.get('/', (req, res) => {
  const conditionKey = matchDiseaseCondition(req.query.condition || '');
  const basePlan = enrichDietPlan(JSON.parse(JSON.stringify(CLINICAL_DISEASES_DB[conditionKey] || CLINICAL_DISEASES_DB.general_convalescence)));

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
  const basePlan = enrichDietPlan(JSON.parse(JSON.stringify(CLINICAL_DISEASES_DB[conditionKey] || CLINICAL_DISEASES_DB.general_convalescence)));
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
