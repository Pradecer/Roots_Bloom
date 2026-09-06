// Seed Catalog for Roots_Bloom - Strict Enterprise & Studio Photography Data
// All 8 SKUs conform to PRD Section 10.1 Schema

export const PRODUCTS = [
  {
    id: "fairy-dream-miniature-tray-garden",
    sku: "RB-TG-001",
    name: "Fairy Dream Miniature Tray Garden",
    name_hi: "फेयरी ड्रीम मिनिएचर ट्रे गार्डन",
    category: "Tray Gardens",
    category_hi: "ट्रे गार्डन्स",
    subcategory: "Miniature Landscapes",
    target_audience: "Gifting, Home Decor, Nature Lovers",
    seo_headline: "Bring Home Magical Forest Vibes — Handcrafted Fairy Garden",
    seo_headline_hi: "घर लाएं जादुई वन का सुकून — हस्तनिर्मित फेयरी गार्डन",
    search_aliases: ["fairy garden", "miniature tray", "succulent dish garden", "terracotta garden", "chhoti bageecha"],
    description: "A meticulously handcrafted miniature living garden set in a durable ceramic tray, featuring hardy live succulents, preserved reindeer moss, and hand-painted resin fairy figurines. Designed to bring lush calm to coffee tables and work desks.",
    description_hi: "टिकाऊ सिरेमिक ट्रे में हस्तनिर्मित जीवित मिनिएचर गार्डन, जिसमें लाइव सकुलेंट्स, प्रिजर्व्ड मॉस और हाथ से पेंट की गई फेयरी मूर्तियां शामिल हैं।",
    key_features: {
      "Pot Material": "Glazed High-Fired Ceramic",
      "Plants Included": "Live Haworthia & Sedum Succulents",
      "Dimensions": "10 inch Diameter x 4.5 inch Height",
      "Drainage": "Dual Drainage Hole with Mesh Filter",
      "Care Level": "Low (Water once every 10 days)",
      "Weight": "1.4 kg"
    },
    key_features_hi: {
      "गमले की सामग्री": "ग्लेज्ड हाई-फायर्ड सिरेमिक",
      "शामिल पौधे": "लाइव हैवॉर्थिया और सेडम सकुलेंट्स",
      "आकार": "10 इंच व्यास x 4.5 इंच ऊंचाई",
      "ड्रेनेज": "मेश फिल्टर के साथ डुअल ड्रेनेज होल",
      "देखभाल का स्तर": "आसान (हर 10 दिन में एक बार पानी दें)",
      "वजन": "1.4 किग्रा"
    },
    pricing: {
      currency: "INR",
      base_price: 1999,
      offer_price: 1499,
      discount_percent: 25
    },
    visual_assets: {
      badge: "Best Seller",
      badge_hi: "बेस्ट सेलर",
      photo_angles: [
        "Front studio shot with full landscape arrangement",
        "Top-down layout showing succulent variety and stone pathway",
        "Macro close-up of the miniature fairy figurine and moss texture",
        "Safe transit protective packaging box"
      ],
      primary_image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&h=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&h=600&q=80"
      ]
    },
    inventory: {
      stock_qty: 45,
      status: "in_stock"
    },
    rating: {
      average: 4.6,
      count: 210,
      distribution: { 5: 148, 4: 42, 3: 12, 2: 5, 1: 3 }
    },
    care_guide: {
      sunlight: "Bright indirect sunlight (3-4 hours daily)",
      watering: "Mist or pour 50ml water around root zone every 8-10 days",
      soil: "Porous succulent grit mix included",
      temperature: "18°C to 32°C ideal room temperature"
    },
    care_level: "easy",
    is_live_plant: true,
    cross_sell_ids: ["miniature-diy-accessories-kit", "whimsical-hanging-bird-decor"],
    occasion_tags: ["Mother's Day", "Housewarming", "Birthday", "Anniversary"],
    reviews: [
      {
        id: "rev-101",
        user_name: "Pooja Sharma",
        rating: 5,
        date: "24 Aug 2026",
        city: "Bengaluru",
        verified: true,
        title: "Unbelievable quality and safe packaging!",
        text: "Ordered this for my living room centre table. The plants arrived totally fresh and undamaged. Packaging is world-class!",
        photo: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=300&h=300&q=80"
      },
      {
        id: "rev-102",
        user_name: "Rohan Mehta",
        rating: 4,
        date: "18 Aug 2026",
        city: "Mumbai",
        verified: true,
        title: "Very aesthetic desk planter",
        text: "The fairy figurines and succulent quality are top-notch. Needs very little watering.",
        photo: null
      }
    ]
  },
  {
    id: "maa-beti-emotional-theme-planter",
    sku: "RB-TP-002",
    name: "Maa-Beti Emotional Theme Planter",
    name_hi: "माँ-बेटी इमोशनल थीम प्लांटर",
    category: "Theme Planters",
    category_hi: "थीम प्लांटर्स",
    subcategory: "Relationship & Emotions",
    target_audience: "Mothers, Daughters, Mother's Day Gifting",
    seo_headline: "Celebrating the Eternal Bond of Mother & Daughter — Living Planter Gift",
    seo_headline_hi: "माँ और बेटी के अनमोल रिश्ते का खूबसूरत प्रतीक — जीवंत उपहार",
    search_aliases: ["maa beti", "mother daughter planter", "mom gift", "mothers day", "emotional gift"],
    description: "Handcrafted terracotta and ceramic planter depicting a mother and daughter sharing a gentle embrace, holding a live Jade plant symbolizing prosperity, health, and everlasting maternal affection.",
    description_hi: "माँ और बेटी के अटूट प्रेम को दर्शाता हस्तनिर्मित प्लांटर, जिसमें समृद्धि और स्नेह का प्रतीक लाइव जेड प्लांट लगा है।",
    key_features: {
      "Pot Material": "Hand-Sculpted Ceramic & Terracotta",
      "Plant Included": "Live Crassula Ovata (Jade Plant)",
      "Dimensions": "7 inch Length x 5.5 inch Width x 8 inch Height",
      "Finish": "Weatherproof Matte Ceramic Coating",
      "Care Level": "Very Easy",
      "Weight": "950 grams"
    },
    key_features_hi: {
      "गमले की सामग्री": "हस्तनिर्मित सिरेमिक और टेराकोटा",
      "शामिल पौधा": "लाइव क्रासुला ओवाटा (जेड प्लांट)",
      "आकार": "7 x 5.5 x 8 इंच",
      "फिनिश": "वेदरप्रूफ मैट सिरेमिक कोटिंग",
      "देखभाल का स्तर": "अत्यंत आसान",
      "वजन": "950 ग्राम"
    },
    pricing: {
      currency: "INR",
      base_price: 1199,
      offer_price: 899,
      discount_percent: 25
    },
    visual_assets: {
      badge: "Top Gift Choice",
      badge_hi: "टॉप गिफ्ट चॉइस",
      photo_angles: [
        "Front portrait angle showing mother-daughter detailing",
        "Top angle highlighting jade foliage",
        "Gift box ready packaging with ribbon"
      ],
      primary_image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&h=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&h=600&q=80"
      ]
    },
    inventory: {
      stock_qty: 60,
      status: "in_stock"
    },
    rating: {
      average: 4.8,
      count: 145,
      distribution: { 5: 120, 4: 20, 3: 4, 2: 1, 1: 0 }
    },
    care_guide: {
      sunlight: "Partial sunlight or bright window sill (2-3 hours)",
      watering: "Water only when top 1 inch of soil is dry (every 7-8 days)",
      soil: "Organic potting mix enriched with vermicompost",
      temperature: "Room temperature 15°C to 35°C"
    },
    care_level: "easy",
    is_live_plant: true,
    cross_sell_ids: ["whimsical-hanging-bird-decor", "miniature-diy-accessories-kit"],
    occasion_tags: ["Mother's Day", "Birthday", "Women's Day"],
    reviews: [
      {
        id: "rev-201",
        user_name: "Kritika Verma",
        rating: 5,
        date: "28 Aug 2026",
        city: "Delhi",
        verified: true,
        title: "My mom literally teared up!",
        text: "Gifted this on my mother's 50th birthday. The facial features are so well crafted and the jade plant is thriving.",
        photo: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=300&h=300&q=80"
      }
    ]
  },
  {
    id: "dada-dadi-nostalgia-miniature-garden",
    sku: "RB-TP-003",
    name: "Dada-Dadi Nostalgia Miniature Garden",
    name_hi: "दादा-दादी पुरानी यादें मिनिएचर गार्डन",
    category: "Theme Planters",
    category_hi: "थीम प्लांटर्स",
    subcategory: "Relationship & Emotions",
    target_audience: "Grandparents, Family Anniversaries, Heritage Gifting",
    seo_headline: "Honoring Grandparents' Warmth & Memories — Miniature Park Planter",
    seo_headline_hi: "बुजुर्गों के प्यार और आशीर्वाद का सुंदर प्रतीक — हस्तनिर्मित गार्डन",
    search_aliases: ["dada dadi", "grandparents gift", "old couple planter", "nostalgia garden"],
    description: "An evocative wooden-textured tray garden depicting an elderly couple sitting together on a miniature park bench surrounded by hearty Sansevieria (Snake Plant) and moss stones.",
    description_hi: "एक खूबसूरत मिनिएचर पार्क सीन जिसमें दादा-दादी एक बेंच पर बैठे हैं, साथ में टिकाऊ स्नेक प्लांट और ग्रीन मॉस स्टोन लगे हैं।",
    key_features: {
      "Tray Material": "Engineered Wood & Resin Composite",
      "Plants Included": "Live Sansevieria Trifasciata & Fittonia",
      "Dimensions": "9.5 inch Length x 6 inch Width x 5 inch Height",
      "Air Purifying": "Certified NASA Air Purifier Plant",
      "Care Level": "Extremely Low",
      "Weight": "1.2 kg"
    },
    key_features_hi: {
      "सामग्री": "इंजीनियर्ड वुड और रेजिन कंपोजिट",
      "पौधे": "लाइव स्नेक प्लांट और फिटोनिया",
      "आकार": "9.5 x 6 x 5 इंच",
      "वायु शुद्धिकरण": "नासा प्रमाणित एयर प्यूरीफायर",
      "देखभाल": "अत्यंत आसान",
      "वजन": "1.2 किग्रा"
    },
    pricing: {
      currency: "INR",
      base_price: 1699,
      offer_price: 1299,
      discount_percent: 24
    },
    visual_assets: {
      badge: "Customer Favourite",
      badge_hi: "कस्टमर फेवरेट",
      photo_angles: ["Front bench angle", "Top garden view", "Close-up figurine detail"],
      primary_image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&h=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&h=600&q=80"
      ]
    },
    inventory: {
      stock_qty: 32,
      status: "in_stock"
    },
    rating: {
      average: 4.7,
      count: 98,
      distribution: { 5: 78, 4: 15, 3: 4, 2: 1, 1: 0 }
    },
    care_guide: {
      sunlight: "Thrives in low to bright indirect light",
      watering: "Water every 12-14 days; highly drought-resistant",
      soil: "Well-aerated sandy loam mix",
      temperature: "15°C to 38°C"
    },
    care_level: "easy",
    is_live_plant: true,
    cross_sell_ids: ["miniature-diy-accessories-kit", "whimsical-hanging-bird-decor"],
    occasion_tags: ["Anniversary", "Grandparents Day", "Retirement"],
    reviews: [
      {
        id: "rev-301",
        user_name: "Amit Saxena",
        rating: 5,
        date: "12 Aug 2026",
        city: "Pune",
        verified: true,
        title: "Brought tears of joy to my grandparents",
        text: "Sent this to my grandparents in Jaipur on their 50th wedding anniversary. They loved it so much!",
        photo: null
      }
    ]
  },
  {
    id: "bappa-blessing-devotional-planter",
    sku: "RB-DV-004",
    name: "Bappa Blessing Devotional Planter",
    name_hi: "बाप्पा ब्लेसिंग डिवोशनल प्लांटर",
    category: "Devotional",
    category_hi: "भक्ति एवं वास्तु",
    subcategory: "Vastu & Spiritual",
    target_audience: "Ganesh Chaturthi, Puja Room, Housewarming, Vastu Enthusiasts",
    seo_headline: "Vastu-Positive Lord Ganesha Miniature Planter with Lucky Bamboo",
    seo_headline_hi: "वास्तु-सम्मत श्री गणेश मिनिएचर प्लांटर लकी बैम्बू के साथ",
    search_aliases: ["bappa planter", "ganesha planter", "devotional planter", "lucky bamboo ganesh", "puja plant"],
    description: "A serene brass-finish Lord Ganesha sculpture integrated with a living 2-layer Lucky Bamboo bowl, bringing peace, prosperity, and Vastu-positive vibrations to living rooms and home mandirs.",
    description_hi: "पीतल की फिनिश वाली भगवान गणेश की शांत प्रतिमा और 2-लेयर लकी बैम्बू का सुंदर संगम।",
    key_features: {
      "Statue Material": "Brass-Finished Cast Resin",
      "Plant Included": "Live 2-Layer Lucky Bamboo (Dracaena Sanderiana)",
      "Bowl Material": "Crystal Clear Acrylic & Glass Composite",
      "Dimensions": "6.5 inch x 6.5 inch x 8.5 inch",
      "Vastu Orientation": "Recommended for Northeast (Ishanya) corner",
      "Care Level": "Very Easy (Water based)"
    },
    key_features_hi: {
      "मूर्ति सामग्री": "ब्रास फिनिश कास्ट रेजिन",
      "पौधा": "लाइव 2-लेयर लकी बैम्बू",
      "बाउल": "क्रिस्टल क्लियर ग्लास कंपोजिट",
      "आकार": "6.5 x 6.5 x 8.5 इंच",
      "वास्तु दिशा": "ईशान कोण (उत्तर-पूर्व) के लिए उत्तम",
      "देखभाल": "अत्यंत आसान"
    },
    pricing: {
      currency: "INR",
      base_price: 1399,
      offer_price: 999,
      discount_percent: 29
    },
    visual_assets: {
      badge: "Festive Special",
      badge_hi: "फेस्टिव स्पेशल",
      photo_angles: ["Front view with Ganesha blessings", "Side angle showing bamboo roots", "Mandir styling setup"],
      primary_image: "https://images.unsplash.com/photo-1583248369069-9d91f1640fe6?auto=format&fit=crop&w=600&h=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1583248369069-9d91f1640fe6?auto=format&fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&h=600&q=80"
      ]
    },
    inventory: {
      stock_qty: 55,
      status: "in_stock"
    },
    rating: {
      average: 4.9,
      count: 172,
      distribution: { 5: 155, 4: 14, 3: 2, 2: 1, 1: 0 }
    },
    care_guide: {
      sunlight: "Filtered room light or indoor ambient lighting",
      watering: "Change bowl water every 7 days (Use RO or clean drinking water)",
      soil: "Hydroponic pebbles included, no soil needed",
      temperature: "20°C to 30°C"
    },
    care_level: "easy",
    is_live_plant: true,
    cross_sell_ids: ["miniature-diy-accessories-kit", "whimsical-hanging-bird-decor"],
    occasion_tags: ["Ganesh Chaturthi", "Diwali", "Housewarming", "New Year"],
    reviews: [
      {
        id: "rev-401",
        user_name: "Sneha Joshi",
        rating: 5,
        date: "01 Sep 2026",
        city: "Nagpur",
        verified: true,
        title: "Perfect for Ganesh Chaturthi!",
        text: "The brass finish is very elegant. Kept it in our puja area and everyone was asking where I got it.",
        photo: null
      }
    ]
  },
  {
    id: "vintage-scooter-novelty-planter",
    sku: "RB-NV-005",
    name: "Vintage Scooter Novelty Planter",
    name_hi: "विंटेज स्कूटर नॉवेल्टी प्लांटर",
    category: "Novelty Planters",
    category_hi: "नॉवेल्टी प्लांटर्स",
    subcategory: "Retro & Quirky",
    target_audience: "Young Professionals, Desk Decor, Retro Lovers",
    seo_headline: "Retro Italian Style Scooter Planter with Haworthia Zebra Succulent",
    seo_headline_hi: "रेट्रो इटैलियन स्टाइल स्कूटर प्लांटर ज़ेब्रा सकुलेंट के साथ",
    search_aliases: ["scooter planter", "vespa planter", "novelty desk plant", "quirky planter"],
    description: "A retro pastel-green scooter planter hand-finished in ceramic, carrying a hardy Zebra Haworthia succulent in its rear carrier seat. Adds instant vintage charm to work desks.",
    description_hi: "रेट्रो पेस्टल-ग्रीन स्कूटर सिरेमिक प्लांटर, जिसमें ज़ेब्रा सकुलेंट लगा है। वर्क डेस्क के लिए परफेक्ट।",
    key_features: {
      "Material": "Ceramic with Glazed Pastel Finish",
      "Plant": "Live Haworthia Fasciata (Zebra Plant)",
      "Dimensions": "6.5 inch Length x 4 inch Width x 5 inch Height",
      "Drainage": "Equipped with bottom drainage hole & silicone plug",
      "Care Level": "Easy",
      "Weight": "650 grams"
    },
    key_features_hi: {
      "सामग्री": "सिरेमिक पेस्टल फिनिश के साथ",
      "पौधा": "लाइव हैवॉर्थिया फासिआटा (ज़ेब्रा प्लांट)",
      "आकार": "6.5 x 4 x 5 इंच",
      "ड्रेनेज": "सिलिकॉन प्लग के साथ ड्रेनेज होल",
      "देखभाल": "आसान",
      "वजन": "650 ग्राम"
    },
    pricing: {
      currency: "INR",
      base_price: 1099,
      offer_price: 799,
      discount_percent: 27
    },
    visual_assets: {
      badge: "Trending",
      badge_hi: "ट्रेंडिंग",
      photo_angles: ["Side scooter profile", "Desk setup view", "Succulent close-up"],
      primary_image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&h=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&h=600&q=80"
      ]
    },
    inventory: {
      stock_qty: 40,
      status: "in_stock"
    },
    rating: {
      average: 4.5,
      count: 84,
      distribution: { 5: 58, 4: 20, 3: 4, 2: 1, 1: 1 }
    },
    care_guide: {
      sunlight: "Bright indirect desk lighting or window light",
      watering: "Water with 2 tablespoons every 10 days",
      soil: "Mineral rich cactus mix",
      temperature: "18°C to 35°C"
    },
    care_level: "easy",
    is_live_plant: true,
    cross_sell_ids: ["miniature-diy-accessories-kit", "whimsical-hanging-bird-decor"],
    occasion_tags: ["Birthday", "Friendship Day", "Office Gifting"],
    reviews: [
      {
        id: "rev-501",
        user_name: "Varun Nair",
        rating: 5,
        date: "19 Aug 2026",
        city: "Hyderabad",
        verified: true,
        title: "Best addition to my WFH desk",
        text: "Looks even better in person. The mint green color is very aesthetic.",
        photo: null
      }
    ]
  },
  {
    id: "india-gate-patriot-desk-planter",
    sku: "RB-SV-006",
    name: "India Gate Patriot Desk Planter",
    name_hi: "इंडिया गेट पैट्रियट डेस्क प्लांटर",
    category: "Souvenirs",
    category_hi: "स्मारिका एवं डेस्क",
    subcategory: "National Heritage & Desks",
    target_audience: "Patriotic Occasions, Bureaucrats, Executives, Heritage Lovers",
    seo_headline: "Handcrafted India Gate Monument Desk Planter with Tri-Color Succulents",
    seo_headline_hi: "हस्तनिर्मित इंडिया गेट डेस्क प्लांटर तिरंगा सकुलेंट्स के साथ",
    search_aliases: ["india gate planter", "patriotic planter", "delhi souvenir plant", "independence day gift"],
    description: "A finely detailed architectural replica of India Gate in terracotta stone finish, featuring a tri-colored arrangement of hardy mini succulents and natural sandstone pebbles.",
    description_hi: "टेराकोटा स्टोन फिनिश में इंडिया गेट की कलात्मक प्रतिकृति और तीन रंगों के खूबसूरत सकुलेंट्स का संग्रह।",
    key_features: {
      "Monument Material": "High-Grade Engineered Stone Ceramic",
      "Plant Arrangement": "Tri-Color Mini Sedum & Echeveria Succulents",
      "Dimensions": "7 inch Width x 4.5 inch Depth x 6.5 inch Height",
      "Drainage": "Precision bottom drainage hole",
      "Care Level": "Low Maintenance",
      "Weight": "1.1 kg"
    },
    key_features_hi: {
      "सामग्री": "हाई-ग्रेड स्टोन सिरेमिक",
      "पौधे": "तिरंगा सेडम और इचेवेरिया सकुलेंट्स",
      "आकार": "7 x 4.5 x 6.5 इंच",
      "ड्रेनेज": "बॉटम ड्रेनेज होल",
      "देखभाल": "आसान",
      "वजन": "1.1 किग्रा"
    },
    pricing: {
      currency: "INR",
      base_price: 899,
      offer_price: 699,
      discount_percent: 22
    },
    visual_assets: {
      badge: "Limited Edition",
      badge_hi: "लिमिटेड एडिशन",
      photo_angles: ["Front architectural angle", "Top planter view", "Executive table display"],
      primary_image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=600&h=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&h=600&q=80"
      ]
    },
    inventory: {
      stock_qty: 28,
      status: "in_stock"
    },
    rating: {
      average: 4.7,
      count: 65,
      distribution: { 5: 50, 4: 12, 3: 2, 2: 1, 1: 0 }
    },
    care_guide: {
      sunlight: "Bright natural light",
      watering: "Water every 8-10 days",
      soil: "Fast draining mineral grit",
      temperature: "16°C to 40°C"
    },
    care_level: "easy",
    is_live_plant: true,
    cross_sell_ids: ["miniature-diy-accessories-kit"],
    occasion_tags: ["Independence Day", "Republic Day", "Corporate Gifting"],
    reviews: [
      {
        id: "rev-601",
        user_name: "Major R. K. Singh",
        rating: 5,
        date: "14 Aug 2026",
        city: "Chandigarh",
        verified: true,
        title: "Dignified and very well finished",
        text: "The stone texture gives it a very solid and authentic look. Proud to keep it on my office desk.",
        photo: null
      }
    ]
  },
  {
    id: "whimsical-hanging-bird-decor",
    sku: "RB-AC-007",
    name: "Whimsical Hanging Bird Décor (Set of 2)",
    name_hi: "विम्सिकल हैंगिंग बर्ड डेकोर (2 का सेट)",
    category: "Garden Accessories",
    category_hi: "गार्डन एक्सेसरीज",
    subcategory: "Balcony & Planter Accents",
    target_audience: "Balcony Decorators, Garden Hobbyists, Add-on Buyers",
    seo_headline: "Hand-Painted Ceramic Hanging Birds for Planters & Balconies",
    seo_headline_hi: "हस्तनिर्मित सिरेमिक हैंगिंग बर्ड्स प्लांटर्स और बालकनी के लिए",
    search_aliases: ["hanging birds", "garden bird decor", "ceramic birds", "balcony accents", "planter accessories"],
    description: "Pair of hand-painted glazed ceramic songbirds equipped with weather-resistant jute cords. Easily hang on planter rims, balcony railings, or bonsai trees to add playful life.",
    description_hi: "हाथ से पेंट की गई सिरेमिक पक्षी मूर्तियों की जोड़ी, जिसे बालकनी रेलिंग या प्लांटर रिम पर आसानी से टांगा जा सकता है।",
    key_features: {
      "Material": "Glazed Terracotta Ceramic & Natural Jute Cord",
      "Quantity": "Set of 2 (Yellow Canary & Teal Sparrow)",
      "Dimensions": "3.5 inch Length x 2 inch Height each",
      "Weather Resistance": "100% Sun & Rain Proof UV Glaze",
      "Care Level": "Wipe clean with dry cloth",
      "Weight": "280 grams pair"
    },
    key_features_hi: {
      "सामग्री": "ग्लेज्ड टेराकोटा और प्राकृतिक जूट डोरी",
      "मात्रा": "2 का सेट (येलो व टील)",
      "आकार": "3.5 x 2 इंच प्रत्येक",
      "वेदरप्रूफ": "धूप और बारिश से सुरक्षित",
      "वजन": "280 ग्राम"
    },
    pricing: {
      currency: "INR",
      base_price: 599,
      offer_price: 449,
      discount_percent: 25
    },
    visual_assets: {
      badge: "Hot Add-on",
      badge_hi: "हॉट ऐड-ऑन",
      photo_angles: ["Pair on planter rim", "Balcony hanging view", "Hand-painted feather detail"],
      primary_image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&h=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&h=600&q=80"
      ]
    },
    inventory: {
      stock_qty: 80,
      status: "in_stock"
    },
    rating: {
      average: 4.8,
      count: 112,
      distribution: { 5: 96, 4: 12, 3: 3, 2: 1, 1: 0 }
    },
    care_guide: {
      sunlight: "All conditions (Indoor & Outdoor)",
      watering: "N/A (Accessory)",
      soil: "N/A",
      temperature: "All weather"
    },
    care_level: "easy",
    is_live_plant: false,
    cross_sell_ids: ["fairy-dream-miniature-tray-garden", "miniature-diy-accessories-kit"],
    occasion_tags: ["Home Makeover", "Gift Add-on"],
    reviews: [
      {
        id: "rev-701",
        user_name: "Ananya Roy",
        rating: 5,
        date: "03 Sep 2026",
        city: "Kolkata",
        verified: true,
        title: "Super cute add-on for my tray garden!",
        text: "The painting detail is crisp and vibrant. Look gorgeous hanging on my balcony planters.",
        photo: null
      }
    ]
  },
  {
    id: "miniature-diy-accessories-kit",
    sku: "RB-DIY-008",
    name: "Miniature DIY Accessories Kit (12 Pieces)",
    name_hi: "मिनिएचर DIY एक्सेसरीज किट (12 पीस)",
    category: "DIY Kits",
    category_hi: "DIY किट्स",
    subcategory: "Craft & Landscaping",
    target_audience: "DIY Lovers, Kids, Garden Creators, Tray Customizers",
    seo_headline: "Complete 12-Piece Miniature Garden DIY Landscaping Kit",
    seo_headline_hi: "12-पीस मिनिएचर गार्डन DIY लैंडस्केपिंग किट",
    search_aliases: ["diy kit", "miniature accessories", "planter figurines", "diy tray garden kit", "moss and stones"],
    description: "A comprehensive craft bundle to customize or build your own miniature tray landscape: includes mini wooden fences, stone stepping pathways, mushroom figurines, wooden bench, river pebbles, and preserved green moss.",
    description_hi: "अपना मिनिएचर गार्डन खुद सजाने के लिए 12-पीस किट: मिनी फेंस, स्टोन पाथवे, मशरूम, बेंच, रिवर पेबल्स और मॉस।",
    key_features: {
      "Included Items": "2 Wooden Fences, 4 Stepping Stones, 3 Mini Mushrooms, 1 Park Bench, 50g Polished Pebbles, 30g Preserved Moss",
      "Material": "Resin, Natural Treated Wood, Polished River Quartz",
      "Compatibility": "Fits any 6 to 14 inch tray or pot",
      "Care Level": "Zero Maintenance",
      "Weight": "350 grams"
    },
    key_features_hi: {
      "शामिल वस्तुएं": "2 वुडन फेंस, 4 स्टेपिंग स्टोन, 3 मशरूम, 1 बेंच, पेबल्स और मॉस",
      "सामग्री": "रेजिन, नेचुरल ट्रीटेड वुड, रिवर क्वार्ट्ज",
      "उपयोग": "6 से 14 इंच के किसी भी गमले के लिए",
      "वजन": "350 ग्राम"
    },
    pricing: {
      currency: "INR",
      base_price: 499,
      offer_price: 349,
      discount_percent: 30
    },
    visual_assets: {
      badge: "Cart Booster",
      badge_hi: "कार्ट बूस्टर",
      photo_angles: ["Flatlay kit arrangement", "Styled inside a tray garden", "Individual pieces macro"],
      primary_image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&h=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&h=600&q=80",
        "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&h=600&q=80"
      ]
    },
    inventory: {
      stock_qty: 120,
      status: "in_stock"
    },
    rating: {
      average: 4.8,
      count: 240,
      distribution: { 5: 205, 4: 28, 3: 5, 2: 2, 1: 0 }
    },
    care_guide: {
      sunlight: "All conditions",
      watering: "Water resistant",
      soil: "N/A",
      temperature: "All weather"
    },
    care_level: "easy",
    is_live_plant: false,
    cross_sell_ids: ["fairy-dream-miniature-tray-garden", "maa-beti-emotional-theme-planter"],
    occasion_tags: ["DIY Weekend", "Kids Activity", "Custom Gifting"],
    reviews: [
      {
        id: "rev-801",
        user_name: "Meera Sen",
        rating: 5,
        date: "29 Aug 2026",
        city: "Delhi",
        verified: true,
        title: "Added so much charm to our pot!",
        text: "Ordered this along with the Fairy Tray garden. The little mushrooms and stepping stones are adorable.",
        photo: null
      }
    ]
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Planters", name_hi: "सभी प्लांटर्स" },
  { id: "tray-gardens", name: "Tray Gardens", name_hi: "ट्रे गार्डन्स", categoryKey: "Tray Gardens" },
  { id: "theme-planters", name: "Theme Planters", name_hi: "थीम प्लांटर्स", categoryKey: "Theme Planters" },
  { id: "devotional", name: "Devotional & Vastu", name_hi: "भक्ति एवं वास्तु", categoryKey: "Devotional" },
  { id: "novelty-planters", name: "Novelty Planters", name_hi: "नॉवेल्टी प्लांटर्स", categoryKey: "Novelty Planters" },
  { id: "souvenirs", name: "Souvenirs & Desks", name_hi: "स्मारिका एवं डेस्क", categoryKey: "Souvenirs" },
  { id: "garden-accessories", name: "Garden Accessories", name_hi: "गार्डन एक्सेसरीज", categoryKey: "Garden Accessories" },
  { id: "diy-kits", name: "DIY Kits", name_hi: "DIY किट्स", categoryKey: "DIY Kits" }
];

