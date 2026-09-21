import { ProjectItem } from '@/types/portfolio';

export const projectsData: ProjectItem[] = [
  {
    id: "nepal-tourism-analysis",
    slug: "nepal-tourism-industry-analysis",
    title: "Nepal Tourism Industry Analysis",
    subtitle: "10x Historical Growth, COVID-19 Impact & Recovery Analysis (1964–2023)",
    category: "Tourism Analytics",
    status: "Completed",
    featured: true,
    priority: 1,
    date: "Apr 2026",
    shortDescription: "End-to-end business analytics project analyzing Nepal's international tourist arrivals, revenue patterns, and post-pandemic recovery using official government statistics.",
    tools: ["Google Sheets", "Tableau Public", "Google Docs", "Data Modeling"],
    githubUrl: "https://github.com/rajhamal/nepal-tourism-analysis",
    tableauUrl: "https://public.tableau.com/app/profile/raj.hamal/viz/NepalTourismAnalysis/NepalTourismPerformanceDashboard19902023",
    caseStudy: {
      problemStatement: "Nepal's economy relies heavily on international tourism. Following the devastating 80.7% arrival crash during COVID-19 in 2020, industry stakeholders required evidence-based insights on historic growth drivers, source market volatility, and strategic recovery priorities.",
      datasetDescription: "Official Nepal Tourism Statistics dataset (1964–2023) published by the Ministry of Culture, Tourism & Civil Aviation (MoCTCA), encompassing annual arrival counts, entry modes (air vs land), nationality demographics, average length of stay, and foreign exchange earnings.",
      dataPreparation: [
        "Extracted raw tables from Ministry PDF reports and compiled a structured 60-year historical dataset.",
        "Standardized country and regional names across changing geopolitical definitions.",
        "Engineered calculated fields in Google Sheets for Year-over-Year (YoY) Growth %, Compound Annual Growth Rate (CAGR), Revenue per Tourist, and Air-to-Land Transportation Ratios.",
        "Handled missing values and audited outlier years (e.g., 2015 earthquake, 2020 pandemic)."
      ],
      methodology: [
        "Time-series trend analysis spanning 1964–2023 to evaluate long-term macro growth trajectories.",
        "Comparative cohort analysis focusing on 1990–2023 in Tableau to track structural shifts in source markets (India, China, Western Europe, North America).",
        "Economic yield evaluation comparing gross arrival volume against per-tourist expenditure and average stay duration."
      ],
      analysisHighlights: [
        "10x Macro Expansion: Tourist arrivals expanded from 93,000 (1975) to a peak of 1.197 million in 2019.",
        "Unprecedented Pandemic Crash: 2020 experienced an 80.7% collapse in international arrivals—the single worst disruption in recorded Nepalese tourism history.",
        "High-Volume vs High-Yield Disparity: India remains the largest volume source market, while European and North American travelers demonstrate significantly higher average lengths of stay (>13 days)."
      ],
      keyFindings: [
        "Air travel dominance: Over 85% of non-Indian arrivals enter via Tribhuvan International Airport, highlighting infrastructure sensitivity.",
        "Post-pandemic recovery trajectory: 2023 data demonstrates a strong 80%+ rebound toward 2019 pre-pandemic baselines.",
        "Seasonality bottleneck: Peak arrival volume is heavily concentrated in autumn (Oct-Nov) and spring (Mar-Apr), creating severe off-season capacity underutilization."
      ],
      businessRecommendations: [
        "Diversify market targeting: Expand marketing initiatives in emerging regional markets (Southeast Asia) to mitigate reliance on traditional seasonal windows.",
        "Promote high-yield ecotourism: Shift focus from raw arrival numbers to per-tourist spend by incentivizing longer stay itineraries in rural community homestays.",
        "Digital tracking integration: Implement real-time visitor sentiment and booking pipeline tracking to optimize air capacity allocation."
      ],
      toolsUsed: ["Google Sheets", "Tableau Public", "Google Docs"],
      tableauEmbedUrl: "https://public.tableau.com/views/NepalTourismAnalysis/NepalTourismPerformanceDashboard19902023?:embed=y&:showVizHome=n",
      tableauPublicUrl: "https://public.tableau.com/app/profile/raj.hamal/viz/NepalTourismAnalysis/NepalTourismPerformanceDashboard19902023",
      githubRepoUrl: "https://github.com/rajhamal/nepal-tourism-analysis"
    }
  },
  {
    id: "ecotourism-market-analysis-2025",
    slug: "ecotourism-market-analysis-2025",
    title: "Ecotourism Market Analysis 2025",
    subtitle: "Deciphering the 51-Point Intention-Action Gap in the $286B Sustainable Travel Market",
    category: "Market Analysis",
    status: "Completed",
    featured: true,
    priority: 2,
    date: "May 2026",
    shortDescription: "Business analysis case study investigating why 84% of travelers express demand for sustainable travel but only 33% book it, identifying trust barriers and pricing myths.",
    tools: ["Tableau Public", "Google Sheets", "Google Slides", "PDF Case Study"],
    githubUrl: "https://github.com/rajhamal/ecotourism-market-analysis-2025",
    tableauUrl: "https://public.tableau.com/app/profile/raj.hamal/viz/EcotourismMarketGrowthTravelerBehaviour2025/EcotourismMarketAnalysisGreenPathConsultancy2025",
    caseStudy: {
      problemStatement: "The global ecotourism market is valued at $286.2 billion (2024) and projected to grow at 15.5% CAGR to $1.125 trillion by 2034. However, while 84% of global travelers surveyed state a desire for sustainable travel options, only 33% actually complete sustainable bookings—representing a massive 51-percentage-point Intention-Action Gap and ~$145 billion in unrealized annual market revenue.",
      datasetDescription: "Synthesized multi-source market intelligence dataset incorporating verified 2024–2025 industry reports from Booking.com Sustainable Travel Reports, SkyQuestt, Fortune Business Insights, and Precedence Research.",
      dataPreparation: [
        "Aggregated quantitative survey data across 30,000+ international respondents across 30 countries.",
        "Calculated the 51-point Intention-Action Gap metric and estimated unrealized revenue opportunity pools.",
        "Normalized pricing data comparing 5,000 certified sustainable accommodations against conventional hotel benchmarks across major European and Asian destinations.",
        "Structured segment breakdown data by demographic cohorts (Gen Z, Millennials, Gen X, Boomers)."
      ],
      methodology: [
        "Market Sizing & CAGR Projections: Compound growth modeling for 2024–2034 market expansion.",
        "Barrier Friction Analysis: Categorized booking drop-off drivers into Trust Failure, Accessibility Barriers, and Price Perception.",
        "Price Parity Benchmark: Statistical comparison of daily rate distributions between certified sustainable accommodations and standard hotels."
      ],
      analysisHighlights: [
        "The Price Myth Shattered: Certified sustainable accommodations are actually 39% CHEAPER on average than conventional luxury options, disproving the consumer perception that eco-travel is inherently cost-prohibitive.",
        "Demographic Driver: Millennials hold a 49% market share of active eco-conscious travel bookings, followed by Gen Z (28%).",
        "Trust Crisis: 47% of travelers cite lack of transparent eco-certification standards as the primary barrier preventing them from choosing green stays."
      ],
      keyFindings: [
        "51-point Intention-Action Gap: 84% intention vs 33% actual conversion rate.",
        "Asia-Pacific leads growth: APAC region exhibits the fastest market CAGR (>17%) driven by eco-lodge expansions in SEA.",
        "Certification confusion: Over 100 competing green badges create consumer fatigue rather than trust."
      ],
      businessRecommendations: [
        "Unified Trust Badges: Travel platforms must audit and surface verified third-party eco-certifications directly in checkout flows.",
        "Debunk Price Myths: Marketing campaigns should highlight price parity and budget-friendly sustainable stays.",
        "Millennial-Focused Packaging: Curate carbon-neutral adventure packages tailored for Millennial & Gen Z preferences."
      ],
      toolsUsed: ["Tableau Public", "Google Sheets", "Google Slides"],
      tableauEmbedUrl: "https://public.tableau.com/views/EcotourismMarketGrowthTravelerBehaviour2025/EcotourismMarketAnalysisGreenPathConsultancy2025?:embed=y&:showVizHome=n",
      tableauPublicUrl: "https://public.tableau.com/app/profile/raj.hamal/viz/EcotourismMarketGrowthTravelerBehaviour2025/EcotourismMarketAnalysisGreenPathConsultancy2025",
      githubRepoUrl: "https://github.com/rajhamal/ecotourism-market-analysis-2025"
    }
  },
  {
    id: "sales-performance-dashboard",
    slug: "sales-performance-dashboard",
    title: "Sales Performance Dashboard – Superstore",
    subtitle: "Profit Margin & Regional Retail Analysis Across 10,000 Transactions (2014–2017)",
    category: "Business Intelligence",
    status: "Completed",
    featured: true,
    priority: 3,
    date: "Apr 2026",
    shortDescription: "Exploratory analysis of 4 years of retail transaction data from the US Superstore dataset to pinpoint underperforming product categories and geographic profitability drivers.",
    tools: ["Google Sheets", "Tableau Public", "Feature Engineering"],
    githubUrl: "https://github.com/rajhamal/sales-performance-dashboard",
    tableauUrl: "https://public.tableau.com/app/profile/raj.hamal/viz/SalesPerformanceDashboard-Superstore_17766617053800/SalesPerformanceDashboard",
    caseStudy: {
      problemStatement: "A US retail chain generated high top-line revenue growth across four geographic regions but experienced unexplained margin erosion in specific product categories. The leadership team needed an interactive executive dashboard to identify where revenue was unprofitable and evaluate discounting impact.",
      datasetDescription: "Kaggle Superstore Sales Dataset comprising approximately 9,994 transactional order records spanning 4 calendar years (2014–2017) across 3 product categories (Furniture, Office Supplies, Technology) and 17 sub-categories.",
      dataPreparation: [
        "Ingested 9,994 transaction rows into Google Sheets for data cleaning and schema validation.",
        "Handled missing shipping values and converted raw date strings to standardized ISO Date formats.",
        "Engineered calculated fields: Profit Margin % = (Profit / Sales) * 100, Order Processing Lead Time = Ship Date - Order Date.",
        "Created year-over-year and month-over-month aggregation flags for time-series evaluation."
      ],
      methodology: [
        "Category & Sub-Category Profitability Matrix: Evaluated sales volume vs net profit margin percentage.",
        "Geographic Heatmap Analysis: Mapped revenue and margin distribution across US States and Regions (East, West, Central, South).",
        "Discount Elasticity Inspection: Analyzed how aggressive promotional discounts (>20%) affected gross margins in Furniture sub-categories."
      ],
      analysisHighlights: [
        "Top-Line vs Bottom-Line Divergence: Technology generated the highest total profit margin (~17.4%), while Furniture suffered from severe margin compression (~2.4%).",
        "Sub-Category Loss Leader: Tables and Bookcases consistently operated at a net loss due to excessive discounting (>30%) and high shipping costs.",
        "Regional Disparity: The Central region recorded the lowest net profit margin despite generating comparable sales volume to the South."
      ],
      keyFindings: [
        "Furniture discounting trap: Discounts over 20% on Furniture items consistently yielded negative profit margins.",
        "Office Supplies stability: Office Supplies generated steady cash flow with over 60% of total order transactions.",
        "Seasonal peak: Q4 (Nov-Dec) accounts for over 32% of annual sales revenue due to holiday retail demand."
      ],
      businessRecommendations: [
        "Cap promotional discounts: Restrict maximum allowable discounts on Furniture sub-categories (Tables & Bookcases) to 15%.",
        "Re-negotiate Central shipping rates: Audit logistics suppliers in Central region to eliminate freight cost overruns.",
        "Cross-sell Technology accessories: Bundle high-margin Technology items with high-volume Office Supplies."
      ],
      toolsUsed: ["Google Sheets", "Tableau Public"],
      tableauEmbedUrl: "https://public.tableau.com/views/SalesPerformanceDashboard-Superstore_17766617053800/SalesPerformanceDashboard?:embed=y&:showVizHome=n",
      tableauPublicUrl: "https://public.tableau.com/app/profile/raj.hamal/viz/SalesPerformanceDashboard-Superstore_17766617053800/SalesPerformanceDashboard",
      githubRepoUrl: "https://github.com/rajhamal/sales-performance-dashboard"
    }
  },
  {
    id: "bellabeat-case-study",
    slug: "bellabeat-case-study",
    title: "Bellabeat Smart Device Usage Analysis",
    subtitle: "Google Data Analytics Capstone – Smart Device Health Data Exploration (In Progress)",
    category: "Applied AI / Capstone",
    status: "In Progress",
    featured: false,
    priority: 4,
    date: "2026",
    shortDescription: "Google Data Analytics capstone project analyzing public Fitbit smart device health and activity usage data in BigQuery to recommend growth strategies for Bellabeat wellness products.",
    tools: ["Google BigQuery", "SQL", "Fitbit Dataset", "R Exploration"],
    githubUrl: "https://github.com/rajhamal/bellabeat-case-study",
    caseStudy: {
      problemStatement: "Bellabeat, a high-tech manufacturer of health-focused smart products for women, wants to analyze smart device usage data to uncover how consumers use non-Bellabeat smart devices (Fitbit). Findings will guide executive marketing strategy for the Bellabeat Leaf wellness tracker.",
      datasetDescription: "Fitbit Fitness Tracker Data (Public Domain via Kaggle/Mobius), containing personal fitness tracker responses from 33 eligible Fitbit users including minute-level activity, heart rate, and sleep monitoring data.",
      dataPreparation: [
        "Loaded raw Fitbit CSV datasets (dailyActivity, sleepDay, weightLog) into Google BigQuery environment.",
        "Queried schema definitions and checked for duplicate user ID entries across 33 distinct participants.",
        "Standardized date timestamps into YYYY-MM-DD formats using SQL CAST functions.",
        "Calculated daily active time categories: VeryActiveMinutes, FairlyActiveMinutes, LightlyActiveMinutes, and SedentaryMinutes."
      ],
      methodology: [
        "BigQuery SQL Aggregations: Grouped daily step counts, calorie burn, and sleep duration per user.",
        "Activity Segmentation: Classified users into activity tiers (Sedentary < 5k steps, Low < 7.5k, Somewhat Active < 10k, Active > 10k).",
        "Correlation Analysis: Evaluated relationship between daily active steps and sleep quality indicators."
      ],
      analysisHighlights: [
        "Sedentary Dominance: Participants spent an average of 991 minutes (~16.5 hours) per day in sedentary state.",
        "Step Count Clustering: Average daily step count was ~7,637 steps, slightly below the recommended 10,000-step daily target.",
        "Sleep & Activity Link: Initial SQL queries indicate a positive correlation between active afternoon movement and sleep efficiency score."
      ],
      keyFindings: [
        "In-Progress Exploration: Ongoing BigQuery analysis focused on hourly activity spikes during 5 PM – 7 PM commute windows.",
        "User Engagement Drop-off: Tracking compliance decreases significantly after 20 consecutive days of logging."
      ],
      businessRecommendations: [
        "Smart Notification Triggers: Send gentle sedentary alerts on the Bellabeat app during mid-afternoon idle hours.",
        "Gamified Habit Loops: Introduce weekly streak rewards to maintain user logging compliance past the 20-day drop-off threshold."
      ],
      toolsUsed: ["Google BigQuery", "SQL", "R Studio"],
      githubRepoUrl: "https://github.com/rajhamal/bellabeat-case-study"
    }
  }
];
