/**
 * Static activity data — used by the Activity page.
 * Covers: Academic, Surgery, Social, and Research tabs.
 */
import { FaGraduationCap, FaMedal, FaGlobe, FaStarOfLife } from "react-icons/fa6";
import surgery1 from "../assets/laparoscopic.png";
import surgery2 from "../assets/laser2.png";
import surgery3 from "../assets/lapar.jpeg";
import surgery4 from "../assets/harnia.jpg";
import surgery5 from "../assets/breast.jpg";
import surgery6 from "../assets/laser.jpeg";

import social1 from "../assets/social1.jpeg";
import social2 from "../assets/social2.jpeg";
import social3 from "../assets/social3.jpeg";

export const academicData = {
  degrees: [
    {
      icon: <FaGraduationCap />,
      degree: "MBBS",
      institution: "Khulna Medical College",
      university: "University of Rajshahi",
      year: "2003",
      grade: "Distinction",
    },
    {
      icon: <FaMedal />,
      degree: "FCPS (Surgery)",
      institution: "Bangladesh College of Physicians & Surgeons",
      university: "BCPS, Bangladesh",
      year: "2010",
      grade: "Fellowship",
    },
    {
      icon: <FaGlobe />,
      degree: "FMAS",
      institution: "Association of Minimal Access Surgeons of India (AMASI)",
      university: "Tamil Nadu, India",
      year: "2014",
      grade: "Fellowship",
    },
    {
      icon: <FaStarOfLife />,
      degree: "Fellowship — Laparoscopic Colorectal & Hernia",
      institution: "GEM Hospital & Research Centre",
      university: "Coimbatore, India",
      year: "2017",
      grade: "Advanced Fellowship",
    },
  ],
  specializations: [
    { title: "Advanced Laparoscopic Surgery", desc: "Minimally invasive procedures including cholecystectomy, appendectomy, and complex hernia repairs.", level: 95 },
    { title: "Laser Proctology", desc: "State-of-the-art laser treatment for piles, anal fissure, fistula-in-ano and pilonidal sinus.", level: 92 },
    { title: "Cancer Surgery", desc: "Oncological surgery covering breast, abdominal, colorectal, and thyroid cancers.", level: 88 },
    { title: "Colorectal Surgery", desc: "Comprehensive colon and rectal surgical procedures with fellowship-level expertise.", level: 90 },
    { title: "Hernia Surgery", desc: "Advanced mesh-based and laparoscopic hernia repair techniques.", level: 93 },
    { title: "General Surgery", desc: "Broad spectrum surgical care with evidence-based, patient-centred approach.", level: 85 },
  ],
  positions: [
    { role: "Assistant Professor of Surgery", place: "Faridpur Medical College", from: "2024", to: "Present", current: true },
    { role: "Consultant — Surgery", place: "Faridpur Medical College Hospital", from: "2016", to: "2024", current: false },
    { role: "Resident — Surgery (RS)", place: "Faridpur Medical College Hospital", from: "2010", to: "2016", current: false },
    { role: "Register", place: "Dhaka Medical College", from: "2005", to: "2010", current: false },
  ],
};

export const surgeryData = [
  {
    id: 1,
    title: "Laparoscopic Cholecystectomy — Complex Case",
    date: "March 2024",
    tag: "Laparoscopic",
    tagColor: "#93C5FD",
    summary: "A 52-year-old patient presented with acute cholecystitis and multiple gallstones. Successful laparoscopic removal was performed with no complications, and the patient was discharged within 24 hours.",
    outcome: "Full recovery in 5 days",
    img: surgery1,
  },
  {
    id: 2,
    title: "Laser Haemorrhoidectomy — Grade IV Piles",
    date: "January 2024",
    tag: "Laser",
    tagColor: "#C9A96E",
    summary: "Patient suffered from Grade IV haemorrhoids for over three years. Performed precise laser haemorrhoidectomy under spinal anaesthesia. Patient reported near-zero post-operative pain.",
    outcome: "Pain-free in 48 hours",
    img: surgery2,
  },
  {
    id: 3,
    title: "Laparoscopic Colorectal Resection",
    date: "November 2023",
    tag: "Cancer",
    tagColor: "#FCA5A5",
    summary: "A 61-year-old male with rectal carcinoma underwent curative laparoscopic resection. The procedure was completed with clear margins and minimal blood loss.",
    outcome: "Successful curative resection",
    img: surgery3,
  },
  {
    id: 4,
    title: "Bilateral Inguinal Hernia Repair (TAPP)",
    date: "September 2023",
    tag: "Laparoscopic",
    tagColor: "#93C5FD",
    summary: "A young professional with bilateral inguinal hernias underwent totally extra-peritoneal (TAPP) laparoscopic repair. Both sides addressed in a single sitting, minimal downtime.",
    outcome: "Back to work in 7 days",
    img: surgery4,
  },
  {
    id: 5,
    title: "Breast Conserving Surgery — Early Stage Cancer",
    date: "July 2023",
    tag: "Cancer",
    tagColor: "#FCA5A5",
    summary: "A 44-year-old female diagnosed with early-stage breast carcinoma underwent successful breast-conserving surgery. Clear surgical margins achieved with excellent cosmetic outcome.",
    outcome: "Breast-conserving success",
    img: surgery5,
  },
  {
    id: 6,
    title: "Laser Fistulotomy — Complex Anal Fistula",
    date: "May 2023",
    tag: "Laser",
    tagColor: "#C9A96E",
    summary: "Complex trans-sphincteric anal fistula treated with laser fistulotomy technique. Sphincter preservation was prioritised, achieving complete healing without continence issues.",
    outcome: "Complete healing in 3 weeks",
    img: surgery6,
  },
];

