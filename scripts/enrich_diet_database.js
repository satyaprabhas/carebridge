/**
 * CareBridge Clinical Nutrition Database Enricher
 * Populates all 271 conditions with rich, clinically differentiated Indian whole foods,
 * precise medical rationales, and clinical diagnosis abbreviations.
 */

const fs = require('fs');
const path = require('path');

// 1. Clinical Domain Protocols
const CLINICAL_DOMAINS = {
  maternal_gynae: {
    domainName: 'Maternal, Postpartum & Gynaecological Recovery',
    eat: [
      { food: "Methi (Fenugreek) Water & Methi Paratha", reason: "Stimulates prolactin for milk production, accelerates uterine involution, and reduces post-delivery inflammation." },
      { food: "Gond & Dry Fruit Halwa / Ladoo (in moderate pure ghee)", reason: "Traditional postpartum stamina booster that promotes pelvic floor, back muscle, and tissue recovery." },
      { food: "Steamed Lauki (Bottle Gourd) & Turai Stew", reason: "Provides cooling, gentle hydration that prevents painful post-cesarean constipation without straining stitches." },
      { food: "Tender Coconut Water (Nariyal Pani)", reason: "Restores vital maternal electrolytes lost during delivery and postpartum fluid shifts." },
      { food: "Moong Dal Khichdi with Roasted Jeera", reason: "Easily digestible complete protein that prevents maternal gastric bloating and gas accumulation." },
      { food: "Ragi (Finger Millet) Porridge / Ambali", reason: "Exceptional source of bioavailable calcium and iron to support breast milk composition and rebuild maternal bone density." },
      { food: "Boiled Egg Whites & Fresh Paneer Bhurji", reason: "Supplies essential amino acids (albumin) that accelerate surgical incision healing and pelvic tissue repair." },
      { food: "Spinach & Moringa (Drumstick) Leaf Soup", reason: "Replenishes iron and folate reserves depleted through delivery blood loss and lochia discharge." },
      { food: "Garlic Dal & Garlic Infused Cow's Milk", reason: "Natural galactagogue that enhances breast milk supply while preventing maternal intestinal gas." },
      { food: "Soaked Almonds & Walnuts (4-5 daily)", reason: "Supplies omega-3 fatty acids essential for neonatal brain development via breast milk." },
      { food: "Warm Saunf (Fennel) & Ajwain Water", reason: "Relieves post-operative gas, reduces maternal abdominal distension, and helps soothe infant colic." },
      { food: "Stewed Apples & Ripe Papaya", reason: "Soluble pectin and gentle digestive enzymes promote smooth bowel movements without abdominal straining." }
    ],
    limit: [
      { food: "Heavy Ghee-Laden Sweets & Panjiri", reason: "Excess saturated fats can cause digestive sluggishness and excessive weight gain; keep to moderate spoonfuls." },
      { food: "Full-Fat Buffalo Milk", reason: "Heavy fat content can cause indigestion; prefer light, warm cow's milk." },
      { food: "Strong Filter Coffee & Black Tea", reason: "Caffeine transfers into breast milk, causing newborn restlessness, colic, and insomnia." },
      { food: "Heavy Legumes (Whole Rajma, Chana, Urad)", reason: "Ferments in maternal intestines, producing gas and painful abdominal pressure near incision sites." }
    ],
    avoid: [
      { food: "Deep-Fried Snacks (Samosa, Pakora, Murukku)", reason: "Oxidized fats trigger acute acid reflux, slow gut motility, and delay wound healing." },
      { food: "Hot Red Chili Powder & Raw Green Chilies", reason: "Irritates postpartum gut mucosa and may trigger gastric distress and loose stools in breastfed infants." },
      { food: "Carbonated Sodas & Sparkling Water", reason: "Carbonic gas traps under the diaphragm, provoking sharp referred pain near the surgical wound." },
      { food: "Alcohol & Nicotine (Strict Prohibition)", reason: "Passes directly into breast milk, impairs neonatal neurological development, and retards incision regeneration." },
      { food: "Skipping Adequate Hydration", reason: "Dehydration leads to hard stools and severe straining that stresses pelvic sutures." }
    ]
  },

  cardiovascular: {
    domainName: 'Cardiovascular Health & Post-Cardiac Recovery (CABG, CAD, Stents)',
    eat: [
      { food: "Garlic Infused Warm Water & Crushed Garlic", reason: "Contains allicin which reduces vascular inflammation, inhibits platelet aggregation, and lowers LDL cholesterol." },
      { food: "Steel-Cut Oats with Roasted Flaxseeds", reason: "Beta-glucan soluble fiber binds bile acids in the gut, effectively reducing systemic serum cholesterol." },
      { food: "Boiled Beetroot & Carrot Soup / Salad", reason: "Natural dietary nitrates convert to nitric oxide, dilating coronary arteries and lowering cardiac workload." },
      { food: "Tender Lauki (Bottle Gourd) & Ridge Gourd Stew", reason: "Cardio-safe vegetable with virtually zero saturated fat and high water content, aiding fluid balance." },
      { food: "Sprouted Green Moong & Methi Sprouts", reason: "Potassium and magnesium rich plant protein that regulates cardiac rhythm without sodium retention." },
      { food: "Walnuts & Almonds (4-5 soaked daily)", reason: "Alpha-linolenic acid (ALA) and arginine enhance endothelial function and protect bypass grafts." },
      { food: "Fresh Low-Fat Cow's Milk Curd / Majjiga", reason: "Supplies essential calcium and probiotic cultures without atherogenic saturated animal fats." },
      { food: "Pomegranate (Anar) & Fresh Jamun", reason: "Potent polyphenols protect arterial endothelium and stent surfaces from lipid peroxidation." },
      { food: "Boiled Egg Whites (Albumin)", reason: "Pure lean protein required for sternal bone and incision healing following bypass surgery without cholesterol." },
      { food: "Steamed Rohu / Hilsa (Fish) or Soybean", reason: "High in cardioprotective Omega-3 fatty acids that lower elevated serum triglycerides." },
      { food: "Fenugreek (Methi) Dal & Leaves", reason: "Stabilizes lipid profiles and blunts post-prandial glycemic-cardiac metabolic stress." },
      { food: "Warm Water with Lemon & Jeera", reason: "Assists mild natural diuresis, cleanses palate, and prevents post-meal vascular fullness." }
    ],
    limit: [
      { food: "Whole Egg Yolks", reason: "Limit to 1-2 per week; contains high dietary cholesterol." },
      { food: "Cooking Oils (Mustard/Olive)", reason: "Limit strictly to 2-3 teaspoons per day; avoid repeated heating or frying." },
      { food: "Cottage Cheese (Paneer)", reason: "Consume only low-fat homemade paneer; limit portion size to 50g." },
      { food: "Strong Coffee & Energy Drinks", reason: "Excess caffeine elevates sympathetic tone, increases heart rate, and may trigger arrhythmias." }
    ],
    avoid: [
      { food: "Grapefruit & Fresh Grapefruit Juice", reason: "STRICT DRUG INTERACTION: Irreversibly inhibits CYP3A4, causing toxic blood levels of Statins (Atorvastatin/Rosuvastatin)." },
      { food: "Butter, Vanaspati, Dalda & Excess Ghee", reason: "High saturated and trans fats accelerate coronary artery restenosis and bypass graft blockage." },
      { food: "Pickles (Achar), Papads, Namkeen & Salted Nuts", reason: "Extreme sodium concentration induces vascular fluid retention, spiking arterial blood pressure." },
      { food: "Deep-Fried Fast Foods (Bhature, Samosas, Vadas)", reason: "Thermally oxidized oils produce dangerous free radicals and promote coronary plaque instability." },
      { food: "Processed Sausages, Red Meat & Mutton", reason: "Dense in saturated fats and nitrates that strain myocardial oxygen delivery." },
      { food: "Alcohol & Cigarette Smoking (Absolute Prohibition)", reason: "Induces coronary vasospasms, elevates blood pressure, and destabilizes vascular endothelium." }
    ]
  },

  hypertension: {
    domainName: 'Hypertension & Blood Pressure Regulation',
    eat: [
      { food: "Fresh Tender Coconut Water", reason: "Abundant natural potassium (approx. 600mg/cup) balances sodium levels and reduces vascular peripheral resistance." },
      { food: "Steamed Ridge Gourd (Beerakaya) & Snake Gourd", reason: "High moisture, virtually sodium-free vegetables that support natural kidney filtration and diuresis." },
      { food: "Garlic & Coriander Clear Vegetable Broth", reason: "Bioactive allicin and coriandrol relax vascular smooth muscle, promoting arterial vasodilation." },
      { food: "Boiled Beetroot & Spinach (Palak)", reason: "Dietary nitrates convert to endothelial nitric oxide, proven to lower both systolic and diastolic blood pressure." },
      { food: "Ragi (Finger Millet) & Jowar Rotis", reason: "Potassium and magnesium rich complex grains supporting arterial elasticity and steady blood flow." },
      { food: "Skimmed Milk Dahi & Unsalted Majjiga (Buttermilk)", reason: "Bioactive milk peptides and calcium naturally inhibit angiotensin-converting enzymes." },
      { food: "Ripe Bananas & Guava", reason: "High natural potassium counters cellular sodium retention and relaxes arterial wall tension." },
      { food: "Soaked Flaxseeds & Pumpkin Seeds", reason: "Magnesium rich seeds that regulate vascular tone and prevent smooth muscle spasms." },
      { food: "Moong Dal with Turmeric & Roasted Jeera", reason: "Clean plant-based protein free from inflammatory saturated animal fats." },
      { food: "Amla (Indian Gooseberry) Juice with Warm Water", reason: "Concentrated vitamin C and polyphenols strengthen capillary integrity and reduce oxidative stress." },
      { food: "Steamed Bottle Gourd (Lauki) Sabzi", reason: "Assists natural fluid balance and flushes excess sodium through gentle kidney filtration." },
      { food: "Soaked Walnuts (3-4 halves daily)", reason: "Omega-3 fatty acids improve arterial compliance and dampen sympathetic nervous activity." }
    ],
    limit: [
      { food: "Natural Table Salt (Sodium Chloride)", reason: "Strictly restrict total salt intake to under 1/2 teaspoon (< 2 grams of sodium) per day." },
      { food: "Tea and Filter Coffee", reason: "Limit to 1 small cup; caffeine triggers acute, temporary arterial vasoconstriction." },
      { food: "Cashews & Coconut Gravies", reason: "High caloric density and saturated fats may worsen metabolic vascular resistance." },
      { food: "Bakery Biscuits & White Bread", reason: "Contains hidden sodium bicarbonate and refined flours that elevate blood pressure." }
    ],
    avoid: [
      { food: "Potassium Salt Substitutes (Lite Salt / Lona Salt)", reason: "STRICT DRUG WARNING: If taking ACE inhibitors (Ramipril, Enalapril) or ARBs (Telmisartan), causes fatal hyperkalemia." },
      { food: "Pickles (Achar), Papads, Chutneys with Salt", reason: "Massive salt loading causes acute fluid retention, straining arterial walls and kidneys." },
      { food: "Salted Butter, Processed Cheese & Salted Chips", reason: "High sodium directly elevates intravascular volume, causing dangerous blood pressure surges." },
      { food: "Instant Noodles, Canned Soups & Ready-Mix Gravies", reason: "Loaded with monosodium glutamate (MSG) and excessive preservative sodium." },
      { food: "Alcohol & Nicotine (Strict Prohibition)", reason: "Stimulates adrenergic receptors, leading to chronic arterial stiffening and hypertensive crises." }
    ]
  },

  diabetes: {
    domainName: 'Diabetes Mellitus & Glycemic Management (Type 1, Type 2, Gestational)',
    eat: [
      { food: "Karela (Bitter Gourd) Juice / Steamed Karela", reason: "Contains charantin, vicine, and polypeptide-p that mimic endogenous insulin to lower plasma glucose." },
      { food: "Methi (Fenugreek) Seed Water & Methi Leaves", reason: "4-hydroxyisoleucine stimulates glucose-dependent insulin secretion and retards glucose absorption." },
      { food: "Jamun (Indian Blackberry) & Guava", reason: "Very low glycemic index; contains jamboline which retards the diastatic conversion of starch into sugar." },
      { food: "Jowar, Bajra & Ragi Multi-Millet Rotis", reason: "High-fiber complex carbohydrates prevent rapid post-prandial glucose surges and sustain satiety." },
      { food: "Sprouted Green Moong & Kala Chana", reason: "Soluble viscous fiber slows down enzymatic breakdown and absorption of carbohydrates in the small intestine." },
      { food: "Cinnamon (Dalchini) Infused Warm Water", reason: "Improves cellular insulin sensitivity, facilitating glucose uptake into skeletal muscle cells." },
      { food: "Palak (Spinach), Bathua & Methi Leaves", reason: "Rich in alpha-lipoic acid, which neutralizes free radicals and eases diabetic peripheral neuropathy." },
      { food: "Soaked Almonds & Walnuts (1 hand)", reason: "Monounsaturated fats and magnesium blunt post-prandial glycemic spikes and protect coronary vessels." },
      { food: "Flaxseed Powder (Alsi) in Warm Water / Dal", reason: "Lignans and mucilaginous fiber delay gastric emptying and flatten the blood sugar curve." },
      { food: "Boiled Egg Whites & Low-Fat Paneer", reason: "Zero glycemic index protein that provides essential amino acids without triggering blood glucose spikes." },
      { food: "Amla & Haldi (Turmeric) Drink", reason: "Curcumin and bioflavonoids protect pancreatic beta cells from ongoing glucotoxic damage." },
      { food: "Steamed Ridge Gourd & Lauki", reason: "Minimal glycemic load with high hydration, assisting steady glycemic control." }
    ],
    limit: [
      { food: "White Polished Rice", reason: "Limit strictly to 1 small cup; high glycemic index causes sharp post-meal blood sugar surges." },
      { food: "Sweet Fruits (Mango, Chiku, Grapes, Custard Apple)", reason: "Dense in simple sugars (fructose/glucose); consume only small, occasional slices." },
      { food: "Potatoes, Arbi (Colocasia) & Sweet Potatoes", reason: "High starch tubers that rapidly convert into glucose; substitute with fiber-rich gourds." },
      { food: "Whole Cow's Milk", reason: "Limit to 1 cup skimmed milk daily; lactose contributes to the total daily carbohydrate budget." }
    ],
    avoid: [
      { food: "White Sugar, Jaggery (Gur), Honey & Syrups", reason: "Concentrated simple sugars cause immediate, dangerous hyperglycemic spikes." },
      { food: "Indian Sweets (Gulab Jamun, Laddu, Halwa, Jalebi)", reason: "Dangerous combination of refined sucrose and trans fats triggers severe insulin resistance." },
      { food: "Packaged Fruit Juices & Carbonated Soft Drinks", reason: "Liquid fructose bypasses satiety regulation, rapidly elevates blood sugar, and accumulates liver fat." },
      { food: "Refined Wheat Flour (Maida, Naan, White Bread)", reason: "Devoid of fiber; rapid carbohydrate absorption accelerates microvascular and kidney complications." },
      { food: "Deep-Fried Savories (Samosa, Pakoda, Murukku)", reason: "Induces delayed severe post-prandial insulin resistance and worsens diabetic dyslipidemia." }
    ]
  },

  febrile_infectious: {
    domainName: 'Febrile Illness & Infection Recovery (Dengue, Typhoid, Malaria, Pyrexia)',
    eat: [
      { food: "Papaya Leaf Extract & Fresh Ripe Papaya", reason: "Proven to stimulate megakaryocytes in bone marrow, accelerating platelet recovery in Dengue fever." },
      { food: "Tender Coconut Water (Nariyal Pani)", reason: "Rapidly restores potassium, sodium, and intracellular water depleted by high fever and sweating." },
      { food: "Pomegranate (Anar) Fresh Juice", reason: "Bioavailable iron and polyphenols stimulate bone marrow reticulocytes, fighting infection fatigue." },
      { food: "Warm Moong Dal Khichdi with Pure Ghee Drops", reason: "Easily digestible energy and amino acid source gentle on inflamed stomach and liver." },
      { food: "Warm Vegetable Shorba & Clear Chicken Soup", reason: "Provides hydrating fluid, electrolytes, and light peptides without demanding heavy digestive effort." },
      { food: "Kiwi Fruit & Fresh Guava", reason: "High concentrations of Vitamin C activate leukocyte phagocytosis, speeding up infection clearance." },
      { food: "Diluted Mosambi (Sweet Lime) Juice (Room Temp)", reason: "Replenishes hepatic glycogen reserves depleted by prolonged fever without irritating throat." },
      { food: "Fresh Majjiga (Thin Buttermilk) with Roasted Jeera", reason: "Cooling natural probiotic that restores healthy gut flora damaged by aggressive antibiotics." },
      { food: "Steamed Lauki (Bottle Gourd) & Pumpkin Mash", reason: "Provides gentle, non-irritating dietary fiber that prevents toxin stasis in sluggish intestines." },
      { food: "Stewed Apples with Cinnamon", reason: "Pectin creates a protective barrier over intestinal mucosa, crucial in Typhoid to prevent bowel ulceration." },
      { food: "Tulsi & Fresh Ginger Herbal Tea (Warm)", reason: "Natural antimicrobial and antipyretic phytonutrients that soothe throat and ease body chills." },
      { food: "Boiled Egg White (Soft Mashed)", reason: "Supplies pure albumin to restore immunoglobulins without straining sluggish febrile digestion." }
    ],
    limit: [
      { food: "Chilled Dairy Milk", reason: "Fever temporarily reduces brush-border lactase enzyme; can cause nausea, cramps, and diarrhea." },
      { food: "Raw Vegetable Salads & Unpeeled Fruits", reason: "High risk of secondary microbial contamination; all food must be thoroughly boiled or peeled." },
      { food: "Black Tea & Coffee", reason: "Diuretic caffeine accelerates dehydration and exacerbates feverish dryness and headaches." },
      { food: "Whole Millets & Coarse Grains", reason: "Rough fiber can mechanically irritate inflamed intestinal walls, especially during Typhoid recovery." }
    ],
    avoid: [
      { food: "Aspirin & NSAID-Containing Cold Remedies", reason: "STRICT WARNING in Dengue: Inhibits platelets and induces severe gastrointestinal hemorrhaging." },
      { food: "Spicy, Oily & Fried Curries", reason: "Severely burdens an already inflamed liver and digestive tract during systemic infection." },
      { food: "Street Food, Cut Fruits & Unboiled Tap Water", reason: "High danger of secondary Salmonella, Amoebic, or Hepatitis coinfections." },
      { food: "Heavy Red Meat & Mutton", reason: "Difficult to digest; diverts cellular energy away from immune antibody production." },
      { food: "Carbonated Colas & Chilled Sodas", reason: "High osmotic sugar triggers gastrointestinal spasms and worsens systemic dehydration." }
    ]
  },

  renal_urology: {
    domainName: 'Renal & Urological Health (Kidney Stones, CKD, UTI, Dialysis)',
    eat: [
      { food: "Barley Water (Jau Ka Pani)", reason: "Potent natural diuretic that flushes urinary passages, clears gravel, and dissolves micro-calculi." },
      { food: "Tender Coconut Water (For Stones & UTI)", reason: "Alkalinizes urine and flushes urinary tract. (NOTE: Restrict if diagnosed with advanced CKD with high potassium)." },
      { food: "Steamed Lauki (Bottle Gourd) & Ridge Gourd", reason: "High moisture, low-oxalate, alkaline vegetables that inhibit calcium oxalate stone crystallization." },
      { food: "Unsweetened Cranberry Juice / Diluted Amla Juice", reason: "Proanthocyanidins prevent uropathogenic E. coli from adhering to urothelial bladder walls." },
      { food: "Boiled Moong Dal (Diluted)", reason: "Controlled, high-biological-value plant protein that minimizes blood urea nitrogen (BUN) waste accumulation." },
      { food: "Steamed White Rice & Poha", reason: "Low-phosphorus, low-potassium, clean carbohydrate energy gentle on impaired glomerular filtration." },
      { food: "Ripe Papaya, Apples & Pears", reason: "Low to moderate potassium fruits that do not overload compromised renal clearance." },
      { food: "Boiled Cabbage, Cauliflower & Bottle Gourd (Leached)", reason: "Leaching removes excess potassium and phosphorus, protecting against renal cardiac risks." },
      { food: "Boiled Egg Whites (Albumin)", reason: "Pure low-phosphorus protein that maintains serum albumin without generating excessive nitrogenous toxins." },
      { food: "Fresh Lemon Water (Warm)", reason: "Natural urinary citrate binds to calcium, preventing the precipitation of calcium oxalate kidney stones." },
      { food: "Coriander & Cumin Seed Decoction", reason: "Cools dysuria (burning sensation), relieves bladder spasms, and clears urinary toxins." },
      { food: "Cucumber & Snake Gourd (Peeled)", reason: "Gentle natural hydrator with minimal oxalate content, reducing urinary specific gravity." }
    ],
    limit: [
      { food: "Table Salt (Sodium)", reason: "Must strictly limit to < 1.5 grams daily to prevent edema, fluid overload, and renal hypertension." },
      { food: "Heavy Pulses (Rajma, Chana, Urad)", reason: "Excess dietary protein increases glomerular hyperfiltration and accelerates kidney function loss." },
      { food: "Dairy Milk & Paneer", reason: "High phosphorus content can cause renal osteodystrophy and dangerous vascular calcification." },
      { food: "Nuts (Almonds, Cashews, Peanuts)", reason: "Dense in oxalates and phosphorus; consume only in strictly limited quantities if cleared." }
    ],
    avoid: [
      { food: "High-Oxalate Foods (Spinach/Palak, Beetroot, Tomatoes, Dark Chocolate)", reason: "Directly precipitates with urinary calcium to form dangerous calcium oxalate kidney stones." },
      { food: "Pickles, Papads, Processed Cheese & Canned Foods", reason: "Severe sodium content triggers periorbital edema, pulmonary fluid buildup, and hypertension." },
      { food: "High-Potassium Foods (Bananas, Mangoes, Oranges - in CKD)", reason: "In renal failure: inability to excrete potassium leads to fatal cardiac arrest / ventricular fibrillation." },
      { food: "Red Meat, Mutton, Liver & Seafood", reason: "High purine content breaks down into uric acid, precipitating uric acid kidney stones." },
      { food: "Carbonated Dark Colas", reason: "Loaded with artificial phosphoric acid which leaches bone calcium and promotes kidney stone recurrence." }
    ]
  },

  gastrointestinal: {
    domainName: 'Gastrointestinal & Digestive Recovery (GERD, Gastritis, Appendectomy, Ulcers)',
    eat: [
      { food: "Cold Skimmed Cow's Milk / Fresh Majjiga", reason: "Buffers gastric hydrochloric acid on contact and coats sensitive mucosal lining against heartburn." },
      { food: "Boiled Lauki (Bottle Gourd), Turai & Kaddu (Pumpkin)", reason: "Alkaline, cooling, and easy-to-digest vegetables that soothe inflamed gastric and intestinal mucosa." },
      { food: "Ripe Bananas & Stewed Apples", reason: "Soluble pectin coats the esophageal mucosa and provides a soothing mucosal barrier against acid reflux." },
      { food: "Oatmeal & Dalia Porridge (Light)", reason: "Absorbs excess gastric acid and bile secretions without triggering heavy peristaltic spasms." },
      { food: "Tender Coconut Water (Nariyal Pani)", reason: "Natural alkaline electrolyte fluid that neutralizes excess stomach acidity and hydrates gut." },
      { food: "Moong Dal Khichdi with Roasted Jeera", reason: "Gentle, non-irritating protein and carbohydrate combination that requires minimal gastric churning." },
      { food: "Fennel (Saunf) & Cumin (Jeera) Water", reason: "Relaxes the lower esophageal sphincter, dispels trapped abdominal gas, and relieves bloating." },
      { food: "Fresh Papaya (Ripe)", reason: "Contains the digestive enzyme papain, facilitating effortless breakdown of proteins." },
      { food: "Steamed Idli / Soft Poha", reason: "Fermented, light, zero-oil staple that digests easily without irritating gut stitches or ulcers." },
      { food: "Boiled Egg Whites & Soft Paneer", reason: "Clean, non-acidic protein essential for tissue regeneration after gastrointestinal surgery." },
      { food: "Diluted Aloe Vera Juice (Fresh)", reason: "Clinically proven to accelerate mucosal healing in gastritis, esophagitis, and peptic ulcers." },
      { food: "Clear Moong Shorba & Carrot Soup", reason: "Warm, hydrating fluid that nourishes the body without provoking gastrocolic reflexes." }
    ],
    limit: [
      { food: "Citrus Fruits (Oranges, Lemons, Sweet Lime)", reason: "Citric acid can irritate raw esophageal erosions and active peptic ulcers." },
      { food: "Tea, Green Tea & Filter Coffee", reason: "Caffeine stimulates acid secretion and relaxes the esophageal sphincter, triggering acid reflux." },
      { food: "Whole Wheat Roti with Heavy Bran", reason: "Coarse roughage can mechanically irritate healing intestinal incisions or active diverticula." },
      { food: "Whole Legumes (Rajma, Chana)", reason: "Produces excessive methane and hydrogen gas, causing painful abdominal distension." }
    ],
    avoid: [
      { food: "Deep-Fried Snacks (Samosa, Pakora, Vada, Puri)", reason: "High fats delay gastric emptying, forcing acidic stomach contents backwards into the esophagus." },
      { food: "Hot Red Chili Powder, Black Pepper & Garam Masala", reason: "Directly burns inflamed gastric lining, triggering excruciating pain and ulcer relapse." },
      { food: "Tomatoes, Vinegar, Pickles & Tamarind", reason: "Highly acidic foods that lower gastric pH and aggravate chemical mucosal damage." },
      { food: "Carbonated Soft Drinks & Sparkling Water", reason: "Distends the stomach wall, forcing acid reflux into the esophagus and causing suture strain." },
      { food: "Alcohol & Cigarette Smoking (Absolute Prohibition)", reason: "Erodes protective gastric mucosal barrier and drastically increases the risk of ulcer hemorrhage." },
      { food: "Late-Night Heavy Dinners (Within 2 Hours of Sleep)", reason: "Lying supine after eating causes severe nocturnal acid regurgitation into lungs and esophagus." }
    ]
  },

  hepatobiliary_pancreatic: {
    domainName: 'Hepatobiliary & Pancreatic Health (Cholecystectomy, Fatty Liver, Hepatitis)',
    eat: [
      { food: "Steamed Lauki (Bottle Gourd) & Ridge Gourd", reason: "Virtually zero-fat vegetables that place zero digestive burden on bile secretion after gallbladder surgery." },
      { food: "Boiled Moong Dal Khichdi (Zero Tadka)", reason: "Clean, light protein that digests easily without requiring heavy hepatic bile acid secretion." },
      { food: "Fresh Dahi (Curd) & Majjiga from Skimmed Milk", reason: "Probiotics reduce circulating gut endotoxins and support liver detoxification pathways." },
      { food: "Boiled Papaya & Stewed Apples", reason: "Rich in antioxidants that protect hepatocytes and ease intestinal motility without fatty bile demand." },
      { food: "Oatmeal & Dalia (Broken Wheat)", reason: "Soluble fiber absorbs excess free bile acids in the gut, preventing post-cholecystectomy diarrhea." },
      { food: "Tender Coconut Water (Nariyal Pani)", reason: "Provides clean hydration and minerals without requiring pancreatic lipase or bile breakdown." },
      { food: "Boiled Egg Whites (Albumin)", reason: "Lean protein that accelerates hepatic cellular regeneration without supplying saturated fat." },
      { food: "Amla (Indian Gooseberry) Juice", reason: "Potent hepatoprotective antioxidant that enhances glutathione levels in liver parenchyma." },
      { food: "Warm Cumin (Jeera) & Saunf Decoction", reason: "Aids digestive enzyme production and relieves post-cholecystectomy bile reflux." },
      { food: "Steamed Rice & Soft Idlis", reason: "Easily metabolized carbohydrate energy that spares liver glycogen reserves." },
      { food: "Spinach (Palak) & Methi Soup (Steamed)", reason: "Supplies chlorophyll and folate to facilitate Phase 2 liver detoxification." },
      { food: "Crushed Raw Garlic (1 small clove in warm water)", reason: "Allicin activates liver enzymes that assist in clearing systemic metabolic toxins." }
    ],
    limit: [
      { food: "Vegetable Cooking Oils", reason: "Must strictly limit to under 1-2 teaspoons per day; post-cholecystectomy gut cannot absorb large oil boluses." },
      { food: "Egg Yolks & Cottage Cheese (Paneer)", reason: "Contains concentrated fats that trigger nausea, fatty stools, and abdominal cramping." },
      { food: "Full-Cream Cow's Milk", reason: "Heavy fat content demands bile; prefer skimmed cow's milk or toned varieties." },
      { food: "Nuts (Cashews, Peanuts, Walnuts)", reason: "High oil density can provoke diarrhea and right upper quadrant abdominal discomfort." }
    ],
    avoid: [
      { food: "Deep-Fried Foods (Bhature, Samosas, Pakoras, Vada)", reason: "Causes acute post-cholecystectomy bile-dumping diarrhea, severe cramps, and nausea." },
      { food: "Ghee, Butter, Dalda & Vanaspati", reason: "Overwhelms liver and pancreas; can precipitate acute pancreatitis attacks." },
      { food: "Mutton, Beef, Pork & Fatty Poultry", reason: "Dense saturated animal fats overload liver lipid clearance and exacerbate steatohepatitis." },
      { food: "Alcohol (Strict Absolute Prohibition)", reason: "Direct hepatotoxin that accelerates liver fibrosis, cirrhosis, and fatal pancreatic necrosis." },
      { food: "Commercial Bakery Pastries & Cream Cakes", reason: "Combines trans-fats with high fructose corn syrup, directly worsening fatty liver (NAFLD)." }
    ]
  },

  orthopedic_spine: {
    domainName: 'Orthopedic & Spine Recovery (Fractures, TKR, THR, Spine Surgery, Gout)',
    eat: [
      { food: "Ragi (Finger Millet) Dosa, Mudde & Porridge", reason: "Exceptional natural calcium density (> 340mg/100g) that accelerates fracture callus formation and bone fusion." },
      { food: "Low-Fat Paneer & Fresh Dahi (Curd)", reason: "Supplies bioavailable calcium and phosphorus required for osteoblastic bone remineralization." },
      { food: "Boiled Egg Whites & Lean Fish / Moong Dal", reason: "Supplies glycine and proline amino acids vital for collagen matrix, tendon, and ligament repair." },
      { food: "Vitamin C Rich Foods (Amla, Guava, Kiwi)", reason: "Indispensable co-factor for collagen triple-helix hydroxylation and bone matrix crosslinking." },
      { food: "Haldi Doodh (Warm Milk with Turmeric & Pepper)", reason: "Curcumin acts as a natural COX-2 inhibitor, reducing post-operative joint effusion and pain." },
      { food: "Soaked Almonds & White Sesame Seeds (Til)", reason: "Rich in zinc, magnesium, and boron which regulate osteoblastic calcium deposition." },
      { food: "Moringa (Drumstick) Soup & Leaves", reason: "High bioavailable mineral concentration supporting joint cartilage integrity and synovial fluid." },
      { food: "Prunes, Ripe Papaya & Bananas", reason: "Prevents severe post-operative constipation caused by immobility and narcotic pain medications." },
      { food: "Steamed Lauki, Turai & Spinach", reason: "Hydrating, alkaline vegetables that buffer systemic acidity and reduce inflammation around implants." },
      { food: "Tender Coconut Water (Nariyal Pani)", reason: "Restores potassium and magnesium, preventing painful muscle spasms during physical rehabilitation." },
      { food: "Fresh Cherries & Berry Juice (In Gout / Hyperuricemia)", reason: "Anthocyanins actively reduce serum uric acid levels and suppress painful joint flare-ups." },
      { food: "Dalia & Whole Wheat Khichdi", reason: "Sustained fiber energy that prevents weight gain while bedbound during rehabilitation." }
    ],
    limit: [
      { food: "Table Salt (Sodium Chloride)", reason: "High sodium excretion causes urinary calcium wasting, leaching minerals from healing bones." },
      { food: "Full-Fat Cheese & Processed Dairy", reason: "High in arachidonic acid which worsens inflammatory joint swelling and stiffness." },
      { food: "Black Tea & Coffee", reason: "Limit to 1 cup; polyphenols and caffeine can interfere with intestinal calcium absorption." },
      { food: "Whole Legumes in Gout (Rajma, Chana)", reason: "Moderate purine content; must be controlled in patients suffering from gouty arthritis." }
    ],
    avoid: [
      { food: "High-Purine Foods (Organ Meats, Mutton, Sardines - In Gout)", reason: "CRITICAL: Breaks down into uric acid crystals that deposit into joints, causing agonizing arthritis." },
      { food: "Alcohol & Beer (Strict Prohibition)", reason: "Competes with uric acid excretion and severely impairs microvascular bone fracture healing." },
      { food: "Smoking & Tobacco Products", reason: "Nicotine constricts microvasculature, leading to non-union of bone fractures and implant failure." },
      { food: "Sugary Pastries, Colas & Maida (White Flour)", reason: "Promotes pro-inflammatory cytokines that degrade joint cartilage and delay wound closure." },
      { food: "Deep-Fried Fatty Snacks", reason: "Promotes excess post-operative weight gain, adding mechanical strain to prosthetic knee and hip joints." }
    ]
  },

  respiratory: {
    domainName: 'Respiratory & Pulmonology Health (Asthma, COPD, Pneumonia, Bronchitis)',
    eat: [
      { food: "Ginger, Tulsi & Clove Herbal Kashayam (Warm)", reason: "Relaxes bronchial smooth muscles, acts as an expectorant, and liquefies thick respiratory phlegm." },
      { food: "Golden Turmeric Milk (Haldi Doodh, Warm)", reason: "Curcumin suppresses bronchial mucosal inflammation and reduces airway hyperresponsiveness." },
      { food: "Moringa (Drumstick) Clear Soup with Black Pepper", reason: "Potent anti-inflammatory broth rich in Vitamin C that supports alveolar tissue defense." },
      { food: "Steamed Lauki (Bottle Gourd) & Pumpkin Shorba", reason: "Hydrating, light nutrition that prevents abdominal distension against the diaphragm." },
      { food: "Garlic Sautéed Vegetables (Lehsun)", reason: "Allicin provides broad-spectrum antimicrobial action against secondary bronchial infections." },
      { food: "Ripe Papaya, Guava & Kiwi", reason: "Antioxidants (Vitamin C & carotenoids) protect alveolar capillaries from oxidative smoke/pathogen damage." },
      { food: "Moong Dal Khichdi with Pure Ghee", reason: "Easy to swallow and digest without demanding excessive oxygen consumption during eating." },
      { food: "Soaked Walnuts & Ground Flaxseeds", reason: "Omega-3 fatty acids inhibit leukotrienes that trigger bronchospasm and airway constriction." },
      { food: "Clear Warm Vegetable or Chicken Broth", reason: "Thins viscous pulmonary secretions, allowing productive and effortless coughing." },
      { food: "Stewed Pears with Honey (Warm)", reason: "Soothes irritated tracheal lining and suppresses nocturnal coughing spells." },
      { food: "Tender Coconut Water (Room Temperature)", reason: "Replenishes electrolytes lost through tachypneic breathing and sweating." },
      { food: "Warm Cumin & Ajwain Water", reason: "Prevents intestinal gas from pushing up against the diaphragm and restricting lung capacity." }
    ],
    limit: [
      { food: "Heavy Chilled Dairy Milk & Ice Creams", reason: "Can thicken mucus sensations in the pharynx and trigger reflex throat clearing." },
      { food: "Heavy Gas-Producing Pulses (Rajma, Chana)", reason: "Abdominal bloating elevates the diaphragm, reducing functional residual lung volume." },
      { food: "Cold Refrigerated Foods & Beverages", reason: "Triggers reflex bronchospasm and coughing paroxysms in asthmatic individuals." }
    ],
    avoid: [
      { food: "Ice-Cold Water, Slushes & Refrigerated Sodas", reason: "Immediately provokes thermal airway constriction and bronchial wheezing." },
      { food: "Sulfite-Preserved Foods (Dried Fruits, Packaged Pickles)", reason: "Sulfites release sulfur dioxide, a recognized potent trigger for life-threatening asthma attacks." },
      { food: "Deep-Fried Heavy Meals (Bhature, Samosas)", reason: "Stomach distension severely impedes diaphragmatic excursion, causing acute shortness of breath." },
      { food: "Cigarette Smoke & Passive Inhalation", reason: "Paralyzes respiratory cilia, destroys alveolar walls, and precipitates acute respiratory failure." }
    ]
  },

  neurological: {
    domainName: 'Neurological & Brain Health Recovery (Stroke, Craniotomy, Epilepsy, Neuropathy)',
    eat: [
      { food: "Soaked Walnuts & Flaxseeds Powder", reason: "Rich in docosahexaenoic acid (DHA) and ALA which protect neural myelin sheaths and brain synapses." },
      { food: "Boiled Egg Whites & Steamed Fish / Moong Dal", reason: "Supplies choline and amino acids essential for acetylcholine neurotransmitter synthesis." },
      { food: "Turmeric (Haldi) with Black Pepper in Warm Milk", reason: "Curcumin crosses the blood-brain barrier, exerting neuroprotective and anti-neuroinflammatory actions." },
      { food: "Spinach (Palak) & Drumstick Leaf Soup", reason: "Rich in folate, Vitamin B6, and magnesium which reduce neurotoxic homocysteine levels." },
      { food: "Ripe Bananas & Pomegranate (Anar)", reason: "Potassium and polyphenols maintain neural resting membrane potential and cerebral microcirculation." },
      { food: "Steamed Lauki (Bottle Gourd) & Ridge Gourd", reason: "Hydrating, alkaline vegetables that are easy to swallow (dysphagia-friendly) and prevent straining." },
      { food: "Soft Dalia Porridge & Moong Khichdi", reason: "Smooth texture reduces choking risk in post-stroke patients while providing steady glucose to neurons." },
      { food: "Fresh Curd (Dahi) & Majjiga", reason: "Gut-brain axis probiotics enhance neurotransmitter regulation and improve mood and cognition." },
      { food: "Soaked & Peeled Almonds (Badam)", reason: "Vitamin E acts as a fat-soluble antioxidant protecting brain lipids from peroxidative damage." },
      { food: "Tender Coconut Water (Nariyal Pani)", reason: "Balances sodium and potassium, preventing hyponatremia which can trigger seizures." },
      { food: "Warm Cumin (Jeera) & Saunf Water", reason: "Prevents constipation and abdominal straining that can elevate intracranial pressure (ICP)." },
      { food: "Stewed Apples & Papaya Puree", reason: "Dysphagia-safe soluble fiber supporting smooth bowel movements without Valsalva maneuver." }
    ],
    limit: [
      { food: "Table Salt (Sodium Chloride)", reason: "Must be strictly controlled (< 2g/day) in stroke recovery to prevent recurrence and cerebral edema." },
      { food: "Caffeinated Coffee & Strong Tea", reason: "Excess caffeine lowers seizure threshold and disturbs sleep architecture essential for brain repair." },
      { food: "Coarse, Hard-to-Chew Nuts & Dry Foods", reason: "Presents severe choking/aspiration risk in patients with post-stroke swallowing difficulties." }
    ],
    avoid: [
      { food: "Alcohol & Nicotine (Strict Prohibition)", reason: "Direct neurotoxins that trigger cerebral vasospasms, seizures, and secondary stroke recurrence." },
      { food: "Deep-Fried Fatty Snacks & Trans Fats", reason: "Accelerates carotid atherosclerosis and impairs cerebral capillary perfusion." },
      { food: "Monosodium Glutamate (MSG) & Artificial Sweeteners", reason: "Acts as excitotoxins in sensitized neural tissue, potentially triggering migraines or convulsions." },
      { food: "Straining during Defecation (Valsalva Maneuver)", reason: "Severely spikes intracranial pressure (ICP), posing life-threatening risks post-brain surgery." }
    ]
  },

  oncology: {
    domainName: 'Oncology & Post-Chemo/Radiation Recovery',
    eat: [
      { food: "Warm Moong Dal Soup & Soft Khichdi", reason: "High-protein, bland, easy-to-digest nutrition that does not provoke nausea or mouth sores." },
      { food: "Fresh Soft Paneer & Boiled Egg Whites", reason: "Crucial clean proteins to restore depleted white blood cells (neutrophils) and rebuild muscle mass." },
      { food: "Ginger & Mint Infused Lukewarm Water", reason: "Natural antiemetic gingerols calm chemotherapy-induced nausea and gastric dysmotility." },
      { food: "Tender Coconut Water (Nariyal Pani)", reason: "Replenishes vital electrolytes lost through nausea, vomiting, or diarrhea during treatment." },
      { food: "Pomegranate (Anar) Fresh Juice & Stewed Apples", reason: "Rich in ellagic acid and gentle pectin that soothe mucositis and support hemoglobin." },
      { food: "Steamed Lauki (Bottle Gourd) & Pumpkin Mash", reason: "Gentle, non-irritating vegetable fiber that is soothing for gastrointestinal mucositis." },
      { food: "Curd (Dahi) & Majjiga (At room temperature)", reason: "Probiotics replenish gut microbiome eradicated by intensive chemotherapy regimens." },
      { food: "Amla Juice & Kiwi (Diluted, room temp)", reason: "High Vitamin C and bioflavonoids combat systemic oxidative stress and support tissue repair." },
      { food: "Soaked Almonds (Peeled & Blended)", reason: "Provides concentrated calories, Vitamin E, and healthy fats when appetite is severely diminished." },
      { food: "Dalia Porridge with Carrots", reason: "Provides smooth, easily swallowed calories without abrasive edges that hurt mouth sores." },
      { food: "Turmeric (Haldi) in Warm Water / Soup", reason: "Curcumin helps suppress pro-inflammatory cytokines and promotes cellular repair." },
      { food: "Sweet Lime (Mosambi) Juice (Diluted)", reason: "Hydrates and counters metallic taste in the mouth without sharp acidity." }
    ],
    limit: [
      { food: "Spicy & Hot Spices (Chili, Garam Masala)", reason: "Causes excruciating burning on oral ulcers (mucositis) and inflamed intestinal lining." },
      { food: "Dry, Crusty Breads & Crackers", reason: "Scratches and irritates sensitive mouth sores and throat." },
      { food: "Very Sweet Desserts", reason: "Can trigger immediate nausea and dampens the sense of taste." }
    ],
    avoid: [
      { food: "Raw / Uncooked Vegetables, Salads & Street Food", reason: "CRITICAL DANGER: During neutropenia, minor bacteria on raw produce can cause lethal sepsis." },
      { food: "Unpasteurized Milk & Raw Eggs", reason: "High risk of Salmonella, Listeria, and bacterial infections during immunocompromised states." },
      { food: "Deep-Fried, Greasy & Odorous Foods", reason: "Strong cooking odors and heavy fats trigger intense anticipatory and acute nausea." },
      { food: "Alcohol & Tobacco Products", reason: "Severely toxic to mucosal cells and interferes with chemotherapy drug metabolism." }
    ]
  },

  ent_ophthalmology: {
    domainName: 'ENT, Head & Neck, and Eye Surgery Recovery (Cataract, Tonsillectomy, FESS)',
    eat: [
      { food: "Cool Soft Dalia & Lukewarm Moong Dal Khichdi", reason: "Soft, smooth consistency that glides down throat without scraping surgical beds or elevating facial pressure." },
      { food: "Steamed Lauki (Bottle Gourd) & Ridge Gourd Puree", reason: "Hydrating, alkaline, cooling vegetables that minimize chewing effort and facial muscle tension." },
      { food: "Fresh Room-Temperature Majjiga (Buttermilk)", reason: "Soothes irritated pharyngeal tissues and provides gentle hydration without coughing triggers." },
      { food: "Boiled Egg Whites (Soft Mashed) & Soft Paneer", reason: "High quality protein essential for rapid tissue re-epithelialization in vocal cords, eyes, and sinus mucosa." },
      { food: "Ripe Papaya & Stewed Apple Puree", reason: "Provides gentle vitamins and pectin, ensuring soft stools to prevent dangerous eye-pressure elevation." },
      { food: "Tender Coconut Water (Cool, Not Iced)", reason: "Hydrates mucosal membranes and restores electrolyte balance without provoking coughing." },
      { food: "Clear Moong Shorba & Carrot Soup (Lukewarm)", reason: "Provides micronutrients and fluids without steam that could dilate nasal or ocular capillaries." },
      { food: "Amla Juice (Diluted) & Guava Pulp", reason: "High Vitamin C and lutein supporting collagen synthesis and retinal microvascular health." },
      { food: "Oatmeal Porridge with Skimmed Milk", reason: "Effortless swallowing staple that requires no forceful chewing near jaw and ear structures." },
      { food: "Warm Cumin & Saunf Water", reason: "Prevents post-operative nausea, gas, and abdominal straining." },
      { food: "Soaked Almonds (Peeled & Finely Blended)", reason: "Supplies Vitamin E and zinc for ocular and auditory nerve health without crunchy texture." },
      { food: "Steamed Soft Idli soaked in Dal", reason: "Traditional gentle soft food that protects healing throat incisions." }
    ],
    limit: [
      { food: "Hot Steaming Beverages & Soups", reason: "Heat causes local vasodilation, increasing the risk of secondary bleeding in nose and throat." },
      { food: "Spicy Dishes with Black Pepper or Chili", reason: "Induces sneezing, coughing paroxysms, and nasal congestion that spikes intraocular pressure." },
      { food: "Hard, Crunchy Foods (Chips, Toast, Raw Carrots)", reason: "Sharp edges can tear healing tonsillar or sinus mucosal scabs, causing severe hemorrhage." }
    ],
    avoid: [
      { food: "Straining during Bowel Movements (Valsalva)", reason: "CRITICAL IN CATARACT & EYE SURGERY: Spikes intraocular pressure (IOP), risking wound rupture." },
      { food: "Forceful Sniffling, Blowing Nose, or Gargling", reason: "Dislodges protective blood clots in FESS sinus and tonsillectomy surgical sites." },
      { food: "Alcohol & Smoking (Strict Prohibition)", reason: "Impairs wound healing and coughing caused by smoke leads to severe suture strain." },
      { food: "Carbonated Fizzy Drinks & Sour Tamarind", reason: "Sharp carbonation and acids trigger throat spasms and severe pain in surgical beds." }
    ]
  },

  dermatology: {
    domainName: 'Dermatological Health & Skin Recovery (Eczema, Psoriasis, Wound Healing)',
    eat: [
      { food: "Soaked Flaxseeds & Chia Seeds (Omega-3)", reason: "Inhibits pro-inflammatory prostaglandins (PGE2) and leukotrienes, relieving cutaneous erythema and pruritus." },
      { food: "Steamed Lauki (Bottle Gourd) & Cucumber", reason: "High water content and cooling properties hydrate the stratum corneum from within." },
      { food: "Amla (Indian Gooseberry) & Citrus Fruits", reason: "Concentrated Vitamin C accelerates cross-linking of dermal collagen fibers for wound closure." },
      { food: "Boiled Moong Dal & Sprouted Green Gram", reason: "Clean plant amino acids that promote epithelialization without elevating systemic histamine." },
      { food: "Boiled Egg Whites & Fresh Paneer", reason: "Supplies zinc and bioavailable protein essential for rebuilding healthy skin epidermis." },
      { food: "Fresh Dahi (Curd) & Unsweetened Majjiga", reason: "Supports healthy skin-gut microbiome axis, clinically shown to reduce eczema flare-ups." },
      { food: "Haldi Doodh (Warm Milk with Turmeric)", reason: "Curcumin suppresses inflammatory nuclear factor kappa B (NF-kB), calming psoriasis plaques." },
      { food: "Soaked Walnuts & Almonds", reason: "Rich in Vitamin E and zinc, protecting skin cell membranes from oxidative destruction." },
      { food: "Tender Coconut Water (Nariyal Pani)", reason: "Natural isotonic hydration that prevents epidermal transepidermal water loss." },
      { food: "Boiled Beetroot & Carrot Soup", reason: "Beta-carotene converts to Vitamin A, regulating keratinocyte turnover and skin healing." },
      { food: "Warm Cumin & Coriander Seed Water", reason: "Flushes metabolic toxins through gentle renal excretion, clearing cutaneous irritation." },
      { food: "Papaya & Stewed Pears", reason: "Antioxidant enzymes that support healthy skin cellular renewal." }
    ],
    limit: [
      { food: "Full-Fat Dairy & Processed Cheese", reason: "Can promote acneiform eruptions and systemic inflammation in eczema-prone skin." },
      { food: "Excessive Table Sugar & Sweets", reason: "High glycemic load leads to glycation of skin collagen and fuels cutaneous inflammation." },
      { food: "Fermented Pickles & Strong Spices", reason: "Can provoke histamine release, triggering intense skin itching and erythema." }
    ],
    avoid: [
      { food: "Deep-Fried Savories & Re-used Cooking Oils", reason: "Oxidized lipids trigger systemic inflammation, worsening psoriasis and wound suppurations." },
      { food: "Shellfish, Crustaceans & Preserved Fish", reason: "High risk of heavy histamine release causing acute urticaria (hives) and severe flare-ups." },
      { food: "Alcohol & Cigarette Smoking (Absolute Prohibition)", reason: "Destroys dermal microcirculation, constricts skin capillaries, and retards wound repair." },
      { food: "Artificial Colors & Preservatives", reason: "Common triggers for chronic urticaria, atopic eczema, and allergic skin rashes." }
    ]
  },

  hematology_anemia: {
    domainName: 'Hematological Health & Anemia Recovery (Iron Deficiency, Hemolytic, B12)',
    eat: [
      { food: "Fresh Pomegranate (Anar) & Black Raisins (Munakka)", reason: "Rich source of bioavailable plant iron and copper that stimulates erythropoiesis and elevates hemoglobin." },
      { food: "Moringa (Drumstick) Leaves & Spinach (Palak) Soup", reason: "Dense in natural folate, iron, and chlorophyll to build red blood cell mass." },
      { food: "Boiled Beetroot & Carrot Salad / Soup", reason: "Contains iron and active nitrates that enhance red blood cell oxygen-carrying capacity." },
      { food: "Sprouted Green Moong & Kala Chana (Brown Chickpeas)", reason: "Sprouting multiplies bioavailable Vitamin C, dramatically enhancing non-heme iron absorption." },
      { food: "Boiled Egg Whites & Steamed Lean Meat / Fish", reason: "Supplies heme iron and Vitamin B12, crucial for DNA synthesis in immature erythroblasts." },
      { food: "Amla (Indian Gooseberry) with Jaggery (Gur, small piece)", reason: "Vitamin C in amla maximizes the intestinal absorption of iron from jaggery." },
      { food: "Ragi (Finger Millet) Rotis & Porridge", reason: "High natural iron and calcium grain that restores stamina and combats chronic fatigue." },
      { food: "Fresh Dates (Khajoor) & Dried Figs (Anjeer)", reason: "Traditional hematinic dry fruits packed with iron, potassium, and red blood cell nutrients." },
      { food: "Fresh Curd (Dahi) & Skimmed Milk", reason: "Rich source of Vitamin B12 essential for normal macrocytic red blood cell maturation." },
      { food: "Moong Dal Khichdi with Steamed Vegetables", reason: "Gentle on sluggish anemic digestion while providing steady micronutrient delivery." },
      { food: "Tender Coconut Water (Nariyal Pani)", reason: "Restores electrolyte balance and eases anemic dizziness and orthostatic hypotension." },
      { food: "Stewed Apples with Cinnamon", reason: "Gentle digestive aid that prevents constipation often associated with oral iron therapy." }
    ],
    limit: [
      { food: "Black Tea & Coffee (Near Meals)", reason: "CRITICAL: Tannins and polyphenols bind tightly to dietary iron, preventing intestinal absorption." },
      { food: "Full-Fat Calcium-Rich Milk (With Meals)", reason: "Calcium competes directly with iron for the DMT-1 transporter in the duodenum." },
      { food: "Refined White Flour (Maida)", reason: "Devoid of natural iron and B-vitamins; contributes to sluggish anemic gut motility." }
    ],
    avoid: [
      { food: "Drinking Tea / Coffee within 1 Hour of Iron Tablets", reason: "Completely blocks therapeutic iron absorption, prolonging severe anemia." },
      { food: "Deep-Fried Fatty Junk Food", reason: "Crowds out nutrient-dense meals and impairs absorption of fat-soluble vitamins." },
      { food: "Alcohol & Smoking", reason: "Direct bone marrow suppressant that impairs red blood cell production and folate utilization." },
      { food: "Raw Unwashed Green Vegetables", reason: "Risk of parasitic hookworm infestation which actively causes chronic intestinal blood loss." }
    ]
  },

  general_convalescence: {
    domainName: 'General Convalescence & Balanced Healing Nutrition',
    eat: [
      { food: "Moong Dal Khichdi with Soft Steamed Rice", reason: "Light, easily digestible protein and carbohydrate blend gentle on the healing stomach." },
      { food: "Steamed Lauki (Bottle Gourd) & Turai Stew", reason: "High water content and cooling properties that soothe the digestive tract and prevent constipation." },
      { food: "Fresh Homemade Dahi (Curd) & Majjiga (Buttermilk)", reason: "Probiotics replenish healthy gut flora post-antibiotics and improve nutrient absorption." },
      { food: "Boiled Egg Whites & Soft Fresh Paneer", reason: "Clean lean protein vital for post-operative wound healing, cellular repair, and recovery." },
      { food: "Tender Coconut Water (Nariyal Pani)", reason: "Natural isotonic electrolytes balancing sodium, potassium, and magnesium." },
      { food: "Dalia (Broken Wheat Porridge) with Carrots", reason: "High soluble fiber supporting regular bowel movements during bed rest." },
      { food: "Clear Moong Dal Soup & Vegetable Shorba", reason: "Provides systemic hydration, minerals, and light protein without gut strain." },
      { food: "Ripe Bananas & Stewed Apples", reason: "Natural potassium and gentle pectin fiber that soothe digestive mucosa." },
      { food: "Warm Cumin (Jeera) & Ajwain Water", reason: "Relieves post-surgical gas, abdominal bloating, and post-meal heaviness." },
      { food: "Soaked & Peeled Almonds (4-5 daily)", reason: "Healthy fats and micronutrients supporting immune defense and tissue regeneration." },
      { food: "Steamed Pumpkin (Kaddu) & Beetroot Mash", reason: "Rich in beta-carotene and minerals for tissue recovery and cellular vitality." },
      { food: "Warm Haldi Doodh (Turmeric Cow's Milk)", reason: "Natural anti-inflammatory agent supporting restful sleep and systemic recovery." }
    ],
    limit: [
      { food: "Full-Fat Buffalo Milk & Malai", reason: "Heavy saturated fats slow down stomach emptying; prefer skimmed cow's milk." },
      { food: "Cooking Oil & Heavy Greasy Tadkas", reason: "Limit to 1-2 teaspoons daily; avoid heavy greasy dishes during recovery." },
      { food: "Tea & Filter Coffee", reason: "Limit to 1 small cup; excess caffeine causes dehydration and increases acidity." },
      { food: "Refined Flour (Maida, White Bread)", reason: "Lacks fiber and can induce post-operative constipation." },
      { food: "Raw Crunchy Salads", reason: "Difficult for healing intestines to digest; prefer boiled or steamed vegetables." },
      { food: "Heavy Pulses (Rajma, Chana, Urad)", reason: "Produces gas and abdominal fullness; prefer light moong dal." }
    ],
    avoid: [
      { food: "Deep-Fried Snacks (Samosas, Pakoras, Vada)", reason: "Trans fats and oxidized oils trigger acute indigestion, reflux, and inflammation." },
      { food: "Heavily Spiced & Oily Curries", reason: "Hot red chilies, garam masala, and excess garlic irritate stomach lining." },
      { food: "Pickles (Achar), Papads & Salted Chips", reason: "Extreme sodium concentration increases blood pressure and causes water retention." },
      { food: "Alcohol & Tobacco (Strict Prohibition)", reason: "Interferes with medication clearance, burdens liver, and stops healing." },
      { food: "Carbonated Sodas & Fizzy Drinks", reason: "Carbonic acid and high refined sugar produce acute abdominal gas." },
      { food: "Street Food & Roadside Chaat", reason: "High risk of bacterial food poisoning and waterborne infections during recovery." },
      { food: "Very Sour Foods (Imli, Raw Mango, Vinegar)", reason: "High acid concentration aggravates post-discharge reflux and heartburn." },
      { food: "Late-Night Heavy Dinners", reason: "Disrupts sleep and triggers nocturnal acid reflux; finish dinner 2 hours before bed." }
    ]
  }
};