export const EMOTIONAL_SHELVES = [
  {
    id: "mom",
    title: "For Mom & Motherhood",
    title_hi: "माँ और मातृत्व के लिए खास",
    subtitle: "Celebrate unconditional love with living planters",
    subtitle_hi: "जीवंत पौधों के साथ माँ के अनमोल प्रेम का उत्सव",
    productIds: ["maa-beti-emotional-theme-planter", "fairy-dream-miniature-tray-garden", "whimsical-hanging-bird-decor"]
  },
  {
    id: "grandparents",
    title: "For Grandparents & Family Bonds",
    title_hi: "दादा-दादी और परिवार के रिश्तों के लिए",
    subtitle: "Sentiments that honor memories and blessings",
    subtitle_hi: "पुरानी यादों और आशीर्वाद को संजोने वाले उपहार",
    productIds: ["dada-dadi-nostalgia-miniature-garden", "bappa-blessing-devotional-planter", "miniature-diy-accessories-kit"]
  },
  {
    id: "devotional",
    title: "Devotional, Puja & Vastu Shastra",
    title_hi: "भक्ति, पूजा और वास्तु शांति",
    subtitle: "Auspicious living greenery for mandir and living areas",
    subtitle_hi: "पूजा घर और ड्राइंग रूम के लिए शुभ हरियाली",
    productIds: ["bappa-blessing-devotional-planter", "india-gate-patriot-desk-planter"]
  },
  {
    id: "desk-office",
    title: "For Work Desks & Home Office",
    title_hi: "वर्क डेस्क और होम ऑफिस के लिए",
    subtitle: "Stress-relieving low-maintenance botanical desk companions",
    subtitle_hi: "तनावमुक्त रखने वाले आसान देख-रेख वाले पौधे",
    productIds: ["vintage-scooter-novelty-planter", "india-gate-patriot-desk-planter", "fairy-dream-miniature-tray-garden"]
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: "Handcrafted Live Miniature Gardens",
    title_hi: "हस्तनिर्मित जीवंत मिनिएचर गार्डन्स",
    subtitle: "Real Plants • Hand-Sculpted Stories • Safe Pan-India Transit",
    subtitle_hi: "असली पौधे • खूबसूरत कहानियां • सुरक्षित डिलीवरी गारंटी",
    cta: "Explore Best Sellers",
    cta_hi: "बेस्ट सेलर देखें",
    link: "fairy-dream-miniature-tray-garden",
    badge: "Festive Collection 2026",
    badge_hi: "फेस्टिव कलेक्शन 2026",
    bg: "linear-gradient(135deg, #1E4734 0%, #2F6B4F 100%)",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&h=800&q=80"
  },
  {
    id: 2,
    title: "Maa-Beti & Dada-Dadi Emotional Planters",
    title_hi: "माँ-बेटी और दादा-दादी इमोशनल प्लांटर्स",
    subtitle: "Gifts that speak relationships and last for years",
    subtitle_hi: "अनमोल रिश्तों का एहसास जो सालों-साल महके",
    cta: "Shop Emotional Gifts",
    cta_hi: "इमोशनल गिफ्ट्स खरीदें",
    link: "maa-beti-emotional-theme-planter",
    badge: "Top Gift Choice",
    badge_hi: "टॉप गिफ्ट चॉइस",
    bg: "linear-gradient(135deg, #2D3A2F 0%, #3B5D43 100%)",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&h=800&q=80"
  },
  {
    id: 3,
    title: "Lord Ganesha Vastu Blessing Planters",
    title_hi: "श्री गणेश वास्तु ब्लेसिंग प्लांटर्स",
    subtitle: "2-Layer Lucky Bamboo in Brass-Finish Sculpture",
    subtitle_hi: "ब्रास फिनिश गणेश प्रतिमा और लकी बैम्बू का शुभ संगम",
    cta: "View Devotional Range",
    cta_hi: "भक्ति कलेक्शन देखें",
    link: "bappa-blessing-devotional-planter",
    badge: "Festive Special",
    badge_hi: "फेस्टिव स्पेशल",
    bg: "linear-gradient(135deg, #382E1E 0%, #5C4B2E 100%)",
    image: "https://images.unsplash.com/photo-1583248369069-9d91f1640fe6?auto=format&fit=crop&w=800&h=800&q=80"
  }
];
