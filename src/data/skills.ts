import { SkillCategory } from '@/types/portfolio';

export const skillsData: SkillCategory[] = [
  {
    categoryName: "Data & Analytics Methodology",
    description: "Core analytical skills honed through professional experience and Google Data Analytics training.",
    skills: [
      { name: "Data Cleaning & Preparation", level: "Proficient", context: "Cleaning messy datasets, handling null values, and standardizing schemas in SQL & Excel." },
      { name: "Exploratory Data Analysis (EDA)", level: "Proficient", context: "Identifying distributions, anomalies, correlations, and business patterns." },
      { name: "Trend Analysis & Forecasting", level: "Proficient", context: "Historical time-series analysis for tourism recovery and sales seasonality." },
      { name: "KPI & Performance Reporting", level: "Proficient", context: "Designing metric dashboards for profit margins, conversion rates, and booking pipelines." },
      { name: "Business Problem Translation", level: "Proficient", context: "Formulating business questions and framing quantitative analytical workflows." }
    ]
  },
  {
    categoryName: "SQL & Technical Languages",
    description: "Database querying, data manipulation, and programming languages.",
    skills: [
      { name: "SQL", level: "Proficient", context: "Multi-table JOINs, GROUP BY aggregations, window functions, and filtering in BigQuery & relational DBs." },
      { name: "R", level: "Foundational", context: "RStudio data manipulation with tidyverse and basic ggplot2 visualization." },
      { name: "Python", level: "Developing", context: "Data science libraries (pandas, numpy) through MSc Applied AI coursework." }
    ]
  },
  {
    categoryName: "Visualization & Analytics Tools",
    description: "Industry-standard business intelligence tools, spreadsheets, and reporting platforms.",
    skills: [
      { name: "Power BI", level: "Proficient", context: "DataCamp certified in Power BI report design, custom visual formatting, and interactive dashboard creation." },
      { name: "Tableau & Tableau Public", level: "Proficient", context: "Building interactive dashboards, calculated fields, parameters, and dual-axis charts." },
      { name: "Google Sheets & Excel", level: "Proficient", context: "VLOOKUP/XLOOKUP, Pivot Tables, conditional formatting, and operational pipeline trackers." },
      { name: "Google Data Studio / Looker Studio", level: "Proficient", context: "Web metrics dashboards and interactive client performance summaries." },
      { name: "Google Analytics", level: "Proficient", context: "Tracking web traffic, user behaviour, and campaign performance." },
      { name: "Google BigQuery", level: "Proficient", context: "Cloud data warehouse querying for large-scale transaction and device datasets." }
    ]
  },
  {
    categoryName: "Developing AI & Data Science Capability",
    description: "Active postgraduate studies at the University of Bradford.",
    skills: [
      { name: "Machine Learning Fundamentals", level: "Developing", context: "Supervised and unsupervised learning models for classification and regression." },
      { name: "Applied Artificial Intelligence", level: "Developing", context: "Integrating AI techniques into business automation and analytical pipelines." },
      { name: "Process Automation", level: "Developing", context: "Automating repetitive data aggregation and reporting workflows." }
    ]
  },
  {
    categoryName: "Operational & Transferable Skills",
    description: "Proven leadership, logistics, and consulting capabilities from 3+ years in tourism operations.",
    skills: [
      { name: "Structured Problem Solving", level: "Proficient", context: "Deconstructing complex operational challenges into actionable analytical steps." },
      { name: "Stakeholder Communication", level: "Proficient", context: "Translating technical data findings into clear B2B executive reports." },
      { name: "Cross-Functional Leadership", level: "Proficient", context: "Leading teams of 10+ and managing international client expectations under pressure." },
      { name: "Budget & Cost Control", level: "Proficient", context: "Managing logistics budgets, vendor invoices, and financial reconciliations." }
    ]
  }
];