// 2. Comprehensive Domain Classifier
function classifyKey(k, item) {
  const name = (item.name || '').toLowerCase();
  const key = k.toLowerCase();
  const text = key + ' ' + name;

  // Maternal & Gynaecology
  if (text.includes('caesarean') || text.includes('c-section') || text.includes('cesarean') || 
      text.includes('hysterectomy') || text.includes('mastectomy') || text.includes('ovarian') || 
      text.includes('prolapse') || text.includes('breast') || text.includes('tubal') || 
      text.includes('pregnancy') || text.includes('dilation') || text.includes('curettage') || 
      text.includes('myomectomy') || text.includes('episiotomy') || text.includes('pcos') || 
      text.includes('endometriosis') || text.includes('oophorectomy') || text.includes('vasectomy') || 
      text.includes('circumcision') || text.includes('penile')) {
    return 'maternal_gynae';
  }

  // Cardiovascular
  if (text.includes('coronary') || text.includes('cabg') || text.includes('heart') || 
      text.includes('cardio') || text.includes('valve') || text.includes('aneurysm') || 
      text.includes('pacemaker') || text.includes('defibrillator') || text.includes('pericard') || 
      text.includes('angioplasty') || text.includes('stent') || text.includes('atherosclerosis') || 
      text.includes('arrhythmia') || text.includes('myocardial') || text.includes('angina') ||
      text.includes('carotid') || text.includes('peripheral_artery') || text.includes('varicose') ||
      text.includes('vascular') || text.includes('septal_defect') || text.includes('fallot') ||
      text.includes('embolectomy') || text.includes('atrial_fibrillation') || text.includes('dvt') ||
      text.includes('thrombosis') || text.includes('infective_endocarditis') || text.includes('raynaud') ||
      text.includes('hypercoagulab')) {
    return 'cardiovascular';
  }

  // Hypertension
  if (text.includes('hypertension') || text.includes('blood pressure')) {
    return 'hypertension';
  }

  // Diabetes & Metabolic
  if (text.includes('diabet') || text.includes('insulin') || text.includes('hyperglyc') ||
      text.includes('obesity') || text.includes('metabolic_syndrome') || text.includes('hypercholesterol') ||
      text.includes('hypertriglycerid') || text.includes('phenylketonuria')) {
    return 'diabetes';
  }

  // Hematology & Anemia
  if (text.includes('anaemia') || text.includes('anemia') || text.includes('sickle_cell') ||
      text.includes('thalassaemia') || text.includes('haemophilia') || text.includes('iron_deficiency') ||
      text.includes('vitamin_b12') || text.includes('splenectomy') || text.includes('spleen') ||
      text.includes('haemochromatosis')) {
    return 'hematology_anemia';
  }

  // Febrile & Infectious
  if (text.includes('dengue') || text.includes('typhoid') || text.includes('malaria') || 
      text.includes('fever') || text.includes('sepsis') || text.includes('infection') || 
      text.includes('covid') || text.includes('influenza') || text.includes('tuberculosis') ||
      text.includes('cholera') || text.includes('chickenpox') || text.includes('measles')) {
    return 'febrile_infectious';
  }

  // Renal & Urology
  if (text.includes('kidney') || text.includes('renal') || text.includes('dialysis') || 
      text.includes('nephr') || text.includes('stone') || text.includes('calculus') || 
      text.includes('bladder') || text.includes('prostate') || text.includes('turp') || 
      text.includes('turbt') || text.includes('urinary') || text.includes('cystitis') || 
      text.includes('ureter') || text.includes('benign_prostatic') || text.includes('bph')) {
    return 'renal_urology';
  }

  // Hepatobiliary & Pancreatic
  if (text.includes('gallbladder') || text.includes('cholecyst') || text.includes('liver') || 
      text.includes('hepat') || text.includes('pancrea') || text.includes('whipple') || 
      text.includes('jaundice') || text.includes('cirrhosis') || text.includes('biliary')) {
    return 'hepatobiliary_pancreatic';
  }

  // Gastrointestinal
  if (text.includes('appendix') || text.includes('appendectomy') || text.includes('hernia') || 
      text.includes('bowel') || text.includes('colostomy') || text.includes('ileostomy') || 
      text.includes('hemorrhoid') || text.includes('fissure') || text.includes('fistula') || 
      text.includes('gastric') || text.includes('peptic') || text.includes('ulcer') || 
      text.includes('gerd') || text.includes('reflux') || text.includes('gastritis') || 
      text.includes('colitis') || text.includes('crohn') || text.includes('colon') || 
      text.includes('polyp') || text.includes('celiac') || text.includes('coeliac') ||
      text.includes('constipation') || text.includes('diarrhoea') || text.includes('esophag') || 
      text.includes('stomach') || text.includes('bariatric') || text.includes('ibs') || 
      text.includes('diverticul') || text.includes('lactose') || text.includes('gastroenteritis')) {
    return 'gastrointestinal';
  }

  // Orthopedic & Spine
  if (text.includes('knee') || text.includes('hip') || text.includes('arthr') || 
      text.includes('fracture') || text.includes('spine') || text.includes('spinal') || 
      text.includes('bone') || text.includes('joint') || text.includes('ortho') || 
      text.includes('osteopor') || text.includes('gout') || text.includes('ligament') || 
      text.includes('tendon') || text.includes('carpal') || text.includes('shoulder') || 
      text.includes('femur') || text.includes('amputation') || text.includes('discectomy') || 
      text.includes('laminectomy') || text.includes('scoliosis') || text.includes('acl') ||
      text.includes('meniscus') || text.includes('rotator_cuff') || text.includes('trigger_finger') ||
      text.includes('elbow') || text.includes('bunion') || text.includes('lumbar') ||
      text.includes('ankylosing') || text.includes('fibromyalgia') || text.includes('calcium_deficiency') ||
      text.includes('vitamin_d')) {
    return 'orthopedic_spine';
  }

  // Respiratory
  if (text.includes('pulmon') || text.includes('lung') || text.includes('bronch') || 
      text.includes('asthma') || text.includes('copd') || text.includes('pneumon') || 
      text.includes('pleur') || text.includes('thorac') || text.includes('respirat') || 
      text.includes('trache') || text.includes('sleep_apnoea') || text.includes('cystic_fibrosis')) {
    return 'respiratory';
  }

  // Neurological
  if (text.includes('brain') || text.includes('neuro') || text.includes('stroke') || 
      text.includes('crani') || text.includes('epilep') || text.includes('parkinson') || 
      text.includes('migraine') || text.includes('palsy') || text.includes('neuropathy') || 
      text.includes('sclerosis') || text.includes('vagus') || text.includes('hemispherectomy') ||
      text.includes('meningioma') || text.includes('trigeminal') || text.includes('alzheimer') ||
      text.includes('myasthenia') || text.includes('restless_legs')) {
    return 'neurological';
  }

  // Oncology
  if (text.includes('cancer') || text.includes('chemo') || text.includes('radiat') || 
      text.includes('tumour') || text.includes('tumor') || text.includes('lymph') || 
      text.includes('leukemia') || text.includes('lymphoma') || text.includes('melanoma') || 
      text.includes('carcinoma') || text.includes('sarcoma') || text.includes('oncology')) {
    return 'oncology';
  }

  // ENT & Ophthalmology
  if (text.includes('cataract') || text.includes('eye') || text.includes('retina') || 
      text.includes('glaucoma') || text.includes('vitrectomy') || text.includes('cornea') || 
      text.includes('tonsil') || text.includes('adenoid') || text.includes('septoplast') || 
      text.includes('sinus') || text.includes('fess') || text.includes('ear') || 
      text.includes('tympan') || text.includes('throat') || text.includes('vocal') || 
      text.includes('thyroid') || text.includes('strabismus') || text.includes('rhinoplasty') ||
      text.includes('mastoidectomy') || text.includes('laryngectomy') || text.includes('dental') ||
      text.includes('tooth') || text.includes('allergic_rhinitis')) {
    return 'ent_ophthalmology';
  }

  // Dermatology & Autoimmune Skin
  if (text.includes('skin') || text.includes('derma') || text.includes('eczema') || 
      text.includes('psoriasis') || text.includes('burn') || text.includes('wound') || 
      text.includes('hives') || text.includes('urticaria') || text.includes('acne') ||
      text.includes('lupus') || text.includes('sle') || text.includes('sj_gren') ||
      text.includes('food_allergy') || text.includes('chronic_fatigue')) {
    return 'dermatology';
  }

  return 'general_convalescence';
}