export const socialData = [
  {
    id: 1,
    title: "Iftar Mahfil — Hasna-Ismail Foundation, Jhenaidah",
    date: "April 2023",
    category: "Community Event",
    participants: "200+ guests",
    img: social2,
    desc: "On the 22nd of Ramadan 1444 Hijri (14 April 2023), Dr. ASM Tanjilur Rahman participated in an Iftar Mahfil organised by the Hasna-Ismail Foundation at Ukilpara, Arapur, Jhenaidah. The event brought together members of the local community — including residents, students, and healthcare workers — to share in the spirit of Ramadan through collective prayer and a communal Iftar gathering.\n\nThe venue was decorated in the traditional festive style, with tables set out under an open canopy to accommodate a large gathering. The Foundation, which is rooted in the local community of Arapur, organised the event as part of its broader social outreach activities during the holy month. Dr. Rahman attended in his capacity both as a supporter of the Foundation and as a community figure committed to grassroots engagement.\n\nBeyond the religious observance, the Iftar served as an informal platform for community dialogue, where concerns about local healthcare access were discussed. Dr. Rahman used the occasion to encourage attendees to seek timely medical consultation and to raise awareness about available surgical services at Faridpur Medical College Hospital. The Foundation plans to continue hosting such events annually, combining religious tradition with meaningful community outreach.",
  },
  {
    id: 2,
    title: "Breast Cancer Awareness Seminar",
    date: "December 2023",
    category: "Awareness",
    participants: "250+ attendees",
    img: social3,
    desc: "Dr. ASM Tanjilur Rahman delivered a dedicated breast cancer awareness seminar, presenting under the theme 'স্তন ক্যান্সার সনাক্ত করুন — আপনার হাতই হোক প্রথম হাতিয়ার' (Detect Breast Cancer — Let Your Hands Be the First Weapon). The session focused on empowering women and their families with the knowledge to perform self-examination and recognise early warning signs of breast cancer.\n\nDr. Rahman outlined the global and national burden of breast cancer, stressing that Bangladesh sees a disproportionately high number of late-stage presentations due to social stigma, limited awareness, and delayed care-seeking behaviour. Using clinical slides and patient-friendly visual aids, he walked attendees through the step-by-step technique of breast self-examination, explained what abnormal findings might look like, and clarified at what point to seek professional evaluation.\n\nThe seminar drew an audience of over 250, including female students, homemakers, nurses, and community health workers. A live Q&A session followed the presentation, during which attendees raised questions about risk factors, family history, and the availability of mammography in public hospitals. Dr. Rahman also spoke about the role of breast-conserving surgery in early-stage disease, reassuring the audience that early detection dramatically improves outcomes. Printed Bengali-language guides were distributed at the end of the session.",
  },
  {
    id: 3,
    title: "Dushtha Sahayata Prokolpo — Food & Financial Aid, Jhenaidah",
    date: "March 2024",
    category: "Charity",
    participants: "300+ families",
    img: social1,
    desc: "On 29 March 2024, the Hasna-Ismail Foundation conducted its 'Dushtha Sahayata Prokolpo' (Poor Assistance Project) at Ukilpara, Arapur, Jhenaidah — a structured relief initiative providing direct financial grants and food packages to economically vulnerable families in the area. Dr. ASM Tanjilur Rahman supported and participated in the programme as part of his ongoing commitment to community welfare beyond the clinical setting.\n\nThe project targeted households identified through local Union Parishad records and community referrals as being in acute financial hardship — including day labourers, widows, persons with disabilities, and families affected by illness. Each beneficiary received a food package containing rice, lentils, cooking oil, and other essentials, alongside a financial contribution intended to address immediate livelihood needs.\n\nThe distribution was conducted in an organised and transparent manner, with volunteers managing queues and Foundation members overseeing the hand-to-hand allocation to prevent duplication. Dr. Rahman addressed the gathering briefly, emphasising that access to nutrition and financial stability are inseparable from health — and that preventable illness often stems from poverty and poor diet. The Foundation has committed to making this project a recurring quarterly initiative, with plans to expand coverage to neighbouring upazilas by the end of 2024.",
  },
  
];

