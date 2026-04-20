/**
 * Static treatment data — bilingual (en / bn).
 * Translatable fields are objects: { en: "...", bn: "..." }
 * Non-translatable fields (slug, category, image, _id) remain plain strings.
 */
const treatments = [
  {
    _id: "699e005cd33d4cbcb3183c63",
    slug: "piles-laser-treatment",
    category: "Laser",
    image: "/images/treatments/piles.jpg",
    title: {
      en: "Piles (Haemorrhoids) Laser Treatment",
      bn: "পাইলস (অর্শরোগ) লেজার চিকিৎসা",
    },
    shortDesc: {
      en: "Painless laser treatment for haemorrhoids — no cuts, no stitches, same-day discharge.",
      bn: "হেমোরয়েডের জন্য ব্যথামুক্ত লেজার চিকিৎসা — কোনো কাটাছেঁড়া নেই, কোনো সেলাই নেই, একই দিনে ছুটি।",
    },
    description: {
      en: "Laser haemorrhoidoplasty is a modern, minimally invasive procedure that uses laser energy to shrink haemorrhoidal tissue. There are no cuts or stitches involved, virtually no pain, and patients return home the same day.",
      bn: "লেজার হেমোরয়েডোপ্লাস্টি একটি আধুনিক ও ন্যূনতম আক্রমণাত্মক পদ্ধতি যা লেজার শক্তি ব্যবহার করে হেমোরয়েডাল টিস্যু সংকুচিত করে। এতে কোনো কাটাছেঁড়া বা সেলাই জড়িত নেই, প্রায় কোনো ব্যথা নেই এবং রোগীরা একই দিনে বাড়ি ফিরে যান।",
    },
    highlights: {
      en: ["No cuts or stitches", "Same-day discharge", "Virtually painless"],
      bn: ["কোনো কাটাছেঁড়া বা সেলাই নেই", "একই দিনে ছুটি", "প্রায় ব্যথামুক্ত"],
    },
    duration: { en: "20–30 minutes", bn: "২০–৩০ মিনিট" },
    recovery: { en: "1–2 days", bn: "১–২ দিন" },
  },
  {
    _id: "699e005cd33d4cbcb3183c5f",
    slug: "gall-bladder-surgery",
    category: "Laparoscopic",
    image: "/images/treatments/gall-bladder.jpg",
    title: {
      en: "Gall Bladder Surgery",
      bn: "পিত্তথলির অস্ত্রোপচার",
    },
    shortDesc: {
      en: "Minimally invasive laparoscopic cholecystectomy for gallstones and gallbladder disease.",
      bn: "পিত্তপাথর ও পিত্তথলির রোগের জন্য ন্যূনতম আক্রমণাত্মক ল্যাপারোস্কোপিক কোলেসিস্টেকটমি।",
    },
    description: {
      en: "Laparoscopic gall bladder surgery (cholecystectomy) is performed using small incisions and a camera. Dr. Rahman uses advanced techniques to ensure minimal pain, faster recovery, and excellent outcomes. Most patients go home the same day.",
      bn: "ল্যাপারোস্কোপিক পিত্তথলির অস্ত্রোপচার (কোলেসিস্টেকটমি) ছোট ছিদ্র ও ক্যামেরা ব্যবহার করে করা হয়। ডা. রহমান উন্নত কৌশল ব্যবহার করে ন্যূনতম ব্যথা, দ্রুত সুস্থতা ও চমৎকার ফলাফল নিশ্চিত করেন। অধিকাংশ রোগী একই দিনে বাড়ি ফিরতে পারেন।",
    },
    highlights: {
      en: ["Same-day discharge", "Minimal scarring", "Quick recovery"],
      bn: ["একই দিনে ছুটি", "ন্যূনতম দাগ", "দ্রুত সুস্থতা"],
    },
    duration: { en: "45–60 minutes", bn: "৪৫–৬০ মিনিট" },
    recovery: { en: "2–5 days", bn: "২–৫ দিন" },
  },
  {
    _id: "699e005cd33d4cbcb3183c60",
    slug: "appendix-surgery",
    category: "Laparoscopic",
    image: "/images/treatments/appendix.jpg",
    title: {
      en: "Appendix Surgery",
      bn: "অ্যাপেন্ডিক্স অস্ত্রোপচার",
    },
    shortDesc: {
      en: "Laparoscopic appendectomy for acute and chronic appendicitis.",
      bn: "তীব্র ও দীর্ঘস্থায়ী অ্যাপেন্ডিসাইটিসের জন্য ল্যাপারোস্কোপিক অ্যাপেন্ডেকটমি।",
    },
    description: {
      en: "Laparoscopic appendectomy removes the inflamed appendix through tiny incisions. The procedure significantly reduces post-operative pain and hospital stay compared to open surgery.",
      bn: "ল্যাপারোস্কোপিক অ্যাপেন্ডেকটমি ছোট ছিদ্রের মাধ্যমে প্রদাহিত অ্যাপেন্ডিক্স অপসারণ করে। এই পদ্ধতিতে ওপেন অস্ত্রোপচারের তুলনায় অপারেশন-পরবর্তী ব্যথা ও হাসপাতালে থাকার সময় উল্লেখযোগ্যভাবে কম।",
    },
    highlights: {
      en: ["Minimally invasive", "Reduced infection risk", "Short hospital stay"],
      bn: ["ন্যূনতম আক্রমণাত্মক", "সংক্রমণের ঝুঁকি কম", "হাসপাতালে স্বল্প অবস্থান"],
    },
    duration: { en: "30–60 minutes", bn: "৩০–৬০ মিনিট" },
    recovery: { en: "1–3 days", bn: "১–৩ দিন" },
  },
  {
    _id: "699e005cd33d4cbcb3183c61",
    slug: "male-hernia-surgery",
    category: "Laparoscopic",
    image: "/images/treatments/hernia-male.jpg",
    title: {
      en: "Male Hernia Surgery",
      bn: "পুরুষের হার্নিয়া অস্ত্রোপচার",
    },
    shortDesc: {
      en: "Laparoscopic inguinal hernia repair with mesh for durable, pain-free results.",
      bn: "স্থায়ী ও ব্যথামুক্ত ফলাফলের জন্য মেশসহ ল্যাপারোস্কোপিক ইনগুইনাল হার্নিয়া মেরামত।",
    },
    description: {
      en: "Laparoscopic hernia repair in males involves placing a mesh to reinforce the abdominal wall through small incisions. The technique reduces recurrence rates and allows return to normal activity quickly.",
      bn: "পুরুষ রোগীদের ল্যাপারোস্কোপিক হার্নিয়া মেরামতে ছোট ছিদ্রের মাধ্যমে পেটের দেয়াল শক্তিশালী করতে একটি মেশ স্থাপন করা হয়। এই কৌশলটি পুনরাবৃত্তির হার কমায় এবং রোগীকে দ্রুত স্বাভাবিক কার্যক্রমে ফিরতে দেয়।",
    },
    highlights: {
      en: ["Mesh reinforcement", "Low recurrence", "Day-case procedure"],
      bn: ["মেশ দিয়ে শক্তিশালীকরণ", "পুনরাবৃত্তির হার কম", "ডে-কেস পদ্ধতি"],
    },
    duration: { en: "45–90 minutes", bn: "৪৫–৯০ মিনিট" },
    recovery: { en: "3–7 days", bn: "৩–৭ দিন" },
  },
  {
    _id: "699e005cd33d4cbcb3183c67",
    slug: "abdominal-cancer-surgery",
    category: "Cancer",
    image: "/images/treatments/abdominal-cancer.jpg",
    title: {
      en: "Abdominal Cancer Surgery",
      bn: "পেটের ক্যান্সার অস্ত্রোপচার",
    },
    shortDesc: {
      en: "Advanced surgical management of abdominal cancers including gastric and small bowel tumours.",
      bn: "গ্যাস্ট্রিক ও ক্ষুদ্রান্ত্রের টিউমারসহ পেটের ক্যান্সারের উন্নত অস্ত্রোপচার ব্যবস্থাপনা।",
    },
    description: {
      en: "Surgical resection of abdominal cancers requires precision and experience. Dr. Rahman offers comprehensive oncological surgery for gastric, small bowel, and other abdominal malignancies, focusing on curative intent and quality of life.",
      bn: "পেটের ক্যান্সারের অস্ত্রোপচারে নির্ভুলতা ও অভিজ্ঞতা প্রয়োজন। ডা. রহমান গ্যাস্ট্রিক, ক্ষুদ্রান্ত্র এবং অন্যান্য পেটের ম্যালিগন্যান্সির জন্য ব্যাপক অনকোলজিক্যাল অস্ত্রোপচার প্রদান করেন, যেখানে নিরাময়ের লক্ষ্যে ও রোগীর জীবনমানের উপর মনোযোগ দেওয়া হয়।",
    },
    highlights: {
      en: ["Curative & palliative options", "Minimally invasive where possible", "Oncology coordination"],
      bn: ["নিরাময়মূলক ও উপশমমূলক বিকল্প", "সম্ভব হলে ন্যূনতম আক্রমণাত্মক", "অনকোলজি সমন্বয়"],
    },
    duration: { en: "2–6 hours", bn: "২–৬ ঘণ্টা" },
    recovery: { en: "2–6 weeks", bn: "২–৬ সপ্তাহ" },
  },
  {
    _id: "699e005cd33d4cbcb3183c64",
    slug: "anal-fissure-laser-treatment",
    category: "Laser",
    image: "/images/treatments/anal-fissure.jpg",
    title: {
      en: "Anal Fissure Laser Treatment",
      bn: "এনাল ফিশার লেজার চিকিৎসা",
    },
    shortDesc: {
      en: "Precise laser treatment for chronic anal fissures with minimal discomfort.",
      bn: "দীর্ঘস্থায়ী এনাল ফিশারের জন্য নির্ভুল লেজার চিকিৎসা — ন্যূনতম অস্বস্তি।",
    },
    description: {
      en: "Chronic anal fissures can be effectively treated with laser energy, which promotes healing and relaxes the internal sphincter. The procedure is quick, precise, and associated with significantly less post-operative pain than traditional surgery.",
      bn: "দীর্ঘস্থায়ী এনাল ফিশার লেজার শক্তি দিয়ে কার্যকরভাবে চিকিৎসা করা যায়, যা নিরাময়ে সহায়তা করে এবং অভ্যন্তরীণ স্ফিংটারকে শিথিল করে। পদ্ধতিটি দ্রুত, নির্ভুল এবং প্রচলিত অস্ত্রোপচারের তুলনায় উল্লেখযোগ্যভাবে কম অপারেশন-পরবর্তী ব্যথার সাথে সম্পর্কিত।",
    },
    highlights: {
      en: ["Sphincter preservation", "Minimal pain", "High success rate"],
      bn: ["স্ফিংটার সংরক্ষণ", "ন্যূনতম ব্যথা", "উচ্চ সাফল্যের হার"],
    },
    duration: { en: "15–25 minutes", bn: "১৫–২৫ মিনিট" },
    recovery: { en: "1–3 days", bn: "১–৩ দিন" },
  },
  {
    _id: "699e005cd33d4cbcb3183c66",
    slug: "breast-cancer-surgery",
    category: "Cancer",
    image: "/images/treatments/breast-cancer.jpg",
    title: {
      en: "Breast Cancer Surgery",
      bn: "স্তন ক্যান্সার অস্ত্রোপচার",
    },
    shortDesc: {
      en: "Comprehensive breast cancer surgery including lumpectomy, mastectomy and axillary clearance.",
      bn: "লাম্পেকটমি, মাস্টেকটমি ও অ্যাক্সিলারি ক্লিয়ারেন্সসহ ব্যাপক স্তন ক্যান্সার অস্ত্রোপচার।",
    },
    description: {
      en: "Dr. Rahman performs evidence-based breast cancer surgeries including wide local excision, modified radical mastectomy, and sentinel lymph node biopsy. Treatment is tailored to each patient's staging and goals with a multidisciplinary approach.",
      bn: "ডা. রহমান প্রমাণ-ভিত্তিক স্তন ক্যান্সার অস্ত্রোপচার পরিচালনা করেন, যার মধ্যে ওয়াইড লোকাল এক্সিসান, মডিফাইড র‍্যাডিকাল মাস্টেকটমি এবং সেন্টিনেল লিম্ফ নোড বায়োপসি অন্তর্ভুক্ত। প্রতিটি রোগীর রোগের স্তর ও লক্ষ্য অনুযায়ী বহু-বিভাগীয় পদ্ধতিতে চিকিৎসা পরিকল্পনা করা হয়।",
    },
    highlights: {
      en: ["Breast-conserving options", "Multidisciplinary care", "Lymph node assessment"],
      bn: ["স্তন-সংরক্ষণকারী বিকল্প", "বহু-বিভাগীয় সেবা", "লিম্ফ নোড মূল্যায়ন"],
    },
    duration: { en: "1–4 hours", bn: "১–৪ ঘণ্টা" },
    recovery: { en: "1–4 weeks", bn: "১–৪ সপ্তাহ" },
  },
  {
    _id: "699e005cd33d4cbcb3183c62",
    slug: "female-hernia-surgery",
    category: "Laparoscopic",
    image: "/images/treatments/hernia-female.jpg",
    title: {
      en: "Female Hernia Surgery",
      bn: "নারীর হার্নিয়া অস্ত্রোপচার",
    },
    shortDesc: {
      en: "Laparoscopic hernia repair tailored for female anatomy and anatomy-specific mesh placement.",
      bn: "নারীর শারীরিক গঠন অনুযায়ী মেশ স্থাপনসহ ল্যাপারোস্কোপিক হার্নিয়া মেরামত।",
    },
    description: {
      en: "Hernia repair in females requires careful consideration of anatomy. Dr. Rahman uses laparoscopic techniques for femoral, inguinal, and umbilical hernias, ensuring minimal disruption and rapid healing.",
      bn: "নারী রোগীদের হার্নিয়া মেরামতে শারীরস্থানিক বিষয়গুলো বিশেষভাবে বিবেচনা করা প্রয়োজন। ডা. রহমান ফেমোরাল, ইনগুইনাল এবং আম্বিলিক্যাল হার্নিয়ার জন্য ল্যাপারোস্কোপিক কৌশল ব্যবহার করেন, যা ন্যূনতম ব্যাঘাত ও দ্রুত নিরাময় নিশ্চিত করে।",
    },
    highlights: {
      en: ["Anatomy-specific approach", "Minimal scarring", "Fast return to activity"],
      bn: ["শারীরস্থান-নির্দিষ্ট পদ্ধতি", "ন্যূনতম দাগ", "দ্রুত কার্যক্রমে প্রত্যাবর্তন"],
    },
    duration: { en: "45–90 minutes", bn: "৪৫–৯০ মিনিট" },
    recovery: { en: "3–7 days", bn: "৩–৭ দিন" },
  },
  {
    _id: "699e005cd33d4cbcb3183c65",
    slug: "anal-fistula-laser-treatment",
    category: "Laser",
    image: "/images/treatments/anal-fistula.jpg",
    title: {
      en: "Anal Fistula Laser Treatment",
      bn: "এনাল ফিস্টুলা লেজার চিকিৎসা",
    },
    shortDesc: {
      en: "FiLaC laser technique for complex anal fistulas — preserving sphincter integrity.",
      bn: "জটিল এনাল ফিস্টুলার জন্য FiLaC লেজার কৌশল — স্ফিংটারের অখণ্ডতা সংরক্ষণ করে।",
    },
    description: {
      en: "Fistula-in-Ano Laser Closure (FiLaC) is a sphincter-saving laser procedure for anal fistulas. The laser seals the fistula tract without cutting through sphincter muscle, dramatically reducing the risk of incontinence.",
      bn: "ফিস্টুলা-ইন-অ্যানো লেজার ক্লোজার (FiLaC) এনাল ফিস্টুলার জন্য একটি স্ফিংটার-সংরক্ষণকারী লেজার পদ্ধতি। লেজার স্ফিংটার পেশী না কেটে সরাসরি ফিস্টুলা ট্র্যাক্টের ভেতর থেকে সিল করে দেয়, যা অসংযমের ঝুঁকি উল্লেখযোগ্যভাবে কমায়।",
    },
    highlights: {
      en: ["Sphincter-sparing", "No incontinence risk", "Outpatient procedure"],
      bn: ["স্ফিংটার-সংরক্ষণকারী", "অসংযমের ঝুঁকি নেই", "আউটপেশেন্ট পদ্ধতি"],
    },
    duration: { en: "20–40 minutes", bn: "২০–৪০ মিনিট" },
    recovery: { en: "2–5 days", bn: "২–৫ দিন" },
  },
  {
    _id: "699e005cd33d4cbcb3183c69",
    slug: "general-surgery",
    category: "General",
    image: "/images/treatments/general-surgery.jpg",
    title: {
      en: "General Surgery",
      bn: "সাধারণ অস্ত্রোপচার",
    },
    shortDesc: {
      en: "Comprehensive general surgical care for a wide range of conditions.",
      bn: "বিস্তৃত পরিসরের বিভিন্ন রোগের জন্য ব্যাপক সাধারণ অস্ত্রোপচার সেবা।",
    },
    description: {
      en: "Beyond specialist procedures, Dr. Rahman provides comprehensive general surgical care including wound management, abscess drainage, lipoma excision, thyroid surgery, and other elective and emergency surgical conditions.",
      bn: "বিশেষজ্ঞ পদ্ধতির পাশাপাশি, ডা. রহমান ক্ষত ব্যবস্থাপনা, ফোড়া নিষ্কাশন, লিপোমা অপসারণ, থাইরয়েড অস্ত্রোপচার এবং অন্যান্য নির্বাচনী ও জরুরি অস্ত্রোপচারসহ ব্যাপক সাধারণ অস্ত্রোপচার সেবা প্রদান করেন।",
    },
    highlights: {
      en: ["Emergency & elective cases", "Wide surgical expertise", "Personalised care"],
      bn: ["জরুরি ও নির্বাচনী অস্ত্রোপচার", "বিস্তৃত অস্ত্রোপচার দক্ষতা", "ব্যক্তিগতকৃত সেবা"],
    },
    duration: { en: "Varies", bn: "পরিবর্তনশীল" },
    recovery: { en: "Varies", bn: "পরিবর্তনশীল" },
  },
  {
    _id: "699e005cd33d4cbcb3183c68",
    slug: "colon-rectal-cancer-surgery",
    category: "Cancer",
    image: "/images/treatments/colorectal-cancer.jpg",
    title: {
      en: "Colon & Rectal Cancer Surgery",
      bn: "কোলন ও রেক্টাল ক্যান্সার অস্ত্রোপচার",
    },
    shortDesc: {
      en: "Laparoscopic and open colorectal cancer surgery with sphincter-preserving techniques.",
      bn: "স্ফিংটার-সংরক্ষণকারী কৌশলে ল্যাপারোস্কোপিক ও ওপেন কোলোরেক্টাল ক্যান্সার অস্ত্রোপচার।",
    },
    description: {
      en: "With fellowship training in laparoscopic colorectal surgery, Dr. Rahman offers minimally invasive colon and rectal cancer resections. Sphincter-preserving techniques are prioritised, and all cases are managed with a multidisciplinary oncology team.",
      bn: "ল্যাপারোস্কোপিক কোলোরেক্টাল অস্ত্রোপচারে ফেলোশিপ প্রশিক্ষণের সাথে, ডা. রহমান ন্যূনতম আক্রমণাত্মক কোলন ও রেক্টাল ক্যান্সার রিসেকশন পরিচালনা করেন। স্ফিংটার-সংরক্ষণকারী কৌশলকে অগ্রাধিকার দেওয়া হয় এবং সকল ক্ষেত্রে বহু-বিভাগীয় অনকোলজি দলের সাথে পরিচালনা করা হয়।",
    },
    highlights: {
      en: ["Laparoscopic colorectal expertise", "Sphincter preservation", "Fellowship-trained"],
      bn: ["ল্যাপারোস্কোপিক কোলোরেক্টাল দক্ষতা", "স্ফিংটার সংরক্ষণ", "ফেলোশিপ-প্রশিক্ষিত"],
    },
    duration: { en: "2–5 hours", bn: "২–৫ ঘণ্টা" },
    recovery: { en: "2–4 weeks", bn: "২–৪ সপ্তাহ" },
  },
];

export default treatments;