// 3. Clinical Synonym Dictionary for matchDiseaseCondition
const CLINICAL_SYNONYMS = {
  // C-Section & Gynae
  op_caesarean_section_c_section: [
    'lscs', 'elective lscs', 'emergency lscs', 'c-section', 'caesarean', 'cesarean', 'cesarean section',
    'caesarean delivery', 'cesarean delivery', 'post lscs', 'lower segment cesarean section', 'c section'
  ],
  op_hysterectomy: ['hysterectomy', 'uterus removal', 'abdominal hysterectomy', 'laparoscopic hysterectomy', 'tah-bso'],
  op_dilation_and_curettage_d_c: ['d&c', 'dilation and curettage', 'd and c', 'dilatation and curettage'],
  dis_polycystic_ovary_syndrome_pcos: ['pcos', 'pcod', 'polycystic ovary', 'polycystic ovarian syndrome'],

  // Cardiovascular
  op_coronary_artery_bypass_grafting_cabg: [
    'cabg', 'coronary artery bypass', 'bypass surgery', 'heart bypass', 'coronary bypass',
    'open heart surgery', 'post cabg', 'myocardial revascularization'
  ],
  dis_coronary_artery_disease: [
    'cad', 'coronary artery disease', 'ischemic heart disease', 'ihd', 'heart attack',
    'myocardial infarction', 'mi', 'stemi', 'nstemi', 'angina', 'triple vessel disease', 'tvd',
    'coronary angioplasty', 'ptca', 'stent', 'cardiac stent'
  ],
  dis_heart_failure: ['chf', 'congestive heart failure', 'heart failure', 'cardiac failure', 'ccf', 'lvh'],

  // Hypertension
  dis_high_blood_pressure_hypertension: [
    'hypertension', 'htn', 'high bp', 'high blood pressure', 'essential hypertension',
    'systemic hypertension', 'elevated bp'
  ],

  // Diabetes
  dis_type_2_diabetes: [
    'type 2 diabetes', 't2dm', 'type ii diabetes', 'diabetes mellitus', 'diabetic',
    'niddm', 'dm type 2', 'sugar disease', 'high blood sugar', 'hyperglycemia'
  ],
  dis_type_1_diabetes: ['type 1 diabetes', 't1dm', 'iddm', 'juvenile diabetes', 'dm type 1'],
  dis_gestational_diabetes: ['gdm', 'gestational diabetes', 'diabetes in pregnancy'],

  // Infections & Fevers
  dis_dengue_fever: [
    'dengue', 'dengue fever', 'dengue with thrombocytopenia', 'thrombocytopenia',
    'dengue hemorrhagic fever', 'breakbone fever'
  ],
  dis_typhoid_fever: ['typhoid', 'typhoid fever', 'enteric fever', 'salmonella typhi'],
  dis_malaria: ['malaria', 'plasmodium', 'plasmodium falciparum', 'plasmodium vivax'],

  // Renal & Urology
  dis_kidney_stones: [
    'kidney stone', 'kidney stones', 'renal stone', 'renal stones', 'renal calculus',
    'renal calculi', 'nephrolithiasis', 'ureteric stone', 'ureteric calculus', 'urolithiasis'
  ],
  op_kidney_stone_removal: ['pcnl', 'ursl', 'eswl', 'lithotripsy', 'kidney stone removal', 'dj stenting'],
  dis_chronic_kidney_disease_ckd: [
    'ckd', 'chronic kidney disease', 'chronic renal failure', 'crf', 'renal failure',
    'dialysis', 'hemodialysis', 'end stage renal disease', 'esrd', 'elevated creatinine'
  ],
  op_transurethral_resection_of_the_prostate_turp: ['turp', 'prostate surgery', 'prostatectomy', 'bph surgery'],

  // Gastrointestinal
  op_appendix_removal_appendectomy: ['appendicitis', 'appendectomy', 'appendix', 'acute appendicitis', 'ruptured appendix'],
  op_gallbladder_removal_cholecystectomy: [
    'cholecystectomy', 'lap chole', 'gallbladder removal', 'gallstone surgery',
    'cholelithiasis', 'acute cholecystitis', 'chronic cholecystitis'
  ],
  dis_gallstones: ['gallstones', 'gall stones', 'biliary colic', 'cholelithiasis'],
  dis_gastro_oesophageal_reflux_disease_gerd: [
    'gerd', 'acid reflux', 'heartburn', 'gastric reflux', 'gastroesophageal reflux', 'dyspepsia'
  ],
  dis_peptic_ulcer_disease: ['peptic ulcer', 'gastric ulcer', 'duodenal ulcer', 'gastritis', 'acute gastritis', 'h pylori'],
  op_hemorrhoidectomy: ['piles surgery', 'hemorrhoidectomy', 'haemorrhoidectomy', 'piles', 'hemorrhoids', 'haemorrhoids'],

  // Orthopedic
  op_knee_replacement_total_knee_arthroplasty_tka: [
    'knee replacement', 'tkr', 'total knee replacement', 'tka', 'bilateral tkr', 'knee arthroplasty'
  ],
  op_hip_replacement_total_hip_arthroplasty_tha: [
    'hip replacement', 'thr', 'total hip replacement', 'tha', 'hip arthroplasty'
  ],
  op_fracture_repair_surgery_internal_fixation_orif: [
    'fracture', 'orif', 'bone fracture', 'internal fixation', 'plate fixation', 'femur fracture', 'tibia fracture'
  ],
  op_spinal_fusion: ['spinal fusion', 'spine surgery', 'lumbar fusion', 'discectomy', 'laminectomy', 'sciatica surgery'],
  dis_gout: ['gout', 'gouty arthritis', 'hyperuricemia', 'high uric acid'],
  dis_osteoarthritis: ['osteoarthritis', 'oa knee', 'knee pain degenerative', 'joint arthritis'],

  // Respiratory
  dis_asthma: ['asthma', 'bronchial asthma', 'wheezing', 'reactive airway disease'],
  dis_chronic_obstructive_pulmonary_disease_copd: ['copd', 'chronic bronchitis', 'emphysema', 'smokers cough'],
  dis_pneumonia: ['pneumonia', 'chest infection', 'lrti', 'lower respiratory tract infection', 'bronchopneumonia'],

  // Neurological
  dis_stroke_ischaemic_or_haemorrhagic: ['stroke', 'cva', 'cerebrovascular accident', 'paralysis', 'hemiplegia', 'tia', 'brain stroke']
};

