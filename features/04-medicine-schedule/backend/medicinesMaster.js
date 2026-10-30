/**
 * Official Hackathon Medicine Formulary & Drug Dictionary
 * Contains 80+ Indian discharge medicines with generic names, common brands,
 * drug classes, and plain language patient-friendly purposes.
 */

const FORMULARY = [
  {
    genericName: "aceclofenac",
    commonBrands: ["Zerodol", "Hifenac"],
    doseForms: "tablet",
    typicalStrengths: "100 mg",
    drugClass: "NSAID (painkiller)",
    plainLanguagePurpose: "relieves pain and swelling",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "acenocoumarol",
    commonBrands: ["Acitrom"],
    doseForms: "tablet",
    typicalStrengths: "1 mg; 2 mg; 4 mg",
    drugClass: "Anticoagulant (vitamin K antagonist)",
    plainLanguagePurpose: "thins the blood to prevent clots and stroke; needs regular INR blood tests",
    alsoKnownAs: ["nicoumalone"],
    usedAtDischarge: true
  },
  {
    genericName: "amlodipine",
    commonBrands: ["Amlong", "Stamlo"],
    doseForms: "tablet",
    typicalStrengths: "2.5 mg; 5 mg; 10 mg",
    drugClass: "Calcium-channel blocker",
    plainLanguagePurpose: "lowers blood pressure",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "amoxicillin + clavulanic acid",
    commonBrands: ["Augmentin", "Clavam"],
    doseForms: "tablet",
    typicalStrengths: "625 mg (500 mg + 125 mg)",
    drugClass: "Antibiotic (penicillin)",
    plainLanguagePurpose: "antibiotic that kills the germs causing infection",
    alsoKnownAs: ["amoxycillin + clavulanic acid", "amoxicillin clavulanate", "amoxycillin clavulanate", "amoxicillin-clavulanate", "co-amoxiclav", "amoxiclav", "amoxicillin/clavulanate", "amoxicillin", "amoxycillin"],
    usedAtDischarge: true
  },
  {
    genericName: "apixaban",
    commonBrands: ["Eliquis"],
    doseForms: "tablet",
    typicalStrengths: "2.5 mg; 5 mg",
    drugClass: "Anticoagulant (DOAC)",
    plainLanguagePurpose: "thins the blood to prevent clots and stroke",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "aspirin",
    commonBrands: ["Ecosprin"],
    doseForms: "tablet (enteric-coated)",
    typicalStrengths: "75 mg; 150 mg",
    drugClass: "Antiplatelet",
    plainLanguagePurpose: "thins the blood to prevent clots",
    alsoKnownAs: ["acetylsalicylic acid", "asa"],
    usedAtDischarge: true
  },
  {
    genericName: "atorvastatin",
    commonBrands: ["Atorva", "Storvas"],
    doseForms: "tablet",
    typicalStrengths: "10 mg; 20 mg; 40 mg; 80 mg",
    drugClass: "Statin (lipid-lowering)",
    plainLanguagePurpose: "lowers cholesterol and protects the heart and blood vessels",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "azithromycin",
    commonBrands: ["Azithral", "Azee"],
    doseForms: "tablet",
    typicalStrengths: "500 mg",
    drugClass: "Antibiotic (macrolide)",
    plainLanguagePurpose: "antibiotic that kills the germs causing infection",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "bisoprolol",
    commonBrands: ["Concor"],
    doseForms: "tablet",
    typicalStrengths: "2.5 mg; 5 mg",
    drugClass: "Beta-blocker",
    plainLanguagePurpose: "slows the heart rate and protects the heart",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "budesonide + formoterol",
    commonBrands: ["Foracort", "Budamate"],
    doseForms: "inhaler (MDI); rotacap",
    typicalStrengths: "6/200 mcg per puff; 6/400 mcg per puff",
    drugClass: "Inhaled steroid + long-acting bronchodilator (controller)",
    plainLanguagePurpose: "daily controller inhaler that keeps the airways open and calm",
    alsoKnownAs: ["formoterol + budesonide", "budesonide/formoterol", "formoterol/budesonide", "budesonide", "formoterol"],
    usedAtDischarge: true
  },
  {
    genericName: "calcium carbonate + vitamin d3",
    commonBrands: ["Shelcal"],
    doseForms: "tablet",
    typicalStrengths: "500 mg elemental calcium + 250 IU vitamin D3",
    drugClass: "Calcium supplement",
    plainLanguagePurpose: "calcium for strong bones",
    alsoKnownAs: ["calcium", "calcium carbonate", "calcium + vitamin d3", "calcium + vit d3", "calcium carbonate + vit d3", "calcium carbonate + vitamin d3"],
    usedAtDischarge: true
  },
  {
    genericName: "carvedilol",
    commonBrands: ["Cardivas"],
    doseForms: "tablet",
    typicalStrengths: "3.125 mg; 6.25 mg; 12.5 mg",
    drugClass: "Beta-blocker",
    plainLanguagePurpose: "slows the heart rate and helps a weak heart",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "cefazolin",
    commonBrands: [],
    doseForms: "injection",
    typicalStrengths: "1 g; 2 g",
    drugClass: "Antibiotic (surgical prophylaxis)",
    plainLanguagePurpose: "antibiotic injection before surgery",
    alsoKnownAs: [],
    usedAtDischarge: false
  },
  {
    genericName: "cefixime",
    commonBrands: ["Taxim-O", "Zifi"],
    doseForms: "tablet",
    typicalStrengths: "200 mg",
    drugClass: "Antibiotic (cephalosporin)",
    plainLanguagePurpose: "antibiotic that kills the germs causing infection",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "ceftriaxone",
    commonBrands: ["Monocef"],
    doseForms: "injection",
    typicalStrengths: "1 g",
    drugClass: "Antibiotic (cephalosporin, injectable)",
    plainLanguagePurpose: "injectable antibiotic",
    alsoKnownAs: [],
    usedAtDischarge: false
  },
  {
    genericName: "cefuroxime",
    commonBrands: ["Ceftum"],
    doseForms: "tablet",
    typicalStrengths: "250 mg; 500 mg",
    drugClass: "Antibiotic (cephalosporin)",
    plainLanguagePurpose: "antibiotic that kills the germs causing infection",
    alsoKnownAs: ["cefuroxime axetil"],
    usedAtDischarge: true
  },
  {
    genericName: "cholecalciferol",
    commonBrands: ["Uprise-D3", "Calcirol"],
    doseForms: "capsule; sachet (granules)",
    typicalStrengths: "60,000 IU",
    drugClass: "Vitamin D",
    plainLanguagePurpose: "vitamin D for strong bones",
    alsoKnownAs: ["vitamin d3", "vitamin d", "vit d3", "vit d"],
    usedAtDischarge: true
  },
  {
    genericName: "clopidogrel",
    commonBrands: ["Clopilet", "Clopitab"],
    doseForms: "tablet",
    typicalStrengths: "75 mg",
    drugClass: "Antiplatelet (P2Y12 inhibitor)",
    plainLanguagePurpose: "thins the blood to prevent clots",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "dabigatran",
    commonBrands: ["Pradaxa"],
    doseForms: "capsule",
    typicalStrengths: "110 mg; 150 mg",
    drugClass: "Anticoagulant (DOAC)",
    plainLanguagePurpose: "thins the blood to prevent clots and stroke",
    alsoKnownAs: ["dabigatran etexilate"],
    usedAtDischarge: true
  },
  {
    genericName: "dapagliflozin",
    commonBrands: ["Forxiga"],
    doseForms: "tablet",
    typicalStrengths: "10 mg",
    drugClass: "SGLT2 inhibitor",
    plainLanguagePurpose: "helps the heart and kidneys; in diabetes it also lowers blood sugar",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "diclofenac",
    commonBrands: ["Voveran"],
    doseForms: "tablet",
    typicalStrengths: "50 mg",
    drugClass: "NSAID (painkiller)",
    plainLanguagePurpose: "painkiller",
    alsoKnownAs: ["diclofenac sodium"],
    usedAtDischarge: true
  },
  {
    genericName: "digoxin",
    commonBrands: ["Lanoxin"],
    doseForms: "tablet",
    typicalStrengths: "0.25 mg",
    drugClass: "Cardiac glycoside",
    plainLanguagePurpose: "controls a fast, irregular heartbeat",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "diltiazem",
    commonBrands: ["Dilzem"],
    doseForms: "tablet",
    typicalStrengths: "30 mg; 60 mg",
    drugClass: "Calcium-channel blocker (rate control)",
    plainLanguagePurpose: "slows a fast heartbeat",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "doxycycline",
    commonBrands: ["Biodoxi"],
    doseForms: "capsule",
    typicalStrengths: "100 mg",
    drugClass: "Antibiotic (tetracycline)",
    plainLanguagePurpose: "antibiotic that kills the germs causing infection",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "empagliflozin",
    commonBrands: ["Jardiance"],
    doseForms: "tablet",
    typicalStrengths: "10 mg; 25 mg",
    drugClass: "SGLT2 inhibitor",
    plainLanguagePurpose: "helps the heart and kidneys; in diabetes it also lowers blood sugar",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "enalapril",
    commonBrands: ["Envas"],
    doseForms: "tablet",
    typicalStrengths: "2.5 mg; 5 mg",
    drugClass: "ACE inhibitor",
    plainLanguagePurpose: "lowers blood pressure and protects the heart and kidneys",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "enoxaparin",
    commonBrands: ["Clexane", "Lonopin"],
    doseForms: "injection (pre-filled syringe)",
    typicalStrengths: "40 mg/0.4 ml; 60 mg/0.6 ml",
    drugClass: "Anticoagulant (LMWH)",
    plainLanguagePurpose: "injection that prevents blood clots in the legs",
    alsoKnownAs: ["lmwh", "low molecular weight heparin"],
    usedAtDischarge: true
  },
  {
    genericName: "etoricoxib",
    commonBrands: ["Nucoxia", "Etoshine"],
    doseForms: "tablet",
    typicalStrengths: "60 mg; 90 mg",
    drugClass: "NSAID (COX-2 selective painkiller)",
    plainLanguagePurpose: "relieves pain and swelling",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "ferrous sulphate + folic acid",
    commonBrands: [],
    doseForms: "tablet",
    typicalStrengths: "60 mg elemental iron + 500 mcg folic acid",
    drugClass: "Iron and vitamin supplement",
    plainLanguagePurpose: "iron tablet that builds up blood (haemoglobin)",
    alsoKnownAs: ["ifa", "iron folic acid", "iron and folic acid", "ferrous sulfate + folic acid", "iron", "ferrous sulphate", "iron + folic acid"],
    usedAtDischarge: true
  },
  {
    genericName: "fondaparinux",
    commonBrands: ["Arixtra"],
    doseForms: "injection",
    typicalStrengths: "2.5 mg",
    drugClass: "Anticoagulant (injectable)",
    plainLanguagePurpose: "blood thinner injection",
    alsoKnownAs: [],
    usedAtDischarge: false
  },
  {
    genericName: "furosemide",
    commonBrands: ["Lasix"],
    doseForms: "tablet",
    typicalStrengths: "40 mg",
    drugClass: "Loop diuretic ('water pill')",
    plainLanguagePurpose: "removes extra water from the body by making you pass more urine",
    alsoKnownAs: ["frusemide"],
    usedAtDischarge: true
  },
  {
    genericName: "glimepiride",
    commonBrands: ["Amaryl"],
    doseForms: "tablet",
    typicalStrengths: "1 mg; 2 mg",
    drugClass: "Sulfonylurea (anti-diabetic)",
    plainLanguagePurpose: "lowers blood sugar",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "heparin",
    commonBrands: [],
    doseForms: "injection",
    typicalStrengths: "5000 IU/ml",
    drugClass: "Anticoagulant (injectable)",
    plainLanguagePurpose: "blood thinner injection",
    alsoKnownAs: ["ufh"],
    usedAtDischarge: false
  },
  {
    genericName: "hydrocortisone",
    commonBrands: [],
    doseForms: "injection",
    typicalStrengths: "100 mg",
    drugClass: "Corticosteroid (injectable)",
    plainLanguagePurpose: "steroid injection",
    alsoKnownAs: [],
    usedAtDischarge: false
  },
  {
    genericName: "ibuprofen",
    commonBrands: ["Brufen"],
    doseForms: "tablet",
    typicalStrengths: "400 mg",
    drugClass: "NSAID (painkiller)",
    plainLanguagePurpose: "relieves pain and swelling",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "insulin aspart",
    commonBrands: ["NovoRapid"],
    doseForms: "injection (pen/vial)",
    typicalStrengths: "100 units/ml",
    drugClass: "Rapid-acting (meal-time) insulin",
    plainLanguagePurpose: "quick-acting insulin that controls the sugar rise after meals",
    alsoKnownAs: ["aspart", "rapid-acting insulin"],
    usedAtDischarge: true
  },
  {
    genericName: "insulin glargine",
    commonBrands: ["Lantus", "Basalog", "Glaritus"],
    doseForms: "injection (pen/vial)",
    typicalStrengths: "100 units/ml",
    drugClass: "Long-acting (basal) insulin",
    plainLanguagePurpose: "long-acting insulin that controls blood sugar through the day and night",
    alsoKnownAs: ["glargine", "basal insulin"],
    usedAtDischarge: true
  },
  {
    genericName: "insulin premix 30/70",
    commonBrands: ["Human Mixtard 30", "Huminsulin 30/70"],
    doseForms: "injection (vial/pen)",
    typicalStrengths: "40 units/ml; 100 units/ml",
    drugClass: "Premixed insulin (30% short + 70% intermediate)",
    plainLanguagePurpose: "mixed insulin taken before breakfast and dinner to control blood sugar",
    alsoKnownAs: ["biphasic isophane insulin", "premix insulin", "premixed insulin", "30/70 insulin", "insulin 30/70", "mixtard"],
    usedAtDischarge: true
  },
  {
    genericName: "insulin regular",
    commonBrands: ["Actrapid", "Huminsulin R"],
    doseForms: "injection (vial/pen)",
    typicalStrengths: "40 units/ml; 100 units/ml",
    drugClass: "Short-acting insulin",
    plainLanguagePurpose: "short-acting insulin that controls the sugar rise after meals",
    alsoKnownAs: ["regular insulin", "human regular insulin", "plain insulin", "soluble insulin", "short-acting insulin"],
    usedAtDischarge: true
  },
  {
    genericName: "ipratropium",
    commonBrands: [],
    doseForms: "nebulisation solution",
    typicalStrengths: "500 mcg/2 ml",
    drugClass: "Bronchodilator (nebulised)",
    plainLanguagePurpose: "nebulised airway opener",
    alsoKnownAs: ["ipratropium bromide"],
    usedAtDischarge: false
  },
  {
    genericName: "isoniazid + rifampicin + pyrazinamide + ethambutol",
    commonBrands: ["Forecox"],
    doseForms: "tablet (fixed-dose combination)",
    typicalStrengths: "H 75 mg + R 150 mg + Z 400 mg + E 275 mg per tablet",
    drugClass: "Anti-tuberculosis treatment (fixed-dose combination)",
    plainLanguagePurpose: "TB medicine (4 medicines in one tablet) that kills the TB germs; the full course must be completed",
    alsoKnownAs: ["4fdc", "4-fdc", "fdc", "hrze", "akt", "att", "anti-tb fdc", "isoniazid", "rifampicin", "rifampin", "pyrazinamide", "ethambutol", "rifampicin + isoniazid + pyrazinamide + ethambutol"],
    usedAtDischarge: true
  },
  {
    genericName: "isosorbide dinitrate",
    commonBrands: ["Sorbitrate"],
    doseForms: "tablet (sublingual)",
    typicalStrengths: "5 mg",
    drugClass: "Nitrate (anti-anginal)",
    plainLanguagePurpose: "quick relief of chest pain; put it under the tongue",
    alsoKnownAs: ["isdn"],
    usedAtDischarge: true
  },
  {
    genericName: "labetalol",
    commonBrands: ["Labebet"],
    doseForms: "tablet",
    typicalStrengths: "100 mg; 200 mg",
    drugClass: "Alpha/beta-blocker (antihypertensive)",
    plainLanguagePurpose: "lowers blood pressure",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "lactulose",
    commonBrands: ["Duphalac"],
    doseForms: "syrup/solution",
    typicalStrengths: "10 g/15 ml",
    drugClass: "Osmotic laxative",
    plainLanguagePurpose: "softens stools and prevents constipation",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "levofloxacin",
    commonBrands: ["Levoflox", "Glevo"],
    doseForms: "tablet",
    typicalStrengths: "500 mg; 750 mg",
    drugClass: "Antibiotic (fluoroquinolone)",
    plainLanguagePurpose: "antibiotic that kills the germs causing infection",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "levothyroxine",
    commonBrands: ["Thyronorm", "Eltroxin"],
    doseForms: "tablet",
    typicalStrengths: "25 mcg; 50 mcg; 75 mcg; 100 mcg",
    drugClass: "Thyroid hormone",
    plainLanguagePurpose: "thyroid hormone for an underactive thyroid",
    alsoKnownAs: ["thyroxine", "l-thyroxine"],
    usedAtDischarge: true
  },
  {
    genericName: "linagliptin",
    commonBrands: ["Trajenta"],
    doseForms: "tablet",
    typicalStrengths: "5 mg",
    drugClass: "DPP-4 inhibitor (anti-diabetic)",
    plainLanguagePurpose: "keeps your blood sugar under control",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "losartan",
    commonBrands: ["Losar", "Repace"],
    doseForms: "tablet",
    typicalStrengths: "25 mg; 50 mg",
    drugClass: "Angiotensin receptor blocker (ARB)",
    plainLanguagePurpose: "lowers blood pressure",
    alsoKnownAs: ["losartan potassium"],
    usedAtDischarge: true
  },
  {
    genericName: "magnesium sulphate",
    commonBrands: [],
    doseForms: "injection",
    typicalStrengths: "50% w/v",
    drugClass: "Anticonvulsant (eclampsia prophylaxis)",
    plainLanguagePurpose: "injection that prevents fits in pre-eclampsia",
    alsoKnownAs: ["mgso4", "magnesium sulfate"],
    usedAtDischarge: false
  },
  {
    genericName: "metformin",
    commonBrands: ["Glycomet", "Glyciphage"],
    doseForms: "tablet",
    typicalStrengths: "500 mg; 850 mg; 1000 mg",
    drugClass: "Biguanide (anti-diabetic)",
    plainLanguagePurpose: "keeps your blood sugar under control",
    alsoKnownAs: ["metformin hydrochloride"],
    usedAtDischarge: true
  },
  {
    genericName: "metoprolol succinate",
    commonBrands: ["Met XL", "Seloken XL"],
    doseForms: "tablet (extended-release)",
    typicalStrengths: "12.5 mg; 25 mg; 50 mg",
    drugClass: "Beta-blocker",
    plainLanguagePurpose: "slows the heart rate and protects the heart",
    alsoKnownAs: ["metoprolol er", "metoprolol xl", "metoprolol"],
    usedAtDischarge: true
  },
  {
    genericName: "metronidazole",
    commonBrands: ["Flagyl", "Metrogyl"],
    doseForms: "tablet",
    typicalStrengths: "400 mg",
    drugClass: "Antibiotic (nitroimidazole)",
    plainLanguagePurpose: "antibiotic for infection in the belly",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "montelukast",
    commonBrands: ["Montair"],
    doseForms: "tablet",
    typicalStrengths: "10 mg",
    drugClass: "Leukotriene receptor antagonist",
    plainLanguagePurpose: "helps prevent asthma attacks",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "mupirocin",
    commonBrands: ["T-Bact"],
    doseForms: "ointment",
    typicalStrengths: "2%",
    drugClass: "Topical antibiotic",
    plainLanguagePurpose: "antibiotic ointment for the wound",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "nifedipine",
    commonBrands: ["Nicardia Retard"],
    doseForms: "tablet (sustained-release)",
    typicalStrengths: "10 mg; 20 mg",
    drugClass: "Calcium-channel blocker (antihypertensive)",
    plainLanguagePurpose: "lowers blood pressure",
    alsoKnownAs: ["nifedipine sr", "nifedipine retard"],
    usedAtDischarge: true
  },
  {
    genericName: "ondansetron",
    commonBrands: ["Emeset", "Ondem"],
    doseForms: "tablet; orally disintegrating tablet",
    typicalStrengths: "4 mg",
    drugClass: "Anti-emetic",
    plainLanguagePurpose: "stops nausea and vomiting",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "oxytocin",
    commonBrands: [],
    doseForms: "injection",
    typicalStrengths: "10 IU",
    drugClass: "Uterotonic",
    plainLanguagePurpose: "injection that helps the womb contract after delivery",
    alsoKnownAs: [],
    usedAtDischarge: false
  },
  {
    genericName: "pantoprazole",
    commonBrands: ["Pan", "Pantocid"],
    doseForms: "tablet",
    typicalStrengths: "40 mg",
    drugClass: "Proton-pump inhibitor (antacid)",
    plainLanguagePurpose: "reduces stomach acid and protects the stomach",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "paracetamol",
    commonBrands: ["Dolo", "Crocin", "Calpol"],
    doseForms: "tablet",
    typicalStrengths: "500 mg; 650 mg",
    drugClass: "Analgesic / antipyretic",
    plainLanguagePurpose: "relieves pain and fever",
    alsoKnownAs: ["acetaminophen", "pcm"],
    usedAtDischarge: true
  },
  {
    genericName: "piperacillin + tazobactam",
    commonBrands: [],
    doseForms: "injection",
    typicalStrengths: "4.5 g",
    drugClass: "Antibiotic (injectable)",
    plainLanguagePurpose: "injectable antibiotic",
    alsoKnownAs: ["pip-taz", "piptaz"],
    usedAtDischarge: false
  },
  {
    genericName: "potassium chloride",
    commonBrands: [],
    doseForms: "IV infusion",
    typicalStrengths: "15% w/v",
    drugClass: "Electrolyte replacement",
    plainLanguagePurpose: "potassium given through a drip",
    alsoKnownAs: ["kcl"],
    usedAtDischarge: false
  },
  {
    genericName: "prasugrel",
    commonBrands: ["Prasita"],
    doseForms: "tablet",
    typicalStrengths: "10 mg",
    drugClass: "Antiplatelet (P2Y12 inhibitor)",
    plainLanguagePurpose: "thins the blood to prevent clots",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "prednisolone",
    commonBrands: ["Wysolone", "Omnacortil"],
    doseForms: "tablet",
    typicalStrengths: "5 mg; 10 mg; 20 mg; 30 mg; 40 mg",
    drugClass: "Corticosteroid (steroid)",
    plainLanguagePurpose: "steroid that reduces swelling in the airways",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "propranolol",
    commonBrands: ["Ciplar"],
    doseForms: "tablet",
    typicalStrengths: "10 mg; 20 mg; 40 mg",
    drugClass: "Non-selective beta-blocker",
    plainLanguagePurpose: "beta-blocker (can tighten the airways in asthma)",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "pyridoxine",
    commonBrands: [],
    doseForms: "tablet",
    typicalStrengths: "10 mg; 25 mg",
    drugClass: "Vitamin",
    plainLanguagePurpose: "vitamin B6 that prevents nerve side effects of TB medicine",
    alsoKnownAs: ["vitamin b6", "vit b6"],
    usedAtDischarge: true
  },
  {
    genericName: "rabeprazole",
    commonBrands: ["Razo", "Rablet"],
    doseForms: "tablet",
    typicalStrengths: "20 mg",
    drugClass: "Proton-pump inhibitor (antacid)",
    plainLanguagePurpose: "reduces stomach acid and protects the stomach",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "ramipril",
    commonBrands: ["Cardace"],
    doseForms: "tablet/capsule",
    typicalStrengths: "2.5 mg; 5 mg",
    drugClass: "ACE inhibitor",
    plainLanguagePurpose: "lowers blood pressure and protects the heart and kidneys",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "rivaroxaban",
    commonBrands: ["Xarelto"],
    doseForms: "tablet",
    typicalStrengths: "10 mg; 15 mg; 20 mg",
    drugClass: "Anticoagulant (DOAC)",
    plainLanguagePurpose: "thins the blood to prevent clots",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "rosuvastatin",
    commonBrands: ["Rosuvas", "Rozavel"],
    doseForms: "tablet",
    typicalStrengths: "10 mg; 20 mg; 40 mg",
    drugClass: "Statin (lipid-lowering)",
    plainLanguagePurpose: "lowers cholesterol and protects the heart and blood vessels",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "sacubitril + valsartan",
    commonBrands: ["Vymada"],
    doseForms: "tablet",
    typicalStrengths: "50 mg (24/26 mg); 100 mg (49/51 mg)",
    drugClass: "ARNI (heart-failure medicine)",
    plainLanguagePurpose: "helps a weak heart pump better and lowers blood pressure",
    alsoKnownAs: ["sacubitril/valsartan", "sacubitril-valsartan", "arni", "sacubitril", "valsartan"],
    usedAtDischarge: true
  },
  {
    genericName: "salbutamol",
    commonBrands: ["Asthalin"],
    doseForms: "inhaler (MDI)",
    typicalStrengths: "100 mcg/puff",
    drugClass: "Reliever bronchodilator",
    plainLanguagePurpose: "reliever inhaler that opens the airways quickly when you are breathless",
    alsoKnownAs: ["albuterol"],
    usedAtDischarge: true
  },
  {
    genericName: "sitagliptin",
    commonBrands: ["Januvia", "Istavel"],
    doseForms: "tablet",
    typicalStrengths: "50 mg; 100 mg",
    drugClass: "DPP-4 inhibitor (anti-diabetic)",
    plainLanguagePurpose: "keeps your blood sugar under control",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "spironolactone",
    commonBrands: ["Aldactone"],
    doseForms: "tablet",
    typicalStrengths: "25 mg",
    drugClass: "Mineralocorticoid receptor antagonist (diuretic)",
    plainLanguagePurpose: "helps a weak heart and removes extra water",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "tamsulosin",
    commonBrands: ["Urimax", "Veltam"],
    doseForms: "capsule",
    typicalStrengths: "0.4 mg",
    drugClass: "Alpha-blocker (for prostate)",
    plainLanguagePurpose: "helps urine flow in prostate enlargement",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "telmisartan",
    commonBrands: ["Telma"],
    doseForms: "tablet",
    typicalStrengths: "20 mg; 40 mg; 80 mg",
    drugClass: "Angiotensin receptor blocker (ARB)",
    plainLanguagePurpose: "lowers blood pressure",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "ticagrelor",
    commonBrands: ["Brilinta", "Axcer"],
    doseForms: "tablet",
    typicalStrengths: "90 mg",
    drugClass: "Antiplatelet (P2Y12 inhibitor)",
    plainLanguagePurpose: "thins the blood to prevent clots",
    alsoKnownAs: [],
    usedAtDischarge: true
  },
  {
    genericName: "timolol",
    commonBrands: ["Iotim"],
    doseForms: "eye drops",
    typicalStrengths: "0.5%",
    drugClass: "Beta-blocker eye drop (glaucoma)",
    plainLanguagePurpose: "eye drop that lowers pressure inside the eye (glaucoma)",
    alsoKnownAs: ["timolol maleate"],
    usedAtDischarge: true
  },
  {
    genericName: "tiotropium",
    commonBrands: ["Tiova"],
    doseForms: "rotacap (inhalation capsule); inhaler",
    typicalStrengths: "18 mcg",
    drugClass: "Long-acting bronchodilator (LAMA)",
    plainLanguagePurpose: "daily inhaler that keeps the airways open",
    alsoKnownAs: ["tiotropium bromide"],
    usedAtDischarge: true
  },
  {
    genericName: "torsemide",
    commonBrands: ["Dytor"],
    doseForms: "tablet",
    typicalStrengths: "10 mg; 20 mg",
    drugClass: "Loop diuretic ('water pill')",
    plainLanguagePurpose: "removes extra water from the body by making you pass more urine",
    alsoKnownAs: ["torasemide"],
    usedAtDischarge: true
  },
  {
    genericName: "tramadol",
    commonBrands: ["Contramal"],
    doseForms: "tablet/capsule",
    typicalStrengths: "50 mg",
    drugClass: "Opioid analgesic",
    plainLanguagePurpose: "strong painkiller, only if the pain is severe",
    alsoKnownAs: ["tramadol hydrochloride"],
    usedAtDischarge: true
  },
  {
    genericName: "vildagliptin",
    commonBrands: ["Galvus", "Jalra"],
    doseForms: "tablet",
    typicalStrengths: "50 mg",
    drugClass: "DPP-4 inhibitor (anti-diabetic)",
    plainLanguagePurpose: "keeps your blood sugar under control",
    alsoKnownAs: [],
    usedAtDischarge: true
  }
];

function normStr(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9\+\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Fast lookup helper to match any brand, generic or synonym to the formulary record
 */
function lookupFormularyDrug(nameOrText) {
  if (!nameOrText || typeof nameOrText !== 'string') return null;
  const clean = normStr(nameOrText);
  if (!clean) return null;

  for (const item of FORMULARY) {
    // 1. Generic exact or included
    const nGen = normStr(item.genericName);
    if (nGen && clean.includes(nGen)) return item;

    // 2. Common brands
    for (const b of item.commonBrands) {
      const nb = normStr(b);
      if (nb && clean.includes(nb)) return item;
    }

    // 3. Synonyms
    for (const syn of item.alsoKnownAs) {
      const nsyn = normStr(syn);
      if (nsyn && clean.includes(nsyn)) return item;
    }
  }
  return null;
}

module.exports = {
  FORMULARY,
  lookupFormularyDrug
};
