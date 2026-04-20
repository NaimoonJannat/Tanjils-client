/**
 * Static treatment data — replaces the backend API.
 * Used by TreatmentSection, TreatmentCard, and TreatmentDetails.
 */
const treatments = [
  {
    _id: "699e005cd33d4cbcb3183c63",
    title: "Piles (Haemorrhoids) Laser Treatment",
    slug: "piles-laser-treatment",
    category: "Laser",
    shortDesc: "Painless laser treatment for haemorrhoids — no cuts, no stitches, same-day discharge.",
    description:
      "Laser haemorrhoidoplasty is a modern, minimally invasive procedure that uses laser energy to shrink haemorrhoidal tissue. There are no cuts or stitches involved, virtually no pain, and patients return home the same day.",
    image: "/images/treatments/piles.jpg",
    highlights: ["No cuts or stitches", "Same-day discharge", "Virtually painless"],
    duration: "20–30 minutes",
    recovery: "1–2 days",
  },
  {
    _id: "699e005cd33d4cbcb3183c5f",
    title: "Gall Bladder Surgery",
    slug: "gall-bladder-surgery",
    category: "Laparoscopic",
    shortDesc: "Minimally invasive laparoscopic cholecystectomy for gallstones and gallbladder disease.",
    description:
      "Laparoscopic gall bladder surgery (cholecystectomy) is performed using small incisions and a camera. Dr. Rahman uses advanced techniques to ensure minimal pain, faster recovery, and excellent outcomes. Most patients go home the same day.",
    image: "/images/treatments/gall-bladder.jpg",
    highlights: ["Same-day discharge", "Minimal scarring", "Quick recovery"],
    duration: "45–60 minutes",
    recovery: "2–5 days",
  },
  {
    _id: "699e005cd33d4cbcb3183c60",
    title: "Appendix Surgery",
    slug: "appendix-surgery",
    category: "Laparoscopic",
    shortDesc: "Laparoscopic appendectomy for acute and chronic appendicitis.",
    description:
      "Laparoscopic appendectomy removes the inflamed appendix through tiny incisions. The procedure significantly reduces post-operative pain and hospital stay compared to open surgery.",
    image: "/images/treatments/appendix.jpg",
    highlights: ["Minimally invasive", "Reduced infection risk", "Short hospital stay"],
    duration: "30–60 minutes",
    recovery: "1–3 days",
  },
  {
    _id: "699e005cd33d4cbcb3183c61",
    title: "Male Hernia Surgery",
    slug: "male-hernia-surgery",
    category: "Laparoscopic",
    shortDesc: "Laparoscopic inguinal hernia repair with mesh for durable, pain-free results.",
    description:
      "Laparoscopic hernia repair in males involves placing a mesh to reinforce the abdominal wall through small incisions. The technique reduces recurrence rates and allows return to normal activity quickly.",
    image: "/images/treatments/hernia-male.jpg",
    highlights: ["Mesh reinforcement", "Low recurrence", "Day-case procedure"],
    duration: "45–90 minutes",
    recovery: "3–7 days",
  },
  {
    _id: "699e005cd33d4cbcb3183c67",
    title: "Abdominal Cancer Surgery",
    slug: "abdominal-cancer-surgery",
    category: "Cancer",
    shortDesc: "Advanced surgical management of abdominal cancers including gastric and small bowel tumours.",
    description:
      "Surgical resection of abdominal cancers requires precision and experience. Dr. Rahman offers comprehensive oncological surgery for gastric, small bowel, and other abdominal malignancies, focusing on curative intent and quality of life.",
    image: "/images/treatments/abdominal-cancer.jpg",
    highlights: ["Curative & palliative options", "Minimally invasive where possible", "Oncology coordination"],
    duration: "2–6 hours",
    recovery: "2–6 weeks",
  },
  {
    _id: "699e005cd33d4cbcb3183c64",
    title: "Anal Fissure Laser Treatment",
    slug: "anal-fissure-laser-treatment",
    category: "Laser",
    shortDesc: "Precise laser treatment for chronic anal fissures with minimal discomfort.",
    description:
      "Chronic anal fissures can be effectively treated with laser energy, which promotes healing and relaxes the internal sphincter. The procedure is quick, precise, and associated with significantly less post-operative pain than traditional surgery.",
    image: "/images/treatments/anal-fissure.jpg",
    highlights: ["Sphincter preservation", "Minimal pain", "High success rate"],
    duration: "15–25 minutes",
    recovery: "1–3 days",
  },
  {
    _id: "699e005cd33d4cbcb3183c66",
    title: "Breast Cancer Surgery",
    slug: "breast-cancer-surgery",
    category: "Cancer",
    shortDesc: "Comprehensive breast cancer surgery including lumpectomy, mastectomy and axillary clearance.",
    description:
      "Dr. Rahman performs evidence-based breast cancer surgeries including wide local excision, modified radical mastectomy, and sentinel lymph node biopsy. Treatment is tailored to each patient's staging and goals with a multidisciplinary approach.",
    image: "/images/treatments/breast-cancer.jpg",
    highlights: ["Breast-conserving options", "Multidisciplinary care", "Lymph node assessment"],
    duration: "1–4 hours",
    recovery: "1–4 weeks",
  },
  {
    _id: "699e005cd33d4cbcb3183c62",
    title: "Female Hernia Surgery",
    slug: "female-hernia-surgery",
    category: "Laparoscopic",
    shortDesc: "Laparoscopic hernia repair tailored for female anatomy and anatomy-specific mesh placement.",
    description:
      "Hernia repair in females requires careful consideration of anatomy. Dr. Rahman uses laparoscopic techniques for femoral, inguinal, and umbilical hernias, ensuring minimal disruption and rapid healing.",
    image: "/images/treatments/hernia-female.jpg",
    highlights: ["Anatomy-specific approach", "Minimal scarring", "Fast return to activity"],
    duration: "45–90 minutes",
    recovery: "3–7 days",
  },
  {
    _id: "699e005cd33d4cbcb3183c65",
    title: "Anal Fistula Laser Treatment",
    slug: "anal-fistula-laser-treatment",
    category: "Laser",
    shortDesc: "FiLaC laser technique for complex anal fistulas — preserving sphincter integrity.",
    description:
      "Fistula-in-Ano Laser Closure (FiLaC) is a sphincter-saving laser procedure for anal fistulas. The laser seals the fistula tract without cutting through sphincter muscle, dramatically reducing the risk of incontinence.",
    image: "/images/treatments/anal-fistula.jpg",
    highlights: ["Sphincter-sparing", "No incontinence risk", "Outpatient procedure"],
    duration: "20–40 minutes",
    recovery: "2–5 days",
  },
  {
    _id: "699e005cd33d4cbcb3183c69",
    title: "General Surgery",
    slug: "general-surgery",
    category: "General",
    shortDesc: "Comprehensive general surgical care for a wide range of conditions.",
    description:
      "Beyond specialist procedures, Dr. Rahman provides comprehensive general surgical care including wound management, abscess drainage, lipoma excision, thyroid surgery, and other elective and emergency surgical conditions.",
    image: "/images/treatments/general-surgery.jpg",
    highlights: ["Emergency & elective cases", "Wide surgical expertise", "Personalised care"],
    duration: "Varies",
    recovery: "Varies",
  },
  {
    _id: "699e005cd33d4cbcb3183c68",
    title: "Colon & Rectal Cancer Surgery",
    slug: "colon-rectal-cancer-surgery",
    category: "Cancer",
    shortDesc: "Laparoscopic and open colorectal cancer surgery with sphincter-preserving techniques.",
    description:
      "With fellowship training in laparoscopic colorectal surgery, Dr. Rahman offers minimally invasive colon and rectal cancer resections. Sphincter-preserving techniques are prioritised, and all cases are managed with a multidisciplinary oncology team.",
    image: "/images/treatments/colorectal-cancer.jpg",
    highlights: ["Laparoscopic colorectal expertise", "Sphincter preservation", "Fellowship-trained"],
    duration: "2–5 hours",
    recovery: "2–4 weeks",
  },
];

export default treatments;