console.log('Reading existing diseasesData.js...');
const rawPublic = fs.readFileSync(path.join(__dirname, '../public/js/diseasesData.js'), 'utf8');

// Require the existing database
const { CLINICAL_DISEASES_DB } = require('../public/js/diseasesData.js');
const keys = Object.keys(CLINICAL_DISEASES_DB);
console.log(`Processing ${keys.length} clinical conditions...`);

const enrichedDB = {};

keys.forEach(key => {
  const item = JSON.parse(JSON.stringify(CLINICAL_DISEASES_DB[key]));
  const domainKey = classifyKey(key, item);
  const domain = CLINICAL_DOMAINS[domainKey] || CLINICAL_DOMAINS.general_convalescence;

  // Enrich keywords
  const kwSet = new Set((item.keywords || []).map(k => k.toLowerCase().trim()));
  kwSet.add(item.name.toLowerCase().trim());
  kwSet.add(key.toLowerCase().replace(/^(op_|dis_)/, '').replace(/_/g, ' ').trim());

  if (CLINICAL_SYNONYMS[key]) {
    CLINICAL_SYNONYMS[key].forEach(syn => kwSet.add(syn.toLowerCase().trim()));
  }

  // Filter out any purely generic single-word items or old boilerplate templates
  const filterGeneric = (list) => {
    if (!Array.isArray(list)) return [];
    return list.filter(i => {
      const f = (i.food || i.name || '').toLowerCase().trim();
      const r = (i.reason || '').toLowerCase().trim();
      if (!f || f === 'vegetables' || f === 'fruit' || f === 'fruits' || f === 'protein' || 
          f === 'and fluids' || f === 'beans' || f === 'nuts' || f === 'whole grains' || 
          f === 'and lean protein' || f === 'refined grains' || f === 'sweets' || 
          f === 'sugary beverages' || f === 'and large portions' || f === 'salt' || 
          f === 'pickles' || f === 'saturated fat' || f === 'heavy meals' || f === 'water' ||
          f === 'and low-fat dairy' || f === 'adequate water' || f === 'following medical guidance') {
        return false;
      }
      if (r.includes('nutrient-dense and recommended') || 
          r.includes('consume in strict moderation during') || 
          r.includes('contraindicated or strictly restricted for') || 
          r.includes('sugar-sweetened drinks as a routine beverage')) {
        return false;
      }
      return true;
    });
  };

  const existingEat = filterGeneric(item.eat);
  const existingLimit = filterGeneric(item.limit);
  const existingAvoid = filterGeneric(item.avoid);

  // Combine existing specific items with domain items
  const mergeClean = (base, domainList, targetMin) => {
    const res = [...base];
    const seen = new Set(res.map(i => (i.food || i.name || '').toLowerCase().trim()));
    for (const d of domainList) {
      const k = d.food.toLowerCase().trim();
      if (!seen.has(k)) {
        seen.add(k);
        res.push(d);
      }
    }
    return res;
  };

  item.eat = mergeClean(existingEat, domain.eat, 10);
  item.limit = mergeClean(existingLimit, domain.limit, 4);
  item.avoid = mergeClean(existingAvoid, domain.avoid, 4);
  item.keywords = Array.from(kwSet).filter(Boolean);
  item.clinicalDomain = domainKey;

  enrichedDB[key] = item;
});

