/**
 * Feature: 07-food-search
 * Backend Nutrition Rules Engine & Food Safety Checker
 */

const express = require('express');
const router = express.Router();
let CLINICAL_DISEASES_DB = {};
let matchDiseaseCondition = () => 'general_convalescence';
let EXTENDED_FOOD_DATABASE = {};

try {
  const clinicalMod = require('../../06-diet-plan/backend/diseasesData');
  CLINICAL_DISEASES_DB = clinicalMod.CLINICAL_DISEASES_DB || {};
  matchDiseaseCondition = clinicalMod.matchDiseaseCondition || matchDiseaseCondition;
} catch (e) {
  console.warn('Clinical diseases database not loaded in food-search:', e.message);
}

try {
  const foodDbMod = require('./foodDatabase');
  EXTENDED_FOOD_DATABASE = foodDbMod.EXTENDED_FOOD_DATABASE || {};
} catch (e) {
  console.warn('Extended food database not loaded in food-search:', e.message);
}

const FOOD_DATABASE = {
  // SUITABLE
  'rice': { verdict: 'suitable', explanation: 'Plain steamed rice is easily digestible and gentle on the stomach during recovery.', notes: 'Prefer plain or steamed preparations without heavy oils or ghee.' },
  'steamed rice': { verdict: 'suitable', explanation: 'Steamed white or brown rice is easily digestible and recommended for gentle post-discharge recovery.', notes: 'Consume in moderate portion sizes.' },
  'oatmeal': { verdict: 'suitable', explanation: 'Oatmeal is rich in soluble fibre, helps restore digestive rhythm, and provides sustained energy.', notes: 'Prepare with water or skimmed milk without excessive added sugar.' },
  'oats': { verdict: 'suitable', explanation: 'Oats are gentle on the digestive tract and provide healthy complex carbohydrates.', notes: 'Avoid heavily sweetened instant varieties.' },
  'soup': { verdict: 'suitable', explanation: 'Clear vegetable or light broth soups provide essential hydration and electrolytes.', notes: 'Keep salt low; avoid heavy cream or cornstarch thickeners.' },
  'vegetable soup': { verdict: 'suitable', explanation: 'Clear vegetable broth promotes hydration and supplies vitamins.', notes: 'Best consumed warm with light seasoning.' },
  'banana': { verdict: 'suitable', explanation: 'Bananas are easily digestible and provide potassium and dietary fibre.', notes: 'Limit to 1 ripe banana per day as part of a balanced diet.' },
  'bananas': { verdict: 'suitable', explanation: 'Bananas are easily digestible and provide potassium and dietary fibre.', notes: 'Limit to 1 ripe banana per day as part of a balanced diet.' },
  'steamed vegetables': { verdict: 'suitable', explanation: 'Steamed carrots, green beans, and zucchini are easily absorbed without digestive strain.', notes: 'Steam or boil lightly; avoid frying or heavy butter.' },
  'carrots': { verdict: 'suitable', explanation: 'Cooked carrots are soft, easily digested, and rich in beta-carotene.', notes: 'Prefer steamed or cooked over raw crunchy carrots during early recovery.' },
  'apple': { verdict: 'suitable', explanation: 'Applesauce or peeled stewed apples are very gentle on the stomach.', notes: 'Peeled or stewed is preferred during initial recovery.' },
  'khichdi': { verdict: 'suitable', explanation: 'Mild lentil and rice porridge (khichdi) is a standard, easily digestible convalescent food.', notes: 'Prepare with minimal oil or ghee and mild cumin seasoning.' },
  'toast': { verdict: 'suitable', explanation: 'Plain toasted bread is light and digestible for recovery.', notes: 'Avoid heavy butter or sugary jams.' },
  'water': { verdict: 'suitable', explanation: 'Water is essential for recovery, medication absorption, and renal clearance.', notes: 'Aim for 2 litres throughout the day unless fluids are restricted.' },

  // LIMIT
  'milk': { verdict: 'limit', explanation: 'Full-fat dairy milk contains heavier saturated fats that can be harder to digest during recovery.', notes: 'Choose low-fat or skimmed milk in moderation (1 cup/day).' },
  'dairy': { verdict: 'limit', explanation: 'Full-fat dairy products may cause bloating or slow digestion post-discharge.', notes: 'Switch to low-fat or probiotic alternatives.' },
  'eggs': { verdict: 'limit', explanation: 'Eggs are a good source of protein, but full yolks should be moderated to avoid digestive heaviness.', notes: 'Limit to 1 boiled or poached egg per day; avoid frying in oil.' },
  'egg': { verdict: 'limit', explanation: 'Eggs are a good protein source; limit to 1 boiled egg daily to moderate lipid intake.', notes: 'Boiled or poached is preferred over fried.' },
  'tea': { verdict: 'limit', explanation: 'Caffeine can stimulate stomach acid and mildly impact hydration.', notes: 'Limit to 1 small cup daily; do not add refined sugar.' },
  'coffee': { verdict: 'limit', explanation: 'Coffee has stimulant and acidic properties that can irritate the stomach lining.', notes: 'Limit to 1 cup daily; take after food, never on an empty stomach.' },
  'salt': { verdict: 'limit', explanation: 'High sodium intake can contribute to fluid retention and elevated blood pressure.', notes: 'Keep cooking salt minimal and avoid table shakers.' },
  'cheese': { verdict: 'limit', explanation: 'Processed or aged cheese is high in sodium and saturated fats.', notes: 'Consume small portions of fresh, low-fat paneer or cottage cheese if desired.' },
  'curd': { verdict: 'suitable', explanation: 'Low-fat plain curd/yogurt provides beneficial probiotics for gut recovery.', notes: 'Consume unsweetened low-fat curd.' },
  'yogurt': { verdict: 'suitable', explanation: 'Plain low-fat yogurt supports healthy digestive flora post-discharge.', notes: 'Choose unsweetened varieties.' },
  'potato': { verdict: 'limit', explanation: 'Potatoes are high in starchy carbohydrates; boiled potatoes are acceptable in moderation.', notes: 'Avoid fried potatoes, fries, or chips.' },
  'potatoes': { verdict: 'limit', explanation: 'Potatoes are high in starch; acceptable in small boiled portions.', notes: 'Avoid fried potatoes, fries, or chips.' },

  // AVOID
  'chips': { verdict: 'avoid', explanation: 'Packaged chips are deep-fried, heavily salted, and contain artificial preservatives that conflict with home recovery.', notes: 'Documented restriction: Avoid packaged chips and snacks.' },
  'potato chips': { verdict: 'avoid', explanation: 'Deep-fried chips are high in sodium and unhealthy fats, stressing the digestive system.', notes: 'Avoid completely during recovery.' },
  'fried food': { verdict: 'avoid', explanation: 'Deep-fried foods (pakoras, samosas, fries) are high in trans fats and can cause nausea and indigestion.', notes: 'Documented restriction: Strictly avoid all deep-fried foods.' },
  'samosa': { verdict: 'avoid', explanation: 'Deep-fried snacks made with refined flour and spices can trigger severe gastric irritation.', notes: 'Avoid completely.' },
  'pakora': { verdict: 'avoid', explanation: 'Deep-fried snacks delay stomach emptying and conflict with discharge instructions.', notes: 'Avoid completely.' },
  'spicy food': { verdict: 'avoid', explanation: 'Heavily spiced curries and hot chillies irritate the gastrointestinal mucosa.', notes: 'Documented restriction: Avoid heavily spiced curries.' },
  'curry': { verdict: 'avoid', explanation: 'Rich, oily, or heavily spiced curries can cause severe heartburn or gastrointestinal upset.', notes: 'Opt for mildly seasoned clear broths or steamed foods.' },
  'soda': { verdict: 'avoid', explanation: 'Sugary carbonated sodas cause rapid glucose spikes, gas, and abdominal distension.', notes: 'Documented restriction: Strictly avoid sugary sodas and drinks.' },
  'cold drink': { verdict: 'avoid', explanation: 'Commercial soft drinks contain high refined sugar and no nutritional value.', notes: 'Replace with water or clear broths.' },
  'alcohol': { verdict: 'avoid', explanation: 'Alcohol interferes with medication metabolism, delays tissue recovery, and dehydrates the body.', notes: 'Documented restriction: Strictly avoid all alcohol.' },
  'beer': { verdict: 'avoid', explanation: 'Alcoholic beverages conflict directly with prescribed recovery protocol.', notes: 'Avoid completely.' },
  'wine': { verdict: 'avoid', explanation: 'Alcoholic drinks interfere with medication clearance and delay recovery.', notes: 'Avoid completely.' },
  'sweets': { verdict: 'avoid', explanation: 'Concentrated Indian sweets (gulab jamun, jalebi) have excessive refined sugar and fats.', notes: 'Avoid completely during recovery.' },
  'sugar': { verdict: 'limit', explanation: 'Refined sugar can cause energy spikes and fluctuations.', notes: 'Minimize added sugars.' }
};

