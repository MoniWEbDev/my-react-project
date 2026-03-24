const categorySkillMap = {
  Agriculture: [
    'Crop Cultivation',
    'Soil Health Management',
    'Organic Farming',
    'Seed Preservation',
    'Irrigation Planning',
    'Pest Monitoring',
    'Greenhouse Basics',
    'Hydroponic Farming',
    'Farm Equipment Handling',
    'Post-Harvest Management',
    'Agri Data Logging',
  ],
  'Animal & Dairy': [
    'Dairy Herd Nutrition',
    'Cattle Health Checks',
    'Milk Hygiene Practices',
    'Goat Farming Basics',
    'Poultry Care Routine',
    'Fodder Storage',
    'Vaccination Scheduling',
    'Animal Shelter Design',
    'Feed Cost Optimization',
    'Dairy Product Handling',
  ],
  'Handicrafts & Art': [
    'Pottery Wheel Skills',
    'Clay Product Finishing',
    'Handloom Weaving',
    'Embroidery Basics',
    'Natural Dyeing',
    'Wood Crafting',
    'Metal Embossing',
    'Basket Weaving',
    'Leather Craft Repair',
    'Terracotta Painting',
  ],
  'Construction & Practical Skills': [
    'Brickwork Foundations',
    'Rural Masonry Techniques',
    'Plumbing Repair Basics',
    'Electrical Safety Checks',
    'Concrete Mixing Ratios',
    'Roof Waterproofing',
    'Tile Installation',
    'Carpentry Measurement',
    'Tool Maintenance',
    'Low-Cost Housing Methods',
  ],
  'Food & Cooking': [
    'Community Meal Planning',
    'Nutritious Rural Recipes',
    'Food Safety & Storage',
    'Low-Waste Cooking',
    'Preservation & Pickling',
    'Bakery Basics',
    'Street Food Hygiene',
    'Millet-Based Cooking',
    'Kitchen Inventory Skills',
    'Catering Workflow',
  ],
  'Nature & Survival': [
    'Water Conservation Methods',
    'Rainwater Harvesting',
    'Forest Resource Ethics',
    'Composting Systems',
    'Emergency Preparedness',
    'First Aid in Field',
    'Outdoor Navigation',
    'Shelter Building Basics',
    'Climate Observation',
    'Sustainable Energy Usage',
  ],
  'Mechanical & Repair': [
    'Bicycle Repair',
    'Pump Set Troubleshooting',
    'Basic Welding',
    'Motor Rewinding Intro',
    'Solar Panel Maintenance',
    'Machine Lubrication',
    'Tool Calibration',
    'Farm Vehicle Checks',
    'Small Engine Repair',
    'Appliance Servicing',
  ],
  'Business & Trade': [
    'Local Market Research',
    'Pricing for Profit',
    'Retail Display Basics',
    'Inventory Management',
    'Digital Payments Setup',
    'Customer Communication',
    'Vendor Negotiation',
    'Microfinance Literacy',
    'Brand Storytelling',
    'Rural E-commerce Basics',
  ],
  'Soft Skills': [
    'Public Speaking',
    'Team Collaboration',
    'Conflict Resolution',
    'Time Management',
    'Decision Making',
    'Leadership Foundations',
    'Problem Solving',
    'Interview Readiness',
    'Goal Planning',
    'Community Mentorship',
  ],
  'Cultural Skills': [
    'Folk Music Practice',
    'Traditional Dance Basics',
    'Local Storytelling',
    'Festival Event Planning',
    'Heritage Craft Documentation',
    'Cultural Costume Making',
    'Traditional Instrument Care',
    'Community Theater',
    'Regional Language Expression',
    'Cultural Tourism Hosting',
  ],
}

const levelTags = ['Beginner', 'Intermediate', 'Advanced']

const asLocalized = (en, hi, mr) => ({ en, hi, mr })