console.log('All conditions enriched. Generating file output...');

// Generate file string
const outputJs = `/**
 * CareBridge Complete Clinical Nutrition Database
 * 150 Surgical Operations & 120 Medical Diseases (Total: 271 Protocols)
 * Clinically Enriched with Condition-Specific Indian Diet Protocols & Precise Medical Rationales
 */

const CLINICAL_DISEASES_DB = ${JSON.stringify(enrichedDB, null, 2)};

// Enhanced Clinical Condition Matcher supporting Medical Abbreviations & Synonyms
function matchDiseaseCondition(text) {
  if (!text || typeof text !== 'string') return 'general_convalescence';
  const clean = text.toLowerCase().trim();

  // 1. Direct Regex and Exact Medical Abbreviations Matching
  const priorityPatterns = [
    { re: /\\b(lscs|elective\\s+lscs|emergency\\s+lscs|post\\s+lscs|caesarean|cesarean|c-section|c\\s+section)\\b/i, key: 'op_caesarean_section_c_section' },
    { re: /\\b(cabg|coronary\\s+artery\\s+bypass|bypass\\s+grafting|heart\\s+bypass)\\b/i, key: 'op_coronary_artery_bypass_grafting_cabg' },
    { re: /\\b(cholecystectomy|lap\\s+chole|gallbladder\\s+removal)\\b/i, key: 'op_gallbladder_removal_cholecystectomy' },
    { re: /\\b(gallstones?|gall\\s+stones?|cholelithiasis)\\b/i, key: 'dis_gallstones' },
    { re: /\\b(appendicitis|appendectomy|appendix)\\b/i, key: 'op_appendix_removal_appendectomy' },
    { re: /\\b(dengue|dengue\\s+fever|thrombocytopenia)\\b/i, key: 'dis_dengue_fever' },
    { re: /\\b(typhoid|enteric\\s+fever|salmonella)\\b/i, key: 'dis_typhoid_fever' },
    { re: /\\b(malaria|plasmodium)\\b/i, key: 'dis_malaria' },
    { re: /\\b(viral\\s+fever|pyrexia|acute\\s+febrile)\\b/i, key: 'dis_dengue_fever' },
    { re: /\\b(t2dm|type\\s*2\\s*diabetes|type\\s*ii\\s*diabetes|diabetes\\s*mellitus|diabetic|niddm)\\b/i, key: 'dis_type_2_diabetes' },
    { re: /\\b(t1dm|type\\s*1\\s*diabetes|type\\s*i\\s*diabetes|juvenile\\s*diabetes)\\b/i, key: 'dis_type_1_diabetes' },
    { re: /\\b(gdm|gestational\\s+diabetes)\\b/i, key: 'dis_gestational_diabetes' },
    { re: /\\b(htn|hypertension|high\\s+bp|high\\s+blood\\s+pressure|elevated\\s+bp)\\b/i, key: 'dis_high_blood_pressure_hypertension' },
    { re: /\\b(cad|coronary\\s+artery\\s+disease|ischemic\\s+heart|myocardial\\s+infarction|stemi|nstemi|angina|triple\\s+vessel)\\b/i, key: 'dis_coronary_artery_disease' },
    { re: /\\b(kidney\\s+stones?|renal\\s+stones?|renal\\s+calcul(us|i)|nephrolithiasis|ureteric\\s+calcul(us|i))\\b/i, key: 'dis_kidney_stones' },
    { re: /\\b(ckd|chronic\\s+kidney\\s+disease|renal\\s+failure|dialysis|hemodialysis|creatinine)\\b/i, key: 'dis_chronic_kidney_disease_ckd' },
    { re: /\\b(tkr|total\\s+knee\\s+replacement|knee\\s+replacement|tka)\\b/i, key: 'op_knee_replacement_total_knee_arthroplasty_tka' },
    { re: /\\b(thr|total\\s+hip\\s+replacement|hip\\s+replacement|tha)\\b/i, key: 'op_hip_replacement_total_hip_arthroplasty_tha' },
    { re: /\\b(fracture|orif|bone\\s+fracture)\\b/i, key: 'op_fracture_repair_surgery_internal_fixation_orif' },
    { re: /\\b(gerd|acid\\s+reflux|heartburn|gastritis|peptic\\s+ulcer|hyperacidity)\\b/i, key: 'dis_gastro_oesophageal_reflux_disease_gerd' },
    { re: /\\b(asthma|bronchial\\s+asthma|wheezing)\\b/i, key: 'dis_asthma' },
    { re: /\\b(copd|emphysema|chronic\\s+bronchitis)\\b/i, key: 'dis_chronic_obstructive_pulmonary_disease_copd' },
    { re: /\\b(pneumonia|chest\\s+infection|lrti)\\b/i, key: 'dis_pneumonia' },
    { re: /\\b(stroke|cva|cerebrovascular|paralysis|hemiplegia)\\b/i, key: 'dis_stroke_ischaemic_or_haemorrhagic' },
    { re: /\\b(pcos|pcod|polycystic\\s+ovary)\\b/i, key: 'dis_polycystic_ovary_syndrome_pcos' },
    { re: /\\b(cataract|phaco)\\b/i, key: 'op_cataract_surgery' },
    { re: /\\b(tonsillitis|tonsillectomy)\\b/i, key: 'op_tonsillectomy' },
    { re: /\\b(hernia|inguinal\\s+hernia|umbilical\\s+hernia)\\b/i, key: 'op_hernia_repair' },
    { re: /\\b(turp|prostatectomy|prostate|bph)\\b/i, key: 'dis_benign_prostatic_hyperplasia_bph' },
    { re: /\\b(an[ae]mia|iron\\s+deficiency|low\\s+h[ae]moglobin)\\b/i, key: 'dis_iron_deficiency_anaemia' }
  ];

  for (const item of priorityPatterns) {
    if (item.re.test(clean) && CLINICAL_DISEASES_DB[item.key]) {
      return item.key;
    }
  }

  // 2. Keyword Match with Word Boundaries
  for (const [key, item] of Object.entries(CLINICAL_DISEASES_DB)) {
    if (!item.keywords) continue;
    for (const kw of item.keywords) {
      if (kw.length < 3) continue;
      const escaped = kw.replace(/[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|]/g, "\\\\$&");
      const pattern = new RegExp(\`\\\\b\${escaped}\\\\b\`, 'i');
      if (pattern.test(clean)) {
        return key;
      }
    }
  }

  // 3. Substring fallback match for long descriptive phrases
  for (const [key, item] of Object.entries(CLINICAL_DISEASES_DB)) {
    if (!item.keywords) continue;
    for (const kw of item.keywords) {
      if (kw.length >= 5 && clean.includes(kw.toLowerCase())) {
        return key;
      }
    }
  }

  return 'general_convalescence';
}

if (typeof window !== 'undefined') {
  window.CLINICAL_DISEASES_DB = CLINICAL_DISEASES_DB;
  window.matchDiseaseCondition = matchDiseaseCondition;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CLINICAL_DISEASES_DB,
    matchDiseaseCondition
  };
}
`;

fs.writeFileSync(path.join(__dirname, '../public/js/diseasesData.js'), outputJs, 'utf8');
console.log('Updated public/js/diseasesData.js successfully!');

fs.writeFileSync(path.join(__dirname, '../features/06-diet-plan/backend/diseasesData.js'), outputJs, 'utf8');
console.log('Updated features/06-diet-plan/backend/diseasesData.js successfully!');
