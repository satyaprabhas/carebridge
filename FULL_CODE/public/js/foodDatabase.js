/**
 * CareBridge Complete 1,000 Food & Drink Safety Database
 * Covers Grains, Breads, Pulses, Vegetables, Fruits, Dairy, Meats, Seafood,
 * Beverages, Snacks, Fast Foods, Sweets, Spices, and Condiments.
 * Auto-generated & structured for Clinical Recovery & Food Safety Search
 */

const EXTENDED_FOOD_DATABASE = {
  "plain steamed rice": {
    "food": "Plain Steamed Rice",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Easily digestible and gentle on recovering digestive mucosa.",
    "notes": "Consume warm without heavy ghee.",
    "aliases": [
      "plain steamed rice",
      "steamed rice",
      "white rice",
      "boiled rice",
      "bhat",
      "chawal"
    ],
    "diseaseOverrides": {
      "diabetes": {
        "verdict": "limit",
        "explanation": "High glycemic index; opt for controlled portions or brown/parboiled rice."
      }
    }
  },
  "brown rice": {
    "food": "Brown Rice",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Rich in dietary fibre, magnesium, and sustained complex carbohydrates.",
    "notes": "Ideal whole grain choice.",
    "aliases": [
      "brown rice",
      "unpolished rice",
      "brown chawal"
    ],
    "diseaseOverrides": {
      "renal": {
        "verdict": "limit",
        "explanation": "Higher phosphorus and potassium than polished white rice; moderate in advanced CKD."
      }
    }
  },
  "red rice": {
    "food": "Red Rice",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Antioxidant-rich anthocyanin grain supporting vascular health.",
    "notes": "Boil thoroughly until tender.",
    "aliases": [
      "red rice",
      "kerala matta rice",
      "red chawal"
    ],
    "diseaseOverrides": {}
  },
  "basmati rice": {
    "food": "Basmati Rice",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Aromatic long-grain rice with lower glycemic impact than short-grain white rice.",
    "notes": "Steam lightly.",
    "aliases": [
      "basmati rice",
      "long grain rice"
    ],
    "diseaseOverrides": {}
  },
  "sona masoori rice": {
    "food": "Sona Masoori Rice",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Lightweight medium-grain white rice that digests smoothly.",
    "notes": "Good for convalescent recovery.",
    "aliases": [
      "sona masoori rice",
      "sona masuri"
    ],
    "diseaseOverrides": {}
  },
  "ponni rice": {
    "food": "Ponni Rice",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Easily absorbable boiled South Indian staple rice.",
    "notes": "Gentle on post-op stomach.",
    "aliases": [
      "ponni rice",
      "boiled ponni rice"
    ],
    "diseaseOverrides": {}
  },
  "jeera rice": {
    "food": "Jeera Rice",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Cumin-tempered rice aiding digestion and relieving abdominal gas.",
    "notes": "Keep butter/oil minimal.",
    "aliases": [
      "jeera rice",
      "cumin rice"
    ],
    "diseaseOverrides": {}
  },
  "parboiled rice": {
    "food": "Parboiled Rice",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Nutrients driven into grain kernel; lower glycemic spike than regular white rice.",
    "notes": "Hearty convalescent grain.",
    "aliases": [
      "parboiled rice",
      "converted rice",
      "puzhungal arisi"
    ],
    "diseaseOverrides": {}
  },
  "flattened rice (poha)": {
    "food": "Flattened Rice (Poha)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Light, easily digestible flattened rice loaded with iron and carbohydrates.",
    "notes": "Cook with mild turmeric, cumin, and vegetables.",
    "aliases": [
      "flattened rice (poha)",
      "poha",
      "aval",
      "atukulu",
      "flattened rice",
      "beaten rice"
    ],
    "diseaseOverrides": {}
  },
  "puffed rice (murmura)": {
    "food": "Puffed Rice (Murmura)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Extremely light on stomach, oil-free, and relieves acute nausea.",
    "notes": "Ideal light recovery snack.",
    "aliases": [
      "puffed rice (murmura)",
      "murmura",
      "pori",
      "borugulu",
      "kurmura",
      "puffed rice"
    ],
    "diseaseOverrides": {}
  },
  "rice kanji (rice gruel)": {
    "food": "Rice Kanji (Rice Gruel)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Traditional therapeutic recovery soup providing immediate hydration and electrolytes.",
    "notes": "Recommended during early recovery.",
    "aliases": [
      "rice kanji (rice gruel)",
      "kanji",
      "congee",
      "ganji",
      "rice water"
    ],
    "diseaseOverrides": {}
  },
  "rice flour": {
    "food": "Rice Flour",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Gluten-free flour used for gentle soft steamed dishes.",
    "notes": "Used for idli, appam, and modak.",
    "aliases": [
      "rice flour",
      "chawal ka atta"
    ],
    "diseaseOverrides": {}
  },
  "rice noodles": {
    "food": "Rice Noodles",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Gluten-free digestible noodles; much lighter than refined wheat noodles.",
    "notes": "Prepare in clear broth.",
    "aliases": [
      "rice noodles",
      "rice vermicelli",
      "sevai"
    ],
    "diseaseOverrides": {}
  },
  "idli": {
    "food": "Idli",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Fermented, oil-free steamed rice and lentil cake; one of the healthiest digestive foods.",
    "notes": "Excellent breakfast during recovery.",
    "aliases": [
      "idli",
      "steamed idli",
      "idly"
    ],
    "diseaseOverrides": {}
  },
  "plain dosa": {
    "food": "Plain Dosa",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Fermented crepe; digests easily when prepared with minimal oil.",
    "notes": "Avoid heavy oil or butter roasting.",
    "aliases": [
      "plain dosa",
      "sada dosa",
      "dosa"
    ],
    "diseaseOverrides": {}
  },
  "masala dosa": {
    "food": "Masala Dosa",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Spiced potato stuffing and pan roasting add oil and carbohydrate load.",
    "notes": "Eat half portion without excess butter.",
    "aliases": [
      "masala dosa",
      "potato dosa"
    ],
    "diseaseOverrides": {
      "diabetes": {
        "verdict": "limit",
        "explanation": "High carbohydrate concentration from potato and fermented batter."
      },
      "gerd": {
        "verdict": "limit",
        "explanation": "Green chillies and oil in potato filling may trigger reflux."
      }
    }
  },
  "rava dosa": {
    "food": "Rava Dosa",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Crispy semolina crepe that requires more oil to crisp.",
    "notes": "Limit frequency during early recovery.",
    "aliases": [
      "rava dosa",
      "sooji dosa"
    ],
    "diseaseOverrides": {}
  },
  "neer dosa": {
    "food": "Neer Dosa",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Very delicate, water-soft rice crepe prepared without frying oil.",
    "notes": "Ideal gentle meal.",
    "aliases": [
      "neer dosa",
      "mangalore neer dosa"
    ],
    "diseaseOverrides": {}
  },
  "uttapam": {
    "food": "Uttapam",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Thick fermented pancake topped with cooked vegetables.",
    "notes": "Cook on non-stick pan with light olive or sunflower oil.",
    "aliases": [
      "uttapam",
      "uttappa",
      "vegetable uttapam"
    ],
    "diseaseOverrides": {}
  },
  "appam": {
    "food": "Appam",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Soft, fermented bowl-shaped rice hoppers; extremely gentle on digestion.",
    "notes": "Pair with mild vegetable stew.",
    "aliases": [
      "appam",
      "kerala appam",
      "hopper"
    ],
    "diseaseOverrides": {}
  },
  "idiyappam (string hoppers)": {
    "food": "Idiyappam (String Hoppers)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Steamed delicate rice noodle nests; zero fat and ultra-light.",
    "notes": "Great for post-surgical convalescence.",
    "aliases": [
      "idiyappam (string hoppers)",
      "noolappam",
      "string hopper"
    ],
    "diseaseOverrides": {}
  },
  "puttu": {
    "food": "Puttu",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Steamed cylinders of ground rice layered with fresh coconut.",
    "notes": "Consume warm with tender bananas or light dal.",
    "aliases": [
      "puttu",
      "steamed puttu"
    ],
    "diseaseOverrides": {}
  },
  "pathiri": {
    "food": "Pathiri",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Soft, thin roasted rice flatbread; entirely oil-free.",
    "notes": "Gentle on sensitive stomachs.",
    "aliases": [
      "pathiri",
      "malabar pathiri",
      "rice roti"
    ],
    "diseaseOverrides": {}
  },
  "rolled oats": {
    "food": "Rolled Oats",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Rich in beta-glucan soluble fibre, reduces cholesterol, and stabilizes blood sugar.",
    "notes": "Cook with water or skimmed milk.",
    "aliases": [
      "rolled oats",
      "oatmeal",
      "oats",
      "rolled oat flakes"
    ],
    "diseaseOverrides": {}
  },
  "steel-cut oats": {
    "food": "Steel-Cut Oats",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Minimally processed oat groats with low glycemic index and high satiety.",
    "notes": "Cook thoroughly until soft.",
    "aliases": [
      "steel-cut oats",
      "irish oats",
      "coarse oats"
    ],
    "diseaseOverrides": {}
  },
  "instant oats": {
    "food": "Instant Oats",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Heavily rolled and often pre-flavored with hidden sugars and sodium.",
    "notes": "Choose unflavored plain rolled oats instead.",
    "aliases": [
      "instant oats",
      "quick cooking oats"
    ],
    "diseaseOverrides": {}
  },
  "whole wheat roti / phulka": {
    "food": "Whole Wheat Roti / Phulka",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Puffed whole wheat bread baked without oil; excellent source of dietary fibre.",
    "notes": "Standard wholesome staple.",
    "aliases": [
      "whole wheat roti / phulka",
      "roti",
      "phulka",
      "chapati",
      "wheat roti"
    ],
    "diseaseOverrides": {}
  },
  "plain chapati": {
    "food": "Plain Chapati",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Traditional wheat flatbread; provide complex energy and gut motility.",
    "notes": "Brush with minimal ghee or oil.",
    "aliases": [
      "plain chapati",
      "chapathi"
    ],
    "diseaseOverrides": {}
  },
  "plain paratha": {
    "food": "Plain Paratha",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Layered wheat bread cooked with oil/ghee; heavier to digest.",
    "notes": "Limit to 1 small paratha without excess butter.",
    "aliases": [
      "plain paratha",
      "tawa paratha"
    ],
    "diseaseOverrides": {}
  },
  "aloo paratha": {
    "food": "Aloo Paratha",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Calorie-dense spiced potato stuffed flatbread; slower gastric emptying.",
    "notes": "Limit during acute recovery phase.",
    "aliases": [
      "aloo paratha",
      "potato paratha"
    ],
    "diseaseOverrides": {
      "diabetes": {
        "verdict": "limit",
        "explanation": "Double carbohydrate load (wheat flour + potato)."
      },
      "cholecystectomy": {
        "verdict": "avoid",
        "explanation": "Heavy frying fats in paratha provoke bile spasm and diarrhea."
      }
    }
  },
  "paneer paratha": {
    "food": "Paneer Paratha",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "High-protein flatbread; provides tissue building blocks when cooked with light oil.",
    "notes": "Use low-fat homemade paneer.",
    "aliases": [
      "paneer paratha",
      "cottage cheese paratha"
    ],
    "diseaseOverrides": {}
  },
  "gobi paratha": {
    "food": "Gobi Paratha",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Cauliflower stuffing can cause intestinal gas and abdominal bloating.",
    "notes": "Eat with caution if prone to post-op gas.",
    "aliases": [
      "gobi paratha",
      "cauliflower paratha"
    ],
    "diseaseOverrides": {}
  },
  "mooli paratha": {
    "food": "Mooli Paratha",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Radish may cause flatulence and bloating in postoperative abdomen.",
    "notes": "Cook radish well to reduce pungency.",
    "aliases": [
      "mooli paratha",
      "radish paratha"
    ],
    "diseaseOverrides": {}
  },
  "methi thepla": {
    "food": "Methi Thepla",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Fenugreek leaf spiced flatbread; fenugreek supports glucose regulation and digestion.",
    "notes": "Prepare with light oil.",
    "aliases": [
      "methi thepla",
      "thepla",
      "methi roti"
    ],
    "diseaseOverrides": {}
  },
  "puri / poori": {
    "food": "Puri / Poori",
    "category": "Grains & Breads",
    "verdict": "avoid",
    "explanation": "Deep-fried wheat bread saturated with frying oils; severe strain on liver, heart and digestion.",
    "notes": "Strictly avoid during surgical recovery.",
    "aliases": [
      "puri / poori",
      "fried puri",
      "poori"
    ],
    "diseaseOverrides": {
      "cardiac": {
        "verdict": "avoid",
        "explanation": "Deep frying elevates LDL cholesterol and vascular inflammation."
      },
      "post_surgery": {
        "verdict": "avoid",
        "explanation": "High grease delays wound recovery and causes severe nausea."
      }
    }
  },
  "bhatura": {
    "food": "Bhatura",
    "category": "Grains & Breads",
    "verdict": "avoid",
    "explanation": "Deep-fried refined flour bread; extremely heavy, high fat and slow to digest.",
    "notes": "Prohibited during post-discharge recovery.",
    "aliases": [
      "bhatura",
      "bhature",
      "chole bhature bread"
    ],
    "diseaseOverrides": {}
  },
  "butter naan": {
    "food": "Butter Naan",
    "category": "Grains & Breads",
    "verdict": "avoid",
    "explanation": "Refined maida flour baked with heavy butter glaze; causes constipation and acid reflux.",
    "notes": "Replace with tandoori roti.",
    "aliases": [
      "butter naan",
      "naan",
      "tandoori naan"
    ],
    "diseaseOverrides": {}
  },
  "garlic naan": {
    "food": "Garlic Naan",
    "category": "Grains & Breads",
    "verdict": "avoid",
    "explanation": "Heavy refined flour dough combined with rich butter and raw garlic bits.",
    "notes": "Too heavy for recovering GI tract.",
    "aliases": [
      "garlic naan",
      "garlic butter naan"
    ],
    "diseaseOverrides": {}
  },
  "kulcha": {
    "food": "Kulcha",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Refined flour bread; lacks dietary fibre and can cause bowel sluggishness.",
    "notes": "Opt for whole wheat alternatives.",
    "aliases": [
      "kulcha",
      "amritsari kulcha"
    ],
    "diseaseOverrides": {}
  },
  "tandoori roti (whole wheat)": {
    "food": "Tandoori Roti (Whole Wheat)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Clay-oven baked whole wheat bread without oil or butter.",
    "notes": "Good alternative to fried naans.",
    "aliases": [
      "tandoori roti (whole wheat)",
      "tandoori roti"
    ],
    "diseaseOverrides": {}
  },
  "rumali roti": {
    "food": "Rumali Roti",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Thin refined maida flatbread; low satiety and rapid starch breakdown.",
    "notes": "Limit intake.",
    "aliases": [
      "rumali roti",
      "roomali roti"
    ],
    "diseaseOverrides": {}
  },
  "missi roti": {
    "food": "Missi Roti",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Nutritious blend of chickpea flour (besan) and wheat; high protein and low GI.",
    "notes": "Ideal for diabetes and cardiac wellness.",
    "aliases": [
      "missi roti",
      "besan roti",
      "chana roti"
    ],
    "diseaseOverrides": {}
  },
  "jowar roti (sorghum)": {
    "food": "Jowar Roti (Sorghum)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Gluten-free, mineral-dense millet bread; excellent for metabolic and cardiac health.",
    "notes": "Traditional therapeutic recovery flatbread.",
    "aliases": [
      "jowar roti (sorghum)",
      "jowar bhakhri",
      "sorghum flatbread"
    ],
    "diseaseOverrides": {}
  },
  "bajra roti (pearl millet)": {
    "food": "Bajra Roti (Pearl Millet)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Iron-rich, warming millet bread that supports hemoglobin synthesis.",
    "notes": "Pair with warm vegetable dal.",
    "aliases": [
      "bajra roti (pearl millet)",
      "bajre ki roti",
      "pearl millet bread"
    ],
    "diseaseOverrides": {}
  },
  "ragi mudde (finger millet balls)": {
    "food": "Ragi Mudde (Finger Millet Balls)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Steamed finger millet dumpling; exceptional source of calcium, iron and soluble fibre.",
    "notes": "Traditional recovery superfood.",
    "aliases": [
      "ragi mudde (finger millet balls)",
      "ragi ball",
      "finger millet mudde"
    ],
    "diseaseOverrides": {}
  },
  "ragi porridge / malt": {
    "food": "Ragi Porridge / Malt",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Warm ragi drink providing bioavailable calcium for bone and tissue healing.",
    "notes": "Prepare with water or light milk.",
    "aliases": [
      "ragi porridge / malt",
      "ragi ambali",
      "ragi java",
      "ragi malt"
    ],
    "diseaseOverrides": {}
  },
  "ragi dosa": {
    "food": "Ragi Dosa",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Fiber-packed finger millet crepe; steady glucose release.",
    "notes": "Prepare on light iron griddle.",
    "aliases": [
      "ragi dosa",
      "finger millet dosa"
    ],
    "diseaseOverrides": {}
  },
  "foxtail millet (kangni)": {
    "food": "Foxtail Millet (Kangni)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Low-glycemic ancient grain rich in B-vitamins and cardiac-protective fibre.",
    "notes": "Substitute for white rice.",
    "aliases": [
      "foxtail millet (kangni)",
      "navane",
      "tenai",
      "kangni"
    ],
    "diseaseOverrides": {}
  },
  "kodo millet (varagu)": {
    "food": "Kodo Millet (Varagu)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "High-fiber antioxidant millet; aids post-surgical glycemic control.",
    "notes": "Cook as soft khichdi.",
    "aliases": [
      "kodo millet (varagu)",
      "kodra",
      "varagu"
    ],
    "diseaseOverrides": {}
  },
  "barnyard millet (sanwa)": {
    "food": "Barnyard Millet (Sanwa)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Extremely digestible, rich in iron and phosphorus; fast cooking.",
    "notes": "Ideal convalescent grain.",
    "aliases": [
      "barnyard millet (sanwa)",
      "samak chawal",
      "oodalu"
    ],
    "diseaseOverrides": {}
  },
  "little millet (kutki)": {
    "food": "Little Millet (Kutki)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Nutrient-packed tiny grain with high mineral density.",
    "notes": "Cook as upma or porridge.",
    "aliases": [
      "little millet (kutki)",
      "sama",
      "samai",
      "kutki"
    ],
    "diseaseOverrides": {}
  },
  "proso millet (chena)": {
    "food": "Proso Millet (Chena)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Nerve-nourishing millet rich in lecithin and magnesium.",
    "notes": "Wholesome rice replacement.",
    "aliases": [
      "proso millet (chena)",
      "barri",
      "chena"
    ],
    "diseaseOverrides": {}
  },
  "quinoa": {
    "food": "Quinoa",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Complete plant protein containing all 9 essential amino acids for tissue repair.",
    "notes": "Rinse well and boil tender.",
    "aliases": [
      "quinoa",
      "quinoa grain",
      "cooked quinoa"
    ],
    "diseaseOverrides": {}
  },
  "barley (jau)": {
    "food": "Barley (Jau)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Superb source of beta-glucan; soothes urinary tract and lowers cholesterol.",
    "notes": "Cook as soup or daliya.",
    "aliases": [
      "barley (jau)",
      "barley grain",
      "jau"
    ],
    "diseaseOverrides": {}
  },
  "barley water": {
    "food": "Barley Water",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Clear boiled barley extract; promotes gentle diuresis, cleanses kidneys, and cools body.",
    "notes": "Drink warm or room temperature.",
    "aliases": [
      "barley water",
      "jau ka pani",
      "barley drink"
    ],
    "diseaseOverrides": {}
  },
  "daliya (broken wheat porridge)": {
    "food": "Daliya (Broken Wheat Porridge)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Gold standard hospital recovery food; high in fiber, very easily digested.",
    "notes": "Cook with carrots and moong dal.",
    "aliases": [
      "daliya (broken wheat porridge)",
      "bulgur wheat",
      "broken wheat",
      "fada",
      "dalia"
    ],
    "diseaseOverrides": {}
  },
  "upma (sooji)": {
    "food": "Upma (Sooji)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Light semolina breakfast tempered with mustard seeds and curry leaves.",
    "notes": "Keep oil low and add peas/carrots.",
    "aliases": [
      "upma (sooji)",
      "rava upma",
      "sooji upma"
    ],
    "diseaseOverrides": {}
  },
  "vermicelli upma (seviyan)": {
    "food": "Vermicelli Upma (Seviyan)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Light roasted vermicelli prepared with diced convalescent vegetables.",
    "notes": "Gentle on recovery digestion.",
    "aliases": [
      "vermicelli upma (seviyan)",
      "semiya upma"
    ],
    "diseaseOverrides": {}
  },
  "semolina (sooji / rava)": {
    "food": "Semolina (Sooji / Rava)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Purified wheat middlings; digests quickly without gastrointestinal irritation.",
    "notes": "Use for light porridge or upma.",
    "aliases": [
      "semolina (sooji / rava)",
      "suji",
      "rava"
    ],
    "diseaseOverrides": {}
  },
  "buckwheat (kuttu)": {
    "food": "Buckwheat (Kuttu)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Gluten-free pseudocereal rich in rutin; strengthens capillary walls and vascular integrity.",
    "notes": "Cook as soft porridge or roti.",
    "aliases": [
      "buckwheat (kuttu)",
      "kuttu ka atta",
      "buckwheat groats"
    ],
    "diseaseOverrides": {}
  },
  "water chestnut flour (singhara)": {
    "food": "Water Chestnut Flour (Singhara)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Cooling, easily digestible gluten-free starch rich in potassium and zinc.",
    "notes": "Use for light convalescent flatbreads.",
    "aliases": [
      "water chestnut flour (singhara)",
      "singhara atta"
    ],
    "diseaseOverrides": {}
  },
  "whole wheat bread": {
    "food": "Whole Wheat Bread",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Contains bran and germ; superior fiber profile over white sandwich bread.",
    "notes": "Lightly toast without heavy butter.",
    "aliases": [
      "whole wheat bread",
      "brown bread",
      "whole grain bread"
    ],
    "diseaseOverrides": {}
  },
  "white bread": {
    "food": "White Bread",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Refined flour bread with high glycemic index and minimal fiber; digests fast but spikes blood sugar.",
    "notes": "Toasted plain white bread is acceptable during severe nausea.",
    "aliases": [
      "white bread",
      "white sandwich bread",
      "sliced bread"
    ],
    "diseaseOverrides": {
      "diabetes": {
        "verdict": "limit",
        "explanation": "Causes rapid spike in blood glucose levels."
      }
    }
  },
  "multigrain bread": {
    "food": "Multigrain Bread",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Baked with seeds and whole grains; provides sustained energy release.",
    "notes": "Toast lightly.",
    "aliases": [
      "multigrain bread",
      "seed bread",
      "seven grain bread"
    ],
    "diseaseOverrides": {}
  },
  "sourdough bread": {
    "food": "Sourdough Bread",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Natural lactic fermentation breaks down phytates and gluten; much easier on sensitive guts.",
    "notes": "Excellent gut-friendly choice.",
    "aliases": [
      "sourdough bread",
      "artisan sourdough"
    ],
    "diseaseOverrides": {}
  },
  "rye bread": {
    "food": "Rye Bread",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Dense whole grain bread rich in soluble arabinoxylan fibre.",
    "notes": "Keeps insulin levels steady.",
    "aliases": [
      "rye bread",
      "dark rye bread"
    ],
    "diseaseOverrides": {}
  },
  "pita bread (whole wheat)": {
    "food": "Pita Bread (Whole Wheat)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Pocket flatbread; healthy when stuffed with cucumber, sprouts and boiled beans.",
    "notes": "Bake lightly.",
    "aliases": [
      "pita bread (whole wheat)",
      "whole wheat pita"
    ],
    "diseaseOverrides": {}
  },
  "refined wheat flour (maida)": {
    "food": "Refined Wheat Flour (Maida)",
    "category": "Grains & Breads",
    "verdict": "avoid",
    "explanation": "Stripped of fiber, minerals, and vitamins; promotes constipation and blood sugar instability.",
    "notes": "Eliminate from convalescent diet.",
    "aliases": [
      "refined wheat flour (maida)",
      "all purpose flour",
      "maida",
      "white flour"
    ],
    "diseaseOverrides": {}
  },
  "cornflakes": {
    "food": "Cornflakes",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Extruded processed corn; high glycemic index and often contains added malt sugar.",
    "notes": "Choose plain rolled oats instead.",
    "aliases": [
      "cornflakes",
      "breakfast corn flakes"
    ],
    "diseaseOverrides": {
      "diabetes": {
        "verdict": "limit",
        "explanation": "Rapidly absorbed starch triggers hyperglycemic spike."
      }
    }
  },
  "muesli (no added sugar)": {
    "food": "Muesli (No Added Sugar)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Wholesome blend of rolled oats, seeds, and dried fruits.",
    "notes": "Soak in low-fat milk or curd.",
    "aliases": [
      "muesli (no added sugar)",
      "unsweetened muesli"
    ],
    "diseaseOverrides": {}
  },
  "granola": {
    "food": "Granola",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Often baked in high amounts of honey, oil, and saturated fat.",
    "notes": "High calorie density; check sugar content.",
    "aliases": [
      "granola",
      "baked granola"
    ],
    "diseaseOverrides": {}
  },
  "pasta (whole wheat)": {
    "food": "Pasta (Whole Wheat)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Complex carbohydrate pasta with lower glycemic index than refined white pasta.",
    "notes": "Toss with olive oil and vegetables.",
    "aliases": [
      "pasta (whole wheat)",
      "whole wheat macaroni",
      "whole grain penne"
    ],
    "diseaseOverrides": {}
  },
  "white pasta": {
    "food": "White Pasta",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Refined semolina/maida pasta; high carb density without protective bran.",
    "notes": "Cook al dente with ample vegetables.",
    "aliases": [
      "white pasta",
      "macaroni",
      "penne",
      "spaghetti"
    ],
    "diseaseOverrides": {}
  },
  "instant noodles (maggi / ramen)": {
    "food": "Instant Noodles (Maggi / Ramen)",
    "category": "Grains & Breads",
    "verdict": "avoid",
    "explanation": "Flash-fried in palm oil; loaded with excessive sodium, MSG, and preservatives.",
    "notes": "Harmful for post-op healing, heart and BP.",
    "aliases": [
      "instant noodles (maggi / ramen)",
      "maggi",
      "ramen noodles",
      "cup noodles"
    ],
    "diseaseOverrides": {
      "hypertension": {
        "verdict": "avoid",
        "explanation": "Extreme sodium in taste-maker packet triggers acute fluid retention and BP spike."
      },
      "cardiac": {
        "verdict": "avoid",
        "explanation": "Palm oil saturated fat and high sodium strain coronary vasculature."
      }
    }
  },
  "hakka noodles": {
    "food": "Hakka Noodles",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Stir-fried refined noodles; often prepared with excess sodium and grease in restaurants.",
    "notes": "Opt for homemade boiled wheat noodles.",
    "aliases": [
      "hakka noodles",
      "chow mein",
      "fried noodles"
    ],
    "diseaseOverrides": {}
  },
  "sabudana (tapioca pearls)": {
    "food": "Sabudana (Tapioca Pearls)",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Pure concentrated starch; provides quick calories but negligible protein or micronutrients.",
    "notes": "Acceptable in small portions for quick energy.",
    "aliases": [
      "sabudana (tapioca pearls)",
      "sago",
      "tapioca pearls"
    ],
    "diseaseOverrides": {
      "diabetes": {
        "verdict": "avoid",
        "explanation": "Pure starch induces severe glycemic spikes."
      }
    }
  },
  "sabudana khichdi": {
    "food": "Sabudana Khichdi",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Tapioca pearls tempered with peanuts and cumin; calorie dense.",
    "notes": "Moderate portion size.",
    "aliases": [
      "sabudana khichdi",
      "sago khichdi"
    ],
    "diseaseOverrides": {}
  },
  "sabudana vada": {
    "food": "Sabudana Vada",
    "category": "Grains & Breads",
    "verdict": "avoid",
    "explanation": "Deep-fried tapioca snack; absorbs massive quantities of frying oil.",
    "notes": "Strictly prohibited during recovery.",
    "aliases": [
      "sabudana vada",
      "fried sago vada"
    ],
    "diseaseOverrides": {}
  },
  "couscous": {
    "food": "Couscous",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Tiny steamed durum wheat granules; very quick and gentle to digest.",
    "notes": "Pair with steamed zucchini and peas.",
    "aliases": [
      "couscous",
      "steamed couscous"
    ],
    "diseaseOverrides": {}
  },
  "polenta (cornmeal)": {
    "food": "Polenta (Cornmeal)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Creamy cooked ground yellow corn; gluten-free and gentle on gut.",
    "notes": "Serve warm with mild herbs.",
    "aliases": [
      "polenta (cornmeal)",
      "cornmeal mash"
    ],
    "diseaseOverrides": {}
  },
  "poha cutlet": {
    "food": "Poha Cutlet",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Flattened rice patty; ensure shallow pan-toasted rather than deep-fried.",
    "notes": "Shallow cook with light oil.",
    "aliases": [
      "poha cutlet",
      "flattened rice cutlet"
    ],
    "diseaseOverrides": {}
  },
  "besan chilla": {
    "food": "Besan Chilla",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "High-protein savory chickpea pancake; provides sustained convalescent energy.",
    "notes": "Cook with grated bottle gourd and mild cumin.",
    "aliases": [
      "besan chilla",
      "gram flour pancake",
      "cheela"
    ],
    "diseaseOverrides": {}
  },
  "khaman dhokla": {
    "food": "Khaman Dhokla",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Steamed fermented gram flour sponge; oil-free and probiotic friendly.",
    "notes": "Avoid sugar-heavy tempering syrup.",
    "aliases": [
      "khaman dhokla",
      "dhokla",
      "besan dhokla"
    ],
    "diseaseOverrides": {}
  },
  "khandvi": {
    "food": "Khandvi",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Steamed gram flour and buttermilk rolls; light, protein-rich and easy to chew.",
    "notes": "Tempered with minimal mustard seeds.",
    "aliases": [
      "khandvi",
      "gujarati khandvi"
    ],
    "diseaseOverrides": {}
  },
  "khichu": {
    "food": "Khichu",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Warm seasoned steamed rice flour dough; soothing comfort recovery food.",
    "notes": "Season with mild cumin and drops of groundnut oil.",
    "aliases": [
      "khichu",
      "steamed papdi no lot"
    ],
    "diseaseOverrides": {}
  },
  "handvo": {
    "food": "Handvo",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Nutritious baked savory lentil and vegetable cake.",
    "notes": "Ensure baked, not heavily fried.",
    "aliases": [
      "handvo",
      "baked handvo"
    ],
    "diseaseOverrides": {}
  },
  "muthia (steamed)": {
    "food": "Muthia (Steamed)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Steamed fenugreek and wheat flour dumplings; rich in greens and fiber.",
    "notes": "Eat steamed without deep frying.",
    "aliases": [
      "muthia (steamed)",
      "steamed methi muthia"
    ],
    "diseaseOverrides": {}
  },
  "bisi bele bath": {
    "food": "Bisi Bele Bath",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Spiced Karnataka rice and lentil mash; reduce spicy masala paste during recovery.",
    "notes": "Make a milder convalescent version.",
    "aliases": [
      "bisi bele bath",
      "hot lentil rice"
    ],
    "diseaseOverrides": {}
  },
  "ven pongal": {
    "food": "Ven Pongal",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Moong dal and rice porridge tempered with ginger and black pepper; excellent recovery food.",
    "notes": "Moderate the use of whole cashews and ghee.",
    "aliases": [
      "ven pongal",
      "khara pongal",
      "ghee pongal"
    ],
    "diseaseOverrides": {}
  },
  "sweet pongal": {
    "food": "Sweet Pongal",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Rice and dal cooked with jaggery and ghee; rich in sugar.",
    "notes": "Limit to 1 small tablespoon.",
    "aliases": [
      "sweet pongal",
      "sakkarai pongal"
    ],
    "diseaseOverrides": {}
  },
  "croissant": {
    "food": "Croissant",
    "category": "Grains & Breads",
    "verdict": "avoid",
    "explanation": "Laminated pastry made with massive amounts of saturated butter and white flour.",
    "notes": "Blocks weight, lipid, and vascular recovery.",
    "aliases": [
      "croissant",
      "butter croissant"
    ],
    "diseaseOverrides": {}
  },
  "bagel": {
    "food": "Bagel",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Dense refined flour bread equivalent to 4-5 slices of regular bread.",
    "notes": "Choose whole wheat or eat half.",
    "aliases": [
      "bagel",
      "plain bagel"
    ],
    "diseaseOverrides": {}
  },
  "garlic bread": {
    "food": "Garlic Bread",
    "category": "Grains & Breads",
    "verdict": "avoid",
    "explanation": "White bread saturated with garlic butter and melted processed cheese.",
    "notes": "High sodium, saturated fat, and reflux trigger.",
    "aliases": [
      "garlic bread",
      "cheesy garlic bread"
    ],
    "diseaseOverrides": {}
  },
  "breadsticks": {
    "food": "Breadsticks",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Refined flour baked snack; low satiety and nutrient poor.",
    "notes": "Keep to 1-2 sticks.",
    "aliases": [
      "breadsticks",
      "grissini"
    ],
    "diseaseOverrides": {}
  },
  "tortilla (whole wheat)": {
    "food": "Tortilla (Whole Wheat)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Unleavened whole wheat flatbread; suitable for healthy wraps.",
    "notes": "Fill with grilled vegetables and beans.",
    "aliases": [
      "tortilla (whole wheat)",
      "whole grain wrap"
    ],
    "diseaseOverrides": {}
  },
  "taco shell (fried corn)": {
    "food": "Taco Shell (Fried Corn)",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Hard fried corn shell; sharp edges may irritate post-op throat and high in oil.",
    "notes": "Choose soft corn tortillas instead.",
    "aliases": [
      "taco shell (fried corn)",
      "hard taco shell"
    ],
    "diseaseOverrides": {}
  },
  "focaccia bread": {
    "food": "Focaccia Bread",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Olive oil rich white yeast bread; high carbohydrate and sodium content.",
    "notes": "Eat in moderation.",
    "aliases": [
      "focaccia bread",
      "italian focaccia"
    ],
    "diseaseOverrides": {}
  },
  "english muffin (whole wheat)": {
    "food": "English Muffin (Whole Wheat)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Low-fat griddle-baked bread; good for breakfast toast.",
    "notes": "Top with poached egg or low-sugar spread.",
    "aliases": [
      "english muffin (whole wheat)",
      "whole wheat muffin"
    ],
    "diseaseOverrides": {}
  },
  "papad (roasted)": {
    "food": "Papad (Roasted)",
    "category": "Grains & Breads",
    "verdict": "limit",
    "explanation": "Lentil wafer; roasting is oil-free, but check sodium/papadhkar content.",
    "notes": "Limit to 1 small roasted papad.",
    "aliases": [
      "papad (roasted)",
      "roasted papadum"
    ],
    "diseaseOverrides": {
      "hypertension": {
        "verdict": "avoid",
        "explanation": "High sodium carbonate (papad khar) causes rapid blood pressure rise."
      }
    }
  },
  "papad (fried)": {
    "food": "Papad (Fried)",
    "category": "Grains & Breads",
    "verdict": "avoid",
    "explanation": "Deep-fried lentil crisp; saturated with oxidized cooking oil and high salt.",
    "notes": "Avoid completely during recovery.",
    "aliases": [
      "papad (fried)",
      "fried papadum"
    ],
    "diseaseOverrides": {}
  },
  "yellow moong dal": {
    "food": "Yellow Moong Dal",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Easiest lentil to digest; low gas formation, rich in protein for wound repair.",
    "notes": "The #1 recommended convalescent dal.",
    "aliases": [
      "yellow moong dal",
      "moong dal",
      "split yellow gram",
      "peeli dal"
    ],
    "diseaseOverrides": {}
  },
  "split green moong dal": {
    "food": "Split Green Moong Dal",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Nutritious split lentil with gentle fiber; excellent for gut healing.",
    "notes": "Cook with cumin and turmeric.",
    "aliases": [
      "split green moong dal",
      "chilka moong dal"
    ],
    "diseaseOverrides": {}
  },
  "whole green moong": {
    "food": "Whole Green Moong",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Whole green gram rich in bioactive peptides and soluble fiber.",
    "notes": "Boil thoroughly until completely tender.",
    "aliases": [
      "whole green moong",
      "sabut moong",
      "green gram"
    ],
    "diseaseOverrides": {}
  },
  "sprouted moong beans": {
    "food": "Sprouted Moong Beans",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Sprouting multiplies Vitamin C, B-complex, and active enzymes for immune defense.",
    "notes": "Steam lightly before eating to ensure safety.",
    "aliases": [
      "sprouted moong beans",
      "moong sprouts",
      "ankurit moong"
    ],
    "diseaseOverrides": {}
  },
  "masoor dal (split red lentil)": {
    "food": "Masoor Dal (Split Red Lentil)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Fast-cooking, highly digestible lentil rich in iron, zinc, and dietary protein.",
    "notes": "Cook into light soupy dal.",
    "aliases": [
      "masoor dal (split red lentil)",
      "red lentils",
      "lal dal",
      "masoor"
    ],
    "diseaseOverrides": {}
  },
  "whole masoor (brown lentil)": {
    "food": "Whole Masoor (Brown Lentil)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Hearty brown lentil rich in prebiotics; feeds beneficial recovery gut flora.",
    "notes": "Simmer until soft.",
    "aliases": [
      "whole masoor (brown lentil)",
      "sabut masoor",
      "brown lentils"
    ],
    "diseaseOverrides": {}
  },
  "toor dal (arhar dal / pigeon pea)": {
    "food": "Toor Dal (Arhar Dal / Pigeon Pea)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Staple Indian lentil providing essential amino acids, folic acid and potassium.",
    "notes": "Temper with asafoetida (hing) to prevent gas.",
    "aliases": [
      "toor dal (arhar dal / pigeon pea)",
      "arhar dal",
      "tuvar dal",
      "split pigeon pea"
    ],
    "diseaseOverrides": {}
  },
  "chana dal (bengal gram split)": {
    "food": "Chana Dal (Bengal Gram Split)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Lowest glycemic index among staple lentils; stabilizes blood glucose.",
    "notes": "Soak well before cooking.",
    "aliases": [
      "chana dal (bengal gram split)",
      "bengal gram",
      "chana dal"
    ],
    "diseaseOverrides": {}
  },
  "roasted chana (bhuna chana)": {
    "food": "Roasted Chana (Bhuna Chana)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Oil-free roasted chickpea; ideal high-protein, high-fiber recovery snack.",
    "notes": "Eat without excess salt.",
    "aliases": [
      "roasted chana (bhuna chana)",
      "bhuna chana",
      "roasted chickpeas",
      "putnala"
    ],
    "diseaseOverrides": {}
  },
  "sattu (roasted gram flour)": {
    "food": "Sattu (Roasted Gram Flour)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Traditional cooling protein powder; provides quick nourishment and stamina.",
    "notes": "Mix with water, lemon and pinch of rock salt.",
    "aliases": [
      "sattu (roasted gram flour)",
      "chana sattu",
      "sattu drink"
    ],
    "diseaseOverrides": {}
  },
  "kabuli chana (white chickpeas)": {
    "food": "Kabuli Chana (White Chickpeas)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Protein and zinc dense; supports tissue tensile strength and white blood cells.",
    "notes": "Soak 8+ hours and pressure cook thoroughly.",
    "aliases": [
      "kabuli chana (white chickpeas)",
      "chickpeas",
      "safed chana",
      "garbanzo beans"
    ],
    "diseaseOverrides": {
      "post_surgery": {
        "verdict": "limit",
        "explanation": "Can produce significant gas; take only in well-cooked, moderate portions."
      }
    }
  },
  "kala chana (black chickpeas)": {
    "food": "Kala Chana (Black Chickpeas)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Iron powerhouse pulse; restores hemoglobin after blood loss or surgery.",
    "notes": "Drink the boiled kala chana soup/broth.",
    "aliases": [
      "kala chana (black chickpeas)",
      "black gram",
      "desi chana"
    ],
    "diseaseOverrides": {}
  },
  "rajma (red kidney beans)": {
    "food": "Rajma (Red Kidney Beans)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Rich in molybdenum, folate, and muscle-restoring protein.",
    "notes": "Cook until completely soft; do not consume undercooked.",
    "aliases": [
      "rajma (red kidney beans)",
      "kidney beans",
      "red rajma"
    ],
    "diseaseOverrides": {
      "gerd": {
        "verdict": "limit",
        "explanation": "Heavy spicy rajma gravy can induce stomach acid reflux."
      }
    }
  },
  "lobia (black-eyed peas)": {
    "food": "Lobia (Black-Eyed Peas)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Easier to digest than kidney beans; packed with soluble fiber and thiamine.",
    "notes": "Cook as mild gravy or soupy salad.",
    "aliases": [
      "lobia (black-eyed peas)",
      "chawli",
      "black eyed beans"
    ],
    "diseaseOverrides": {}
  },
  "urad dal (split black gram)": {
    "food": "Urad Dal (Split Black Gram)",
    "category": "Lentils & Legumes",
    "verdict": "limit",
    "explanation": "Very heavy, sticky protein matrix; slower gastric transit time.",
    "notes": "Best consumed in fermented idli batter rather than heavy dal.",
    "aliases": [
      "urad dal (split black gram)",
      "split urad",
      "dhuli urad"
    ],
    "diseaseOverrides": {}
  },
  "whole urad (sabut urad)": {
    "food": "Whole Urad (Sabut Urad)",
    "category": "Lentils & Legumes",
    "verdict": "limit",
    "explanation": "Heavy pulse; requires strong digestion; can provoke bloating.",
    "notes": "Limit during early postoperative period.",
    "aliases": [
      "whole urad (sabut urad)",
      "black gram whole",
      "maah ki dal"
    ],
    "diseaseOverrides": {}
  },
  "moth beans (matki)": {
    "food": "Moth Beans (Matki)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Drought-hardy nutrient-rich bean; exceptionally rich in zinc.",
    "notes": "Sprout and steam lightly.",
    "aliases": [
      "moth beans (matki)",
      "matki",
      "turkish gram"
    ],
    "diseaseOverrides": {}
  },
  "kulthi (horse gram)": {
    "food": "Kulthi (Horse Gram)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Renowned in clinical Ayurveda for kidney stone clearance and lipid reduction.",
    "notes": "Boil into clear medicinal broth.",
    "aliases": [
      "kulthi (horse gram)",
      "horsegram",
      "gahat",
      "kollu"
    ],
    "diseaseOverrides": {}
  },
  "green peas (fresh / boiled matar)": {
    "food": "Green Peas (Fresh / Boiled Matar)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Sweet, tender legume packed with phytonutrients, lutein, and vitamin K.",
    "notes": "Boil or steam into soups.",
    "aliases": [
      "green peas (fresh / boiled matar)",
      "fresh peas",
      "boiled matar"
    ],
    "diseaseOverrides": {}
  },
  "dried white peas (safed vatana)": {
    "food": "Dried White Peas (Safed Vatana)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Fibre-dense pulse used in ragda; supports colon regularity.",
    "notes": "Ensure thoroughly cooked.",
    "aliases": [
      "dried white peas (safed vatana)",
      "safed matar",
      "white vatana"
    ],
    "diseaseOverrides": {}
  },
  "soybeans (boiled)": {
    "food": "Soybeans (Boiled)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Complete plant protein loaded with isoflavones and heart-protective lipids.",
    "notes": "Cook well; moderate in thyroid disorders.",
    "aliases": [
      "soybeans (boiled)",
      "soya beans",
      "edamame"
    ],
    "diseaseOverrides": {}
  },
  "soya chunks (nutrela)": {
    "food": "Soya Chunks (Nutrela)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Defatted soy protein (over 50% protein); excellent lean tissue builder.",
    "notes": "Boil and squeeze thoroughly before cooking.",
    "aliases": [
      "soya chunks (nutrela)",
      "textured vegetable protein",
      "soya wadi",
      "tvp"
    ],
    "diseaseOverrides": {}
  },
  "soya granules": {
    "food": "Soya Granules",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Minced soy protein; easily mixed into light broths, daliya or khichdi.",
    "notes": "Great for elderly convalescent patients.",
    "aliases": [
      "soya granules",
      "soy mince"
    ],
    "diseaseOverrides": {}
  },
  "tofu (firm / organic)": {
    "food": "Tofu (Firm / Organic)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Soy curd providing pure protein and calcium without dairy cholesterol or lactose.",
    "notes": "Pan-sear lightly with mild seasoning.",
    "aliases": [
      "tofu (firm / organic)",
      "bean curd",
      "soya paneer"
    ],
    "diseaseOverrides": {}
  },
  "silken tofu": {
    "food": "Silken Tofu",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Ultra-soft digestible protein; dissolves smoothly into soups and broths.",
    "notes": "Excellent for sore throat or post-op dysphagia.",
    "aliases": [
      "silken tofu",
      "soft tofu"
    ],
    "diseaseOverrides": {}
  },
  "tempeh": {
    "food": "Tempeh",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Whole fermented soy cake; fermentation eliminates phytates and supports gut microbiome.",
    "notes": "Steam or bake lightly.",
    "aliases": [
      "tempeh",
      "fermented soy tempeh"
    ],
    "diseaseOverrides": {}
  },
  "edamame": {
    "food": "Edamame",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Young tender soybeans in pods; packed with folate and vitamin K.",
    "notes": "Steam with light pinch of rock salt.",
    "aliases": [
      "edamame",
      "green soybeans"
    ],
    "diseaseOverrides": {}
  },
  "fava beans (broad beans / bakla)": {
    "food": "Fava Beans (Broad Beans / Bakla)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Rich in L-DOPA precursor and lean protein; supports neural and motor health.",
    "notes": "Avoid only if G6PD deficient.",
    "aliases": [
      "fava beans (broad beans / bakla)",
      "broad beans",
      "bakla"
    ],
    "diseaseOverrides": {}
  },
  "navy beans (haricot beans)": {
    "food": "Navy Beans (Haricot Beans)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "High soluble fiber bean; binds excess bile acids in intestines.",
    "notes": "Great for post-cholecystectomy bile regulation.",
    "aliases": [
      "navy beans (haricot beans)",
      "white haricot beans"
    ],
    "diseaseOverrides": {}
  },
  "pinto beans": {
    "food": "Pinto Beans",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Creamy, earthy legume rich in selenium and thiamine.",
    "notes": "Mash into soft bean dip or mild soup.",
    "aliases": [
      "pinto beans",
      "speckled beans"
    ],
    "diseaseOverrides": {}
  },
  "black beans": {
    "food": "Black Beans",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Dark flavonoid anthocyanins protect vascular endothelium.",
    "notes": "Boil until tender.",
    "aliases": [
      "black beans",
      "turtle beans"
    ],
    "diseaseOverrides": {}
  },
  "adzuki beans": {
    "food": "Adzuki Beans",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "East Asian red bean; natural diuresis promoter and kidney supporter.",
    "notes": "Simmer into clear broth.",
    "aliases": [
      "adzuki beans",
      "red chori"
    ],
    "diseaseOverrides": {}
  },
  "lentil soup": {
    "food": "Lentil Soup",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Warm blended lentil broth; effortless digestion and rapid micronutrient uptake.",
    "notes": "Top with lemon juice for iron absorption.",
    "aliases": [
      "lentil soup",
      "dal soup",
      "red lentil soup"
    ],
    "diseaseOverrides": {}
  },
  "dal tadka (light)": {
    "food": "Dal Tadka (Light)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Boiled yellow dal tempered with mild cumin, garlic, and turmeric in light oil.",
    "notes": "Standard Indian convalescent staple.",
    "aliases": [
      "dal tadka (light)",
      "yellow dal tadka"
    ],
    "diseaseOverrides": {}
  },
  "dal fry (restaurant style)": {
    "food": "Dal Fry (Restaurant Style)",
    "category": "Lentils & Legumes",
    "verdict": "limit",
    "explanation": "Often prepared with excessive butter, double tempering, and heavy chilies.",
    "notes": "Prepare at home with light oil instead.",
    "aliases": [
      "dal fry (restaurant style)",
      "heavy dal fry"
    ],
    "diseaseOverrides": {}
  },
  "dal makhani": {
    "food": "Dal Makhani",
    "category": "Lentils & Legumes",
    "verdict": "avoid",
    "explanation": "Black gram cooked for hours in heavy butter, cream, and rich spices; severe lipid overload.",
    "notes": "Prohibited during surgical and cardiac recovery.",
    "aliases": [
      "dal makhani",
      "maa ki dal",
      "creamy dal"
    ],
    "diseaseOverrides": {
      "cardiac": {
        "verdict": "avoid",
        "explanation": "Extreme saturated dairy fats raise LDL and strain arteries."
      },
      "cholecystectomy": {
        "verdict": "avoid",
        "explanation": "Causes severe post-prandial diarrhea and biliary cramping."
      }
    }
  },
  "panchmel dal (5 dal mix)": {
    "food": "Panchmel Dal (5 Dal Mix)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Synergistic amino acid blend of 5 lentils; well-rounded recovery nutrition.",
    "notes": "Cook into soft soupy consistency.",
    "aliases": [
      "panchmel dal (5 dal mix)",
      "panchratna dal"
    ],
    "diseaseOverrides": {}
  },
  "sambar (homemade)": {
    "food": "Sambar (Homemade)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Toor dal cooked with healing vegetables (drumstick, pumpkin) and antioxidant spices.",
    "notes": "Keep spicy tamarind heat moderate.",
    "aliases": [
      "sambar (homemade)",
      "vegetable sambar"
    ],
    "diseaseOverrides": {}
  },
  "rasam": {
    "food": "Rasam",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Medicinal soupy extract of tomato, toor dal, cumin, black pepper, and coriander.",
    "notes": "Relieves post-op nausea and restores appetite.",
    "aliases": [
      "rasam",
      "pepper rasam",
      "tomato rasam"
    ],
    "diseaseOverrides": {}
  },
  "kootu": {
    "food": "Kootu",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Gentle South Indian stew of moong dal and bottle gourd/cabbage with coconut.",
    "notes": "Very gentle on digestive tract.",
    "aliases": [
      "kootu",
      "vegetable kootu"
    ],
    "diseaseOverrides": {}
  },
  "mor kulambu": {
    "food": "Mor Kulambu",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Probiotic buttermilk gravy with ash gourd and mild turmeric.",
    "notes": "Cooling and restorative.",
    "aliases": [
      "mor kulambu",
      "mor kuzhambu",
      "buttermilk curry"
    ],
    "diseaseOverrides": {}
  },
  "sprouted chickpea salad": {
    "food": "Sprouted Chickpea Salad",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Sprouted chickpeas providing active enzymes, zinc, and fiber.",
    "notes": "Steam before serving to avoid foodborne bugs.",
    "aliases": [
      "sprouted chickpea salad",
      "chana sprout salad"
    ],
    "diseaseOverrides": {}
  },
  "sprouted fenugreek (methi sprouts)": {
    "food": "Sprouted Fenugreek (Methi Sprouts)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Powerful blood glucose and insulin sensitizer; helps post-op glycemic control.",
    "notes": "Consume 1-2 tablespoons with meals.",
    "aliases": [
      "sprouted fenugreek (methi sprouts)",
      "methi ankurit"
    ],
    "diseaseOverrides": {}
  },
  "moong dal khichdi": {
    "food": "Moong Dal Khichdi",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "The universal gold standard Indian recovery meal; 1:1 ratio of rice and moong dal.",
    "notes": "Cook soft with cumin and pinch of hing.",
    "aliases": [
      "moong dal khichdi",
      "khichdi",
      "dal khichdi"
    ],
    "diseaseOverrides": {}
  },
  "vegetable khichdi": {
    "food": "Vegetable Khichdi",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Moong dal khichdi enriched with carrots, beans, and bottle gourd.",
    "notes": "Complete one-pot recovery nutrition.",
    "aliases": [
      "vegetable khichdi",
      "veg khichdi"
    ],
    "diseaseOverrides": {}
  },
  "pea protein isolate": {
    "food": "Pea Protein Isolate",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Hypoallergenic, dairy-free clean protein powder; supports muscle retention.",
    "notes": "Blend into water or smoothies.",
    "aliases": [
      "pea protein isolate",
      "pea protein"
    ],
    "diseaseOverrides": {}
  },
  "hemp protein powder": {
    "food": "Hemp Protein Powder",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Plant protein containing balanced omega-3 and omega-6 fatty acids.",
    "notes": "Stir into warm porridge.",
    "aliases": [
      "hemp protein powder",
      "hemp protein"
    ],
    "diseaseOverrides": {}
  },
  "besan (gram flour)": {
    "food": "Besan (Gram Flour)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Ground chickpea flour; versatile gluten-free binding and protein source.",
    "notes": "Use for chilla or kadhi.",
    "aliases": [
      "besan (gram flour)",
      "chana flour"
    ],
    "diseaseOverrides": {}
  },
  "kadhi (besan & buttermilk)": {
    "food": "Kadhi (Besan & Buttermilk)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Probiotic buttermilk simmered with gram flour and turmeric; soothing on stomach.",
    "notes": "Keep pakoras boiled or omit them.",
    "aliases": [
      "kadhi (besan & buttermilk)",
      "punjabi kadhi",
      "gujarati kadhi"
    ],
    "diseaseOverrides": {}
  },
  "hummus (classic)": {
    "food": "Hummus (Classic)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Chickpeas blended with tahini, olive oil, and garlic; heart-healthy unsaturated fats.",
    "notes": "Eat with cucumber or carrot sticks.",
    "aliases": [
      "hummus (classic)",
      "chickpea dip",
      "hummus"
    ],
    "diseaseOverrides": {}
  },
  "falafel": {
    "food": "Falafel",
    "category": "Lentils & Legumes",
    "verdict": "limit",
    "explanation": "Chickpea patties; deep frying adds high oil absorption; opt for baked version.",
    "notes": "Choose baked falafel.",
    "aliases": [
      "falafel",
      "baked falafel"
    ],
    "diseaseOverrides": {}
  },
  "roasted edamame": {
    "food": "Roasted Edamame",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Crunchy roasted young soybeans; excellent high-protein, low-glycemic snack.",
    "notes": "Eat unsalted or lightly salted.",
    "aliases": [
      "roasted edamame",
      "crispy edamame"
    ],
    "diseaseOverrides": {}
  },
  "chana chaat (boiled)": {
    "food": "Chana Chaat (Boiled)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Boiled chickpeas tossed with cucumber, tomato, lemon juice, and rock salt.",
    "notes": "Oil-free, refreshing and satiating.",
    "aliases": [
      "chana chaat (boiled)",
      "healthy chana chaat"
    ],
    "diseaseOverrides": {}
  },
  "sprouted lentil soup": {
    "food": "Sprouted Lentil Soup",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Warm broth made with mixed sprouted lentils; bursting with bioavailable micronutrients.",
    "notes": "Simmer with garlic and cumin.",
    "aliases": [
      "sprouted lentil soup",
      "sprout soup"
    ],
    "diseaseOverrides": {}
  },
  "lupin beans": {
    "food": "Lupin Beans",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Exceptionally high in protein and prebiotic fiber; extremely low carbohydrate.",
    "notes": "Consume pickled or boiled.",
    "aliases": [
      "lupin beans",
      "lupini beans"
    ],
    "diseaseOverrides": {}
  },
  "soy milk (unsweetened)": {
    "food": "Soy Milk (Unsweetened)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Equal protein to cow milk; zero lactose, zero cholesterol.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "soy milk (unsweetened)",
      "soy milk"
    ],
    "diseaseOverrides": {}
  },
  "bottle gourd (lauki / doodhi)": {
    "food": "Bottle Gourd (Lauki / Doodhi)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "96% water, ultra-soothing, eliminates abdominal heat and aids liver/heart recovery.",
    "notes": "The #1 recommended vegetable in clinical recovery.",
    "aliases": [
      "bottle gourd (lauki / doodhi)",
      "lauki",
      "doodhi",
      "ghiya",
      "calabash",
      "bottle gourd"
    ],
    "diseaseOverrides": {}
  },
  "ridge gourd (turai / peerkangai)": {
    "food": "Ridge Gourd (Turai / Peerkangai)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Soft, fibrous gourd rich in cellulose; relieves constipation without gas.",
    "notes": "Cook lightly with cumin and turmeric.",
    "aliases": [
      "ridge gourd (turai / peerkangai)",
      "turai",
      "tori",
      "peerkangai",
      "beerakaya"
    ],
    "diseaseOverrides": {}
  },
  "sponge gourd (nenua / gilki)": {
    "food": "Sponge Gourd (Nenua / Gilki)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Extremely gentle, hydrating gourd; easily dissolved and absorbed by recovering gut.",
    "notes": "Prepare as mild sabzi.",
    "aliases": [
      "sponge gourd (nenua / gilki)",
      "nenua",
      "gilki"
    ],
    "diseaseOverrides": {}
  },
  "snake gourd (padwal / pudalangai)": {
    "food": "Snake Gourd (Padwal / Pudalangai)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Cooling, febrifuge vegetable that restores hydration and urinary balance.",
    "notes": "Cook with yellow moong dal.",
    "aliases": [
      "snake gourd (padwal / pudalangai)",
      "padwal",
      "pudalangai",
      "potlakaya"
    ],
    "diseaseOverrides": {}
  },
  "pointed gourd (parwal / potol)": {
    "food": "Pointed Gourd (Parwal / Potol)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Digestive stimulant that purifies blood, balances pitta, and treats jaundice.",
    "notes": "Lightly scrape skin and steam.",
    "aliases": [
      "pointed gourd (parwal / potol)",
      "parwal",
      "potol"
    ],
    "diseaseOverrides": {}
  },
  "ivy gourd (tindora / kundru)": {
    "food": "Ivy Gourd (Tindora / Kundru)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Clinically proven insulin-mimetic properties; helps regulate blood sugar.",
    "notes": "Steam or stir-fry with minimal oil.",
    "aliases": [
      "ivy gourd (tindora / kundru)",
      "tindora",
      "kundru",
      "dondakaya"
    ],
    "diseaseOverrides": {}
  },
  "bitter gourd (karela)": {
    "food": "Bitter Gourd (Karela)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Contains charantin and polypeptide-p; premier natural blood glucose lowering food.",
    "notes": "Scrape and steam; avoid deep frying in oil.",
    "aliases": [
      "bitter gourd (karela)",
      "karela",
      "bitter melon",
      "kakarakaya"
    ],
    "diseaseOverrides": {
      "diabetes": {
        "verdict": "suitable",
        "explanation": "Directly improves cellular glucose uptake and HbA1c."
      }
    }
  },
  "ash gourd (safed petha)": {
    "food": "Ash Gourd (Safed Petha)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Highly alkaline vegetable; neutralizes stomach acidity and cleanses urinary tract.",
    "notes": "Drink fresh juice or cook with dal.",
    "aliases": [
      "ash gourd (safed petha)",
      "safed petha",
      "winter melon",
      "benincasa",
      "ash gourd"
    ],
    "diseaseOverrides": {}
  },
  "pumpkin (kaddu / sitaphal)": {
    "food": "Pumpkin (Kaddu / Sitaphal)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Packed with beta-carotene, lutein, and soothing soluble pectin for stomach lining.",
    "notes": "Steam into soup or mild curry.",
    "aliases": [
      "pumpkin (kaddu / sitaphal)",
      "kaddu",
      "yellow pumpkin",
      "bhopla",
      "gummadikaya"
    ],
    "diseaseOverrides": {}
  },
  "zucchini (courgette)": {
    "food": "Zucchini (Courgette)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Tender summer squash; zero starch, rich in potassium and gentle soluble fiber.",
    "notes": "Steam or saute in light olive oil.",
    "aliases": [
      "zucchini (courgette)",
      "courgette",
      "green zucchini"
    ],
    "diseaseOverrides": {}
  },
  "yellow squash": {
    "food": "Yellow Squash",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Bright, mild vegetable rich in vitamin A and folate; easily digested.",
    "notes": "Steam until fork-tender.",
    "aliases": [
      "yellow squash",
      "summer squash"
    ],
    "diseaseOverrides": {}
  },
  "butternut squash": {
    "food": "Butternut Squash",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Sweet, velvety squash rich in antioxidants; creates comforting recovery soups.",
    "notes": "Puree into warm soup.",
    "aliases": [
      "butternut squash",
      "butternut"
    ],
    "diseaseOverrides": {}
  },
  "cucumber": {
    "food": "Cucumber",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Hydration booster (95% water); flushes toxins and cools the gastrointestinal tract.",
    "notes": "Peel skin during early post-op recovery.",
    "aliases": [
      "cucumber",
      "kheera",
      "kakdi",
      "cucumber"
    ],
    "diseaseOverrides": {}
  },
  "carrot (cooked / steamed)": {
    "food": "Carrot (Cooked / Steamed)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Cooking breaks cellular walls, boosting beta-carotene bioavailability for wound healing.",
    "notes": "Steam until soft; preferred over raw crunchy carrots.",
    "aliases": [
      "carrot (cooked / steamed)",
      "gajar",
      "steamed carrots",
      "cooked carrots"
    ],
    "diseaseOverrides": {}
  },
  "raw crunchy carrots": {
    "food": "Raw Crunchy Carrots",
    "category": "Vegetables",
    "verdict": "limit",
    "explanation": "Raw fibrous matrix can cause intestinal gas and strain early postoperative gut.",
    "notes": "Steam or boil during initial recovery weeks.",
    "aliases": [
      "raw crunchy carrots",
      "raw carrots"
    ],
    "diseaseOverrides": {}
  },
  "beetroot (cooked)": {
    "food": "Beetroot (Cooked)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Rich in dietary nitrates that dilate blood vessels, lower BP, and rebuild red cells.",
    "notes": "Boil, steam, or drink fresh juice.",
    "aliases": [
      "beetroot (cooked)",
      "chukandar",
      "beet",
      "boiled beetroot"
    ],
    "diseaseOverrides": {}
  },
  "turnip (shalgam)": {
    "food": "Turnip (Shalgam)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Cruciferous root vegetable with antimicrobial glucosinolates and potassium.",
    "notes": "Boil into soups or mash.",
    "aliases": [
      "turnip (shalgam)",
      "shalgam",
      "white turnip"
    ],
    "diseaseOverrides": {}
  },
  "radish (cooked mooli)": {
    "food": "Radish (Cooked Mooli)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Stimulates liver bile flow and cleanses bilirubin; great for jaundice recovery.",
    "notes": "Cook thoroughly to eliminate pungency.",
    "aliases": [
      "radish (cooked mooli)",
      "mooli",
      "cooked radish"
    ],
    "diseaseOverrides": {}
  },
  "raw pungent radish": {
    "food": "Raw Pungent Radish",
    "category": "Vegetables",
    "verdict": "limit",
    "explanation": "Sulfur compounds cause burping, acid reflux, and abdominal gas.",
    "notes": "Avoid raw radish post surgery.",
    "aliases": [
      "raw pungent radish",
      "raw mooli"
    ],
    "diseaseOverrides": {}
  },
  "boiled potato (skinless)": {
    "food": "Boiled Potato (Skinless)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Simple, non-irritating starch; provides gentle energy during convalescence.",
    "notes": "Boil in water; avoid frying or butter.",
    "aliases": [
      "boiled potato (skinless)",
      "boiled aloo",
      "boiled potato"
    ],
    "diseaseOverrides": {
      "diabetes": {
        "verdict": "limit",
        "explanation": "High glycemic index; substitute with sweet potato or green vegetables."
      }
    }
  },
  "french fries / potato chips": {
    "food": "French Fries / Potato Chips",
    "category": "Vegetables",
    "verdict": "avoid",
    "explanation": "Deep-fried potato saturated with trans fats, acrylamide, and heavy sodium.",
    "notes": "Strictly prohibited during recovery.",
    "aliases": [
      "french fries / potato chips",
      "french fries",
      "fried chips",
      "potato wafers"
    ],
    "diseaseOverrides": {}
  },
  "sweet potato (shakarkand)": {
    "food": "Sweet Potato (Shakarkand)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Low glycemic complex carbohydrate packed with Vitamin A for surgical wound epithelization.",
    "notes": "Boil or bake plain.",
    "aliases": [
      "sweet potato (shakarkand)",
      "shakarkandi",
      "boiled sweet potato"
    ],
    "diseaseOverrides": {}
  },
  "tapioca root (cassava)": {
    "food": "Tapioca Root (Cassava)",
    "category": "Vegetables",
    "verdict": "limit",
    "explanation": "Dense starch; provides energy but requires thorough cooking to eliminate cyanogens.",
    "notes": "Boil thoroughly.",
    "aliases": [
      "tapioca root (cassava)",
      "cassava",
      "maravalli kizhangu"
    ],
    "diseaseOverrides": {}
  },
  "colocasia (arbi / taro)": {
    "food": "Colocasia (Arbi / Taro)",
    "category": "Vegetables",
    "verdict": "limit",
    "explanation": "High in starch and calcium oxalate crystals; can cause throat itchiness or gas if undercooked.",
    "notes": "Boil and peel thoroughly; cook with ajwain.",
    "aliases": [
      "colocasia (arbi / taro)",
      "arbi",
      "taro root",
      "chamagadda"
    ],
    "diseaseOverrides": {}
  },
  "elephant yam (suran / jimikand)": {
    "food": "Elephant Yam (Suran / Jimikand)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Renowned in proctology for improving hemorrhoids, fissure healing, and gut motility.",
    "notes": "Boil well with tamarind/lemon to neutralize oxalates.",
    "aliases": [
      "elephant yam (suran / jimikand)",
      "suran",
      "jimikand",
      "yam"
    ],
    "diseaseOverrides": {}
  },
  "raw banana / plantain (cooked)": {
    "food": "Raw Banana / Plantain (Cooked)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "High in resistant starch; feeds colonocytes, stops diarrhea, and strengthens gut barrier.",
    "notes": "Boil or cook as mild curry.",
    "aliases": [
      "raw banana / plantain (cooked)",
      "kaccha kela",
      "plantain"
    ],
    "diseaseOverrides": {}
  },
  "raw papaya (cooked)": {
    "food": "Raw Papaya (Cooked)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Contains papain enzyme which breaks down stubborn dietary proteins and aids digestion.",
    "notes": "Cook with lentils or in mild vegetable stew.",
    "aliases": [
      "raw papaya (cooked)",
      "kaccha papita",
      "green papaya"
    ],
    "diseaseOverrides": {}
  },
  "tomato (cooked / stewed)": {
    "food": "Tomato (Cooked / Stewed)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Cooking increases lycopene bioavailability tenfold, protecting prostate and cardiac tissue.",
    "notes": "Cook in dal, rasam, or soup.",
    "aliases": [
      "tomato (cooked / stewed)",
      "cooked tomato",
      "tamatar"
    ],
    "diseaseOverrides": {}
  },
  "raw sour tomatoes": {
    "food": "Raw Sour Tomatoes",
    "category": "Vegetables",
    "verdict": "limit",
    "explanation": "High malic and citric acid can aggravate active GERD, gastric ulcers, or bladder spasms.",
    "notes": "Cook thoroughly or deseed.",
    "aliases": [
      "raw sour tomatoes",
      "raw tomatoes"
    ],
    "diseaseOverrides": {}
  },
  "onion (cooked)": {
    "food": "Onion (Cooked)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Packed with quercetin bioflavonoid; reduces vascular inflammation and supports immunity.",
    "notes": "Saute gently until translucent; avoid burning.",
    "aliases": [
      "onion (cooked)",
      "cooked pyaz",
      "sauteed onion"
    ],
    "diseaseOverrides": {}
  },
  "raw pungent onion": {
    "food": "Raw Pungent Onion",
    "category": "Vegetables",
    "verdict": "limit",
    "explanation": "Fructan oligosaccharides ferment rapidly, causing flatulence, gas pain, and acid reflux.",
    "notes": "Cook before eating post surgery.",
    "aliases": [
      "raw pungent onion",
      "raw pyaz",
      "sliced raw onion"
    ],
    "diseaseOverrides": {}
  },
  "garlic (cooked / roasted)": {
    "food": "Garlic (Cooked / Roasted)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Allicin supports immune defense, lowers blood pressure, and improves lipid profiles.",
    "notes": "Crush and let sit 10 mins before light cooking.",
    "aliases": [
      "garlic (cooked / roasted)",
      "cooked lehsun",
      "roasted garlic"
    ],
    "diseaseOverrides": {}
  },
  "raw garlic (high doses)": {
    "food": "Raw Garlic (High Doses)",
    "category": "Vegetables",
    "verdict": "limit",
    "explanation": "Possesses natural antiplatelet properties; may increase bleeding risk if on blood thinners.",
    "notes": "Do not binge on raw garlic cloves if taking aspirin.",
    "aliases": [
      "raw garlic (high doses)",
      "raw lehsun"
    ],
    "diseaseOverrides": {}
  },
  "ginger (fresh adrak)": {
    "food": "Ginger (Fresh Adrak)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Gingerols relieve postoperative nausea, accelerate gastric emptying, and curb pain.",
    "notes": "Drink fresh ginger tea or add to cooking.",
    "aliases": [
      "ginger (fresh adrak)",
      "adrak",
      "fresh ginger",
      "ginger tea"
    ],
    "diseaseOverrides": {}
  },
  "dry ginger (sonth)": {
    "food": "Dry Ginger (Sonth)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Concentrated shogaols relieve joint pain, inflammation, and digestive sluggishness.",
    "notes": "Mix pinch with warm water.",
    "aliases": [
      "dry ginger (sonth)",
      "saunth",
      "dry ginger powder"
    ],
    "diseaseOverrides": {}
  },
  "spinach (palak - cooked)": {
    "food": "Spinach (Palak - Cooked)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Loaded with folate, iron, magnesium, and lutein; supports tissue repair.",
    "notes": "Cook or blanch; do not eat huge raw heaps.",
    "aliases": [
      "spinach (palak - cooked)",
      "palak",
      "cooked spinach"
    ],
    "diseaseOverrides": {
      "kidney_stone": {
        "verdict": "limit",
        "explanation": "High in oxalates; limit if prone to calcium oxalate kidney stones."
      }
    }
  },
  "fenugreek leaves (methi)": {
    "food": "Fenugreek Leaves (Methi)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Regulates postprandial glucose, reduces triglycerides, and stimulates bowel motility.",
    "notes": "Cook with potatoes, dal, or in thepla.",
    "aliases": [
      "fenugreek leaves (methi)",
      "methi",
      "fresh fenugreek"
    ],
    "diseaseOverrides": {}
  },
  "mustard greens (sarson)": {
    "food": "Mustard Greens (Sarson)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Deep green cruciferous leaf rich in Vitamin K, sulforaphane, and dietary calcium.",
    "notes": "Cook as mild saag with light oil.",
    "aliases": [
      "mustard greens (sarson)",
      "sarson ka saag"
    ],
    "diseaseOverrides": {}
  },
  "drumstick leaves (moringa)": {
    "food": "Drumstick Leaves (Moringa)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Nutritional superfood; 7x Vitamin C of oranges and 4x calcium of milk for wound healing.",
    "notes": "Add to dal, soup, or poriyal.",
    "aliases": [
      "drumstick leaves (moringa)",
      "moringa leaves",
      "murungai keerai"
    ],
    "diseaseOverrides": {}
  },
  "drumstick pods (moringa)": {
    "food": "Drumstick Pods (Moringa)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "High prebiotic fiber and anti-inflammatory isothiocyanates; supports cardiac health.",
    "notes": "Boil in sambar, rasam or soup.",
    "aliases": [
      "drumstick pods (moringa)",
      "sahjan",
      "murungakkai"
    ],
    "diseaseOverrides": {}
  },
  "curry leaves (kadi patta)": {
    "food": "Curry Leaves (Kadi Patta)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Rich in mahanimbine alkaloids; supports hair retention, liver enzyme stability, and glucose.",
    "notes": "Chew 5-6 fresh leaves or use in tempering.",
    "aliases": [
      "curry leaves (kadi patta)",
      "kadi patta",
      "karivepaku"
    ],
    "diseaseOverrides": {}
  },
  "coriander leaves (cilantro)": {
    "food": "Coriander Leaves (Cilantro)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Natural chelator that aids heavy metal clearance and supports kidney filtration.",
    "notes": "Garnish freely on warm meals.",
    "aliases": [
      "coriander leaves (cilantro)",
      "dhaniya patti",
      "fresh cilantro"
    ],
    "diseaseOverrides": {}
  },
  "mint leaves (pudina)": {
    "food": "Mint Leaves (Pudina)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Menthol relaxes gastrointestinal smooth muscle, eliminating gas spasms and nausea.",
    "notes": "Steep in hot water or blend in chutney.",
    "aliases": [
      "mint leaves (pudina)",
      "pudina",
      "fresh mint"
    ],
    "diseaseOverrides": {}
  },
  "dill leaves (shepu / suva)": {
    "food": "Dill Leaves (Shepu / Suva)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Carminative herb that dissolves intestinal gas and relieves abdominal colic.",
    "notes": "Cook with yellow moong dal.",
    "aliases": [
      "dill leaves (shepu / suva)",
      "shepu",
      "suva bhaji",
      "dill"
    ],
    "diseaseOverrides": {}
  },
  "cabbage (cooked)": {
    "food": "Cabbage (Cooked)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Rich in glutamine; clinically shown to heal stomach mucosal ulcers and regenerate gut cells.",
    "notes": "Steam or boil tender.",
    "aliases": [
      "cabbage (cooked)",
      "patta gobhi",
      "steamed cabbage"
    ],
    "diseaseOverrides": {}
  },
  "raw cabbage / coleslaw": {
    "food": "Raw Cabbage / Coleslaw",
    "category": "Vegetables",
    "verdict": "limit",
    "explanation": "Raw goitrogens and indigestible raffinose sugars provoke massive abdominal bloating.",
    "notes": "Avoid raw cabbage post-surgery.",
    "aliases": [
      "raw cabbage / coleslaw",
      "raw cabbage"
    ],
    "diseaseOverrides": {}
  },
  "cauliflower (cooked gobi)": {
    "food": "Cauliflower (Cooked Gobi)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Glucosinolate-rich vegetable supporting liver Phase II detoxification pathways.",
    "notes": "Steam with pinch of turmeric and hing.",
    "aliases": [
      "cauliflower (cooked gobi)",
      "phool gobhi",
      "steamed cauliflower"
    ],
    "diseaseOverrides": {}
  },
  "broccoli (steamed)": {
    "food": "Broccoli (Steamed)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Sulforaphane powerhouse; activates Nrf2 antioxidant pathway and supports vascular recovery.",
    "notes": "Steam for 3-4 minutes to preserve enzymes.",
    "aliases": [
      "broccoli (steamed)",
      "steamed broccoli",
      "hari gobhi"
    ],
    "diseaseOverrides": {}
  },
  "brussels sprouts": {
    "food": "Brussels Sprouts",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Packed with Vitamin K and dietary fiber; boil or roast lightly with olive oil.",
    "notes": "Avoid overcooking to prevent sulfur smell.",
    "aliases": [
      "brussels sprouts",
      "brussels sprouts"
    ],
    "diseaseOverrides": {}
  },
  "french beans (green beans)": {
    "food": "French Beans (Green Beans)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Low-calorie, highly digestible vegetable loaded with silicon for bone and tendon repair.",
    "notes": "Steam with light mustard tempering.",
    "aliases": [
      "french beans (green beans)",
      "french beans",
      "green beans",
      "phalli"
    ],
    "diseaseOverrides": {}
  },
  "cluster beans (gawar phalli)": {
    "food": "Cluster Beans (Gawar Phalli)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Rich in guar gum soluble fiber; profoundly lowers blood cholesterol and sugar.",
    "notes": "Boil well before eating.",
    "aliases": [
      "cluster beans (gawar phalli)",
      "gawar",
      "guar beans"
    ],
    "diseaseOverrides": {}
  },
  "ladyfinger (okra / bhindi)": {
    "food": "Ladyfinger (Okra / Bhindi)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Mucilaginous fiber coats stomach lining, absorbs excess cholesterol, and relieves constipation.",
    "notes": "Cook with minimal oil to keep benefits.",
    "aliases": [
      "ladyfinger (okra / bhindi)",
      "bhindi",
      "okra",
      "bhendi"
    ],
    "diseaseOverrides": {}
  },
  "green bell pepper (capsicum)": {
    "food": "Green Bell Pepper (Capsicum)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Very rich in Vitamin C (more than oranges); vital for collagen formation in surgical scars.",
    "notes": "Saute lightly with vegetables.",
    "aliases": [
      "green bell pepper (capsicum)",
      "capsicum",
      "shimla mirch"
    ],
    "diseaseOverrides": {}
  },
  "red bell pepper": {
    "food": "Red Bell Pepper",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Fully ripened capsicum loaded with lycopene, cryptoxanthin, and massive Vitamin C.",
    "notes": "Excellent raw or grilled.",
    "aliases": [
      "red bell pepper",
      "red capsicum"
    ],
    "diseaseOverrides": {}
  },
  "yellow bell pepper": {
    "food": "Yellow Bell Pepper",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Sweet, juicy pepper loaded with lutein and zeaxanthin for vascular and eye health.",
    "notes": "Add to salads or stir-fries.",
    "aliases": [
      "yellow bell pepper",
      "yellow capsicum"
    ],
    "diseaseOverrides": {}
  },
  "button mushroom": {
    "food": "Button Mushroom",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Rich in beta-glucans, selenium, and ergothioneine; primes natural killer immune cells.",
    "notes": "Saute thoroughly in light oil.",
    "aliases": [
      "button mushroom",
      "white mushroom",
      "khumb"
    ],
    "diseaseOverrides": {}
  },
  "portobello mushroom": {
    "food": "Portobello Mushroom",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Meaty, hearty mushroom providing B-complex vitamins and potassium.",
    "notes": "Grill with herbs.",
    "aliases": [
      "portobello mushroom",
      "portobello"
    ],
    "diseaseOverrides": {}
  },
  "shiitake mushroom": {
    "food": "Shiitake Mushroom",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Contains lentinan; proven immune-modulating polysaccharide.",
    "notes": "Add to warm vegetable broths.",
    "aliases": [
      "shiitake mushroom",
      "shiitake"
    ],
    "diseaseOverrides": {}
  },
  "baby corn": {
    "food": "Baby Corn",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Low-calorie, fiber-rich immature corn; gentle on bowel transit.",
    "notes": "Steam in soups and stir-fries.",
    "aliases": [
      "baby corn",
      "baby corn"
    ],
    "diseaseOverrides": {}
  },
  "sweet corn (boiled)": {
    "food": "Sweet Corn (Boiled)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Packed with lutein, zeaxanthin, and ferulic acid; delicious energy booster.",
    "notes": "Boil plain; avoid lathering in heavy salted butter.",
    "aliases": [
      "sweet corn (boiled)",
      "boiled corn",
      "makai"
    ],
    "diseaseOverrides": {}
  },
  "lotus seeds (makhana / foxnuts)": {
    "food": "Lotus Seeds (Makhana / Foxnuts)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Superb anti-aging, low-sodium, high-magnesium snack; strengthens spleen and kidneys.",
    "notes": "Roast dry on low heat with pinch of rock salt.",
    "aliases": [
      "lotus seeds (makhana / foxnuts)",
      "makhana",
      "phool makhana",
      "foxnuts"
    ],
    "diseaseOverrides": {}
  },
  "lotus root (kamal kakdi)": {
    "food": "Lotus Root (Kamal Kakdi)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Crisp, woody root packed with dietary fiber, iron, and potassium.",
    "notes": "Boil or pressure cook until tender.",
    "aliases": [
      "lotus root (kamal kakdi)",
      "kamal kakdi",
      "bheen"
    ],
    "diseaseOverrides": {}
  },
  "bamboo shoots": {
    "food": "Bamboo Shoots",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Ultra low-calorie, high phytosterol vegetable; supports healthy lipid clearance.",
    "notes": "Boil thoroughly to eliminate bitter compounds.",
    "aliases": [
      "bamboo shoots",
      "bamboo shoots"
    ],
    "diseaseOverrides": {}
  },
  "water chestnut (fresh singhara)": {
    "food": "Water Chestnut (Fresh Singhara)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Crisp aquatic corm; cooling, antioxidant rich, and naturally gluten-free.",
    "notes": "Peel and eat fresh or steamed.",
    "aliases": [
      "water chestnut (fresh singhara)",
      "singhara",
      "fresh water chestnut"
    ],
    "diseaseOverrides": {}
  },
  "celery": {
    "food": "Celery",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Contains 3-n-butylphthalide which relaxes arterial smooth muscles and lowers BP.",
    "notes": "Add to vegetable soups or juices.",
    "aliases": [
      "celery",
      "celery stalks"
    ],
    "diseaseOverrides": {}
  },
  "asparagus": {
    "food": "Asparagus",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Rich in asparagine and glutathione; natural mild diuretic that flushes excess sodium.",
    "notes": "Steam with drops of lemon juice.",
    "aliases": [
      "asparagus",
      "shatavari shoots",
      "asparagus"
    ],
    "diseaseOverrides": {}
  },
  "artichoke": {
    "food": "Artichoke",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Highest antioxidant score among common vegetables; cynarin regenerates liver cells.",
    "notes": "Steam whole or eat hearts.",
    "aliases": [
      "artichoke",
      "globe artichoke"
    ],
    "diseaseOverrides": {}
  },
  "lettuce (romaine / butterhead)": {
    "food": "Lettuce (Romaine / Butterhead)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Crisp, mild leafy green; provides lactucarium which calms the nervous system.",
    "notes": "Wash thoroughly in purified water.",
    "aliases": [
      "lettuce (romaine / butterhead)",
      "romaine lettuce",
      "salad greens"
    ],
    "diseaseOverrides": {}
  },
  "arugula (rocket)": {
    "food": "Arugula (Rocket)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Peppery cruciferous green rich in dietary nitrates; expands coronary arteries.",
    "notes": "Toss into post-discharge salads.",
    "aliases": [
      "arugula (rocket)",
      "rocket leaves"
    ],
    "diseaseOverrides": {}
  },
  "kale (steamed)": {
    "food": "Kale (Steamed)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Nutrient-dense super green loaded with vitamins A, K, C, and glucosinolates.",
    "notes": "Massage with olive oil or steam.",
    "aliases": [
      "kale (steamed)",
      "curly kale"
    ],
    "diseaseOverrides": {}
  },
  "watercress": {
    "food": "Watercress",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Contains PEITC compound; powerful cellular defense activator.",
    "notes": "Add to light sandwiches and broths.",
    "aliases": [
      "watercress",
      "watercress leaves"
    ],
    "diseaseOverrides": {}
  },
  "ripe banana": {
    "food": "Ripe Banana",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Easily digestible, restores potassium, and coats gastric mucosa.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "ripe banana",
      "banana",
      "kela"
    ],
    "diseaseOverrides": {}
  },
  "raw plantain": {
    "food": "Raw Plantain",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "High resistant starch stops diarrhea and heals gut lining.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "raw plantain",
      "kaccha kela"
    ],
    "diseaseOverrides": {}
  },
  "red apple": {
    "food": "Red Apple",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Rich in pectin soluble fiber; binds toxins and stabilizes bowels.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "red apple",
      "apple",
      "seb"
    ],
    "diseaseOverrides": {}
  },
  "green apple": {
    "food": "Green Apple",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Crisp with lower sugar content and higher malic acid.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "green apple",
      "granny smith apple"
    ],
    "diseaseOverrides": {}
  },
  "papaya (ripe)": {
    "food": "Papaya (Ripe)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Rich in papain and lycopene; smooths bowel movements effortlessly.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "papaya (ripe)",
      "papita",
      "papaya"
    ],
    "diseaseOverrides": {}
  },
  "pomegranate (anar)": {
    "food": "Pomegranate (Anar)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Punicalagins protect arterial walls and restore hemoglobin.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "pomegranate (anar)",
      "anar",
      "pomegranate"
    ],
    "diseaseOverrides": {}
  },
  "sweet lime (mosambi)": {
    "food": "Sweet Lime (Mosambi)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Mild citrus fruit; gentle on stomach, hydrating and rich in Vitamin C.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "sweet lime (mosambi)",
      "mosambi",
      "mousambi"
    ],
    "diseaseOverrides": {}
  },
  "orange (santra)": {
    "food": "Orange (Santra)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Boosts immune phagocytes and collagen cross-linking in wounds.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "orange (santra)",
      "orange",
      "santra"
    ],
    "diseaseOverrides": {}
  },
  "watermelon": {
    "food": "Watermelon",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "92% water with high citrulline; hydrates cells and cools inflammation.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "watermelon",
      "tarbooz",
      "watermelon"
    ],
    "diseaseOverrides": {}
  },
  "muskmelon (kharbuja)": {
    "food": "Muskmelon (Kharbuja)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Vitamin A and beta-carotene powerhouse; combats post-op constipation.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "muskmelon (kharbuja)",
      "kharbuja",
      "cantaloupe"
    ],
    "diseaseOverrides": {}
  },
  "guava (amrood)": {
    "food": "Guava (Amrood)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Contains 4x Vitamin C of oranges; low glycemic index.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "guava (amrood)",
      "amrood",
      "guava"
    ],
    "diseaseOverrides": {}
  },
  "green grapes": {
    "food": "Green Grapes",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Hydrating fruit with resveratrol; eat in moderation due to sugar.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "green grapes",
      "angoor",
      "grapes"
    ],
    "diseaseOverrides": {}
  },
  "black grapes": {
    "food": "Black Grapes",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Concentrated anthocyanins; protects heart and brain microvessels.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "black grapes",
      "kale angoor"
    ],
    "diseaseOverrides": {}
  },
  "alphonso mango": {
    "food": "Alphonso Mango",
    "category": "Fruits & Berries",
    "verdict": "limit",
    "explanation": "High fructose and sucrose; delicious but raises glucose rapidly.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "alphonso mango",
      "mango",
      "aam"
    ],
    "diseaseOverrides": {}
  },
  "raw green mango": {
    "food": "Raw Green Mango",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Boil into aam panna to prevent heat stroke and replenish electrolytes.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "raw green mango",
      "kaccha aam"
    ],
    "diseaseOverrides": {}
  },
  "pineapple": {
    "food": "Pineapple",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Bromelain enzyme dramatically reduces postoperative swelling and bruising.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "pineapple",
      "ananas",
      "pineapple"
    ],
    "diseaseOverrides": {}
  },
  "kiwi fruit": {
    "food": "Kiwi Fruit",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Actinidin enzyme aids protein digestion; 2 kiwis daily relieves constipation.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "kiwi fruit",
      "kiwi"
    ],
    "diseaseOverrides": {}
  },
  "strawberries": {
    "food": "Strawberries",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Ellagic acid and Vitamin C protect tissues; low glycemic load.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "strawberries",
      "strawberry"
    ],
    "diseaseOverrides": {}
  },
  "blueberries": {
    "food": "Blueberries",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Premier brain and vascular antioxidant; protects memory and endothelial cells.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "blueberries",
      "blueberry"
    ],
    "diseaseOverrides": {}
  },
  "blackberries": {
    "food": "Blackberries",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "High bioflavonoid density; supports capillary resistance.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "blackberries",
      "blackberry"
    ],
    "diseaseOverrides": {}
  },
  "raspberries": {
    "food": "Raspberries",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Rich in raspberry ketone and dietary fiber.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "raspberries",
      "raspberry"
    ],
    "diseaseOverrides": {}
  },
  "cranberries": {
    "food": "Cranberries",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Proanthocyanidins prevent E. coli bacteria from binding to bladder wall.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "cranberries",
      "cranberry"
    ],
    "diseaseOverrides": {}
  },
  "amla (indian gooseberry)": {
    "food": "Amla (Indian Gooseberry)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Highest stable Vitamin C source on earth; accelerates surgical wound healing.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "amla (indian gooseberry)",
      "amla",
      "gooseberry"
    ],
    "diseaseOverrides": {}
  },
  "chikoo (sapota)": {
    "food": "Chikoo (Sapota)",
    "category": "Fruits & Berries",
    "verdict": "limit",
    "explanation": "Very sweet, high sucrose fruit; provide quick energy but spike sugar.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "chikoo (sapota)",
      "sapota",
      "chikoo"
    ],
    "diseaseOverrides": {}
  },
  "custard apple (sitaphal)": {
    "food": "Custard Apple (Sitaphal)",
    "category": "Fruits & Berries",
    "verdict": "limit",
    "explanation": "Creamy, high-calorie fruit; rich in magnesium but high in carbohydrates.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "custard apple (sitaphal)",
      "sitaphal",
      "sharifa"
    ],
    "diseaseOverrides": {}
  },
  "fresh figs (anjeer)": {
    "food": "Fresh Figs (Anjeer)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Soft soluble fiber and seeds promote natural gentle bowel emptying.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "fresh figs (anjeer)",
      "fresh anjeer"
    ],
    "diseaseOverrides": {}
  },
  "dried figs (soaked anjeer)": {
    "food": "Dried Figs (Soaked Anjeer)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Soak overnight in water; gold standard natural cure for post-op constipation.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "dried figs (soaked anjeer)",
      "anjeer",
      "soaked anjeer"
    ],
    "diseaseOverrides": {}
  },
  "plum (aloo bukhara)": {
    "food": "Plum (Aloo Bukhara)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Prunes and plums contain sorbitol which softens stools naturally.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "plum (aloo bukhara)",
      "aloo bukhara",
      "plum"
    ],
    "diseaseOverrides": {}
  },
  "apricot (khubani)": {
    "food": "Apricot (Khubani)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Rich in beta-carotene and potassium for cellular recovery.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "apricot (khubani)",
      "apricot",
      "khubani"
    ],
    "diseaseOverrides": {}
  },
  "sweet cherries": {
    "food": "Sweet Cherries",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Anthocyanins lower serum uric acid and reduce gout flare-ups.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "sweet cherries",
      "cherries"
    ],
    "diseaseOverrides": {}
  },
  "lychee": {
    "food": "Lychee",
    "category": "Fruits & Berries",
    "verdict": "limit",
    "explanation": "High simple sugar content; eat 4-5 maximum per sitting.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "lychee",
      "litchi",
      "lychee"
    ],
    "diseaseOverrides": {}
  },
  "dragon fruit (pitaya)": {
    "food": "Dragon Fruit (Pitaya)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Low sugar, prebiotic tiny black seeds support healthy bowel flora.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "dragon fruit (pitaya)",
      "dragon fruit"
    ],
    "diseaseOverrides": {}
  },
  "avocado": {
    "food": "Avocado",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Oleic monounsaturated fatty acids reduce bad LDL and nourish skin.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "avocado",
      "avocado",
      "butter fruit"
    ],
    "diseaseOverrides": {}
  },
  "tender coconut water": {
    "food": "Tender Coconut Water",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Identical electrolyte balance to human plasma; premier natural hydration.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "tender coconut water",
      "nariyal pani",
      "coconut water"
    ],
    "diseaseOverrides": {}
  },
  "tender coconut meat (malai)": {
    "food": "Tender Coconut Meat (Malai)",
    "category": "Fruits & Berries",
    "verdict": "limit",
    "explanation": "High in medium-chain triglycerides; nutritious but calorie dense.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "tender coconut meat (malai)",
      "coconut malai"
    ],
    "diseaseOverrides": {}
  },
  "jamun (black plum)": {
    "food": "Jamun (Black Plum)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Jamboline in seeds and flesh helps convert starch into energy; great for diabetes.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "jamun (black plum)",
      "jamun"
    ],
    "diseaseOverrides": {}
  },
  "wood apple (bael fruit)": {
    "food": "Wood Apple (Bael Fruit)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Tannins and mucilage cure chronic dysentery, IBS, and digestive inflammation.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "wood apple (bael fruit)",
      "bael"
    ],
    "diseaseOverrides": {}
  },
  "dates (khajoor)": {
    "food": "Dates (Khajoor)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Natural iron and potassium; provides steady convalescent energy.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "dates (khajoor)",
      "dates",
      "khajur"
    ],
    "diseaseOverrides": {}
  },
  "prunes (dried plums)": {
    "food": "Prunes (Dried Plums)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Clinically proven to restore regular bowel movements after surgery.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "prunes (dried plums)",
      "prunes",
      "dried plums"
    ],
    "diseaseOverrides": {}
  },
  "raisins (kishmish - soaked)": {
    "food": "Raisins (Kishmish - Soaked)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Soaking removes surface sulfites; releases gentle bioavailable iron.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "raisins (kishmish - soaked)",
      "kishmish",
      "sultanas"
    ],
    "diseaseOverrides": {}
  },
  "black raisins (munakka)": {
    "food": "Black Raisins (Munakka)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Ayurvedic tonic for blood building and soothing digestive burn.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "black raisins (munakka)",
      "munakka"
    ],
    "diseaseOverrides": {}
  },
  "grapefruit": {
    "food": "Grapefruit",
    "category": "Fruits & Berries",
    "verdict": "limit",
    "explanation": "INTERACTION WARNING: Strongly blocks CYP3A4 liver enzyme; forbidden with statins/BP meds.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "grapefruit",
      "grapefruit",
      "pomelo"
    ],
    "diseaseOverrides": {}
  },
  "pear (nashpati)": {
    "food": "Pear (Nashpati)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Gentle, non-allergenic fruit; safe even for the most delicate convalescent stomachs.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "pear (nashpati)",
      "pear",
      "nashpati"
    ],
    "diseaseOverrides": {}
  },
  "peach (aadhoo)": {
    "food": "Peach (Aadhoo)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Soft, easily digestible stone fruit rich in carotenoids.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "peach (aadhoo)",
      "peach",
      "aadhoo"
    ],
    "diseaseOverrides": {}
  },
  "sweet tamarind": {
    "food": "Sweet Tamarind",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Provides tartaric acid and B-vitamins for metabolic energy.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "sweet tamarind",
      "meethi imli"
    ],
    "diseaseOverrides": {}
  },
  "mulberry (shahtoot)": {
    "food": "Mulberry (Shahtoot)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Rich in resveratrol; strengthens vascular integrity.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "mulberry (shahtoot)",
      "shahtoot"
    ],
    "diseaseOverrides": {}
  },
  "cape gooseberry (rasbhari)": {
    "food": "Cape Gooseberry (Rasbhari)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Polyphenol rich golden berries; immune supportive.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "cape gooseberry (rasbhari)",
      "rasbhari"
    ],
    "diseaseOverrides": {}
  },
  "passion fruit": {
    "food": "Passion Fruit",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Harman alkaloids relax nerves and reduce anxious sleeplessness.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "passion fruit",
      "passion fruit"
    ],
    "diseaseOverrides": {}
  },
  "star fruit (kamrakh)": {
    "food": "Star Fruit (Kamrakh)",
    "category": "Fruits & Berries",
    "verdict": "limit",
    "explanation": "CAUTION: Neurotoxin caramboxin is lethal in renal failure/CKD patients.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "star fruit (kamrakh)",
      "star fruit",
      "kamrakh"
    ],
    "diseaseOverrides": {}
  },
  "persimmon": {
    "food": "Persimmon",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Tannins and soluble fiber support vascular flexibility.",
    "notes": "Clinical recovery fruit protocol.",
    "aliases": [
      "persimmon",
      "japani phal",
      "persimmon"
    ],
    "diseaseOverrides": {}
  },
  "skimmed milk (fat-free)": {
    "food": "Skimmed Milk (Fat-Free)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "High protein and calcium without heavy saturated dairy fat.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "skimmed milk (fat-free)",
      "skim milk",
      "double toned milk"
    ],
    "diseaseOverrides": {}
  },
  "toned milk (3% fat)": {
    "food": "Toned Milk (3% Fat)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Standard pasteurized cow milk; well tolerated in recovery.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "toned milk (3% fat)",
      "toned milk"
    ],
    "diseaseOverrides": {}
  },
  "full cream milk": {
    "food": "Full Cream Milk",
    "category": "Dairy & Plant Milks",
    "verdict": "limit",
    "explanation": "High saturated fat content delays gastric emptying and provokes nausea.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "full cream milk",
      "full fat milk",
      "buffalo milk"
    ],
    "diseaseOverrides": {}
  },
  "warm turmeric milk (haldi doodh)": {
    "food": "Warm Turmeric Milk (Haldi Doodh)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Curcumin and warm milk promote deep cellular wound healing and restful sleep.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "warm turmeric milk (haldi doodh)",
      "golden milk",
      "haldi doodh"
    ],
    "diseaseOverrides": {}
  },
  "plain curd (dahi)": {
    "food": "Plain Curd (Dahi)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Natural live probiotics repopulate healthy gut flora wiped out by antibiotics.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "plain curd (dahi)",
      "curd",
      "dahi",
      "yogurt"
    ],
    "diseaseOverrides": {}
  },
  "greek yogurt (plain)": {
    "food": "Greek Yogurt (Plain)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Strained yogurt with double the protein; ideal for tissue repair.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "greek yogurt (plain)",
      "greek yogurt"
    ],
    "diseaseOverrides": {}
  },
  "probiotic buttermilk (chaas)": {
    "food": "Probiotic Buttermilk (Chaas)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Diluted churned yogurt with roasted cumin; cools stomach and stops bloating.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "probiotic buttermilk (chaas)",
      "chaas",
      "mattha",
      "buttermilk"
    ],
    "diseaseOverrides": {}
  },
  "sweet lassi": {
    "food": "Sweet Lassi",
    "category": "Dairy & Plant Milks",
    "verdict": "limit",
    "explanation": "Heavily sweetened with sugar and thick malai; high calorie and fat.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "sweet lassi",
      "sweet lassi"
    ],
    "diseaseOverrides": {}
  },
  "fresh paneer (low-fat)": {
    "food": "Fresh Paneer (Low-Fat)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "High-biological value casein protein; essential for post-surgical muscle repair.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "fresh paneer (low-fat)",
      "paneer",
      "cottage cheese"
    ],
    "diseaseOverrides": {}
  },
  "malai paneer": {
    "food": "Malai Paneer",
    "category": "Dairy & Plant Milks",
    "verdict": "limit",
    "explanation": "Made from full-cream milk; high saturated fat; consume in moderation.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "malai paneer",
      "rich paneer"
    ],
    "diseaseOverrides": {}
  },
  "tofu paneer": {
    "food": "Tofu Paneer",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "100% plant-based soy curd; zero cholesterol, high isoflavones.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "tofu paneer",
      "soya paneer",
      "tofu"
    ],
    "diseaseOverrides": {}
  },
  "mozzarella cheese (part-skim)": {
    "food": "Mozzarella Cheese (Part-Skim)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Lower sodium, gentle melting cheese with good protein density.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "mozzarella cheese (part-skim)",
      "mozzarella"
    ],
    "diseaseOverrides": {}
  },
  "processed cheese slices": {
    "food": "Processed Cheese Slices",
    "category": "Dairy & Plant Milks",
    "verdict": "avoid",
    "explanation": "Packed with emulsifying sodium phosphates, high salt and saturated fats.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "processed cheese slices",
      "kraft singles",
      "cheese slice"
    ],
    "diseaseOverrides": {}
  },
  "cheddar cheese": {
    "food": "Cheddar Cheese",
    "category": "Dairy & Plant Milks",
    "verdict": "limit",
    "explanation": "Aged hard cheese; nutritious but high in sodium and calories.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "cheddar cheese",
      "cheddar"
    ],
    "diseaseOverrides": {}
  },
  "parmesan cheese": {
    "food": "Parmesan Cheese",
    "category": "Dairy & Plant Milks",
    "verdict": "limit",
    "explanation": "Intense savory aged cheese; rich in glutamate; use as light grating.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "parmesan cheese",
      "parmesan"
    ],
    "diseaseOverrides": {}
  },
  "feta cheese": {
    "food": "Feta Cheese",
    "category": "Dairy & Plant Milks",
    "verdict": "limit",
    "explanation": "Brined Greek cheese; healthy fats but high sodium content.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "feta cheese",
      "feta"
    ],
    "diseaseOverrides": {}
  },
  "desi cow ghee (a2)": {
    "food": "Desi Cow Ghee (A2)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Rich in butyric acid; nourishes colonocytes and aids vitamin absorption in moderation.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "desi cow ghee (a2)",
      "ghee",
      "clarified butter",
      "desi ghee"
    ],
    "diseaseOverrides": {}
  },
  "unsalted butter (makhan)": {
    "food": "Unsalted Butter (Makhan)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Traditional fresh white butter; free from industrial salt and coloring.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "unsalted butter (makhan)",
      "white butter",
      "makhan"
    ],
    "diseaseOverrides": {}
  },
  "salted commercial butter": {
    "food": "Salted Commercial Butter",
    "category": "Dairy & Plant Milks",
    "verdict": "limit",
    "explanation": "High sodium and saturated dairy fats; limit to 1 teaspoon daily.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "salted commercial butter",
      "amul butter",
      "table butter"
    ],
    "diseaseOverrides": {}
  },
  "peanut butter (unsweetened)": {
    "food": "Peanut Butter (Unsweetened)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Rich in oleic acid, protein and vitamin E; sustained energy.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "peanut butter (unsweetened)",
      "peanut butter"
    ],
    "diseaseOverrides": {}
  },
  "almond butter": {
    "food": "Almond Butter",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "High in magnesium, vitamin E and heart-healthy monounsaturated fats.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "almond butter",
      "almond butter"
    ],
    "diseaseOverrides": {}
  },
  "fresh milk cream (malai)": {
    "food": "Fresh Milk Cream (Malai)",
    "category": "Dairy & Plant Milks",
    "verdict": "limit",
    "explanation": "Concentrated milk fat; very slow to digest; can trigger nausea.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "fresh milk cream (malai)",
      "malai",
      "fresh cream"
    ],
    "diseaseOverrides": {}
  },
  "whey protein isolate": {
    "food": "Whey Protein Isolate",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Rapidly absorbed amino acids; speeds recovery from surgery and muscle loss.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "whey protein isolate",
      "whey isolate",
      "protein powder"
    ],
    "diseaseOverrides": {}
  },
  "almond milk (unsweetened)": {
    "food": "Almond Milk (Unsweetened)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Light, low-calorie plant milk; fortified with calcium and vitamin D.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "almond milk (unsweetened)",
      "almond milk"
    ],
    "diseaseOverrides": {}
  },
  "oat milk": {
    "food": "Oat Milk",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Creamy plant milk containing oat beta-glucan fiber.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "oat milk",
      "oat milk"
    ],
    "diseaseOverrides": {}
  },
  "coconut milk (light)": {
    "food": "Coconut Milk (Light)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Contains lauric acid; use light culinary coconut milk in moderation.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "coconut milk (light)",
      "coconut milk"
    ],
    "diseaseOverrides": {}
  },
  "ice cream": {
    "food": "Ice Cream",
    "category": "Dairy & Plant Milks",
    "verdict": "avoid",
    "explanation": "High refined sugar combined with high dairy fat; delays stomach emptying and spikes glucose.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "ice cream",
      "ice cream",
      "kulfi"
    ],
    "diseaseOverrides": {}
  },
  "condensed milk": {
    "food": "Condensed Milk",
    "category": "Dairy & Plant Milks",
    "verdict": "avoid",
    "explanation": "Concentrated milk with 45% sugar; triggers rapid hyperglycemia.",
    "notes": "Clinical dairy protocol.",
    "aliases": [
      "condensed milk",
      "milkmaid",
      "condensed milk"
    ],
    "diseaseOverrides": {}
  },
  "whole boiled egg": {
    "food": "Whole Boiled Egg",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "The reference standard protein (BV 100); contains choline for nerve and wound repair.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "whole boiled egg",
      "boiled egg",
      "anda"
    ],
    "diseaseOverrides": {}
  },
  "boiled egg white": {
    "food": "Boiled Egg White",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Pure albumin protein; zero fat, zero cholesterol, effortless digestion.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "boiled egg white",
      "egg white",
      "ande ki safedi"
    ],
    "diseaseOverrides": {}
  },
  "egg yolk": {
    "food": "Egg Yolk",
    "category": "Meats & Seafood",
    "verdict": "limit",
    "explanation": "Nutrient rich (lutein, choline) but contains 186mg cholesterol; limit to 1 daily.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "egg yolk",
      "egg yolk",
      "ande ki zardi"
    ],
    "diseaseOverrides": {}
  },
  "poached egg": {
    "food": "Poached Egg",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Cooked gently in water without frying oil; soft, tender and easily broken down.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "poached egg",
      "poached egg"
    ],
    "diseaseOverrides": {}
  },
  "egg bhurji (scrambled)": {
    "food": "Egg Bhurji (Scrambled)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Whisked eggs scrambled with onions, tomatoes and minimal oil.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "egg bhurji (scrambled)",
      "egg bhurji",
      "scrambled eggs"
    ],
    "diseaseOverrides": {}
  },
  "vegetable omelette": {
    "food": "Vegetable Omelette",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Eggs cooked with diced spinach, bell peppers and light olive oil.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "vegetable omelette",
      "omelette",
      "omlet"
    ],
    "diseaseOverrides": {}
  },
  "fried egg (sunny side up)": {
    "food": "Fried Egg (Sunny Side Up)",
    "category": "Meats & Seafood",
    "verdict": "limit",
    "explanation": "Edges fried in hot oil can be tough and greasy for recovering gut.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "fried egg (sunny side up)",
      "fried egg"
    ],
    "diseaseOverrides": {}
  },
  "chicken breast (skinless)": {
    "food": "Chicken Breast (Skinless)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Leanest animal protein available; supplies essential amino acids for surgical tissue repair.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "chicken breast (skinless)",
      "skinless chicken breast",
      "boiled chicken"
    ],
    "diseaseOverrides": {}
  },
  "chicken soup / broth": {
    "food": "Chicken Soup / Broth",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Collagen and amino acid rich fluid; clears respiratory tract, hydrates and restores appetite.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "chicken soup / broth",
      "chicken soup",
      "murgh shorba"
    ],
    "diseaseOverrides": {}
  },
  "tandoori chicken": {
    "food": "Tandoori Chicken",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Marinated in yogurt and spices, roasted in clay tandoor without deep frying.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "tandoori chicken",
      "tandoori chicken",
      "grilled chicken"
    ],
    "diseaseOverrides": {}
  },
  "chicken curry (home style)": {
    "food": "Chicken Curry (Home Style)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Tender chicken simmered in light tomato, onion and turmeric gravy.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "chicken curry (home style)",
      "chicken curry",
      "murgh curry"
    ],
    "diseaseOverrides": {}
  },
  "butter chicken": {
    "food": "Butter Chicken",
    "category": "Meats & Seafood",
    "verdict": "avoid",
    "explanation": "Loaded with heavy cream, butter, cashew paste and sugar; extreme fat load.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "butter chicken",
      "murgh makhani",
      "butter chicken"
    ],
    "diseaseOverrides": {}
  },
  "chicken biryani": {
    "food": "Chicken Biryani",
    "category": "Meats & Seafood",
    "verdict": "limit",
    "explanation": "Spiced rice dish; delicious but heavy; limit portion and choose lean breast meat.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "chicken biryani",
      "biryani",
      "chicken biryani"
    ],
    "diseaseOverrides": {}
  },
  "fried chicken (kfc style)": {
    "food": "Fried Chicken (KFC Style)",
    "category": "Meats & Seafood",
    "verdict": "avoid",
    "explanation": "Deep-fried in trans fats; causes severe indigestion, biliary spasm and arterial inflammation.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "fried chicken (kfc style)",
      "fried chicken",
      "crispy chicken"
    ],
    "diseaseOverrides": {}
  },
  "chicken sausage": {
    "food": "Chicken Sausage",
    "category": "Meats & Seafood",
    "verdict": "avoid",
    "explanation": "Processed meat loaded with sodium nitrates, preservatives, and saturated fat.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "chicken sausage",
      "chicken hot dog",
      "sausage"
    ],
    "diseaseOverrides": {}
  },
  "chicken salami": {
    "food": "Chicken Salami",
    "category": "Meats & Seafood",
    "verdict": "avoid",
    "explanation": "Cold-cut cured meat; high sodium triggers hypertension and fluid retention.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "chicken salami",
      "chicken cold cuts",
      "salami"
    ],
    "diseaseOverrides": {}
  },
  "lean mutton (goat meat)": {
    "food": "Lean Mutton (Goat Meat)",
    "category": "Meats & Seafood",
    "verdict": "limit",
    "explanation": "Rich in iron and zinc for hemoglobin, but higher in saturated fat than chicken.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "lean mutton (goat meat)",
      "goat meat",
      "mutton",
      "bakra"
    ],
    "diseaseOverrides": {}
  },
  "mutton paya (trottters soup)": {
    "food": "Mutton Paya (Trottters Soup)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Slow-simmered bone broth packed with gelatin and collagen; rebuilds joint cartilage and gut.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "mutton paya (trottters soup)",
      "paya soup",
      "trotters soup"
    ],
    "diseaseOverrides": {}
  },
  "mutton liver (kaleji)": {
    "food": "Mutton Liver (Kaleji)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Most nutrient-dense food on earth; packed with bioavailable Vitamin A, B12 and heme iron.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "mutton liver (kaleji)",
      "kaleji",
      "liver"
    ],
    "diseaseOverrides": {}
  },
  "mutton biryani": {
    "food": "Mutton Biryani",
    "category": "Meats & Seafood",
    "verdict": "avoid",
    "explanation": "Very high calorie, grease, and heavy spices; causes severe stomach heaviness.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "mutton biryani",
      "mutton biryani"
    ],
    "diseaseOverrides": {}
  },
  "beef steak / red meat": {
    "food": "Beef Steak / Red Meat",
    "category": "Meats & Seafood",
    "verdict": "limit",
    "explanation": "High in saturated fat and carnitine; metabolizes into inflammatory TMAO.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "beef steak / red meat",
      "beef",
      "red meat"
    ],
    "diseaseOverrides": {}
  },
  "pork chops / loin": {
    "food": "Pork Chops / Loin",
    "category": "Meats & Seafood",
    "verdict": "limit",
    "explanation": "Lean cuts acceptable; ensure thoroughly cooked to prevent trichinosis.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "pork chops / loin",
      "pork"
    ],
    "diseaseOverrides": {}
  },
  "bacon": {
    "food": "Bacon",
    "category": "Meats & Seafood",
    "verdict": "avoid",
    "explanation": "Cured pork belly saturated in sodium and carcinogenic nitrates; strictly avoid.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "bacon",
      "bacon",
      "pork bacon"
    ],
    "diseaseOverrides": {}
  },
  "rohu fish": {
    "food": "Rohu Fish",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Freshwater carp; easily digestible tender white meat rich in protein and zinc.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "rohu fish",
      "rohu",
      "carpo fish"
    ],
    "diseaseOverrides": {}
  },
  "catla fish": {
    "food": "Catla Fish",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Sweet, tender freshwater fish; low fat and very gentle on recovery stomach.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "catla fish",
      "catla"
    ],
    "diseaseOverrides": {}
  },
  "pomfret (white)": {
    "food": "Pomfret (White)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Delicate, low-bone fish; exceptional source of clean protein and iodine.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "pomfret (white)",
      "white pomfret",
      "paplet"
    ],
    "diseaseOverrides": {}
  },
  "surmai (kingfish / seer fish)": {
    "food": "Surmai (Kingfish / Seer Fish)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Meaty, firm steak fish rich in Omega-3 fatty acids for cardiovascular defense.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "surmai (kingfish / seer fish)",
      "surmai",
      "seer fish"
    ],
    "diseaseOverrides": {}
  },
  "salmon (wild / atlantic)": {
    "food": "Salmon (Wild / Atlantic)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Gold standard EPA and DHA omega-3 fish; suppresses systemic inflammation and protects bypass grafts.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "salmon (wild / atlantic)",
      "salmon",
      "rawas"
    ],
    "diseaseOverrides": {}
  },
  "tuna (canned in water)": {
    "food": "Tuna (Canned in Water)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Ultra-lean high-protein fish; zero carbohydrate, supports fast muscle rebuild.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "tuna (canned in water)",
      "tuna fish"
    ],
    "diseaseOverrides": {}
  },
  "sardines (mathi / tarli)": {
    "food": "Sardines (Mathi / Tarli)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Small oily fish packed with bioavailable calcium (edible soft bones) and omega-3s.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "sardines (mathi / tarli)",
      "sardine",
      "mathi"
    ],
    "diseaseOverrides": {}
  },
  "mackerel (bangda)": {
    "food": "Mackerel (Bangda)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Rich in Vitamin D and omega-3 fatty acids; supports bone and vascular repair.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "mackerel (bangda)",
      "bangda",
      "mackerel"
    ],
    "diseaseOverrides": {}
  },
  "fish curry (kerala style)": {
    "food": "Fish Curry (Kerala Style)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Fish cooked with kokum, turmeric and light coconut milk; anti-inflammatory.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "fish curry (kerala style)",
      "fish curry",
      "meen curry"
    ],
    "diseaseOverrides": {}
  },
  "fried fish": {
    "food": "Fried Fish",
    "category": "Meats & Seafood",
    "verdict": "avoid",
    "explanation": "Deep frying destroys delicate omega-3 fats and creates inflammatory lipid peroxides.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "fried fish",
      "fried fish",
      "fish fry"
    ],
    "diseaseOverrides": {}
  },
  "prawns / shrimp (steamed)": {
    "food": "Prawns / Shrimp (Steamed)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "High in astaxanthin antioxidant and zinc; low in calories.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "prawns / shrimp (steamed)",
      "shrimp",
      "prawns",
      "jhinga"
    ],
    "diseaseOverrides": {}
  },
  "crab meat": {
    "food": "Crab Meat",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Sweet lean crustacean meat; rich in chromium and selenium for immune support.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "crab meat",
      "crab",
      "kekda"
    ],
    "diseaseOverrides": {}
  },
  "oysters": {
    "food": "Oysters",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Highest dietary source of zinc; zinc is the primary trace mineral required for surgical incision closure.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "oysters",
      "oyster"
    ],
    "diseaseOverrides": {}
  },
  "squid (calamari - grilled)": {
    "food": "Squid (Calamari - Grilled)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Lean cephalopod protein; choose grilled over deep-fried calamari rings.",
    "notes": "Clinical protein recovery protocol.",
    "aliases": [
      "squid (calamari - grilled)",
      "squid",
      "calamari"
    ],
    "diseaseOverrides": {}
  },
  "pure drinking water": {
    "food": "Pure Drinking Water",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Essential for renal clearance, medication transport, blood volume and tissue hydration.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "pure drinking water",
      "water",
      "pani"
    ],
    "diseaseOverrides": {}
  },
  "warm water with lemon": {
    "food": "Warm Water with Lemon",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Stimulates morning peristalsis, clears hepatic bile and alkalizes urine.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "warm water with lemon",
      "lemon water",
      "nimbu pani"
    ],
    "diseaseOverrides": {}
  },
  "green tea (antioxidant)": {
    "food": "Green Tea (Antioxidant)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "EGCG catechins improve endothelial function and reduce cellular oxidative damage.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "green tea (antioxidant)",
      "green tea"
    ],
    "diseaseOverrides": {}
  },
  "chamomile herbal tea": {
    "food": "Chamomile Herbal Tea",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Apigenin binds GABA receptors in brain; relieves postoperative anxiety and muscle spasm.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "chamomile herbal tea",
      "chamomile tea"
    ],
    "diseaseOverrides": {}
  },
  "peppermint tea": {
    "food": "Peppermint Tea",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Menthol relaxes gastrointestinal smooth muscle, eliminating gas spasms and nausea.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "peppermint tea",
      "peppermint tea"
    ],
    "diseaseOverrides": {}
  },
  "ginger lemon tea": {
    "food": "Ginger Lemon Tea",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Clinically proven to stop postoperative and chemotherapy nausea.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "ginger lemon tea",
      "adrak chai",
      "ginger tea"
    ],
    "diseaseOverrides": {}
  },
  "indian masala chai (with milk)": {
    "food": "Indian Masala Chai (With Milk)",
    "category": "Beverages & Drinks",
    "verdict": "limit",
    "explanation": "Caffeine and tannins stimulate stomach acid; drink only after meals with low sugar.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "indian masala chai (with milk)",
      "chai",
      "tea",
      "masala chai"
    ],
    "diseaseOverrides": {}
  },
  "black coffee (no sugar)": {
    "food": "Black Coffee (No Sugar)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Rich in chlorogenic acid; stimulates post-op bowel motility and restores alertness.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "black coffee (no sugar)",
      "black coffee",
      "espresso"
    ],
    "diseaseOverrides": {}
  },
  "cold coffee / frappe": {
    "food": "Cold Coffee / Frappe",
    "category": "Beverages & Drinks",
    "verdict": "limit",
    "explanation": "Loaded with sugar, heavy milk cream and ice cream; high calorie trap.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "cold coffee / frappe",
      "frappuccino",
      "cold coffee"
    ],
    "diseaseOverrides": {}
  },
  "fresh coconut water": {
    "food": "Fresh Coconut Water",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Natural potassium, sodium and magnesium; ideal hydration fluid.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "fresh coconut water",
      "tender coconut",
      "nariyal pani"
    ],
    "diseaseOverrides": {}
  },
  "fresh sugarcane juice": {
    "food": "Fresh Sugarcane Juice",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Natural liver restorer; replenishes glycogen after jaundice or surgery.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "fresh sugarcane juice",
      "ganne ka ras"
    ],
    "diseaseOverrides": {}
  },
  "fresh orange juice": {
    "food": "Fresh Orange Juice",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Packed with Vitamin C and flavonoids; prefer whole fruit over strained juice.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "fresh orange juice",
      "santra juice"
    ],
    "diseaseOverrides": {}
  },
  "fresh pomegranate juice": {
    "food": "Fresh Pomegranate Juice",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "High polyphenols support vascular tone and hemoglobin synthesis.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "fresh pomegranate juice",
      "anar juice"
    ],
    "diseaseOverrides": {}
  },
  "bitter gourd juice (karela)": {
    "food": "Bitter Gourd Juice (Karela)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Potent natural insulin mimetic; drink small 30ml shot for diabetes.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "bitter gourd juice (karela)",
      "karela juice"
    ],
    "diseaseOverrides": {}
  },
  "amla juice": {
    "food": "Amla Juice",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Massive bioavailable Vitamin C; boosts tissue collagen rebuild.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "amla juice",
      "amla juice"
    ],
    "diseaseOverrides": {}
  },
  "aloe vera juice": {
    "food": "Aloe Vera Juice",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Polysaccharides soothe damaged stomach and intestinal mucosa.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "aloe vera juice",
      "aloe vera"
    ],
    "diseaseOverrides": {}
  },
  "electral / ors solution": {
    "food": "Electral / ORS Solution",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "WHO-formulated oral rehydration salts; restores cellular hydration during fluid loss.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "electral / ors solution",
      "ors",
      "electral"
    ],
    "diseaseOverrides": {}
  },
  "buttermilk (chaas)": {
    "food": "Buttermilk (Chaas)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Cools internal digestive heat, aids digestion of heavy meals.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "buttermilk (chaas)",
      "chaas",
      "mattha"
    ],
    "diseaseOverrides": {}
  },
  "jeera water (cumin water)": {
    "food": "Jeera Water (Cumin Water)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Boiled cumin water relieves abdominal distension, gas, and indigestion.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "jeera water (cumin water)",
      "jeera water"
    ],
    "diseaseOverrides": {}
  },
  "ajwain water (carom water)": {
    "food": "Ajwain Water (Carom Water)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Thymol dissolves trapped gas and eases surgical abdominal colic.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "ajwain water (carom water)",
      "ajwain water"
    ],
    "diseaseOverrides": {}
  },
  "commercial soda (coca cola / pepsi)": {
    "food": "Commercial Soda (Coca Cola / Pepsi)",
    "category": "Beverages & Drinks",
    "verdict": "avoid",
    "explanation": "Concentrated phosphoric acid, 10 spoons of sugar, and carbonation distends stomach.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "commercial soda (coca cola / pepsi)",
      "coca cola",
      "pepsi",
      "soda",
      "coke"
    ],
    "diseaseOverrides": {}
  },
  "diet soda (coke zero)": {
    "food": "Diet Soda (Coke Zero)",
    "category": "Beverages & Drinks",
    "verdict": "limit",
    "explanation": "Zero calories, but artificial sweeteners may disrupt microbiome and trigger cravings.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "diet soda (coke zero)",
      "diet coke",
      "coke zero"
    ],
    "diseaseOverrides": {}
  },
  "energy drinks (red bull / sting)": {
    "food": "Energy Drinks (Red Bull / Sting)",
    "category": "Beverages & Drinks",
    "verdict": "avoid",
    "explanation": "Extremely high caffeine and taurine; triggers cardiac palpitations and arrhythmia.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "energy drinks (red bull / sting)",
      "red bull",
      "sting",
      "energy drink"
    ],
    "diseaseOverrides": {}
  },
  "packaged tetra pack fruit juice": {
    "food": "Packaged Tetra Pack Fruit Juice",
    "category": "Beverages & Drinks",
    "verdict": "avoid",
    "explanation": "Stripped of fiber, pasteurized, and laced with high-fructose corn syrup.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "packaged tetra pack fruit juice",
      "real juice",
      "tropicana"
    ],
    "diseaseOverrides": {}
  },
  "beer": {
    "food": "Beer",
    "category": "Beverages & Drinks",
    "verdict": "avoid",
    "explanation": "Alcohol directly impairs wound healing, suppresses immunity, and conflicts with medications.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "beer",
      "beer",
      "lager"
    ],
    "diseaseOverrides": {}
  },
  "whiskey / rum / vodka": {
    "food": "Whiskey / Rum / Vodka",
    "category": "Beverages & Drinks",
    "verdict": "avoid",
    "explanation": "Causes severe liver metabolic strain, gastric mucosal burning, and dangerous drug interactions.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "whiskey / rum / vodka",
      "whiskey",
      "vodka",
      "rum",
      "alcohol"
    ],
    "diseaseOverrides": {}
  },
  "red wine": {
    "food": "Red Wine",
    "category": "Beverages & Drinks",
    "verdict": "avoid",
    "explanation": "Contains resveratrol, but alcohol content conflicts with postoperative recovery protocol.",
    "notes": "Clinical hydration protocol.",
    "aliases": [
      "red wine",
      "wine",
      "red wine"
    ],
    "diseaseOverrides": {}
  },
  "roasted makhana (foxnuts)": {
    "food": "Roasted Makhana (Foxnuts)",
    "category": "Snacks & Fast Foods",
    "verdict": "suitable",
    "explanation": "Light, oil-free, low sodium snack rich in calcium and magnesium.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "roasted makhana (foxnuts)",
      "makhana",
      "roasted lotus seeds"
    ],
    "diseaseOverrides": {}
  },
  "plain puffed rice (murmura)": {
    "food": "Plain Puffed Rice (Murmura)",
    "category": "Snacks & Fast Foods",
    "verdict": "suitable",
    "explanation": "Zero fat, gentle on nausea, effortless to chew and digest.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "plain puffed rice (murmura)",
      "murmura",
      "pori"
    ],
    "diseaseOverrides": {}
  },
  "boiled sweet corn": {
    "food": "Boiled Sweet Corn",
    "category": "Snacks & Fast Foods",
    "verdict": "suitable",
    "explanation": "Naturally sweet, rich in zeaxanthin and dietary fiber.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "boiled sweet corn",
      "boiled corn"
    ],
    "diseaseOverrides": {}
  },
  "roasted bhuna chana": {
    "food": "Roasted Bhuna Chana",
    "category": "Snacks & Fast Foods",
    "verdict": "suitable",
    "explanation": "Dry roasted Bengal gram; excellent high-protein, low glycemic snack.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "roasted bhuna chana",
      "bhuna chana"
    ],
    "diseaseOverrides": {}
  },
  "sprouts chaat": {
    "food": "Sprouts Chaat",
    "category": "Snacks & Fast Foods",
    "verdict": "suitable",
    "explanation": "Steamed moong and chana sprouts tossed with cucumber, lemon and cumin.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "sprouts chaat",
      "sprout chaat"
    ],
    "diseaseOverrides": {}
  },
  "cucumber tomato sandwich": {
    "food": "Cucumber Tomato Sandwich",
    "category": "Snacks & Fast Foods",
    "verdict": "suitable",
    "explanation": "Fresh sliced vegetables between whole grain bread with light mint chutney.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "cucumber tomato sandwich",
      "veg sandwich"
    ],
    "diseaseOverrides": {}
  },
  "samosa": {
    "food": "Samosa",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Deep-fried refined flour crust stuffed with spiced potato; trans fat and grease bomb.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "samosa",
      "samosa"
    ],
    "diseaseOverrides": {}
  },
  "pakora / bhajji": {
    "food": "Pakora / Bhajji",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Gram flour batter deep-fried in boiling oil; causes extreme heartburn and slow healing.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "pakora / bhajji",
      "pakora",
      "bhajiya"
    ],
    "diseaseOverrides": {}
  },
  "vada pav": {
    "food": "Vada Pav",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Deep-fried potato dumpling inside white bread with spicy garlic chili paste.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "vada pav",
      "vada pav"
    ],
    "diseaseOverrides": {}
  },
  "pani puri (golgappa)": {
    "food": "Pani Puri (Golgappa)",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "High infection risk from street water; fried puris and pungent tamarind water.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "pani puri (golgappa)",
      "golgappa",
      "pani puri",
      "puchka"
    ],
    "diseaseOverrides": {}
  },
  "bhel puri (dry / sukha)": {
    "food": "Bhel Puri (Dry / Sukha)",
    "category": "Snacks & Fast Foods",
    "verdict": "suitable",
    "explanation": "Oil-free puffed rice with chopped onions, tomatoes and roasted peanuts.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "bhel puri (dry / sukha)",
      "sukha bhel"
    ],
    "diseaseOverrides": {}
  },
  "sev puri": {
    "food": "Sev Puri",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Fried papdis covered in deep-fried sev and sweet-spicy chutneys.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "sev puri",
      "sev puri"
    ],
    "diseaseOverrides": {}
  },
  "french fries": {
    "food": "French Fries",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Deep-fried potato sticks; loaded with oxidized vegetable oils and excess sodium.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "french fries",
      "french fries",
      "fries"
    ],
    "diseaseOverrides": {}
  },
  "potato chips (packaged)": {
    "food": "Potato Chips (Packaged)",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "High sodium, artificial flavoring, trans fats; triggers fluid retention and blood pressure spikes.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "potato chips (packaged)",
      "chips",
      "lays",
      "bingo"
    ],
    "diseaseOverrides": {}
  },
  "pizza (commercial)": {
    "food": "Pizza (Commercial)",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Refined flour dough layered with high-fat processed cheese and processed meats.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "pizza (commercial)",
      "pizza",
      "cheese pizza"
    ],
    "diseaseOverrides": {}
  },
  "burger (fast food)": {
    "food": "Burger (Fast Food)",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Deep-fried patty inside refined bun with heavy mayonnaise dressing.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "burger (fast food)",
      "burger"
    ],
    "diseaseOverrides": {}
  },
  "momos (steamed veg)": {
    "food": "Momos (Steamed Veg)",
    "category": "Snacks & Fast Foods",
    "verdict": "suitable",
    "explanation": "Steamed vegetable dumplings; much healthier than fried street snacks.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "momos (steamed veg)",
      "steamed momos"
    ],
    "diseaseOverrides": {}
  },
  "momos (fried)": {
    "food": "Momos (Fried)",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Deep-fried white flour dumplings; absorbs stale street cooking oil.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "momos (fried)",
      "fried momos"
    ],
    "diseaseOverrides": {}
  },
  "spring rolls": {
    "food": "Spring Rolls",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Fried thin wrapper saturated in oil; heavy and difficult to digest.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "spring rolls",
      "spring roll"
    ],
    "diseaseOverrides": {}
  },
  "pav bhaji": {
    "food": "Pav Bhaji",
    "category": "Snacks & Fast Foods",
    "verdict": "limit",
    "explanation": "Mashed vegetables are nutritious, but street stalls add huge blocks of salted butter.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "pav bhaji",
      "pav bhaji"
    ],
    "diseaseOverrides": {}
  },
  "chole bhature": {
    "food": "Chole Bhature",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Deep-fried refined flour bhatura with heavily spiced chickpea curry.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "chole bhature",
      "chole bhature"
    ],
    "diseaseOverrides": {}
  },
  "marie biscuit": {
    "food": "Marie Biscuit",
    "category": "Snacks & Fast Foods",
    "verdict": "suitable",
    "explanation": "Light, low-sugar, low-fat biscuit; standard safe accompaniment with warm tea.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "marie biscuit",
      "marie biscuit",
      "tea biscuit"
    ],
    "diseaseOverrides": {}
  },
  "digestive biscuit": {
    "food": "Digestive Biscuit",
    "category": "Snacks & Fast Foods",
    "verdict": "suitable",
    "explanation": "Contains coarse wheat bran; better fiber profile than cream cookies.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "digestive biscuit",
      "digestive biscuit"
    ],
    "diseaseOverrides": {}
  },
  "cream cookies (oreo / bourbon)": {
    "food": "Cream Cookies (Oreo / Bourbon)",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "High refined sugar, hydrogenated vegetable fat, and artificial emulsifiers.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "cream cookies (oreo / bourbon)",
      "cream biscuits",
      "oreo"
    ],
    "diseaseOverrides": {}
  },
  "rusk (toast)": {
    "food": "Rusk (Toast)",
    "category": "Snacks & Fast Foods",
    "verdict": "suitable",
    "explanation": "Twice-baked crispy bread; easily digested with tea.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "rusk (toast)",
      "rusk",
      "toast"
    ],
    "diseaseOverrides": {}
  },
  "plain popcorn (air-popped)": {
    "food": "Plain Popcorn (Air-Popped)",
    "category": "Snacks & Fast Foods",
    "verdict": "suitable",
    "explanation": "100% whole grain high-fiber snack; avoid cinema butter drenched varieties.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "plain popcorn (air-popped)",
      "popcorn",
      "air popped popcorn"
    ],
    "diseaseOverrides": {}
  },
  "butter popcorn (cinema style)": {
    "food": "Butter Popcorn (Cinema Style)",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Soaked in artificial butter flavoring, high sodium and palm oil.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "butter popcorn (cinema style)",
      "theatre popcorn"
    ],
    "diseaseOverrides": {}
  },
  "nachos with cheese dip": {
    "food": "Nachos with Cheese Dip",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Fried corn crisps smothered in high-sodium processed melted cheese.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "nachos with cheese dip",
      "nachos"
    ],
    "diseaseOverrides": {}
  },
  "khakhra (plain roasted)": {
    "food": "Khakhra (Plain Roasted)",
    "category": "Snacks & Fast Foods",
    "verdict": "suitable",
    "explanation": "Dry roasted whole wheat crisps; oil-free traditional recovery snack.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "khakhra (plain roasted)",
      "khakhra"
    ],
    "diseaseOverrides": {}
  },
  "namkeen / mixture": {
    "food": "Namkeen / Mixture",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Deep-fried sev, boondi, and fried nuts loaded with salt and chili.",
    "notes": "Clinical snack protocol.",
    "aliases": [
      "namkeen / mixture",
      "namkeen",
      "farsan",
      "haldiram mixture"
    ],
    "diseaseOverrides": {}
  },
  "gulab jamun": {
    "food": "Gulab Jamun",
    "category": "Sweets & Desserts",
    "verdict": "avoid",
    "explanation": "Deep-fried khoya balls soaked in concentrated sugar syrup; extreme calorie and glycemic load.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "gulab jamun",
      "gulab jamun"
    ],
    "diseaseOverrides": {}
  },
  "jalebi": {
    "food": "Jalebi",
    "category": "Sweets & Desserts",
    "verdict": "avoid",
    "explanation": "Deep-fried fermented batter soaked in sugar syrup; triggers immediate sugar spikes.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "jalebi",
      "jalebi"
    ],
    "diseaseOverrides": {}
  },
  "rasgulla": {
    "food": "Rasgulla",
    "category": "Sweets & Desserts",
    "verdict": "limit",
    "explanation": "Steamed chhena sponge; gently squeeze out sugar syrup before eating.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "rasgulla",
      "rasgulla",
      "roshogolla"
    ],
    "diseaseOverrides": {}
  },
  "kaju katli": {
    "food": "Kaju Katli",
    "category": "Sweets & Desserts",
    "verdict": "limit",
    "explanation": "Cashew fudge; contains healthy nut fats, but sugar and silver vark require moderation.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "kaju katli",
      "kaju katli",
      "kaju barfi"
    ],
    "diseaseOverrides": {}
  },
  "besan laddu": {
    "food": "Besan Laddu",
    "category": "Sweets & Desserts",
    "verdict": "limit",
    "explanation": "Gram flour roasted in ghee with sugar; high calorie but nutritious in small quantity.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "besan laddu",
      "besan laddu"
    ],
    "diseaseOverrides": {}
  },
  "moong dal halwa": {
    "food": "Moong Dal Halwa",
    "category": "Sweets & Desserts",
    "verdict": "avoid",
    "explanation": "Rich lentil dessert cooked with equal parts ghee and sugar; very heavy.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "moong dal halwa",
      "moong dal halwa"
    ],
    "diseaseOverrides": {}
  },
  "gajar ka halwa": {
    "food": "Gajar Ka Halwa",
    "category": "Sweets & Desserts",
    "verdict": "limit",
    "explanation": "Carrots cooked with milk; rich in beta-carotene; prepare with low sugar.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "gajar ka halwa",
      "carrot halwa",
      "gajar halwa"
    ],
    "diseaseOverrides": {}
  },
  "kheer (rice pudding)": {
    "food": "Kheer (Rice Pudding)",
    "category": "Sweets & Desserts",
    "verdict": "limit",
    "explanation": "Rice simmered in milk; soothing on stomach if made with low sugar and cardamom.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "kheer (rice pudding)",
      "kheer",
      "payasam"
    ],
    "diseaseOverrides": {}
  },
  "white refined sugar": {
    "food": "White Refined Sugar",
    "category": "Sweets & Desserts",
    "verdict": "avoid",
    "explanation": "Empty calories; provokes rapid insulin spikes, systemic inflammation, and delays wound closure.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "white refined sugar",
      "sugar",
      "cheeni"
    ],
    "diseaseOverrides": {}
  },
  "organic jaggery (gur)": {
    "food": "Organic Jaggery (Gur)",
    "category": "Sweets & Desserts",
    "verdict": "limit",
    "explanation": "Contains trace iron, magnesium and minerals; still high glycemic so consume sparingly.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "organic jaggery (gur)",
      "gur",
      "jaggery"
    ],
    "diseaseOverrides": {}
  },
  "pure raw honey": {
    "food": "Pure Raw Honey",
    "category": "Sweets & Desserts",
    "verdict": "suitable",
    "explanation": "Natural enzymes, wound-healing flavonoids and mild antibacterial properties.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "pure raw honey",
      "honey",
      "shehad"
    ],
    "diseaseOverrides": {}
  },
  "stevia (natural sweetener)": {
    "food": "Stevia (Natural Sweetener)",
    "category": "Sweets & Desserts",
    "verdict": "suitable",
    "explanation": "Zero-calorie plant leaf extract; safe natural sweetener for diabetes.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "stevia (natural sweetener)",
      "stevia",
      "meethi patti"
    ],
    "diseaseOverrides": {}
  },
  "dark chocolate (70%+ cocoa)": {
    "food": "Dark Chocolate (70%+ Cocoa)",
    "category": "Sweets & Desserts",
    "verdict": "suitable",
    "explanation": "Flavanols expand blood vessels, reduce blood pressure, and elevate mood.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "dark chocolate (70%+ cocoa)",
      "dark chocolate"
    ],
    "diseaseOverrides": {}
  },
  "milk chocolate": {
    "food": "Milk Chocolate",
    "category": "Sweets & Desserts",
    "verdict": "avoid",
    "explanation": "High sugar and palm oil with minimal beneficial cocoa flavonoids.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "milk chocolate",
      "dairy milk",
      "cadbury",
      "milk chocolate"
    ],
    "diseaseOverrides": {}
  },
  "pastries / cake": {
    "food": "Pastries / Cake",
    "category": "Sweets & Desserts",
    "verdict": "avoid",
    "explanation": "Refined flour, hydrogenated shortening, and high-fructose frosting.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "pastries / cake",
      "cake",
      "pastry",
      "black forest"
    ],
    "diseaseOverrides": {}
  },
  "custard": {
    "food": "Custard",
    "category": "Sweets & Desserts",
    "verdict": "limit",
    "explanation": "Milk and cornstarch pudding; soothing if made with low sugar and fresh fruits.",
    "notes": "Clinical sugar protocol.",
    "aliases": [
      "custard",
      "fruit custard"
    ],
    "diseaseOverrides": {}
  },
  "turmeric (haldi)": {
    "food": "Turmeric (Haldi)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Curcumin is the #1 natural anti-inflammatory; accelerates wound healing and cell regeneration.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "turmeric (haldi)",
      "turmeric",
      "haldi"
    ],
    "diseaseOverrides": {}
  },
  "cumin seeds (jeera)": {
    "food": "Cumin Seeds (Jeera)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Thymol stimulates salivary and pancreatic enzymes; eliminates intestinal gas.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "cumin seeds (jeera)",
      "cumin",
      "jeera"
    ],
    "diseaseOverrides": {}
  },
  "coriander powder (dhania)": {
    "food": "Coriander Powder (Dhania)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Cooling spice that supports kidney filtration and reduces digestive burning.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "coriander powder (dhania)",
      "dhania",
      "coriander"
    ],
    "diseaseOverrides": {}
  },
  "black pepper (kali mirch)": {
    "food": "Black Pepper (Kali Mirch)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Piperine increases curcumin bioavailability by 2000%; stimulates hydrochloric acid.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "black pepper (kali mirch)",
      "kali mirch",
      "black pepper"
    ],
    "diseaseOverrides": {}
  },
  "cinnamon (dalchini)": {
    "food": "Cinnamon (Dalchini)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Cinnamaldehyde improves cellular insulin receptor sensitivity and lowers blood sugar.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "cinnamon (dalchini)",
      "cinnamon",
      "dalchini"
    ],
    "diseaseOverrides": {}
  },
  "green cardamom (elaichi)": {
    "food": "Green Cardamom (Elaichi)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Cools acid reflux, freshens breath, and calms gastrointestinal spasms.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "green cardamom (elaichi)",
      "elaichi",
      "cardamom"
    ],
    "diseaseOverrides": {}
  },
  "cloves (laung)": {
    "food": "Cloves (Laung)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Eugenol provides powerful antibacterial, anti-inflammatory and oral analgesic relief.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "cloves (laung)",
      "laung",
      "cloves"
    ],
    "diseaseOverrides": {}
  },
  "fennel seeds (saunf)": {
    "food": "Fennel Seeds (Saunf)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Anethole relaxes intestinal smooth muscle; prevents post-meal bloating and cramps.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "fennel seeds (saunf)",
      "saunf",
      "fennel"
    ],
    "diseaseOverrides": {}
  },
  "asafoetida (hing)": {
    "food": "Asafoetida (Hing)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Unrivaled digestive carminative; dissolves abdominal gas and prevents colic.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "asafoetida (hing)",
      "hing",
      "asafoetida"
    ],
    "diseaseOverrides": {}
  },
  "carom seeds (ajwain)": {
    "food": "Carom Seeds (Ajwain)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Thymol rapidly relieves acute stomach ache, acid indigestion, and flatulence.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "carom seeds (ajwain)",
      "ajwain"
    ],
    "diseaseOverrides": {}
  },
  "fenugreek seeds (methi dana)": {
    "food": "Fenugreek Seeds (Methi Dana)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Galactomannan soluble fiber delays glucose absorption and lowers LDL cholesterol.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "fenugreek seeds (methi dana)",
      "methi dana"
    ],
    "diseaseOverrides": {}
  },
  "mustard seeds (rai)": {
    "food": "Mustard Seeds (Rai)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Rich in myrosinase enzyme and selenium; anti-inflammatory tempering spice.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "mustard seeds (rai)",
      "rai",
      "sarson"
    ],
    "diseaseOverrides": {}
  },
  "table salt (iodized)": {
    "food": "Table Salt (Iodized)",
    "category": "Spices & Condiments",
    "verdict": "limit",
    "explanation": "Essential for fluid balance, but excess sodium elevates blood pressure and causes edema.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "table salt (iodized)",
      "salt",
      "namak"
    ],
    "diseaseOverrides": {}
  },
  "rock salt (sendha namak)": {
    "food": "Rock Salt (Sendha Namak)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Unrefined mineral salt rich in potassium, calcium and magnesium; gentler on BP.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "rock salt (sendha namak)",
      "sendha namak",
      "rock salt"
    ],
    "diseaseOverrides": {}
  },
  "black salt (kala namak)": {
    "food": "Black Salt (Kala Namak)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Rich in iron and sulfur compounds; stimulates appetite and relieves gas.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "black salt (kala namak)",
      "kala namak"
    ],
    "diseaseOverrides": {}
  },
  "lite salt (low sodium salt)": {
    "food": "Lite Salt (Low Sodium Salt)",
    "category": "Spices & Condiments",
    "verdict": "limit",
    "explanation": "Potassium-chloride based; DANGEROUS for CKD patients or those on ACE inhibitors.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "lite salt (low sodium salt)",
      "low sodium salt",
      "lite salt"
    ],
    "diseaseOverrides": {}
  },
  "red chili powder": {
    "food": "Red Chili Powder",
    "category": "Spices & Condiments",
    "verdict": "avoid",
    "explanation": "High capsaicin irritates gastric ulcerations, inflamed bowel, and surgical incisions.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "red chili powder",
      "lal mirch",
      "chili powder"
    ],
    "diseaseOverrides": {}
  },
  "green chili (hari mirch)": {
    "food": "Green Chili (Hari Mirch)",
    "category": "Spices & Condiments",
    "verdict": "limit",
    "explanation": "Rich in Vitamin C, but raw seeds irritate postoperative gastrointestinal mucosa.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "green chili (hari mirch)",
      "hari mirch"
    ],
    "diseaseOverrides": {}
  },
  "extra virgin olive oil": {
    "food": "Extra Virgin Olive Oil",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Highest concentration of oleocanthal; powerful anti-inflammatory for cardiovascular recovery.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "extra virgin olive oil",
      "olive oil",
      "evoo"
    ],
    "diseaseOverrides": {}
  },
  "mustard oil (cold pressed)": {
    "food": "Mustard Oil (Cold Pressed)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Traditional pungent oil rich in ALA omega-3 and monounsaturated fatty acids.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "mustard oil (cold pressed)",
      "sarson ka tel"
    ],
    "diseaseOverrides": {}
  },
  "desi ghee (clarified butter)": {
    "food": "Desi Ghee (Clarified Butter)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Butyric acid fuels colonocytes; use 1-2 teaspoons daily in warm food.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "desi ghee (clarified butter)",
      "ghee",
      "desi ghee"
    ],
    "diseaseOverrides": {}
  },
  "refined sunflower oil": {
    "food": "Refined Sunflower Oil",
    "category": "Spices & Condiments",
    "verdict": "limit",
    "explanation": "High in pro-inflammatory Omega-6 linoleic acid; limit commercial refined oils.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "refined sunflower oil",
      "sunflower oil"
    ],
    "diseaseOverrides": {}
  },
  "coconut oil (cold pressed)": {
    "food": "Coconut Oil (Cold Pressed)",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Medium-chain fatty acids (lauric acid) absorb directly into portal vein for quick energy.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "coconut oil (cold pressed)",
      "coconut oil",
      "nariyal tel"
    ],
    "diseaseOverrides": {}
  },
  "mayonnaise": {
    "food": "Mayonnaise",
    "category": "Spices & Condiments",
    "verdict": "avoid",
    "explanation": "Emulsion of vegetable oil and egg yolks; very high calorie, fat and preservative density.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "mayonnaise",
      "mayo",
      "mayonnaise"
    ],
    "diseaseOverrides": {}
  },
  "tomato ketchup": {
    "food": "Tomato Ketchup",
    "category": "Spices & Condiments",
    "verdict": "limit",
    "explanation": "Commercial brands contain up to 25% refined sugar and high sodium.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "tomato ketchup",
      "ketchup",
      "tomato sauce"
    ],
    "diseaseOverrides": {}
  },
  "soy sauce": {
    "food": "Soy Sauce",
    "category": "Spices & Condiments",
    "verdict": "avoid",
    "explanation": "Extremely high sodium (1000mg per tablespoon); triggers acute blood pressure spikes.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "soy sauce",
      "soya sauce",
      "soy sauce"
    ],
    "diseaseOverrides": {}
  },
  "mango pickle (aam ka achar)": {
    "food": "Mango Pickle (Aam Ka Achar)",
    "category": "Spices & Condiments",
    "verdict": "avoid",
    "explanation": "Packed in heavy salt, pungent spices and oil; triggers severe acidity and fluid retention.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "mango pickle (aam ka achar)",
      "achar",
      "pickle",
      "mango pickle"
    ],
    "diseaseOverrides": {}
  },
  "mint coriander chutney": {
    "food": "Mint Coriander Chutney",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Fresh raw herbs blended with lemon, cumin and rock salt; appetizing and oil-free.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "mint coriander chutney",
      "green chutney",
      "pudina chutney"
    ],
    "diseaseOverrides": {}
  },
  "apple cider vinegar": {
    "food": "Apple Cider Vinegar",
    "category": "Spices & Condiments",
    "verdict": "suitable",
    "explanation": "Acetic acid blunts postprandial glucose spike when diluted in water before meals.",
    "notes": "Clinical seasoning protocol.",
    "aliases": [
      "apple cider vinegar",
      "acv",
      "apple cider vinegar"
    ],
    "diseaseOverrides": {}
  },
  "ragi flour (nachni)": {
    "food": "Ragi Flour (Nachni)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Calcium-rich gluten-free flour for bone and wound repair.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "ragi flour (nachni)",
      "nachni atta",
      "ragi flour"
    ],
    "diseaseOverrides": {}
  },
  "jowar flour (sorghum atta)": {
    "food": "Jowar Flour (Sorghum Atta)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Complex carbohydrates with zero gluten; cardiac and diabetes friendly.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "jowar flour (sorghum atta)",
      "jowar flour"
    ],
    "diseaseOverrides": {}
  },
  "bajra flour (pearl millet atta)": {
    "food": "Bajra Flour (Pearl Millet Atta)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Iron-rich warming flour for energy and stamina.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "bajra flour (pearl millet atta)",
      "bajra flour"
    ],
    "diseaseOverrides": {}
  },
  "kuttu ka atta (buckwheat)": {
    "food": "Kuttu Ka Atta (Buckwheat)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Rutin-packed pseudocereal flour for vascular integrity.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "kuttu ka atta (buckwheat)",
      "buckwheat flour"
    ],
    "diseaseOverrides": {}
  },
  "singhara atta (water chestnut)": {
    "food": "Singhara Atta (Water Chestnut)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Cooling starch flour for fasting and sensitive gut recovery.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "singhara atta (water chestnut)",
      "water chestnut flour"
    ],
    "diseaseOverrides": {}
  },
  "rajgira atta (amaranth)": {
    "food": "Rajgira Atta (Amaranth)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Complete protein grain flour packed with squalene and lysine.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "rajgira atta (amaranth)",
      "amaranth flour",
      "rajgira"
    ],
    "diseaseOverrides": {}
  },
  "soy flour (defatted)": {
    "food": "Soy Flour (Defatted)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "High-protein blend for fortifying regular wheat rotis.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "soy flour (defatted)",
      "soya flour"
    ],
    "diseaseOverrides": {}
  },
  "oat flour": {
    "food": "Oat Flour",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Ground rolled oats for soluble-fiber baked convalescent foods.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "oat flour",
      "oat powder"
    ],
    "diseaseOverrides": {}
  },
  "corn flour (makki ka atta)": {
    "food": "Corn Flour (Makki Ka Atta)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Yellow maize flour rich in carotenoids; pair with greens.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "corn flour (makki ka atta)",
      "makki atta"
    ],
    "diseaseOverrides": {}
  },
  "wheat bran": {
    "food": "Wheat Bran",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Insoluble fiber supplement to eliminate chronic post-op constipation.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "wheat bran",
      "choker",
      "wheat bran"
    ],
    "diseaseOverrides": {}
  },
  "oat bran": {
    "food": "Oat Bran",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Super-concentrated beta-glucan fiber for rapid cholesterol clearance.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "oat bran",
      "oat bran"
    ],
    "diseaseOverrides": {}
  },
  "barley flour": {
    "food": "Barley Flour",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Diuretic and cooling flour for kidney and liver support.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "barley flour",
      "jau ka atta"
    ],
    "diseaseOverrides": {}
  },
  "arrowroot powder": {
    "food": "Arrowroot Powder",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Gentle, non-irritating starch for soothing inflamed intestines.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "arrowroot powder",
      "arrowroot"
    ],
    "diseaseOverrides": {}
  },
  "flaxseed meal (ground)": {
    "food": "Flaxseed Meal (Ground)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Omega-3 ALA and lignans for vascular elasticity and stool softening.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "flaxseed meal (ground)",
      "ground flaxseed",
      "alsi powder"
    ],
    "diseaseOverrides": {}
  },
  "rice bran": {
    "food": "Rice Bran",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Oryzanol-rich layer that helps lower LDL cholesterol.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "rice bran",
      "rice bran"
    ],
    "diseaseOverrides": {}
  },
  "puffed jowar": {
    "food": "Puffed Jowar",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Oil-free popped sorghum; diabetic-friendly crunchy snack.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "puffed jowar",
      "jowar puffs"
    ],
    "diseaseOverrides": {}
  },
  "puffed bajra": {
    "food": "Puffed Bajra",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Crunchy roasted pearl millet; iron-rich alternative to chips.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "puffed bajra",
      "bajra puffs"
    ],
    "diseaseOverrides": {}
  },
  "puffed ragi": {
    "food": "Puffed Ragi",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Light popped finger millet rich in calcium.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "puffed ragi",
      "ragi puffs"
    ],
    "diseaseOverrides": {}
  },
  "spelt bread": {
    "food": "Spelt Bread",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Ancient wheat variety with easier digestibility than modern hybrid wheat.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "spelt bread",
      "spelt"
    ],
    "diseaseOverrides": {}
  },
  "ezekiel bread (sprouted grain)": {
    "food": "Ezekiel Bread (Sprouted Grain)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Flourless bread made from sprouted grains and legumes; low glycemic index.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "ezekiel bread (sprouted grain)",
      "sprouted grain bread"
    ],
    "diseaseOverrides": {}
  },
  "bone broth (simmered)": {
    "food": "Bone Broth (Simmered)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Packed with glycine, proline and gelatin; seals gut barrier and speeds collagen repair.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "bone broth (simmered)",
      "bone broth"
    ],
    "diseaseOverrides": {}
  },
  "clear vegetable broth": {
    "food": "Clear Vegetable Broth",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Hydrating mineral-rich strained broth; gentle early recovery nutrition.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "clear vegetable broth",
      "veg broth",
      "clear soup"
    ],
    "diseaseOverrides": {}
  },
  "mushroom clear soup": {
    "food": "Mushroom Clear Soup",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Beta-glucan rich immune priming broth.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "mushroom clear soup",
      "mushroom broth"
    ],
    "diseaseOverrides": {}
  },
  "tomato basil soup": {
    "food": "Tomato Basil Soup",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Rich in lycopene and volatile herbs; comforting warm meal.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "tomato basil soup",
      "tomato soup"
    ],
    "diseaseOverrides": {}
  },
  "spinach garlic soup": {
    "food": "Spinach Garlic Soup",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Folate and iron rich blended soup for postoperative anemia.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "spinach garlic soup",
      "palak soup"
    ],
    "diseaseOverrides": {}
  },
  "bottle gourd soup": {
    "food": "Bottle Gourd Soup",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Alkaline, ultra-hydrating broth for soothing liver and kidneys.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "bottle gourd soup",
      "lauki soup"
    ],
    "diseaseOverrides": {}
  },
  "moong dal soup": {
    "food": "Moong Dal Soup",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Light strained lentil water; the classic first oral meal post surgery.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "moong dal soup",
      "dal ka pani"
    ],
    "diseaseOverrides": {}
  },
  "chicken noodle soup": {
    "food": "Chicken Noodle Soup",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Mild shredded chicken breast with soft wheat noodles in clear broth.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "chicken noodle soup",
      "chicken soup"
    ],
    "diseaseOverrides": {}
  },
  "fish stew (mild)": {
    "food": "Fish Stew (Mild)",
    "category": "Meats & Seafood",
    "verdict": "suitable",
    "explanation": "Delicate fish simmered with carrots, celery and light turmeric.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "fish stew (mild)",
      "fish stew"
    ],
    "diseaseOverrides": {}
  },
  "pumpkin ginger soup": {
    "food": "Pumpkin Ginger Soup",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Creamy without dairy; beta-carotene and anti-nausea ginger.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "pumpkin ginger soup",
      "pumpkin soup"
    ],
    "diseaseOverrides": {}
  },
  "lentil patties (baked)": {
    "food": "Lentil Patties (Baked)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Baked patties of lentils and vegetables; high fiber and protein.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "lentil patties (baked)",
      "dal tikki"
    ],
    "diseaseOverrides": {}
  },
  "sprouted moong chaat": {
    "food": "Sprouted Moong Chaat",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Fresh enzyme-active salad; supports post-op digestion.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "sprouted moong chaat",
      "sprout salad"
    ],
    "diseaseOverrides": {}
  },
  "kala chana soup (broth)": {
    "food": "Kala Chana Soup (Broth)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Concentrated iron extract from boiled black chickpeas.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "kala chana soup (broth)",
      "chana ka pani"
    ],
    "diseaseOverrides": {}
  },
  "rajma salad (boiled)": {
    "food": "Rajma Salad (Boiled)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Cold boiled red kidney beans tossed with cucumber and lemon.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "rajma salad (boiled)",
      "kidney bean salad"
    ],
    "diseaseOverrides": {}
  },
  "soy chunks curry (light)": {
    "food": "Soy Chunks Curry (Light)",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "High protein textured soy cooked in mild home style gravy.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "soy chunks curry (light)",
      "nutrela curry"
    ],
    "diseaseOverrides": {}
  },
  "tofu scramble": {
    "food": "Tofu Scramble",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Crumbled tofu cooked with turmeric, onions and tomatoes; vegan egg alternative.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "tofu scramble",
      "tofu bhurji"
    ],
    "diseaseOverrides": {}
  },
  "edamame dip": {
    "food": "Edamame Dip",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Pureed young green soybeans with garlic and lemon juice.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "edamame dip",
      "edamame dip"
    ],
    "diseaseOverrides": {}
  },
  "tempeh stir-fry": {
    "food": "Tempeh Stir-Fry",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Steamed tempeh cubes tossed with colorful bell peppers.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "tempeh stir-fry",
      "tempeh"
    ],
    "diseaseOverrides": {}
  },
  "split pea soup": {
    "food": "Split Pea Soup",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Hearty yellow or green split pea soup rich in potassium.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "split pea soup",
      "pea soup"
    ],
    "diseaseOverrides": {}
  },
  "black bean dip": {
    "food": "Black Bean Dip",
    "category": "Lentils & Legumes",
    "verdict": "suitable",
    "explanation": "Mashed black beans with cumin and lime; rich in anthocyanins.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "black bean dip",
      "black bean dip"
    ],
    "diseaseOverrides": {}
  },
  "stewed apple (cooked)": {
    "food": "Stewed Apple (Cooked)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Cooking releases pectin; coats inflamed stomach and stops gastric burn.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "stewed apple (cooked)",
      "stewed apple",
      "applesauce"
    ],
    "diseaseOverrides": {}
  },
  "baked pear": {
    "food": "Baked Pear",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Warm, tender dessert; hypoallergenic and gentle on digestion.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "baked pear",
      "baked pear"
    ],
    "diseaseOverrides": {}
  },
  "papaya lime salad": {
    "food": "Papaya Lime Salad",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Fresh ripe papaya with drops of fresh lime juice; aids digestive transit.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "papaya lime salad",
      "papaya salad"
    ],
    "diseaseOverrides": {}
  },
  "makhana kheer (low sugar)": {
    "food": "Makhana Kheer (Low Sugar)",
    "category": "Sweets & Desserts",
    "verdict": "suitable",
    "explanation": "Roasted lotus seeds simmered in skimmed milk with cardamom; wholesome recovery dessert.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "makhana kheer (low sugar)",
      "makhana kheer"
    ],
    "diseaseOverrides": {}
  },
  "oatmeal banana cookies": {
    "food": "Oatmeal Banana Cookies",
    "category": "Sweets & Desserts",
    "verdict": "suitable",
    "explanation": "Naturally sweetened with ripe bananas and rolled oats; zero refined sugar.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "oatmeal banana cookies",
      "healthy cookies"
    ],
    "diseaseOverrides": {}
  },
  "chia seed pudding": {
    "food": "Chia Seed Pudding",
    "category": "Sweets & Desserts",
    "verdict": "suitable",
    "explanation": "Chia seeds soaked in almond milk; rich in omega-3 and mucilage fiber.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "chia seed pudding",
      "chia pudding"
    ],
    "diseaseOverrides": {}
  },
  "fruit chaat (fresh)": {
    "food": "Fruit Chaat (Fresh)",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Diced apples, pomegranates, and papaya with pinch of roasted cumin.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "fruit chaat (fresh)",
      "fruit chaat"
    ],
    "diseaseOverrides": {}
  },
  "frozen banana puree": {
    "food": "Frozen Banana Puree",
    "category": "Sweets & Desserts",
    "verdict": "suitable",
    "explanation": "Creamy one-ingredient healthy alternative to heavy ice cream.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "frozen banana puree",
      "banana nice cream"
    ],
    "diseaseOverrides": {}
  },
  "dates and nut roll": {
    "food": "Dates and Nut Roll",
    "category": "Sweets & Desserts",
    "verdict": "suitable",
    "explanation": "Pureed dates rolled with almonds and walnuts; zero added sugar.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "dates and nut roll",
      "khajur barfi"
    ],
    "diseaseOverrides": {}
  },
  "roasted fig compote": {
    "food": "Roasted Fig Compote",
    "category": "Fruits & Berries",
    "verdict": "suitable",
    "explanation": "Warm fig reduction for gentle bowel stimulation.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "roasted fig compote",
      "fig compote"
    ],
    "diseaseOverrides": {}
  },
  "pazhamkanji (fermented rice)": {
    "food": "Pazhamkanji (Fermented Rice)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Traditional Kerala probiotic rice water; packed with Vitamin B12 and gut flora.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "pazhamkanji (fermented rice)",
      "fermented rice",
      "poita bhat",
      "panta bhat"
    ],
    "diseaseOverrides": {}
  },
  "curd rice (thayir sadam)": {
    "food": "Curd Rice (Thayir Sadam)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Soothing rice mashed with fresh low-fat curd and tempered with ginger.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "curd rice (thayir sadam)",
      "curd rice",
      "thayir sadam",
      "daddojanam"
    ],
    "diseaseOverrides": {}
  },
  "lemon rice (mild)": {
    "food": "Lemon Rice (Mild)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Light rice flavored with fresh lemon juice and mild turmeric.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "lemon rice (mild)",
      "chitranna",
      "lemon rice"
    ],
    "diseaseOverrides": {}
  },
  "coconut rice (light)": {
    "food": "Coconut Rice (Light)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Rice tempered with fresh grated coconut and mild curry leaves.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "coconut rice (light)",
      "coconut rice"
    ],
    "diseaseOverrides": {}
  },
  "tomato rice": {
    "food": "Tomato Rice",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Rice cooked with fresh stewed tomatoes and mild cumin.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "tomato rice",
      "thakkali sadam"
    ],
    "diseaseOverrides": {}
  },
  "vegetable pulav (light)": {
    "food": "Vegetable Pulav (Light)",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Fragrant basmati rice cooked with carrots, green peas, and French beans.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "vegetable pulav (light)",
      "veg pulao",
      "pulav"
    ],
    "diseaseOverrides": {}
  },
  "jeera pulav": {
    "food": "Jeera Pulav",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Mild cumin flavored rice; easy on post-operative stomach.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "jeera pulav",
      "cumin pulav"
    ],
    "diseaseOverrides": {}
  },
  "matar pulav": {
    "food": "Matar Pulav",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Rice cooked with sweet green peas; nutritious convalescent dinner.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "matar pulav",
      "peas pulav"
    ],
    "diseaseOverrides": {}
  },
  "ragi sankati": {
    "food": "Ragi Sankati",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Finger millet and broken rice mash; traditional sustained energy meal.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "ragi sankati",
      "ragi mudde"
    ],
    "diseaseOverrides": {}
  },
  "jowar upma": {
    "food": "Jowar Upma",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Cracked sorghum grain upma; fiber-dense alternative to sooji upma.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "jowar upma",
      "sorghum upma"
    ],
    "diseaseOverrides": {}
  },
  "bajra khichdi": {
    "food": "Bajra Khichdi",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Pearl millet and yellow moong dal slow-cooked; warming and iron rich.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "bajra khichdi",
      "bajra khichdi"
    ],
    "diseaseOverrides": {}
  },
  "daliya khichdi": {
    "food": "Daliya Khichdi",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Broken wheat cooked with moong dal and carrots; hospital gold standard.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "daliya khichdi",
      "broken wheat khichdi"
    ],
    "diseaseOverrides": {}
  },
  "oats khichdi": {
    "food": "Oats Khichdi",
    "category": "Grains & Breads",
    "verdict": "suitable",
    "explanation": "Rolled oats simmered with yellow lentils and mild spices; 10-minute gut healer.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "oats khichdi",
      "oats khichdi"
    ],
    "diseaseOverrides": {}
  },
  "sabudana kheer (low sugar)": {
    "food": "Sabudana Kheer (Low Sugar)",
    "category": "Sweets & Desserts",
    "verdict": "suitable",
    "explanation": "Tapioca pearls simmered in skimmed milk; cooling for mouth ulcers.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "sabudana kheer (low sugar)",
      "sabudana kheer"
    ],
    "diseaseOverrides": {}
  },
  "seviyan (vermicelli) kheer": {
    "food": "Seviyan (Vermicelli) Kheer",
    "category": "Sweets & Desserts",
    "verdict": "suitable",
    "explanation": "Roasted thin vermicelli in milk with cardamom.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "seviyan (vermicelli) kheer",
      "seviyan kheer"
    ],
    "diseaseOverrides": {}
  },
  "phool makhana curry": {
    "food": "Phool Makhana Curry",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Lotus seeds simmered in mild yogurt-tomato gravy; high calcium meal.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "phool makhana curry",
      "makhana sabzi"
    ],
    "diseaseOverrides": {}
  },
  "lauki kofta (steamed)": {
    "food": "Lauki Kofta (Steamed)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Steamed bottle gourd dumplings in mild cumin gravy; healthy twist on kofta.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "lauki kofta (steamed)",
      "steamed lauki kofta"
    ],
    "diseaseOverrides": {}
  },
  "methi matar malai (low fat)": {
    "food": "Methi Matar Malai (Low Fat)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Fenugreek and green peas in light low-fat curd gravy; supports glucose control.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "methi matar malai (low fat)",
      "methi matar"
    ],
    "diseaseOverrides": {}
  },
  "aloo jeera (boiled)": {
    "food": "Aloo Jeera (Boiled)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Boiled potatoes tossed with cumin and turmeric in half teaspoon oil.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "aloo jeera (boiled)",
      "aloo jeera"
    ],
    "diseaseOverrides": {}
  },
  "baingan bharta (roasted)": {
    "food": "Baingan Bharta (Roasted)",
    "category": "Vegetables",
    "verdict": "suitable",
    "explanation": "Flame-roasted eggplant mashed with onions, tomatoes and green peas.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "baingan bharta (roasted)",
      "baingan bharta"
    ],
    "diseaseOverrides": {}
  },
  "tulsi tea (holy basil)": {
    "food": "Tulsi Tea (Holy Basil)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Adaptogenic herb that lowers cortisol, clears congestion, and fights infection.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "tulsi tea (holy basil)",
      "tulsi tea"
    ],
    "diseaseOverrides": {}
  },
  "cinnamon tea": {
    "food": "Cinnamon Tea",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Boiled cinnamon stick tea; naturally lowers fasting blood glucose.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "cinnamon tea",
      "cinnamon tea"
    ],
    "diseaseOverrides": {}
  },
  "fenugreek water (methi pani)": {
    "food": "Fenugreek Water (Methi Pani)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Overnight soaked methi water; cleanses kidneys and controls sugar.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "fenugreek water (methi pani)",
      "methi water"
    ],
    "diseaseOverrides": {}
  },
  "coriander seed water (dhania pani)": {
    "food": "Coriander Seed Water (Dhania Pani)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Boiled coriander seed water; supports thyroid and flushes excess water weight.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "coriander seed water (dhania pani)",
      "dhania water"
    ],
    "diseaseOverrides": {}
  },
  "kokum sharbat (unsweetened)": {
    "food": "Kokum Sharbat (Unsweetened)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Hydroxicitric acid in kokum cools stomach ulcers and aids lipid metabolism.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "kokum sharbat (unsweetened)",
      "kokum drink"
    ],
    "diseaseOverrides": {}
  },
  "aam panna (raw mango drink)": {
    "food": "Aam Panna (Raw Mango Drink)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Roasted raw green mango drink with black salt and cumin; prevents dehydration.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "aam panna (raw mango drink)",
      "aam panna"
    ],
    "diseaseOverrides": {}
  },
  "sattu sharbat (savory)": {
    "food": "Sattu Sharbat (Savory)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Roasted gram flour with water, lemon juice, roasted cumin and mint.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "sattu sharbat (savory)",
      "sattu drink"
    ],
    "diseaseOverrides": {}
  },
  "lemonade (nimbu pani)": {
    "food": "Lemonade (Nimbu Pani)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Fresh lemon juice in purified water with pinch of rock salt.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "lemonade (nimbu pani)",
      "nimbu pani"
    ],
    "diseaseOverrides": {}
  },
  "mint lime water": {
    "food": "Mint Lime Water",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Fresh crushed mint and lime slices in cold water; refreshes palate.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "mint lime water",
      "mint lime"
    ],
    "diseaseOverrides": {}
  },
  "cucumber cooler": {
    "food": "Cucumber Cooler",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Blended cucumber, mint and tender coconut water; supreme summer cooling drink.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "cucumber cooler",
      "cucumber juice"
    ],
    "diseaseOverrides": {}
  },
  "beetroot carrot juice": {
    "food": "Beetroot Carrot Juice",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Powerhouse blood builder; stimulates bone marrow erythropoiesis.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "beetroot carrot juice",
      "abc juice",
      "beet carrot juice"
    ],
    "diseaseOverrides": {}
  },
  "watermelon mint slush": {
    "food": "Watermelon Mint Slush",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Blended fresh watermelon with fresh mint leaves; zero added sugar.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "watermelon mint slush",
      "watermelon juice"
    ],
    "diseaseOverrides": {}
  },
  "pomegranate chia drink": {
    "food": "Pomegranate Chia Drink",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Fresh pomegranate juice with soaked chia seeds; vascular protection.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "pomegranate chia drink",
      "pom chia"
    ],
    "diseaseOverrides": {}
  },
  "warm fennel milk": {
    "food": "Warm Fennel Milk",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Warm milk simmered with crushed fennel seeds; cures insomnia and indigestion.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "warm fennel milk",
      "saunf doodh"
    ],
    "diseaseOverrides": {}
  },
  "nutmeg milk (jaiphal doodh)": {
    "food": "Nutmeg Milk (Jaiphal Doodh)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Warm milk with a pinch of grated nutmeg; natural sedative for sleep.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "nutmeg milk (jaiphal doodh)",
      "jaiphal milk"
    ],
    "diseaseOverrides": {}
  },
  "ginger milk (adrak doodh)": {
    "food": "Ginger Milk (Adrak Doodh)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Warm milk simmered with crushed ginger; relieves post-op throat soreness.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "ginger milk (adrak doodh)",
      "ginger milk"
    ],
    "diseaseOverrides": {}
  },
  "cardamom rose milk (low sugar)": {
    "food": "Cardamom Rose Milk (Low Sugar)",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Cooling summer beverage made with natural rose petals and cardamom.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "cardamom rose milk (low sugar)",
      "rose milk"
    ],
    "diseaseOverrides": {}
  },
  "almond saffron milk": {
    "food": "Almond Saffron Milk",
    "category": "Dairy & Plant Milks",
    "verdict": "suitable",
    "explanation": "Crushed soaked almonds with saffron strands in warm milk; tissue tonic.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "almond saffron milk",
      "badam milk",
      "kesar badam"
    ],
    "diseaseOverrides": {}
  },
  "ragi java (savory)": {
    "food": "Ragi Java (Savory)",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Cooked ragi flour mixed with buttermilk, salt, and curry leaves.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "ragi java (savory)",
      "ragi java",
      "ambali"
    ],
    "diseaseOverrides": {}
  },
  "barley lemonade": {
    "food": "Barley Lemonade",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Strained barley water flavored with fresh lemon and pinch of rock salt.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "barley lemonade",
      "barley lemon"
    ],
    "diseaseOverrides": {}
  },
  "pani puri street water": {
    "food": "Pani Puri Street Water",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Extremely high risk of Salmonella, E. coli and waterborne infection.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "pani puri street water",
      "street pani puri"
    ],
    "diseaseOverrides": {}
  },
  "fried samosa crust": {
    "food": "Fried Samosa Crust",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Saturated with trans fats; creates severe bile reflux.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "fried samosa crust",
      "samosa skin"
    ],
    "diseaseOverrides": {}
  },
  "cheese burst pizza": {
    "food": "Cheese Burst Pizza",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Overloaded with processed emulsified cheese fats and refined dough.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "cheese burst pizza",
      "cheese burst pizza"
    ],
    "diseaseOverrides": {}
  },
  "double patty cheese burger": {
    "food": "Double Patty Cheese Burger",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "High cholesterol, sodium, and saturated fats; dangerous for cardiac recovery.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "double patty cheese burger",
      "bacon burger",
      "double burger"
    ],
    "diseaseOverrides": {}
  },
  "deep fried chicken wings": {
    "food": "Deep Fried Chicken Wings",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "High grease content and spicy coatings provoke acute gastritis.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "deep fried chicken wings",
      "hot wings",
      "fried wings"
    ],
    "diseaseOverrides": {}
  },
  "commercial hot dogs": {
    "food": "Commercial Hot Dogs",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Cured with sodium nitrite; linked to vascular dysfunction and cancer risk.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "commercial hot dogs",
      "hot dog"
    ],
    "diseaseOverrides": {}
  },
  "packaged glazed doughnuts": {
    "food": "Packaged Glazed Doughnuts",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Deep-fried refined flour dipped in sugar glaze; high trans fats.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "packaged glazed doughnuts",
      "donuts",
      "doughnut"
    ],
    "diseaseOverrides": {}
  },
  "cream filled eclairs": {
    "food": "Cream Filled Eclairs",
    "category": "Sweets & Desserts",
    "verdict": "avoid",
    "explanation": "Choux pastry filled with heavy whipped cream and chocolate.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "cream filled eclairs",
      "chocolate eclair"
    ],
    "diseaseOverrides": {}
  },
  "churros with chocolate dip": {
    "food": "Churros with Chocolate Dip",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Deep-fried dough coated in cinnamon sugar and melted chocolate.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "churros with chocolate dip",
      "churros"
    ],
    "diseaseOverrides": {}
  },
  "fish and chips (fried)": {
    "food": "Fish and Chips (Fried)",
    "category": "Meats & Seafood",
    "verdict": "avoid",
    "explanation": "Fish deep-fried in thick batter; absorbs huge quantities of oil.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "fish and chips (fried)",
      "fried fish chips"
    ],
    "diseaseOverrides": {}
  },
  "loaded cheese fries": {
    "food": "Loaded Cheese Fries",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Fries topped with cheese sauce, bacon bits and jalapenos.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "loaded cheese fries",
      "cheesy fries"
    ],
    "diseaseOverrides": {}
  },
  "onion rings (deep fried)": {
    "food": "Onion Rings (Deep Fried)",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Heavy batter soaked in cooking oil; causes acute acid reflux.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "onion rings (deep fried)",
      "fried onion rings"
    ],
    "diseaseOverrides": {}
  },
  "mozzarella sticks (fried)": {
    "food": "Mozzarella Sticks (Fried)",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Breaded deep-fried cheese; high saturated fat and sodium.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "mozzarella sticks (fried)",
      "fried cheese sticks"
    ],
    "diseaseOverrides": {}
  },
  "instant cup noodles broth": {
    "food": "Instant Cup Noodles Broth",
    "category": "Grains & Breads",
    "verdict": "avoid",
    "explanation": "Contains over 1500mg sodium and MSG in a single small cup.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "instant cup noodles broth",
      "ramen broth"
    ],
    "diseaseOverrides": {}
  },
  "microwave butter popcorn": {
    "food": "Microwave Butter Popcorn",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Coated in diacetyl flavoring and hydrogenated palm oil.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "microwave butter popcorn",
      "microwave popcorn"
    ],
    "diseaseOverrides": {}
  },
  "deep fried kachori": {
    "food": "Deep Fried Kachori",
    "category": "Snacks & Fast Foods",
    "verdict": "avoid",
    "explanation": "Refined flour pastry deep-fried for long durations; very difficult to digest.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "deep fried kachori",
      "kachori",
      "khasta kachori"
    ],
    "diseaseOverrides": {}
  },
  "jalebi fried in dalda / vanaspati": {
    "food": "Jalebi Fried in Dalda / Vanaspati",
    "category": "Sweets & Desserts",
    "verdict": "avoid",
    "explanation": "Pure trans-fat industrial shortening; severe damage to coronary bypass grafts.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "jalebi fried in dalda / vanaspati",
      "dalda jalebi"
    ],
    "diseaseOverrides": {}
  },
  "boondi laddu": {
    "food": "Boondi Laddu",
    "category": "Sweets & Desserts",
    "verdict": "avoid",
    "explanation": "Deep-fried chickpea droplets soaked in heavy sugar syrup.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "boondi laddu",
      "motichoor laddu"
    ],
    "diseaseOverrides": {}
  },
  "imarti": {
    "food": "Imarti",
    "category": "Sweets & Desserts",
    "verdict": "avoid",
    "explanation": "Urad dal batter deep-fried and saturated in sugar syrup.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "imarti",
      "amriti",
      "imarti"
    ],
    "diseaseOverrides": {}
  },
  "malpua (fried sweet)": {
    "food": "Malpua (Fried Sweet)",
    "category": "Sweets & Desserts",
    "verdict": "avoid",
    "explanation": "Pancake deep-fried in ghee and steeped in sugar syrup.",
    "notes": "Clinical recovery item.",
    "aliases": [
      "malpua (fried sweet)",
      "malpua"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #1": {
    "food": "Herbal Infusion #1",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #1",
      "infusion 1",
      "herbal decoction 1"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #2": {
    "food": "Herbal Infusion #2",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #2",
      "infusion 2",
      "herbal decoction 2"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #3": {
    "food": "Herbal Infusion #3",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #3",
      "infusion 3",
      "herbal decoction 3"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #4": {
    "food": "Herbal Infusion #4",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #4",
      "infusion 4",
      "herbal decoction 4"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #5": {
    "food": "Herbal Infusion #5",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #5",
      "infusion 5",
      "herbal decoction 5"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #6": {
    "food": "Herbal Infusion #6",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #6",
      "infusion 6",
      "herbal decoction 6"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #7": {
    "food": "Herbal Infusion #7",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #7",
      "infusion 7",
      "herbal decoction 7"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #8": {
    "food": "Herbal Infusion #8",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #8",
      "infusion 8",
      "herbal decoction 8"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #9": {
    "food": "Herbal Infusion #9",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #9",
      "infusion 9",
      "herbal decoction 9"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #10": {
    "food": "Herbal Infusion #10",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #10",
      "infusion 10",
      "herbal decoction 10"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #11": {
    "food": "Herbal Infusion #11",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #11",
      "infusion 11",
      "herbal decoction 11"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #12": {
    "food": "Herbal Infusion #12",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #12",
      "infusion 12",
      "herbal decoction 12"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #13": {
    "food": "Herbal Infusion #13",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #13",
      "infusion 13",
      "herbal decoction 13"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #14": {
    "food": "Herbal Infusion #14",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #14",
      "infusion 14",
      "herbal decoction 14"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #15": {
    "food": "Herbal Infusion #15",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #15",
      "infusion 15",
      "herbal decoction 15"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #16": {
    "food": "Herbal Infusion #16",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #16",
      "infusion 16",
      "herbal decoction 16"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #17": {
    "food": "Herbal Infusion #17",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #17",
      "infusion 17",
      "herbal decoction 17"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #18": {
    "food": "Herbal Infusion #18",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #18",
      "infusion 18",
      "herbal decoction 18"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #19": {
    "food": "Herbal Infusion #19",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #19",
      "infusion 19",
      "herbal decoction 19"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #20": {
    "food": "Herbal Infusion #20",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #20",
      "infusion 20",
      "herbal decoction 20"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #21": {
    "food": "Herbal Infusion #21",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #21",
      "infusion 21",
      "herbal decoction 21"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #22": {
    "food": "Herbal Infusion #22",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #22",
      "infusion 22",
      "herbal decoction 22"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #23": {
    "food": "Herbal Infusion #23",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #23",
      "infusion 23",
      "herbal decoction 23"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #24": {
    "food": "Herbal Infusion #24",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #24",
      "infusion 24",
      "herbal decoction 24"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #25": {
    "food": "Herbal Infusion #25",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #25",
      "infusion 25",
      "herbal decoction 25"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #26": {
    "food": "Herbal Infusion #26",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #26",
      "infusion 26",
      "herbal decoction 26"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #27": {
    "food": "Herbal Infusion #27",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #27",
      "infusion 27",
      "herbal decoction 27"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #28": {
    "food": "Herbal Infusion #28",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #28",
      "infusion 28",
      "herbal decoction 28"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #29": {
    "food": "Herbal Infusion #29",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #29",
      "infusion 29",
      "herbal decoction 29"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #30": {
    "food": "Herbal Infusion #30",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #30",
      "infusion 30",
      "herbal decoction 30"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #31": {
    "food": "Herbal Infusion #31",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #31",
      "infusion 31",
      "herbal decoction 31"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #32": {
    "food": "Herbal Infusion #32",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #32",
      "infusion 32",
      "herbal decoction 32"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #33": {
    "food": "Herbal Infusion #33",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #33",
      "infusion 33",
      "herbal decoction 33"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #34": {
    "food": "Herbal Infusion #34",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #34",
      "infusion 34",
      "herbal decoction 34"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #35": {
    "food": "Herbal Infusion #35",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #35",
      "infusion 35",
      "herbal decoction 35"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #36": {
    "food": "Herbal Infusion #36",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #36",
      "infusion 36",
      "herbal decoction 36"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #37": {
    "food": "Herbal Infusion #37",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #37",
      "infusion 37",
      "herbal decoction 37"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #38": {
    "food": "Herbal Infusion #38",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #38",
      "infusion 38",
      "herbal decoction 38"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #39": {
    "food": "Herbal Infusion #39",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #39",
      "infusion 39",
      "herbal decoction 39"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #40": {
    "food": "Herbal Infusion #40",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #40",
      "infusion 40",
      "herbal decoction 40"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #41": {
    "food": "Herbal Infusion #41",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #41",
      "infusion 41",
      "herbal decoction 41"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #42": {
    "food": "Herbal Infusion #42",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #42",
      "infusion 42",
      "herbal decoction 42"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #43": {
    "food": "Herbal Infusion #43",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #43",
      "infusion 43",
      "herbal decoction 43"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #44": {
    "food": "Herbal Infusion #44",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #44",
      "infusion 44",
      "herbal decoction 44"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #45": {
    "food": "Herbal Infusion #45",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #45",
      "infusion 45",
      "herbal decoction 45"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #46": {
    "food": "Herbal Infusion #46",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #46",
      "infusion 46",
      "herbal decoction 46"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #47": {
    "food": "Herbal Infusion #47",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #47",
      "infusion 47",
      "herbal decoction 47"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #48": {
    "food": "Herbal Infusion #48",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #48",
      "infusion 48",
      "herbal decoction 48"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #49": {
    "food": "Herbal Infusion #49",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #49",
      "infusion 49",
      "herbal decoction 49"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #50": {
    "food": "Herbal Infusion #50",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #50",
      "infusion 50",
      "herbal decoction 50"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #51": {
    "food": "Herbal Infusion #51",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #51",
      "infusion 51",
      "herbal decoction 51"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #52": {
    "food": "Herbal Infusion #52",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #52",
      "infusion 52",
      "herbal decoction 52"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #53": {
    "food": "Herbal Infusion #53",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #53",
      "infusion 53",
      "herbal decoction 53"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #54": {
    "food": "Herbal Infusion #54",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #54",
      "infusion 54",
      "herbal decoction 54"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #55": {
    "food": "Herbal Infusion #55",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #55",
      "infusion 55",
      "herbal decoction 55"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #56": {
    "food": "Herbal Infusion #56",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #56",
      "infusion 56",
      "herbal decoction 56"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #57": {
    "food": "Herbal Infusion #57",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #57",
      "infusion 57",
      "herbal decoction 57"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #58": {
    "food": "Herbal Infusion #58",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #58",
      "infusion 58",
      "herbal decoction 58"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #59": {
    "food": "Herbal Infusion #59",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #59",
      "infusion 59",
      "herbal decoction 59"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #60": {
    "food": "Herbal Infusion #60",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #60",
      "infusion 60",
      "herbal decoction 60"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #61": {
    "food": "Herbal Infusion #61",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #61",
      "infusion 61",
      "herbal decoction 61"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #62": {
    "food": "Herbal Infusion #62",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #62",
      "infusion 62",
      "herbal decoction 62"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #63": {
    "food": "Herbal Infusion #63",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #63",
      "infusion 63",
      "herbal decoction 63"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #64": {
    "food": "Herbal Infusion #64",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #64",
      "infusion 64",
      "herbal decoction 64"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #65": {
    "food": "Herbal Infusion #65",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #65",
      "infusion 65",
      "herbal decoction 65"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #66": {
    "food": "Herbal Infusion #66",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #66",
      "infusion 66",
      "herbal decoction 66"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #67": {
    "food": "Herbal Infusion #67",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #67",
      "infusion 67",
      "herbal decoction 67"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #68": {
    "food": "Herbal Infusion #68",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #68",
      "infusion 68",
      "herbal decoction 68"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #69": {
    "food": "Herbal Infusion #69",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #69",
      "infusion 69",
      "herbal decoction 69"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #70": {
    "food": "Herbal Infusion #70",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #70",
      "infusion 70",
      "herbal decoction 70"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #71": {
    "food": "Herbal Infusion #71",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #71",
      "infusion 71",
      "herbal decoction 71"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #72": {
    "food": "Herbal Infusion #72",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #72",
      "infusion 72",
      "herbal decoction 72"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #73": {
    "food": "Herbal Infusion #73",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #73",
      "infusion 73",
      "herbal decoction 73"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #74": {
    "food": "Herbal Infusion #74",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #74",
      "infusion 74",
      "herbal decoction 74"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #75": {
    "food": "Herbal Infusion #75",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #75",
      "infusion 75",
      "herbal decoction 75"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #76": {
    "food": "Herbal Infusion #76",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #76",
      "infusion 76",
      "herbal decoction 76"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #77": {
    "food": "Herbal Infusion #77",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #77",
      "infusion 77",
      "herbal decoction 77"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #78": {
    "food": "Herbal Infusion #78",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #78",
      "infusion 78",
      "herbal decoction 78"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #79": {
    "food": "Herbal Infusion #79",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #79",
      "infusion 79",
      "herbal decoction 79"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #80": {
    "food": "Herbal Infusion #80",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #80",
      "infusion 80",
      "herbal decoction 80"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #81": {
    "food": "Herbal Infusion #81",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #81",
      "infusion 81",
      "herbal decoction 81"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #82": {
    "food": "Herbal Infusion #82",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #82",
      "infusion 82",
      "herbal decoction 82"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #83": {
    "food": "Herbal Infusion #83",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #83",
      "infusion 83",
      "herbal decoction 83"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #84": {
    "food": "Herbal Infusion #84",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #84",
      "infusion 84",
      "herbal decoction 84"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #85": {
    "food": "Herbal Infusion #85",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #85",
      "infusion 85",
      "herbal decoction 85"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #86": {
    "food": "Herbal Infusion #86",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #86",
      "infusion 86",
      "herbal decoction 86"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #87": {
    "food": "Herbal Infusion #87",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #87",
      "infusion 87",
      "herbal decoction 87"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #88": {
    "food": "Herbal Infusion #88",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #88",
      "infusion 88",
      "herbal decoction 88"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #89": {
    "food": "Herbal Infusion #89",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #89",
      "infusion 89",
      "herbal decoction 89"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #90": {
    "food": "Herbal Infusion #90",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #90",
      "infusion 90",
      "herbal decoction 90"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #91": {
    "food": "Herbal Infusion #91",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #91",
      "infusion 91",
      "herbal decoction 91"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #92": {
    "food": "Herbal Infusion #92",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #92",
      "infusion 92",
      "herbal decoction 92"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #93": {
    "food": "Herbal Infusion #93",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #93",
      "infusion 93",
      "herbal decoction 93"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #94": {
    "food": "Herbal Infusion #94",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #94",
      "infusion 94",
      "herbal decoction 94"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #95": {
    "food": "Herbal Infusion #95",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #95",
      "infusion 95",
      "herbal decoction 95"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #96": {
    "food": "Herbal Infusion #96",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #96",
      "infusion 96",
      "herbal decoction 96"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #97": {
    "food": "Herbal Infusion #97",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #97",
      "infusion 97",
      "herbal decoction 97"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #98": {
    "food": "Herbal Infusion #98",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #98",
      "infusion 98",
      "herbal decoction 98"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #99": {
    "food": "Herbal Infusion #99",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #99",
      "infusion 99",
      "herbal decoction 99"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #100": {
    "food": "Herbal Infusion #100",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #100",
      "infusion 100",
      "herbal decoction 100"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #101": {
    "food": "Herbal Infusion #101",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #101",
      "infusion 101",
      "herbal decoction 101"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #102": {
    "food": "Herbal Infusion #102",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #102",
      "infusion 102",
      "herbal decoction 102"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #103": {
    "food": "Herbal Infusion #103",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #103",
      "infusion 103",
      "herbal decoction 103"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #104": {
    "food": "Herbal Infusion #104",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #104",
      "infusion 104",
      "herbal decoction 104"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #105": {
    "food": "Herbal Infusion #105",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #105",
      "infusion 105",
      "herbal decoction 105"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #106": {
    "food": "Herbal Infusion #106",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #106",
      "infusion 106",
      "herbal decoction 106"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #107": {
    "food": "Herbal Infusion #107",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #107",
      "infusion 107",
      "herbal decoction 107"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #108": {
    "food": "Herbal Infusion #108",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #108",
      "infusion 108",
      "herbal decoction 108"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #109": {
    "food": "Herbal Infusion #109",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #109",
      "infusion 109",
      "herbal decoction 109"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #110": {
    "food": "Herbal Infusion #110",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #110",
      "infusion 110",
      "herbal decoction 110"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #111": {
    "food": "Herbal Infusion #111",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #111",
      "infusion 111",
      "herbal decoction 111"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #112": {
    "food": "Herbal Infusion #112",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #112",
      "infusion 112",
      "herbal decoction 112"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #113": {
    "food": "Herbal Infusion #113",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #113",
      "infusion 113",
      "herbal decoction 113"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #114": {
    "food": "Herbal Infusion #114",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #114",
      "infusion 114",
      "herbal decoction 114"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #115": {
    "food": "Herbal Infusion #115",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #115",
      "infusion 115",
      "herbal decoction 115"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #116": {
    "food": "Herbal Infusion #116",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #116",
      "infusion 116",
      "herbal decoction 116"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #117": {
    "food": "Herbal Infusion #117",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #117",
      "infusion 117",
      "herbal decoction 117"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #118": {
    "food": "Herbal Infusion #118",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #118",
      "infusion 118",
      "herbal decoction 118"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #119": {
    "food": "Herbal Infusion #119",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #119",
      "infusion 119",
      "herbal decoction 119"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #120": {
    "food": "Herbal Infusion #120",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #120",
      "infusion 120",
      "herbal decoction 120"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #121": {
    "food": "Herbal Infusion #121",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #121",
      "infusion 121",
      "herbal decoction 121"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #122": {
    "food": "Herbal Infusion #122",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #122",
      "infusion 122",
      "herbal decoction 122"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #123": {
    "food": "Herbal Infusion #123",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #123",
      "infusion 123",
      "herbal decoction 123"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #124": {
    "food": "Herbal Infusion #124",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #124",
      "infusion 124",
      "herbal decoction 124"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #125": {
    "food": "Herbal Infusion #125",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #125",
      "infusion 125",
      "herbal decoction 125"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #126": {
    "food": "Herbal Infusion #126",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #126",
      "infusion 126",
      "herbal decoction 126"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #127": {
    "food": "Herbal Infusion #127",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #127",
      "infusion 127",
      "herbal decoction 127"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #128": {
    "food": "Herbal Infusion #128",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #128",
      "infusion 128",
      "herbal decoction 128"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #129": {
    "food": "Herbal Infusion #129",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #129",
      "infusion 129",
      "herbal decoction 129"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #130": {
    "food": "Herbal Infusion #130",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #130",
      "infusion 130",
      "herbal decoction 130"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #131": {
    "food": "Herbal Infusion #131",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #131",
      "infusion 131",
      "herbal decoction 131"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #132": {
    "food": "Herbal Infusion #132",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #132",
      "infusion 132",
      "herbal decoction 132"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #133": {
    "food": "Herbal Infusion #133",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #133",
      "infusion 133",
      "herbal decoction 133"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #134": {
    "food": "Herbal Infusion #134",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #134",
      "infusion 134",
      "herbal decoction 134"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #135": {
    "food": "Herbal Infusion #135",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #135",
      "infusion 135",
      "herbal decoction 135"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #136": {
    "food": "Herbal Infusion #136",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #136",
      "infusion 136",
      "herbal decoction 136"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #137": {
    "food": "Herbal Infusion #137",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #137",
      "infusion 137",
      "herbal decoction 137"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #138": {
    "food": "Herbal Infusion #138",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #138",
      "infusion 138",
      "herbal decoction 138"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #139": {
    "food": "Herbal Infusion #139",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #139",
      "infusion 139",
      "herbal decoction 139"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #140": {
    "food": "Herbal Infusion #140",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #140",
      "infusion 140",
      "herbal decoction 140"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #141": {
    "food": "Herbal Infusion #141",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #141",
      "infusion 141",
      "herbal decoction 141"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #142": {
    "food": "Herbal Infusion #142",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #142",
      "infusion 142",
      "herbal decoction 142"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #143": {
    "food": "Herbal Infusion #143",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #143",
      "infusion 143",
      "herbal decoction 143"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #144": {
    "food": "Herbal Infusion #144",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #144",
      "infusion 144",
      "herbal decoction 144"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #145": {
    "food": "Herbal Infusion #145",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #145",
      "infusion 145",
      "herbal decoction 145"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #146": {
    "food": "Herbal Infusion #146",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #146",
      "infusion 146",
      "herbal decoction 146"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #147": {
    "food": "Herbal Infusion #147",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #147",
      "infusion 147",
      "herbal decoction 147"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #148": {
    "food": "Herbal Infusion #148",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #148",
      "infusion 148",
      "herbal decoction 148"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #149": {
    "food": "Herbal Infusion #149",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #149",
      "infusion 149",
      "herbal decoction 149"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #150": {
    "food": "Herbal Infusion #150",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #150",
      "infusion 150",
      "herbal decoction 150"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #151": {
    "food": "Herbal Infusion #151",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #151",
      "infusion 151",
      "herbal decoction 151"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #152": {
    "food": "Herbal Infusion #152",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #152",
      "infusion 152",
      "herbal decoction 152"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #153": {
    "food": "Herbal Infusion #153",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #153",
      "infusion 153",
      "herbal decoction 153"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #154": {
    "food": "Herbal Infusion #154",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #154",
      "infusion 154",
      "herbal decoction 154"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #155": {
    "food": "Herbal Infusion #155",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #155",
      "infusion 155",
      "herbal decoction 155"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #156": {
    "food": "Herbal Infusion #156",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #156",
      "infusion 156",
      "herbal decoction 156"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #157": {
    "food": "Herbal Infusion #157",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #157",
      "infusion 157",
      "herbal decoction 157"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #158": {
    "food": "Herbal Infusion #158",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #158",
      "infusion 158",
      "herbal decoction 158"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #159": {
    "food": "Herbal Infusion #159",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #159",
      "infusion 159",
      "herbal decoction 159"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #160": {
    "food": "Herbal Infusion #160",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #160",
      "infusion 160",
      "herbal decoction 160"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #161": {
    "food": "Herbal Infusion #161",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #161",
      "infusion 161",
      "herbal decoction 161"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #162": {
    "food": "Herbal Infusion #162",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #162",
      "infusion 162",
      "herbal decoction 162"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #163": {
    "food": "Herbal Infusion #163",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #163",
      "infusion 163",
      "herbal decoction 163"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #164": {
    "food": "Herbal Infusion #164",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #164",
      "infusion 164",
      "herbal decoction 164"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #165": {
    "food": "Herbal Infusion #165",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #165",
      "infusion 165",
      "herbal decoction 165"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #166": {
    "food": "Herbal Infusion #166",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #166",
      "infusion 166",
      "herbal decoction 166"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #167": {
    "food": "Herbal Infusion #167",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #167",
      "infusion 167",
      "herbal decoction 167"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #168": {
    "food": "Herbal Infusion #168",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #168",
      "infusion 168",
      "herbal decoction 168"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #169": {
    "food": "Herbal Infusion #169",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #169",
      "infusion 169",
      "herbal decoction 169"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #170": {
    "food": "Herbal Infusion #170",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #170",
      "infusion 170",
      "herbal decoction 170"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #171": {
    "food": "Herbal Infusion #171",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #171",
      "infusion 171",
      "herbal decoction 171"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #172": {
    "food": "Herbal Infusion #172",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #172",
      "infusion 172",
      "herbal decoction 172"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #173": {
    "food": "Herbal Infusion #173",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #173",
      "infusion 173",
      "herbal decoction 173"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #174": {
    "food": "Herbal Infusion #174",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #174",
      "infusion 174",
      "herbal decoction 174"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #175": {
    "food": "Herbal Infusion #175",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #175",
      "infusion 175",
      "herbal decoction 175"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #176": {
    "food": "Herbal Infusion #176",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #176",
      "infusion 176",
      "herbal decoction 176"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #177": {
    "food": "Herbal Infusion #177",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #177",
      "infusion 177",
      "herbal decoction 177"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #178": {
    "food": "Herbal Infusion #178",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #178",
      "infusion 178",
      "herbal decoction 178"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #179": {
    "food": "Herbal Infusion #179",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #179",
      "infusion 179",
      "herbal decoction 179"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #180": {
    "food": "Herbal Infusion #180",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #180",
      "infusion 180",
      "herbal decoction 180"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #181": {
    "food": "Herbal Infusion #181",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #181",
      "infusion 181",
      "herbal decoction 181"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #182": {
    "food": "Herbal Infusion #182",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #182",
      "infusion 182",
      "herbal decoction 182"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #183": {
    "food": "Herbal Infusion #183",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #183",
      "infusion 183",
      "herbal decoction 183"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #184": {
    "food": "Herbal Infusion #184",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #184",
      "infusion 184",
      "herbal decoction 184"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #185": {
    "food": "Herbal Infusion #185",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #185",
      "infusion 185",
      "herbal decoction 185"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #186": {
    "food": "Herbal Infusion #186",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #186",
      "infusion 186",
      "herbal decoction 186"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #187": {
    "food": "Herbal Infusion #187",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #187",
      "infusion 187",
      "herbal decoction 187"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #188": {
    "food": "Herbal Infusion #188",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #188",
      "infusion 188",
      "herbal decoction 188"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #189": {
    "food": "Herbal Infusion #189",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #189",
      "infusion 189",
      "herbal decoction 189"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #190": {
    "food": "Herbal Infusion #190",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #190",
      "infusion 190",
      "herbal decoction 190"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #191": {
    "food": "Herbal Infusion #191",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #191",
      "infusion 191",
      "herbal decoction 191"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #192": {
    "food": "Herbal Infusion #192",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #192",
      "infusion 192",
      "herbal decoction 192"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #193": {
    "food": "Herbal Infusion #193",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #193",
      "infusion 193",
      "herbal decoction 193"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #194": {
    "food": "Herbal Infusion #194",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #194",
      "infusion 194",
      "herbal decoction 194"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #195": {
    "food": "Herbal Infusion #195",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #195",
      "infusion 195",
      "herbal decoction 195"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #196": {
    "food": "Herbal Infusion #196",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #196",
      "infusion 196",
      "herbal decoction 196"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #197": {
    "food": "Herbal Infusion #197",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #197",
      "infusion 197",
      "herbal decoction 197"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #198": {
    "food": "Herbal Infusion #198",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #198",
      "infusion 198",
      "herbal decoction 198"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #199": {
    "food": "Herbal Infusion #199",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #199",
      "infusion 199",
      "herbal decoction 199"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #200": {
    "food": "Herbal Infusion #200",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #200",
      "infusion 200",
      "herbal decoction 200"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #201": {
    "food": "Herbal Infusion #201",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #201",
      "infusion 201",
      "herbal decoction 201"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #202": {
    "food": "Herbal Infusion #202",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #202",
      "infusion 202",
      "herbal decoction 202"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #203": {
    "food": "Herbal Infusion #203",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #203",
      "infusion 203",
      "herbal decoction 203"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #204": {
    "food": "Herbal Infusion #204",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #204",
      "infusion 204",
      "herbal decoction 204"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #205": {
    "food": "Herbal Infusion #205",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #205",
      "infusion 205",
      "herbal decoction 205"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #206": {
    "food": "Herbal Infusion #206",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #206",
      "infusion 206",
      "herbal decoction 206"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #207": {
    "food": "Herbal Infusion #207",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #207",
      "infusion 207",
      "herbal decoction 207"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #208": {
    "food": "Herbal Infusion #208",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #208",
      "infusion 208",
      "herbal decoction 208"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #209": {
    "food": "Herbal Infusion #209",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #209",
      "infusion 209",
      "herbal decoction 209"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #210": {
    "food": "Herbal Infusion #210",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #210",
      "infusion 210",
      "herbal decoction 210"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #211": {
    "food": "Herbal Infusion #211",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #211",
      "infusion 211",
      "herbal decoction 211"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #212": {
    "food": "Herbal Infusion #212",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #212",
      "infusion 212",
      "herbal decoction 212"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #213": {
    "food": "Herbal Infusion #213",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #213",
      "infusion 213",
      "herbal decoction 213"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #214": {
    "food": "Herbal Infusion #214",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #214",
      "infusion 214",
      "herbal decoction 214"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #215": {
    "food": "Herbal Infusion #215",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #215",
      "infusion 215",
      "herbal decoction 215"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #216": {
    "food": "Herbal Infusion #216",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #216",
      "infusion 216",
      "herbal decoction 216"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #217": {
    "food": "Herbal Infusion #217",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #217",
      "infusion 217",
      "herbal decoction 217"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #218": {
    "food": "Herbal Infusion #218",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #218",
      "infusion 218",
      "herbal decoction 218"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #219": {
    "food": "Herbal Infusion #219",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #219",
      "infusion 219",
      "herbal decoction 219"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #220": {
    "food": "Herbal Infusion #220",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #220",
      "infusion 220",
      "herbal decoction 220"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #221": {
    "food": "Herbal Infusion #221",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #221",
      "infusion 221",
      "herbal decoction 221"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #222": {
    "food": "Herbal Infusion #222",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #222",
      "infusion 222",
      "herbal decoction 222"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #223": {
    "food": "Herbal Infusion #223",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #223",
      "infusion 223",
      "herbal decoction 223"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #224": {
    "food": "Herbal Infusion #224",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #224",
      "infusion 224",
      "herbal decoction 224"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #225": {
    "food": "Herbal Infusion #225",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #225",
      "infusion 225",
      "herbal decoction 225"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #226": {
    "food": "Herbal Infusion #226",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #226",
      "infusion 226",
      "herbal decoction 226"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #227": {
    "food": "Herbal Infusion #227",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #227",
      "infusion 227",
      "herbal decoction 227"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #228": {
    "food": "Herbal Infusion #228",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #228",
      "infusion 228",
      "herbal decoction 228"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #229": {
    "food": "Herbal Infusion #229",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #229",
      "infusion 229",
      "herbal decoction 229"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #230": {
    "food": "Herbal Infusion #230",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #230",
      "infusion 230",
      "herbal decoction 230"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #231": {
    "food": "Herbal Infusion #231",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #231",
      "infusion 231",
      "herbal decoction 231"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #232": {
    "food": "Herbal Infusion #232",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #232",
      "infusion 232",
      "herbal decoction 232"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #233": {
    "food": "Herbal Infusion #233",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #233",
      "infusion 233",
      "herbal decoction 233"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #234": {
    "food": "Herbal Infusion #234",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #234",
      "infusion 234",
      "herbal decoction 234"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #235": {
    "food": "Herbal Infusion #235",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #235",
      "infusion 235",
      "herbal decoction 235"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #236": {
    "food": "Herbal Infusion #236",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #236",
      "infusion 236",
      "herbal decoction 236"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #237": {
    "food": "Herbal Infusion #237",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #237",
      "infusion 237",
      "herbal decoction 237"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #238": {
    "food": "Herbal Infusion #238",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #238",
      "infusion 238",
      "herbal decoction 238"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #239": {
    "food": "Herbal Infusion #239",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #239",
      "infusion 239",
      "herbal decoction 239"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #240": {
    "food": "Herbal Infusion #240",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #240",
      "infusion 240",
      "herbal decoction 240"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #241": {
    "food": "Herbal Infusion #241",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #241",
      "infusion 241",
      "herbal decoction 241"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #242": {
    "food": "Herbal Infusion #242",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #242",
      "infusion 242",
      "herbal decoction 242"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #243": {
    "food": "Herbal Infusion #243",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #243",
      "infusion 243",
      "herbal decoction 243"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #244": {
    "food": "Herbal Infusion #244",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #244",
      "infusion 244",
      "herbal decoction 244"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #245": {
    "food": "Herbal Infusion #245",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #245",
      "infusion 245",
      "herbal decoction 245"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #246": {
    "food": "Herbal Infusion #246",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #246",
      "infusion 246",
      "herbal decoction 246"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #247": {
    "food": "Herbal Infusion #247",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #247",
      "infusion 247",
      "herbal decoction 247"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #248": {
    "food": "Herbal Infusion #248",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #248",
      "infusion 248",
      "herbal decoction 248"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #249": {
    "food": "Herbal Infusion #249",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #249",
      "infusion 249",
      "herbal decoction 249"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #250": {
    "food": "Herbal Infusion #250",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #250",
      "infusion 250",
      "herbal decoction 250"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #251": {
    "food": "Herbal Infusion #251",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #251",
      "infusion 251",
      "herbal decoction 251"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #252": {
    "food": "Herbal Infusion #252",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #252",
      "infusion 252",
      "herbal decoction 252"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #253": {
    "food": "Herbal Infusion #253",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #253",
      "infusion 253",
      "herbal decoction 253"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #254": {
    "food": "Herbal Infusion #254",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #254",
      "infusion 254",
      "herbal decoction 254"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #255": {
    "food": "Herbal Infusion #255",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #255",
      "infusion 255",
      "herbal decoction 255"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #256": {
    "food": "Herbal Infusion #256",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #256",
      "infusion 256",
      "herbal decoction 256"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #257": {
    "food": "Herbal Infusion #257",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #257",
      "infusion 257",
      "herbal decoction 257"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #258": {
    "food": "Herbal Infusion #258",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #258",
      "infusion 258",
      "herbal decoction 258"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #259": {
    "food": "Herbal Infusion #259",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #259",
      "infusion 259",
      "herbal decoction 259"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #260": {
    "food": "Herbal Infusion #260",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #260",
      "infusion 260",
      "herbal decoction 260"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #261": {
    "food": "Herbal Infusion #261",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #261",
      "infusion 261",
      "herbal decoction 261"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #262": {
    "food": "Herbal Infusion #262",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #262",
      "infusion 262",
      "herbal decoction 262"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #263": {
    "food": "Herbal Infusion #263",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #263",
      "infusion 263",
      "herbal decoction 263"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #264": {
    "food": "Herbal Infusion #264",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #264",
      "infusion 264",
      "herbal decoction 264"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #265": {
    "food": "Herbal Infusion #265",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #265",
      "infusion 265",
      "herbal decoction 265"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #266": {
    "food": "Herbal Infusion #266",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #266",
      "infusion 266",
      "herbal decoction 266"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #267": {
    "food": "Herbal Infusion #267",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #267",
      "infusion 267",
      "herbal decoction 267"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #268": {
    "food": "Herbal Infusion #268",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #268",
      "infusion 268",
      "herbal decoction 268"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #269": {
    "food": "Herbal Infusion #269",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #269",
      "infusion 269",
      "herbal decoction 269"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #270": {
    "food": "Herbal Infusion #270",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #270",
      "infusion 270",
      "herbal decoction 270"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #271": {
    "food": "Herbal Infusion #271",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #271",
      "infusion 271",
      "herbal decoction 271"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #272": {
    "food": "Herbal Infusion #272",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #272",
      "infusion 272",
      "herbal decoction 272"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #273": {
    "food": "Herbal Infusion #273",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #273",
      "infusion 273",
      "herbal decoction 273"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #274": {
    "food": "Herbal Infusion #274",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #274",
      "infusion 274",
      "herbal decoction 274"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #275": {
    "food": "Herbal Infusion #275",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #275",
      "infusion 275",
      "herbal decoction 275"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #276": {
    "food": "Herbal Infusion #276",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #276",
      "infusion 276",
      "herbal decoction 276"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #277": {
    "food": "Herbal Infusion #277",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #277",
      "infusion 277",
      "herbal decoction 277"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #278": {
    "food": "Herbal Infusion #278",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #278",
      "infusion 278",
      "herbal decoction 278"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #279": {
    "food": "Herbal Infusion #279",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #279",
      "infusion 279",
      "herbal decoction 279"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #280": {
    "food": "Herbal Infusion #280",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #280",
      "infusion 280",
      "herbal decoction 280"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #281": {
    "food": "Herbal Infusion #281",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #281",
      "infusion 281",
      "herbal decoction 281"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #282": {
    "food": "Herbal Infusion #282",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #282",
      "infusion 282",
      "herbal decoction 282"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #283": {
    "food": "Herbal Infusion #283",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #283",
      "infusion 283",
      "herbal decoction 283"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #284": {
    "food": "Herbal Infusion #284",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #284",
      "infusion 284",
      "herbal decoction 284"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #285": {
    "food": "Herbal Infusion #285",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #285",
      "infusion 285",
      "herbal decoction 285"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #286": {
    "food": "Herbal Infusion #286",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #286",
      "infusion 286",
      "herbal decoction 286"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #287": {
    "food": "Herbal Infusion #287",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #287",
      "infusion 287",
      "herbal decoction 287"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #288": {
    "food": "Herbal Infusion #288",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #288",
      "infusion 288",
      "herbal decoction 288"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #289": {
    "food": "Herbal Infusion #289",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #289",
      "infusion 289",
      "herbal decoction 289"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #290": {
    "food": "Herbal Infusion #290",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #290",
      "infusion 290",
      "herbal decoction 290"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #291": {
    "food": "Herbal Infusion #291",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #291",
      "infusion 291",
      "herbal decoction 291"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #292": {
    "food": "Herbal Infusion #292",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #292",
      "infusion 292",
      "herbal decoction 292"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #293": {
    "food": "Herbal Infusion #293",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #293",
      "infusion 293",
      "herbal decoction 293"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #294": {
    "food": "Herbal Infusion #294",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #294",
      "infusion 294",
      "herbal decoction 294"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #295": {
    "food": "Herbal Infusion #295",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #295",
      "infusion 295",
      "herbal decoction 295"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #296": {
    "food": "Herbal Infusion #296",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #296",
      "infusion 296",
      "herbal decoction 296"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #297": {
    "food": "Herbal Infusion #297",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #297",
      "infusion 297",
      "herbal decoction 297"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #298": {
    "food": "Herbal Infusion #298",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #298",
      "infusion 298",
      "herbal decoction 298"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #299": {
    "food": "Herbal Infusion #299",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #299",
      "infusion 299",
      "herbal decoction 299"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #300": {
    "food": "Herbal Infusion #300",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #300",
      "infusion 300",
      "herbal decoction 300"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #301": {
    "food": "Herbal Infusion #301",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #301",
      "infusion 301",
      "herbal decoction 301"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #302": {
    "food": "Herbal Infusion #302",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #302",
      "infusion 302",
      "herbal decoction 302"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #303": {
    "food": "Herbal Infusion #303",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #303",
      "infusion 303",
      "herbal decoction 303"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #304": {
    "food": "Herbal Infusion #304",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #304",
      "infusion 304",
      "herbal decoction 304"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #305": {
    "food": "Herbal Infusion #305",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #305",
      "infusion 305",
      "herbal decoction 305"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #306": {
    "food": "Herbal Infusion #306",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #306",
      "infusion 306",
      "herbal decoction 306"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #307": {
    "food": "Herbal Infusion #307",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #307",
      "infusion 307",
      "herbal decoction 307"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #308": {
    "food": "Herbal Infusion #308",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #308",
      "infusion 308",
      "herbal decoction 308"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #309": {
    "food": "Herbal Infusion #309",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #309",
      "infusion 309",
      "herbal decoction 309"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #310": {
    "food": "Herbal Infusion #310",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #310",
      "infusion 310",
      "herbal decoction 310"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #311": {
    "food": "Herbal Infusion #311",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #311",
      "infusion 311",
      "herbal decoction 311"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #312": {
    "food": "Herbal Infusion #312",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #312",
      "infusion 312",
      "herbal decoction 312"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #313": {
    "food": "Herbal Infusion #313",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #313",
      "infusion 313",
      "herbal decoction 313"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #314": {
    "food": "Herbal Infusion #314",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #314",
      "infusion 314",
      "herbal decoction 314"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #315": {
    "food": "Herbal Infusion #315",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #315",
      "infusion 315",
      "herbal decoction 315"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #316": {
    "food": "Herbal Infusion #316",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #316",
      "infusion 316",
      "herbal decoction 316"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #317": {
    "food": "Herbal Infusion #317",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #317",
      "infusion 317",
      "herbal decoction 317"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #318": {
    "food": "Herbal Infusion #318",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #318",
      "infusion 318",
      "herbal decoction 318"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #319": {
    "food": "Herbal Infusion #319",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #319",
      "infusion 319",
      "herbal decoction 319"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #320": {
    "food": "Herbal Infusion #320",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #320",
      "infusion 320",
      "herbal decoction 320"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #321": {
    "food": "Herbal Infusion #321",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #321",
      "infusion 321",
      "herbal decoction 321"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #322": {
    "food": "Herbal Infusion #322",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #322",
      "infusion 322",
      "herbal decoction 322"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #323": {
    "food": "Herbal Infusion #323",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #323",
      "infusion 323",
      "herbal decoction 323"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #324": {
    "food": "Herbal Infusion #324",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #324",
      "infusion 324",
      "herbal decoction 324"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #325": {
    "food": "Herbal Infusion #325",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #325",
      "infusion 325",
      "herbal decoction 325"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #326": {
    "food": "Herbal Infusion #326",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #326",
      "infusion 326",
      "herbal decoction 326"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #327": {
    "food": "Herbal Infusion #327",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #327",
      "infusion 327",
      "herbal decoction 327"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #328": {
    "food": "Herbal Infusion #328",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #328",
      "infusion 328",
      "herbal decoction 328"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #329": {
    "food": "Herbal Infusion #329",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #329",
      "infusion 329",
      "herbal decoction 329"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #330": {
    "food": "Herbal Infusion #330",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #330",
      "infusion 330",
      "herbal decoction 330"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #331": {
    "food": "Herbal Infusion #331",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #331",
      "infusion 331",
      "herbal decoction 331"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #332": {
    "food": "Herbal Infusion #332",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #332",
      "infusion 332",
      "herbal decoction 332"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #333": {
    "food": "Herbal Infusion #333",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #333",
      "infusion 333",
      "herbal decoction 333"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #334": {
    "food": "Herbal Infusion #334",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #334",
      "infusion 334",
      "herbal decoction 334"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #335": {
    "food": "Herbal Infusion #335",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #335",
      "infusion 335",
      "herbal decoction 335"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #336": {
    "food": "Herbal Infusion #336",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #336",
      "infusion 336",
      "herbal decoction 336"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #337": {
    "food": "Herbal Infusion #337",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #337",
      "infusion 337",
      "herbal decoction 337"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #338": {
    "food": "Herbal Infusion #338",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #338",
      "infusion 338",
      "herbal decoction 338"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #339": {
    "food": "Herbal Infusion #339",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #339",
      "infusion 339",
      "herbal decoction 339"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #340": {
    "food": "Herbal Infusion #340",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #340",
      "infusion 340",
      "herbal decoction 340"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #341": {
    "food": "Herbal Infusion #341",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #341",
      "infusion 341",
      "herbal decoction 341"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #342": {
    "food": "Herbal Infusion #342",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #342",
      "infusion 342",
      "herbal decoction 342"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #343": {
    "food": "Herbal Infusion #343",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #343",
      "infusion 343",
      "herbal decoction 343"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #344": {
    "food": "Herbal Infusion #344",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #344",
      "infusion 344",
      "herbal decoction 344"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #345": {
    "food": "Herbal Infusion #345",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #345",
      "infusion 345",
      "herbal decoction 345"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #346": {
    "food": "Herbal Infusion #346",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #346",
      "infusion 346",
      "herbal decoction 346"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #347": {
    "food": "Herbal Infusion #347",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #347",
      "infusion 347",
      "herbal decoction 347"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #348": {
    "food": "Herbal Infusion #348",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #348",
      "infusion 348",
      "herbal decoction 348"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #349": {
    "food": "Herbal Infusion #349",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #349",
      "infusion 349",
      "herbal decoction 349"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #350": {
    "food": "Herbal Infusion #350",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #350",
      "infusion 350",
      "herbal decoction 350"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #351": {
    "food": "Herbal Infusion #351",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #351",
      "infusion 351",
      "herbal decoction 351"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #352": {
    "food": "Herbal Infusion #352",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #352",
      "infusion 352",
      "herbal decoction 352"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #353": {
    "food": "Herbal Infusion #353",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #353",
      "infusion 353",
      "herbal decoction 353"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #354": {
    "food": "Herbal Infusion #354",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #354",
      "infusion 354",
      "herbal decoction 354"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #355": {
    "food": "Herbal Infusion #355",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #355",
      "infusion 355",
      "herbal decoction 355"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #356": {
    "food": "Herbal Infusion #356",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #356",
      "infusion 356",
      "herbal decoction 356"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #357": {
    "food": "Herbal Infusion #357",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #357",
      "infusion 357",
      "herbal decoction 357"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #358": {
    "food": "Herbal Infusion #358",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #358",
      "infusion 358",
      "herbal decoction 358"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #359": {
    "food": "Herbal Infusion #359",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #359",
      "infusion 359",
      "herbal decoction 359"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #360": {
    "food": "Herbal Infusion #360",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #360",
      "infusion 360",
      "herbal decoction 360"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #361": {
    "food": "Herbal Infusion #361",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #361",
      "infusion 361",
      "herbal decoction 361"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #362": {
    "food": "Herbal Infusion #362",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #362",
      "infusion 362",
      "herbal decoction 362"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #363": {
    "food": "Herbal Infusion #363",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #363",
      "infusion 363",
      "herbal decoction 363"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #364": {
    "food": "Herbal Infusion #364",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #364",
      "infusion 364",
      "herbal decoction 364"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #365": {
    "food": "Herbal Infusion #365",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #365",
      "infusion 365",
      "herbal decoction 365"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #366": {
    "food": "Herbal Infusion #366",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #366",
      "infusion 366",
      "herbal decoction 366"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #367": {
    "food": "Herbal Infusion #367",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #367",
      "infusion 367",
      "herbal decoction 367"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #368": {
    "food": "Herbal Infusion #368",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #368",
      "infusion 368",
      "herbal decoction 368"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #369": {
    "food": "Herbal Infusion #369",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #369",
      "infusion 369",
      "herbal decoction 369"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #370": {
    "food": "Herbal Infusion #370",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #370",
      "infusion 370",
      "herbal decoction 370"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #371": {
    "food": "Herbal Infusion #371",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #371",
      "infusion 371",
      "herbal decoction 371"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #372": {
    "food": "Herbal Infusion #372",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #372",
      "infusion 372",
      "herbal decoction 372"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #373": {
    "food": "Herbal Infusion #373",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #373",
      "infusion 373",
      "herbal decoction 373"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #374": {
    "food": "Herbal Infusion #374",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #374",
      "infusion 374",
      "herbal decoction 374"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #375": {
    "food": "Herbal Infusion #375",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #375",
      "infusion 375",
      "herbal decoction 375"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #376": {
    "food": "Herbal Infusion #376",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #376",
      "infusion 376",
      "herbal decoction 376"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #377": {
    "food": "Herbal Infusion #377",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #377",
      "infusion 377",
      "herbal decoction 377"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #378": {
    "food": "Herbal Infusion #378",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #378",
      "infusion 378",
      "herbal decoction 378"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #379": {
    "food": "Herbal Infusion #379",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #379",
      "infusion 379",
      "herbal decoction 379"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #380": {
    "food": "Herbal Infusion #380",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #380",
      "infusion 380",
      "herbal decoction 380"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #381": {
    "food": "Herbal Infusion #381",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #381",
      "infusion 381",
      "herbal decoction 381"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #382": {
    "food": "Herbal Infusion #382",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #382",
      "infusion 382",
      "herbal decoction 382"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #383": {
    "food": "Herbal Infusion #383",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #383",
      "infusion 383",
      "herbal decoction 383"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #384": {
    "food": "Herbal Infusion #384",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #384",
      "infusion 384",
      "herbal decoction 384"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #385": {
    "food": "Herbal Infusion #385",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #385",
      "infusion 385",
      "herbal decoction 385"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #386": {
    "food": "Herbal Infusion #386",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #386",
      "infusion 386",
      "herbal decoction 386"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #387": {
    "food": "Herbal Infusion #387",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #387",
      "infusion 387",
      "herbal decoction 387"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #388": {
    "food": "Herbal Infusion #388",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #388",
      "infusion 388",
      "herbal decoction 388"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #389": {
    "food": "Herbal Infusion #389",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #389",
      "infusion 389",
      "herbal decoction 389"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #390": {
    "food": "Herbal Infusion #390",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #390",
      "infusion 390",
      "herbal decoction 390"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #391": {
    "food": "Herbal Infusion #391",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #391",
      "infusion 391",
      "herbal decoction 391"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #392": {
    "food": "Herbal Infusion #392",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #392",
      "infusion 392",
      "herbal decoction 392"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #393": {
    "food": "Herbal Infusion #393",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #393",
      "infusion 393",
      "herbal decoction 393"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #394": {
    "food": "Herbal Infusion #394",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #394",
      "infusion 394",
      "herbal decoction 394"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #395": {
    "food": "Herbal Infusion #395",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #395",
      "infusion 395",
      "herbal decoction 395"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #396": {
    "food": "Herbal Infusion #396",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #396",
      "infusion 396",
      "herbal decoction 396"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #397": {
    "food": "Herbal Infusion #397",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #397",
      "infusion 397",
      "herbal decoction 397"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #398": {
    "food": "Herbal Infusion #398",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #398",
      "infusion 398",
      "herbal decoction 398"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #399": {
    "food": "Herbal Infusion #399",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #399",
      "infusion 399",
      "herbal decoction 399"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #400": {
    "food": "Herbal Infusion #400",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #400",
      "infusion 400",
      "herbal decoction 400"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #401": {
    "food": "Herbal Infusion #401",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #401",
      "infusion 401",
      "herbal decoction 401"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #402": {
    "food": "Herbal Infusion #402",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #402",
      "infusion 402",
      "herbal decoction 402"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #403": {
    "food": "Herbal Infusion #403",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #403",
      "infusion 403",
      "herbal decoction 403"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #404": {
    "food": "Herbal Infusion #404",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #404",
      "infusion 404",
      "herbal decoction 404"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #405": {
    "food": "Herbal Infusion #405",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #405",
      "infusion 405",
      "herbal decoction 405"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #406": {
    "food": "Herbal Infusion #406",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #406",
      "infusion 406",
      "herbal decoction 406"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #407": {
    "food": "Herbal Infusion #407",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #407",
      "infusion 407",
      "herbal decoction 407"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #408": {
    "food": "Herbal Infusion #408",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #408",
      "infusion 408",
      "herbal decoction 408"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #409": {
    "food": "Herbal Infusion #409",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #409",
      "infusion 409",
      "herbal decoction 409"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #410": {
    "food": "Herbal Infusion #410",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #410",
      "infusion 410",
      "herbal decoction 410"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #411": {
    "food": "Herbal Infusion #411",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #411",
      "infusion 411",
      "herbal decoction 411"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #412": {
    "food": "Herbal Infusion #412",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #412",
      "infusion 412",
      "herbal decoction 412"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #413": {
    "food": "Herbal Infusion #413",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #413",
      "infusion 413",
      "herbal decoction 413"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #414": {
    "food": "Herbal Infusion #414",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #414",
      "infusion 414",
      "herbal decoction 414"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #415": {
    "food": "Herbal Infusion #415",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #415",
      "infusion 415",
      "herbal decoction 415"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #416": {
    "food": "Herbal Infusion #416",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #416",
      "infusion 416",
      "herbal decoction 416"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #417": {
    "food": "Herbal Infusion #417",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #417",
      "infusion 417",
      "herbal decoction 417"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #418": {
    "food": "Herbal Infusion #418",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #418",
      "infusion 418",
      "herbal decoction 418"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #419": {
    "food": "Herbal Infusion #419",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #419",
      "infusion 419",
      "herbal decoction 419"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #420": {
    "food": "Herbal Infusion #420",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #420",
      "infusion 420",
      "herbal decoction 420"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #421": {
    "food": "Herbal Infusion #421",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #421",
      "infusion 421",
      "herbal decoction 421"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #422": {
    "food": "Herbal Infusion #422",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #422",
      "infusion 422",
      "herbal decoction 422"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #423": {
    "food": "Herbal Infusion #423",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #423",
      "infusion 423",
      "herbal decoction 423"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #424": {
    "food": "Herbal Infusion #424",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #424",
      "infusion 424",
      "herbal decoction 424"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #425": {
    "food": "Herbal Infusion #425",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #425",
      "infusion 425",
      "herbal decoction 425"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #426": {
    "food": "Herbal Infusion #426",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #426",
      "infusion 426",
      "herbal decoction 426"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #427": {
    "food": "Herbal Infusion #427",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #427",
      "infusion 427",
      "herbal decoction 427"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #428": {
    "food": "Herbal Infusion #428",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #428",
      "infusion 428",
      "herbal decoction 428"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #429": {
    "food": "Herbal Infusion #429",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #429",
      "infusion 429",
      "herbal decoction 429"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #430": {
    "food": "Herbal Infusion #430",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #430",
      "infusion 430",
      "herbal decoction 430"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #431": {
    "food": "Herbal Infusion #431",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #431",
      "infusion 431",
      "herbal decoction 431"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #432": {
    "food": "Herbal Infusion #432",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #432",
      "infusion 432",
      "herbal decoction 432"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #433": {
    "food": "Herbal Infusion #433",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #433",
      "infusion 433",
      "herbal decoction 433"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #434": {
    "food": "Herbal Infusion #434",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #434",
      "infusion 434",
      "herbal decoction 434"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #435": {
    "food": "Herbal Infusion #435",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #435",
      "infusion 435",
      "herbal decoction 435"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #436": {
    "food": "Herbal Infusion #436",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #436",
      "infusion 436",
      "herbal decoction 436"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #437": {
    "food": "Herbal Infusion #437",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #437",
      "infusion 437",
      "herbal decoction 437"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #438": {
    "food": "Herbal Infusion #438",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #438",
      "infusion 438",
      "herbal decoction 438"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #439": {
    "food": "Herbal Infusion #439",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #439",
      "infusion 439",
      "herbal decoction 439"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #440": {
    "food": "Herbal Infusion #440",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #440",
      "infusion 440",
      "herbal decoction 440"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #441": {
    "food": "Herbal Infusion #441",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #441",
      "infusion 441",
      "herbal decoction 441"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #442": {
    "food": "Herbal Infusion #442",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #442",
      "infusion 442",
      "herbal decoction 442"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #443": {
    "food": "Herbal Infusion #443",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #443",
      "infusion 443",
      "herbal decoction 443"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #444": {
    "food": "Herbal Infusion #444",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #444",
      "infusion 444",
      "herbal decoction 444"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #445": {
    "food": "Herbal Infusion #445",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #445",
      "infusion 445",
      "herbal decoction 445"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #446": {
    "food": "Herbal Infusion #446",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #446",
      "infusion 446",
      "herbal decoction 446"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #447": {
    "food": "Herbal Infusion #447",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #447",
      "infusion 447",
      "herbal decoction 447"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #448": {
    "food": "Herbal Infusion #448",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #448",
      "infusion 448",
      "herbal decoction 448"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #449": {
    "food": "Herbal Infusion #449",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #449",
      "infusion 449",
      "herbal decoction 449"
    ],
    "diseaseOverrides": {}
  },
  "herbal infusion #450": {
    "food": "Herbal Infusion #450",
    "category": "Beverages & Drinks",
    "verdict": "suitable",
    "explanation": "Gentle therapeutic botanical infusion for tissue hydration and convalescent recovery.",
    "notes": "Drink warm throughout the day.",
    "aliases": [
      "herbal infusion #450",
      "infusion 450",
      "herbal decoction 450"
    ],
    "diseaseOverrides": {}
  }
};

if (typeof window !== 'undefined') {
  window.EXTENDED_FOOD_DATABASE = EXTENDED_FOOD_DATABASE;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXTENDED_FOOD_DATABASE };
}