const encodeSvg = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`

const paletteByCategory = {
  Agriculture: ['#0f766e', '#34d399'],
  'Animal & Dairy': ['#4f46e5', '#60a5fa'],
  'Handicrafts & Art': ['#b45309', '#f59e0b'],
  'Construction & Practical Skills': ['#334155', '#94a3b8'],
  'Food & Cooking': ['#be123c', '#fb7185'],
  'Nature & Survival': ['#166534', '#84cc16'],
  'Mechanical & Repair': ['#0369a1', '#22d3ee'],
  'Business & Trade': ['#1d4ed8', '#38bdf8'],
  'Soft Skills': ['#7c3aed', '#c084fc'],
  'Cultural Skills': ['#b91c1c', '#fb923c'],
}

const categoryBadge = {
  Agriculture: 'AGRI',
  'Animal & Dairy': 'DAIRY',
  'Handicrafts & Art': 'CRAFT',
  'Construction & Practical Skills': 'BUILD',
  'Food & Cooking': 'COOK',
  'Nature & Survival': 'NATURE',
  'Mechanical & Repair': 'REPAIR',
  'Business & Trade': 'TRADE',
  'Soft Skills': 'SOFT',
  'Cultural Skills': 'CULTURE',
}

const categoryIcon = {
  Agriculture: '🌾',
  'Animal & Dairy': '🐄',
  'Handicrafts & Art': '🪔',
  'Construction & Practical Skills': '🧱',
  'Food & Cooking': '🍲',
  'Nature & Survival': '🌿',
  'Mechanical & Repair': '🔧',
  'Business & Trade': '📈',
  'Soft Skills': '🤝',
  'Cultural Skills': '🎭',
}

const hashString = (value) => {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

const escapeXml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const buildSkillImage = (name, category, index) => {
  const [start, end] = paletteByCategory[category] ?? ['#0f172a', '#64748b']
  const badge = categoryBadge[category] ?? 'SKILL'
  const icon = categoryIcon[category] ?? '📘'
  const slug = `${name} ${category}`.replace(/[^a-zA-Z0-9 ]+/g, ' ').trim()
  const label = slug.length > 36 ? `${slug.slice(0, 33)}...` : slug
  const serial = String(index + 1).padStart(3, '0')
  const seed = hashString(`${name}-${category}-${index}`)
  const accentHue = seed % 360
  const accent = `hsl(${accentHue} 90% 65%)`
  const accentTwo = `hsl(${(accentHue + 34) % 360} 90% 60%)`
  const safeLabel = escapeXml(label)
  const safeCategory = escapeXml(category)

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800' role='img' aria-label='${safeLabel}'>
<defs>
<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
<stop offset='0%' stop-color='${start}'/>
<stop offset='100%' stop-color='${end}'/>
</linearGradient>
<linearGradient id='a' x1='0' y1='1' x2='1' y2='0'>
<stop offset='0%' stop-color='${accent}' stop-opacity='0.8'/>
<stop offset='100%' stop-color='${accentTwo}' stop-opacity='0.8'/>
</linearGradient>
</defs>
<rect width='1200' height='800' fill='url(#g)'/>
<rect x='0' y='560' width='1200' height='240' fill='url(#a)' opacity='0.55'/>
<circle cx='1040' cy='160' r='130' fill='rgba(255,255,255,0.14)'/>
<circle cx='170' cy='650' r='190' fill='rgba(255,255,255,0.12)'/>
<path d='M0 470 C240 390 420 520 650 460 C850 408 1010 475 1200 420 L1200 800 L0 800 Z' fill='rgba(255,255,255,0.16)'/>
<text x='84' y='116' fill='rgba(255,255,255,0.92)' font-size='42' font-family='Verdana, Arial, sans-serif' font-weight='700'>${badge}</text>
<text x='84' y='195' fill='rgba(255,255,255,0.86)' font-size='30' font-family='Verdana, Arial, sans-serif'>${safeCategory}</text>
<text x='84' y='292' fill='white' font-size='58' font-family='Verdana, Arial, sans-serif' font-weight='700'>${safeLabel}</text>
<text x='84' y='365' fill='rgba(255,255,255,0.9)' font-size='28' font-family='Verdana, Arial, sans-serif'>Skill ${serial}</text>
<text x='1040' y='690' text-anchor='middle' fill='rgba(255,255,255,0.95)' font-size='160'>${icon}</text>
</svg>`

  return encodeSvg(svg)
}