// POST /api/food-search/check
router.post('/check', (req, res) => {
  const query = (req.body.query || '').trim().toLowerCase();

  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a food name query.'
    });
  }

  const conditionKey = req.body.condition ? matchDiseaseCondition(req.body.condition) : null;

  // 1. Search in 1,000+ Extended Food Database
  let extMatch = null;
  if (EXTENDED_FOOD_DATABASE[query]) {
    extMatch = EXTENDED_FOOD_DATABASE[query];
  } else {
    // Search by alias or substring
    for (const [key, item] of Object.entries(EXTENDED_FOOD_DATABASE)) {
      if (item.aliases && item.aliases.some(a => a === query || a.includes(query) || query.includes(a))) {
        extMatch = item;
        break;
      }
      if (key.includes(query) || query.includes(key)) {
        extMatch = item;
        break;
      }
    }
  }

  if (extMatch) {
    let finalVerdict = extMatch.verdict;
    let finalExplanation = extMatch.explanation;
    let finalNotes = extMatch.notes;

    // Apply disease-specific override if active
    if (conditionKey && extMatch.diseaseOverrides) {
      for (const [disKey, override] of Object.entries(extMatch.diseaseOverrides)) {
        if (conditionKey.toLowerCase().includes(disKey.toLowerCase()) || disKey.toLowerCase().includes(conditionKey.toLowerCase())) {
          finalVerdict = override.verdict || finalVerdict;
          finalExplanation = override.explanation || finalExplanation;
          finalNotes = `Clinical Caution for ${conditionKey}: ${override.explanation}`;
          break;
        }
      }
    }

    return res.status(200).json({
      success: true,
      result: {
        food: extMatch.food,
        category: extMatch.category,
        verdict: finalVerdict,
        explanation: finalExplanation,
        notes: finalNotes || `Category: ${extMatch.category}`
      }
    });
  }

  // 2. Exact match in static database
  if (FOOD_DATABASE[query]) {
    return res.status(200).json({
      success: true,
      result: {
        food: query.charAt(0).toUpperCase() + query.slice(1),
        ...FOOD_DATABASE[query]
      }
    });
  }

  // Fuzzy match in static database
  const matchKey = Object.keys(FOOD_DATABASE).find(k => query.includes(k) || k.includes(query));
  if (matchKey) {
    return res.status(200).json({
      success: true,
      result: {
        food: query.charAt(0).toUpperCase() + query.slice(1),
        ...FOOD_DATABASE[matchKey]
      }
    });
  }

  // Search in 271 Clinical Operations & Diseases Database
  const searchPool = [];

  if (conditionKey && CLINICAL_DISEASES_DB[conditionKey]) {
    searchPool.push({ key: conditionKey, protocol: CLINICAL_DISEASES_DB[conditionKey], priority: true });
  }
  for (const [key, protocol] of Object.entries(CLINICAL_DISEASES_DB)) {
    if (key !== conditionKey) {
      searchPool.push({ key, protocol, priority: false });
    }
  }

  for (const item of searchPool) {
    const proto = item.protocol;
    // Check avoid
    if (proto.avoid) {
      for (const entry of proto.avoid) {
        const f = (entry.food || '').toLowerCase();
        if (f.includes(query) || query.includes(f)) {
          return res.status(200).json({
            success: true,
            result: {
              food: entry.food,
              verdict: 'avoid',
              explanation: entry.reason || `Avoided in clinical protocol for ${proto.name}.`,
              notes: `Source: Clinical Protocol for ${proto.name} (${proto.category || 'Clinical Guidance'})`
            }
          });
        }
      }
    }
    // Check limit
    if (proto.limit) {
      for (const entry of proto.limit) {
        const f = (entry.food || '').toLowerCase();
        if (f.includes(query) || query.includes(f)) {
          return res.status(200).json({
            success: true,
            result: {
              food: entry.food,
              verdict: 'limit',
              explanation: entry.reason || `Consume with caution / limit in protocol for ${proto.name}.`,
              notes: `Source: Clinical Protocol for ${proto.name} (${proto.category || 'Clinical Guidance'})`
            }
          });
        }
      }
    }
    // Check eat
    if (proto.eat) {
      for (const entry of proto.eat) {
        const f = (entry.food || '').toLowerCase();
        if (f.includes(query) || query.includes(f)) {
          return res.status(200).json({
            success: true,
            result: {
              food: entry.food,
              verdict: 'suitable',
              explanation: entry.reason || `Recommended nutritious option for ${proto.name}.`,
              notes: `Source: Clinical Protocol for ${proto.name} (${proto.category || 'Clinical Guidance'})`
            }
          });
        }
      }
    }
  }

  // Fallback
  return res.status(200).json({
    success: true,
    result: {
      food: query.charAt(0).toUpperCase() + query.slice(1),
      verdict: 'unknown',
      explanation: `No specific clinical recovery guidance recorded for "${query}".`,
      notes: 'Consult your attending physician or registered dietitian before introducing this item.'
    }
  });
});

module.exports = router;