export const researchData = [
  {
    id: 1,
    type: "Original Research",
    typeColor: "#93C5FD",
    title: "Desarda Versus Lichtenstein Repair for Primary Inguinal Hernia in Men: Results of A Randomized Control Trial",
    journal: "Faridpur Medical College Journal",
    year: "2019",
    vol: "Vol. 14, No. 1",
    doi: "—",
    url: "https://www.researchgate.net/publication/340214888_Desarda_Versus_Lichtenstein_Repair_for_Primary_Inguinal_Hernia_in_Men_Results_of_A_Randomized_Control_Trial",
    abstract: "A randomized controlled trial of 160 male patients comparing Desarda (non-mesh) versus Lichtenstein (mesh) repair for primary inguinal hernia. Operative time, immediate postoperative pain, cost, and foreign body sensation all favoured the Desarda arm. No recurrence was recorded in either group at two-year follow-up.",
    highlight: "Published",
  },
  {
    id: 2,
    type: "Review Article",
    typeColor: "#FCA5A5",
    title: "Update on Management of Non-Palpable Breast Lesion",
    journal: "Faridpur Medical College Journal",
    year: "2020",
    vol: "Vol. 15",
    doi: "—",
    url: "https://www.researchgate.net/publication/342936584_Update_on_Management_of_Non-Palpable_Breast_Lesion",
    abstract: "A systematic review of localisation techniques for non-palpable breast lesions applicable in a Bangladeshi context. Covers wire-guided localisation, radioguided occult lesion localisation (ROLL), and intraoperative ultrasound, arguing for expanded breast-conserving surgery through improved pre-operative detection.",
    highlight: "Published",
  },
  {
    id: 3,
    type: "Review Article",
    typeColor: "#6EE7B7",
    title: "Laser in Proctology: A New Hope in Treating the Distressing Anal Diseases",
    journal: "Faridpur Medical College Journal",
    year: "2019",
    vol: "Vol. 14, No. 2",
    doi: "—",
    url: "https://www.researchgate.net/publication/342936747_Laser_in_Proctology_A_New_Hope_in_Treating_the_Distressing_Anal_Diseases",
    abstract: "A clinical review advocating the adoption of laser-based proctological procedures — including laser haemorrhoidoplasty, laser fistulotomy, and laser treatment of anal fissure and pilonidal sinus — as minimally invasive alternatives to conventional surgery, with particular reference to feasibility in the Bangladeshi healthcare setting.",
    highlight: "Published",
  },
  {
    id: 4,
    type: "Case Report",
    typeColor: "#C9A96E",
    title: "Management of Inferior Vena Cava Injury in a Non-Specialised Tertiary Hospital: A Case Report",
    journal: "Faridpur Medical College Journal",
    year: "2014",
    vol: "Vol. 9, No. 1",
    doi: "—",
    url: "https://www.researchgate.net/publication/282468760_Management_of_inferior_vena_cava_injury_in_a_non_specialized_tertiary_hospital-a_case_report",
    abstract: "Report of a patient with infrarenal inferior vena cava injury managed by patch cavaplasty using a great saphenous vein graft at a non-specialised tertiary centre. The case demonstrates that complex vascular repair is feasible without a dedicated vascular surgical team, and highlights the operative steps and post-operative course.",
    highlight: "Published",
  },
  {
    id: 5,
    type: "Original Research",
    typeColor: "#A78BFA",
    title: "Efficacy and Long-term Outcome of Laser Hemorrhoidoplasty (LHP) for Symptomatic Grade II to IV Hemorrhoids",
    journal: "Faridpur Medical College Journal / ResearchGate",
    year: "2025",
    vol: "Full-text available",
    doi: "—",
    url: "https://www.researchgate.net/publication/390863699_Efficacy_and_Long-term_Outcome_of_Laser_hemorrhoidoplasty_LHP_for_Symptomatic_Grade_II_to_IV_Hemorrhoids",
    abstract: "A retrospective study of patients who underwent LHP using a 1470 nm diode laser (LASOTRONIX) for Grade II–IV haemorrhoids, with follow-up at 6 months, 1 year, and 2 years. LHP showed low complication rates and rapid return to daily activity, with recurrence rates significantly higher in Grade IV disease (50%) compared to Grade II–III (17.6%).",
    highlight: "Published",
  },
];
