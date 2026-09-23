import { Profile } from '@/types/portfolio';

export const profileData: Profile = {
  fullName: "Raj Kumar Hamal",
  displayName: "Raj Hamal",
  title: "Data & AI Analyst | MSc Applied Artificial Intelligence",
  tagline: "Bridging high-stakes operations and data science to turn complex datasets into clear, actionable business intelligence.",
  domain: "rajhamal.com.np",
  location: "Bradford, West Yorkshire, UK",
  email: "hello.rajhamal@gmail.com",
  phone: "+44 7344844303",
  linkedinUrl: "https://linkedin.com/in/rajhamal",
  githubUrl: "https://github.com/rajhamal",
  currentEducation: "MSc Applied Artificial Intelligence & Data Analytics, University of Bradford",
  bio: "Postgraduate Data Analytics student at the University of Bradford. Blending 3+ years of high-altitude logistics & financial tracking experience in Nepal with modern data science tooling—including SQL, Tableau, Python, R, and Machine Learning—to drive business optimization.",
  narrative: {
    origin: "Early operational experience in tourism and logistics developed a practical, ground-level understanding of customers, suppliers, team coordination, changing conditions, and real-world constraints.",
    transition: "Digital marketing and performance-focused initiatives introduced structured performance measurement, customer behavior analysis, tracking, experimentation, and data-driven business decisions.",
    vision: "Expanding technical depth across Data Analytics, Business Intelligence, and Applied AI—combining real-world business understanding with technical analysis to drive practical outcomes."
  },
  narrativeStages: [
    {
      step: "01",
      title: "Understanding real-world problems",
      subtitle: "Operations & Ground-Level Execution",
      summary: "Tourism, customers, suppliers, teams and operations.",
      highlights: [
        "Tourism operations & client management",
        "Supplier & logistics coordination",
        "Team leadership under live constraints"
      ],
      focusPills: ["Tourism Operations", "Suppliers", "Logistics", "Teams"]
    },
    {
      step: "02",
      title: "Learning to work with data",
      subtitle: "Performance Marketing & Customer Insights",
      summary: "Performance marketing, measurement, experimentation and understanding customer behaviour.",
      highlights: [
        "Performance marketing & campaign tracking",
        "Conversion & metric measurement",
        "Experimentation & customer behavior data"
      ],
      focusPills: ["Performance Marketing", "Measurement", "Experimentation", "Customer Behavior"]
    },
    {
      step: "03",
      title: "Moving toward analytics & AI",
      subtitle: "Analytics, BI & Practical AI",
      summary: "Data analytics, business intelligence and practical AI applied to real business problems.",
      highlights: [
        "SQL, Python, R & BI Dashboards",
        "Data Analytics & Decision Support",
        "Practical AI applied to business workflows"
      ],
      focusPills: ["Data Analytics", "Business Intelligence", "Applied AI", "Business Problems"]
    }
  ],
  metrics: [
    {
      label: "Operations & Analytics",
      value: "3+ Years",
      description: "Hands-on experience in operations, client billing, and spreadsheet analytics."
    },
    {
      label: "Expeditions Managed",
      value: "40+",
      description: "Multi-day international expeditions with full logistics & budget oversight."
    },
    {
      label: "Retail Records Analyzed",
      value: "10,000+",
      description: "Superstore transactional dataset cleaned and modeled for profit margins."
    },
    {
      label: "High-Altitude Summits",
      value: "2x 6,476m",
      description: "Summiteer of Mera Peak, demonstrating high-pressure decision making."
    }
  ]
};