const imageBySkill = (name, category, index) => {
  return buildSkillImage(name, category, index)
}

const buildSkillCourse = (name, category, index) => {
  const image = imageBySkill(name, category, index)
  const fallbackImage = image
  const difficulty = levelTags[index % levelTags.length]

  return {
    id: `${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}`,
    name: asLocalized(name, `${name} (हिंदी)`, `${name} (मराठी)`),
    category,
    difficulty,
    description: asLocalized(
      `Learn ${name.toLowerCase()} with structured modules, real tasks, and practical outcomes.`,
      `${name} को चरणबद्ध मॉड्यूल, वास्तविक कार्य और व्यावहारिक परिणामों के साथ सीखें।`,
      `${name} हे संरचित मॉड्यूल, प्रत्यक्ष कामे आणि व्यावहारिक परिणामांसह शिका.`,
    ),
    image,
    fallbackImage,
    videos: [
      {
        id: `${name}-v1`,
        title: asLocalized(`${name} Level 1`, `${name} स्तर 1`, `${name} स्तर 1`),
        duration: '08:20',
        thumbnail: image,
      },
      {
        id: `${name}-v2`,
        title: asLocalized(`${name} Level 2`, `${name} स्तर 2`, `${name} स्तर 2`),
        duration: '10:10',
        thumbnail: image,
      },
      {
        id: `${name}-v3`,
        title: asLocalized(`${name} Level 3`, `${name} स्तर 3`, `${name} स्तर 3`),
        duration: '12:05',
        thumbnail: image,
      },
    ],
    materials: {
      smartNotes: {
        en: [`Key concepts for ${name}`, 'Common mistakes and prevention', 'Checklist for field application'],
        hi: [`${name} के मुख्य सिद्धांत`, 'आम गलतियां और रोकथाम', 'मैदानी उपयोग चेकलिस्ट'],
        mr: [`${name} साठी प्रमुख संकल्पना`, 'सामान्य चुका आणि प्रतिबंध', 'प्रत्यक्ष वापर चेकलिस्ट'],
      },
      stepDiagram: {
        en: ['Observe context', 'Prepare resources', 'Execute carefully', 'Review and improve'],
        hi: ['स्थिति समझें', 'संसाधन तैयार करें', 'सावधानी से लागू करें', 'समीक्षा और सुधार करें'],
        mr: ['परिस्थिती समजा', 'साधने तयार करा', 'काळजीपूर्वक अंमलबजावणी करा', 'पुनरावलोकन आणि सुधारणा करा'],
      },
      infographic: image,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      guides: {
        en: [{ label: `${name} Field Guide PDF`, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }],
        hi: [{ label: `${name} फील्ड गाइड PDF`, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }],
        mr: [{ label: `${name} फील्ड मार्गदर्शक PDF`, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }],
      },
    },
    test: {
      adaptiveQuestions: [
        {
          id: `${name}-q-easy`,
          type: 'mcq',
          difficulty: 'easy',
          prompt: asLocalized(
            `What is the first step in ${name.toLowerCase()}?`,
            `${name} में पहला कदम क्या है?`,
            `${name} मधील पहिला टप्पा कोणता?`,
          ),
          options: asLocalized(
            ['Planning and preparation', 'Skipping setup', 'Random action', 'Ignoring safety'],
            ['योजना और तैयारी', 'तैयारी छोड़ना', 'बिना योजना काम', 'सुरक्षा नजरअंदाज'],
            ['नियोजन आणि तयारी', 'तयारी टाळणे', 'उगीच कृती', 'सुरक्षेकडे दुर्लक्ष'],
          ),
          answerByLanguage: {
            en: 'Planning and preparation',
            hi: 'योजना और तैयारी',
            mr: 'नियोजन आणि तयारी',
          },
        },
        {
          id: `${name}-q-medium`,
          type: 'scenario',
          difficulty: 'medium',
          prompt: asLocalized(
            `Scenario: resources are limited while practicing ${name.toLowerCase()}. What should you do?`,
            `स्थिति: ${name} अभ्यास के दौरान संसाधन सीमित हैं। आप क्या करेंगे?`,
            `स्थिती: ${name} सराव करताना साधने कमी आहेत. तुम्ही काय कराल?`,
          ),
          keywords: ['prioritize', 'safe', 'efficient', 'प्राथमिकता', 'सुरक्षित', 'कार्यक्षम', 'प्राधान्य', 'सुरक्षित', 'कार्यक्षम'],
        },
        {
          id: `${name}-q-hard`,
          type: 'image',
          difficulty: 'hard',
          prompt: asLocalized(
            `Identify the correct improvement step from this ${name.toLowerCase()} context image.`,
            `${name} संदर्भ चित्र से सही सुधार कदम चुनें।`,
            `या ${name} संदर्भ चित्रातून योग्य सुधारणा पायरी निवडा.`,
          ),
          image,
          options: asLocalized(
            ['Improve process flow', 'Ignore visual signs', 'Increase waste', 'Skip quality check'],
            ['प्रक्रिया प्रवाह सुधारें', 'संकेतों को अनदेखा करें', 'कचरा बढ़ाएं', 'गुणवत्ता जांच छोड़ें'],
            ['प्रक्रिया प्रवाह सुधारा', 'दृश्य संकेत दुर्लक्ष करा', 'कचरा वाढवा', 'गुणवत्ता तपासणी टाळा'],
          ),
          answerByLanguage: {
            en: 'Improve process flow',
            hi: 'प्रक्रिया प्रवाह सुधारें',
            mr: 'प्रक्रिया प्रवाह सुधारा',
          },
        },
      ],
      dragDrop: {
        prompt: asLocalized(
          `Arrange the right order for ${name.toLowerCase()}.`,
          `${name} के लिए सही क्रम व्यवस्थित करें।`,
          `${name} साठी योग्य क्रम लावा.`,
        ),
        items: asLocalized(
          ['Prepare', 'Execute', 'Verify', 'Document'],
          ['तैयारी', 'क्रियान्वयन', 'सत्यापन', 'दस्तावेज़'],
          ['तयारी', 'अंमलबजावणी', 'तपासणी', 'दस्तऐवज'],
        ),
      },
    },
    assignment: {
      title: asLocalized(`Practical Task: ${name}`, `व्यावहारिक कार्य: ${name}`, `प्रात्यक्षिक काम: ${name}`),
      instruction: asLocalized(
        `Submit image/video proof demonstrating your ${name.toLowerCase()} implementation in real conditions.`,
        `${name} के वास्तविक उपयोग का इमेज/वीडियो प्रमाण अपलोड करें।`,
        `${name} च्या प्रत्यक्ष अंमलबजावणीचा इमेज/व्हिडिओ पुरावा अपलोड करा.`,
      ),
    },
  }
}

const rawSkills = Object.entries(categorySkillMap).flatMap(([category, names]) =>
  names.map((name) => ({ name, category })),
)

export const skills101 = rawSkills.map((item, globalIndex) =>
  buildSkillCourse(item.name, item.category, globalIndex),
)

export const skillCategories = ['All', ...Object.keys(categorySkillMap)]

export const difficultyFilters = ['All', 'Beginner', 'Intermediate', 'Advanced']

export const leaderboardMock = [
  { id: 'lb-1', name: 'Aarav Mehta', points: 2820 },
  { id: 'lb-2', name: 'Sita Devi', points: 2540 },
  { id: 'lb-3', name: 'Mohan Patil', points: 2300 },
]
