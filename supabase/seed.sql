-- ============================================================================
-- SEED DATA SCRIPT FOR RAJ HAMAL PROFESSIONAL PORTFOLIO
-- ============================================================================

-- 1. SEED SITE SETTINGS
INSERT INTO public.site_settings (
    id, full_name, display_name, professional_title, tagline, short_bio, domain, location, email, phone, linkedin_url, github_url
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Raj Kumar Hamal',
    'Raj Hamal',
    'Data Analyst | Applied AI & Data Analytics',
    'Turning data into insights, dashboards, and better business decisions.',
    'Postgraduate Data Analytics student at the University of Bradford. Blending 3+ years of high-altitude logistics & financial tracking experience in Nepal with modern data science tooling—including SQL, Tableau, Python, R, and Machine Learning—to drive business optimization.',
    'rajhamal.com.np',
    'Bradford, West Yorkshire, UK',
    'hello.rajhamal@gmail.com',
    '+44 7344844303',
    'https://linkedin.com/in/rajhamal',
    'https://github.com/rajhamal'
) ON CONFLICT (id) DO NOTHING;

-- 2. SEED PROJECTS
INSERT INTO public.projects (
    slug, title, subtitle, category, status, featured, priority, date, short_description, tools, github_url, tableau_url, tableau_embed_url, tableau_public_url, problem_statement, dataset_description, data_preparation, methodology, analysis_highlights, key_findings, business_recommendations, tools_used, sort_order
) VALUES 
(
    'nepal-tourism-industry-analysis',
    'Nepal Tourism Industry Analysis',
    '10x Historical Growth, COVID-19 Impact & Recovery Analysis (1964–2023)',
    'Tourism Analytics',
    'Completed',
    true,
    1,
    'Apr 2026',
    'End-to-end business analytics project analyzing Nepal''s international tourist arrivals, revenue patterns, and post-pandemic recovery using official government statistics.',
    ARRAY['Google Sheets', 'Tableau Public', 'Google Docs', 'Data Modeling'],
    'https://github.com/rajhamal/nepal-tourism-analysis',
    'https://public.tableau.com/app/profile/raj.hamal/viz/NepalTourismAnalysis/NepalTourismPerformanceDashboard19902023',
    'https://public.tableau.com/views/NepalTourismAnalysis/NepalTourismPerformanceDashboard19902023?:embed=y&:showVizHome=n',
    'https://public.tableau.com/app/profile/raj.hamal/viz/NepalTourismAnalysis/NepalTourismPerformanceDashboard19902023',
    'Nepal''s economy relies heavily on international tourism. Following the devastating 80.7% arrival crash during COVID-19 in 2020, industry stakeholders required evidence-based insights on historic growth drivers, source market volatility, and strategic recovery priorities.',
    'Official Nepal Tourism Statistics dataset (1964–2023) published by the Ministry of Culture, Tourism & Civil Aviation (MoCTCA), encompassing annual arrival counts, entry modes (air vs land), nationality demographics, average length of stay, and foreign exchange earnings.',
    ARRAY['Extracted raw tables from Ministry PDF reports and compiled a structured 60-year historical dataset.', 'Standardized country and regional names across changing geopolitical definitions.', 'Engineered calculated fields in Google Sheets for YoY Growth %, CAGR, Revenue per Tourist, and Air-to-Land Ratios.', 'Audited outlier years (2015 earthquake, 2020 pandemic).'],
    ARRAY['Time-series trend analysis spanning 1964–2023 to evaluate long-term macro growth trajectories.', 'Comparative cohort analysis focusing on 1990–2023 in Tableau to track structural shifts in source markets.', 'Economic yield evaluation comparing gross arrival volume against per-tourist expenditure.'],
    ARRAY['10x Macro Expansion: Tourist arrivals expanded from 93,000 (1975) to a peak of 1.197 million in 2019.', 'Unprecedented Pandemic Crash: 2020 experienced an 80.7% collapse in international arrivals.', 'High-Volume vs High-Yield Disparity: India remains the largest volume source market, while European travelers demonstrate higher stay duration.'],
    ARRAY['Air travel dominance: Over 85% of non-Indian arrivals enter via Tribhuvan International Airport.', 'Post-pandemic recovery trajectory: 2023 data demonstrates a strong 80%+ rebound toward 2019 pre-pandemic baselines.', 'Seasonality bottleneck: Peak arrival volume is heavily concentrated in autumn and spring.'],
    ARRAY['Diversify market targeting: Expand marketing initiatives in emerging regional markets (Southeast Asia).', 'Promote high-yield ecotourism: Shift focus from raw arrival numbers to per-tourist spend.', 'Digital tracking integration: Implement real-time visitor sentiment and booking pipeline tracking.'],
    ARRAY['Google Sheets', 'Tableau Public', 'Google Docs'],
    1
),
(
    'ecotourism-market-analysis-2025',
    'Ecotourism Market Analysis 2025',
    'Deciphering the 51-Point Intention-Action Gap in the $286B Sustainable Travel Market',
    'Market Analysis',
    'Completed',
    true,
    2,
    'May 2026',
    'Business analysis case study investigating why 84% of travelers express demand for sustainable travel but only 33% book it, identifying trust barriers and pricing myths.',
    ARRAY['Tableau Public', 'Google Sheets', 'Google Slides', 'PDF Case Study'],
    'https://github.com/rajhamal/ecotourism-market-analysis-2025',
    'https://public.tableau.com/app/profile/raj.hamal/viz/EcotourismMarketGrowthTravelerBehaviour2025/EcotourismMarketAnalysisGreenPathConsultancy2025',
    'https://public.tableau.com/views/EcotourismMarketGrowthTravelerBehaviour2025/EcotourismMarketAnalysisGreenPathConsultancy2025?:embed=y&:showVizHome=n',
    'https://public.tableau.com/app/profile/raj.hamal/viz/EcotourismMarketGrowthTravelerBehaviour2025/EcotourismMarketAnalysisGreenPathConsultancy2025',
    'The global ecotourism market is valued at $286.2 billion (2024) and projected to grow at 15.5% CAGR to $1.125 trillion by 2034. However, while 84% of global travelers surveyed state a desire for sustainable travel options, only 33% actually complete sustainable bookings.',
    'Synthesized multi-source market intelligence dataset incorporating verified 2024–2025 industry reports from Booking.com Sustainable Travel Reports, SkyQuestt, Fortune Business Insights, and Precedence Research.',
    ARRAY['Aggregated quantitative survey data across 30,000+ international respondents across 30 countries.', 'Calculated the 51-point Intention-Action Gap metric.', 'Normalized pricing data comparing 5,000 certified sustainable accommodations against conventional benchmarks.'],
    ARRAY['Market Sizing & CAGR Projections for 2024–2034.', 'Barrier Friction Analysis: Categorized booking drop-off drivers.', 'Price Parity Benchmark: Statistical comparison of daily rate distributions.'],
    ARRAY['The Price Myth Shattered: Certified sustainable accommodations are actually 39% CHEAPER on average than conventional luxury options.', 'Demographic Driver: Millennials hold a 49% market share of active eco-conscious travel bookings.', 'Trust Crisis: 47% of travelers cite lack of transparent eco-certification standards as the primary barrier.'],
    ARRAY['51-point Intention-Action Gap: 84% intention vs 33% actual conversion rate.', 'Asia-Pacific leads growth: APAC region exhibits the fastest market CAGR (>17%).', 'Certification confusion: Over 100 competing green badges create consumer fatigue.'],
    ARRAY['Unified Trust Badges: Travel platforms must audit and surface verified third-party eco-certifications directly in checkout flows.', 'Debunk Price Myths: Marketing campaigns should highlight price parity.', 'Millennial-Focused Packaging: Curate carbon-neutral adventure packages.'],
    ARRAY['Tableau Public', 'Google Sheets', 'Google Slides'],
    2
),
(
    'sales-performance-dashboard',
    'Sales Performance Dashboard – Superstore',
    'Profit Margin & Regional Retail Analysis Across 10,000 Transactions (2014–2017)',
    'Business Intelligence',
    'Completed',
    true,
    3,
    'Apr 2026',
    'Exploratory analysis of 4 years of retail transaction data from the US Superstore dataset to pinpoint underperforming product categories and geographic profitability drivers.',
    ARRAY['Google Sheets', 'Tableau Public', 'Feature Engineering'],
    'https://github.com/rajhamal/sales-performance-dashboard',
    'https://public.tableau.com/app/profile/raj.hamal/viz/SalesPerformanceDashboard-Superstore_17766617053800/SalesPerformanceDashboard',
    'https://public.tableau.com/views/SalesPerformanceDashboard-Superstore_17766617053800/SalesPerformanceDashboard?:embed=y&:showVizHome=n',
    'https://public.tableau.com/app/profile/raj.hamal/viz/SalesPerformanceDashboard-Superstore_17766617053800/SalesPerformanceDashboard',
    'A US retail chain generated high top-line revenue growth across four geographic regions but experienced unexplained margin erosion in specific product categories. The leadership team needed an interactive executive dashboard.',
    'Kaggle Superstore Sales Dataset comprising approximately 9,994 transactional order records spanning 4 calendar years (2014–2017) across 3 product categories and 17 sub-categories.',
    ARRAY['Ingested 9,994 transaction rows into Google Sheets for data cleaning.', 'Engineered calculated fields: Profit Margin % = (Profit / Sales) * 100.', 'Created year-over-year and month-over-month aggregation flags.'],
    ARRAY['Category & Sub-Category Profitability Matrix: Evaluated sales volume vs net profit margin %.', 'Geographic Heatmap Analysis across US States and Regions.', 'Discount Elasticity Inspection: Analyzed promotional discount impacts.'],
    ARRAY['Top-Line vs Bottom-Line Divergence: Technology generated the highest profit margin (~17.4%), while Furniture suffered margin compression (~2.4%).', 'Sub-Category Loss Leader: Tables and Bookcases consistently operated at a net loss.', 'Regional Disparity: Central region recorded lowest net profit margin.'],
    ARRAY['Furniture discounting trap: Discounts over 20% on Furniture consistently yielded negative margins.', 'Office Supplies stability: Office Supplies generated steady cash flow (>60% transactions).', 'Seasonal peak: Q4 accounts for over 32% of annual revenue.'],
    ARRAY['Cap promotional discounts on Furniture to 15%.', 'Audit logistics suppliers in Central region to eliminate freight cost overruns.', 'Cross-sell high-margin Technology accessories.'],
    ARRAY['Google Sheets', 'Tableau Public'],
    3
),
(
    'bellabeat-case-study',
    'Bellabeat Smart Device Usage Analysis',
    'Google Data Analytics Capstone – Smart Device Health Data Exploration (In Progress)',
    'Applied AI / Capstone',
    'In Progress',
    false,
    4,
    '2026',
    'Google Data Analytics capstone project analyzing public Fitbit smart device health and activity usage data in BigQuery to recommend growth strategies for Bellabeat wellness products.',
    ARRAY['Google BigQuery', 'SQL', 'Fitbit Dataset', 'R Exploration'],
    'https://github.com/rajhamal/bellabeat-case-study',
    NULL,
    NULL,
    NULL,
    'Bellabeat wants to analyze smart device usage data to uncover how consumers use non-Bellabeat smart devices (Fitbit). Findings will guide executive marketing strategy for the Bellabeat Leaf wellness tracker.',
    'Fitbit Fitness Tracker Data (Public Domain via Kaggle), containing personal fitness tracker responses from 33 eligible Fitbit users including minute-level activity, heart rate, and sleep monitoring data.',
    ARRAY['Loaded raw Fitbit CSV datasets into Google BigQuery environment.', 'Queried schema definitions and checked for duplicate user ID entries.', 'Standardized date timestamps using SQL CAST functions.', 'Calculated daily active time categories.'],
    ARRAY['BigQuery SQL Aggregations: Grouped daily step counts, calorie burn, and sleep duration.', 'Activity Segmentation: Classified users into activity tiers.', 'Correlation Analysis: Evaluated relationship between active steps and sleep quality.'],
    ARRAY['Sedentary Dominance: Participants spent an average of 991 minutes per day in sedentary state.', 'Step Count Clustering: Average daily step count was ~7,637 steps.', 'Sleep & Activity Link: Positive correlation between active afternoon movement and sleep efficiency.'],
    ARRAY['In-Progress Exploration: Ongoing BigQuery analysis focused on hourly activity spikes during 5 PM – 7 PM windows.', 'User Engagement Drop-off: Tracking compliance decreases significantly after 20 consecutive days.'],
    ARRAY['Smart Notification Triggers: Send gentle sedentary alerts on the Bellabeat app during mid-afternoon hours.', 'Gamified Habit Loops: Introduce weekly streak rewards.'],
    ARRAY['Google BigQuery', 'SQL', 'R Studio'],
    4
) ON CONFLICT (slug) DO NOTHING;

-- 3. SEED EXPERIENCE
INSERT INTO public.experience (
    role, company, location, period, type, responsibilities, analytical_skills, operational_impact, sort_order, published
) VALUES 
(
    'Tour Manager / Senior Trekking Guide',
    'Apex Himalaya Treks',
    'Kathmandu, Nepal',
    'Apr 2022 – Dec 2025',
    'Full-Time Operations & Leadership',
    ARRAY[
        'Managed operational planning and end-to-end logistics for 40+ multi-day international expeditions, coordinating budgets, suppliers, staff, and client requirements.',
        'Built and maintained Google Sheets tracking dashboards for permit status, booking pipelines, and guide assignments.',
        'Compiled comprehensive post-trip analytical reports using client feedback, cost variance information, and incident logs.',
        'Reconciled invoices, supplier payments, and guest billing, systematically identifying financial discrepancies.',
        'Led multidisciplinary teams of 10+ staff members, managing workloads and service quality standards.'
    ],
    ARRAY['Google Sheets Dashboarding', 'Financial & Invoice Reconciliation', 'Cost & Variance Analysis', 'Logistics Optimization', 'Post-Trip Performance Reporting'],
    'Promoted to lead manager role, successfully overseeing 40+ high-altitude expeditions with zero critical safety breaches.',
    1,
    true
),
(
    'Operations & Marketing Intern',
    'Apex Himalaya Treks',
    'Kathmandu, Nepal',
    'Oct 2021 – Mar 2022',
    'Internship',
    ARRAY[
        'Maintained detailed client enquiry and booking records, supporting invoicing workflows and payment tracking.',
        'Assisted senior management with itinerary pricing and cost analysis to inform operational pricing decisions.',
        'Analysed social media campaign performance using engagement metrics to optimize marketing reach.',
        'Supported daily communication and coordination between clients, ground suppliers, and internal management teams.'
    ],
    ARRAY['Data Entry & Record Management', 'Social Media Metrics Analysis', 'Pricing & Cost Analysis', 'Process Standardization'],
    'Earned promotion to full-time Tour Manager within 6 months through rigorous tracking of client booking records.',
    2,
    true
),
(
    'Digital Marketing & Social Media Management',
    'Independent / Freelance',
    'Bradford / Remote',
    '2023 — Present',
    'Independent / Freelance',
    ARRAY[
        'Managed social media activities including content planning, publishing, audience engagement, and performance monitoring.',
        'Developed digital content and campaigns aligned with brand and business objectives.',
        'Monitored engagement, reach, audience behaviour, and campaign metrics using GA4, GTM, Looker Studio, and Microsoft Clarity.',
        'Used digital performance data to identify patterns, evaluate results, and provide practical recommendations.'
    ],
    ARRAY['Digital Marketing', 'Social Media Management', 'Content Strategy', 'Audience Analysis', 'Campaign Tracking', 'Performance Reporting', 'GA4', 'GTM', 'Looker Studio'],
    'Working independently in digital marketing introduced me to understanding audiences, communicating through digital channels, and using performance data.',
    3,
    true
) ON CONFLICT DO NOTHING;

-- 4. SEED EDUCATION
INSERT INTO public.education (
    degree, institution, field, location, period, status, description, highlights, sort_order, published
) VALUES 
(
    'MSc Applied Artificial Intelligence and Data Analytics',
    'University of Bradford',
    'Artificial Intelligence & Data Analytics',
    'Bradford, West Yorkshire, UK',
    'Sept 2026 – Present',
    'In Progress',
    'Postgraduate study covering artificial intelligence, machine learning algorithms, data analytics techniques, and their practical application to business decision-making.',
    ARRAY['Machine learning fundamentals and data mining methodologies', 'Statistical modeling and predictive analytics for business problems', 'Applied AI techniques, automation, and data visualization frameworks', 'Practical project implementations utilizing Python, SQL, and analytical tools'],
    1,
    true
),
(
    'Bachelor of Travel and Tourism Studies',
    'Kathmandu Academy of Travel and Tourism Hospitality',
    'Travel & Tourism Studies',
    'Kathmandu, Nepal',
    'Graduated 2023',
    'Completed',
    'Undergraduate degree providing foundational knowledge in business administration, tourism planning, economics, operational management, and customer relations.',
    ARRAY['Tourism industry economics, market demand analysis, and pricing strategies', 'Operational planning, resource allocation, and supplier contract management', 'Cross-cultural business communication and service quality management'],
    2,
    true
),
(
    'Higher Secondary Education – Science (Biology)',
    'V.S. Niketan Higher Secondary School',
    'Science (Biology)',
    'Kathmandu, Nepal',
    'Graduated 2018',
    'Completed',
    'Rigorous science curriculum focusing on analytical methodology, biological sciences, chemistry, physics, and mathematics.',
    ARRAY['Quantitative scientific methods, hypothesis testing, and laboratory data collection', 'Foundational mathematics, statistics, and scientific reasoning'],
    3,
    true
) ON CONFLICT DO NOTHING;

-- 5. SEED CERTIFICATIONS
INSERT INTO public.certifications (
    title, issuer, issue_date, credential_url, description, topics, sort_order, published
) VALUES 
(
    'Google Data Analytics Professional Certificate',
    'Google / Coursera',
    'Jan 2026',
    'https://www.coursera.org/account/accomplishments/professional-cert/certificate/E6W3Q3BUSRWS',
    'An intensive 8-course professional certificate covering the complete data analytics lifecycle: ask, prepare, process, analyze, share, and act.',
    ARRAY['Data cleaning and preparation using Excel and SQL', 'SQL querying and analysis of structured relational databases', 'Data visualization and dashboard creation using Tableau & Google Data Studio', 'Introductory R programming and statistical analysis in RStudio', 'Translating analytical findings into actionable business recommendations'],
    1,
    true
),
(
    'Intermediate SQL Statement of Accomplishment',
    'DataCamp',
    '2026',
    'https://www.datacamp.com/completed/statement-of-accomplishment/course/c655c4bd6d97584b915f9df2fd0eab91078b8230',
    'Hands-on certification validating proficiency in intermediate SQL queries, aggregate functions, grouping data, joins, and subqueries.',
    ARRAY['Filtering & aggregate functions (SUM, AVG, COUNT, HAVING)', 'Multi-table JOINs (INNER, LEFT, RIGHT, FULL OUTER)', 'Subqueries in WHERE, SELECT, and FROM clauses', 'DataCamp Statement of Accomplishment (3,950 XP)'],
    2,
    true
),
(
    'Data Visualization in Power BI Statement of Accomplishment',
    'DataCamp',
    '2026',
    'https://www.datacamp.com/completed/statement-of-accomplishment/course/4c4470973aba83bb09da60d7a99e0a6ba96d6f96',
    'Hands-on certification covering Power BI report design, interactive dashboard creation, custom visual formatting, and storytelling with data.',
    ARRAY['Building interactive Power BI reports & multi-page dashboards', 'Custom visual formatting, color palettes, and matrix cards', 'DAX measure integration and drill-through filtering', 'DataCamp Statement of Accomplishment'],
    3,
    true
),
(
    'Google Digital Marketing & E-commerce Professional Certificate',
    'Google / Coursera',
    '2025',
    'https://coursera.org',
    'Comprehensive training in online marketing strategy, customer acquisition channels, e-commerce store optimization, and conversion analytics.',
    ARRAY['E-commerce analytics and funnel performance tracking', 'Search Engine Optimization (SEO) and paid acquisition analysis', 'Customer journey mapping and conversion rate optimization'],
    4,
    true
),
(
    'Google Analytics Certification',
    'Google',
    '2025',
    'https://skillshop.exceedlms.com',
    'Official certification validating expertise in configuring Google Analytics 4 (GA4), custom event tracking, conversion attribution, and web audience reporting.',
    ARRAY['GA4 data model and event-based tracking configuration', 'User behavior analysis and retention reporting', 'Custom exploration dashboards and conversion path analysis'],
    5,
    true
) ON CONFLICT DO NOTHING;

-- 6. SEED SEO METADATA
INSERT INTO public.seo_metadata (page, title, description, canonical_url, noindex) VALUES
('/', 'Raj Hamal | Data Analyst | Applied AI & Data Analytics', 'Raj Hamal is a postgraduate student in Applied AI & Data Analytics at the University of Bradford, with 3+ years of tourism operations and analytics experience.', 'https://rajhamal.com.np', false),
('/about', 'About Raj Hamal | From Nepal Tourism to MSc Data & AI UK', 'Learn how Raj Hamal transitioned from 3+ years of tourism operations and expedition logistics in Nepal into Data Analytics and MSc Applied AI.', 'https://rajhamal.com.np/about', false),
('/experience', 'Professional Experience | Raj Hamal', 'Career experience spanning tourism operations, digital marketing, social media, data tracking, and business-focused problem solving.', 'https://rajhamal.com.np/experience', false),
('/projects', 'Data Analytics Case Studies & Projects | Raj Hamal', 'Explore verified data analytics case studies, SQL queries, Tableau dashboards, and applied AI projects by Raj Hamal.', 'https://rajhamal.com.np/projects', false),
('/skills', 'Technical Skills & Matrix | Raj Hamal', 'Explore Raj Hamal''s technical skill matrix across SQL, Tableau, Google Sheets, R, developing Python capabilities, and operational leadership.', 'https://rajhamal.com.np/skills', false),
('/certifications', 'Certifications & Credentials | Raj Hamal', 'Verified professional certifications held by Raj Hamal, including the Google Data Analytics Professional Certificate.', 'https://rajhamal.com.np/certifications', false),
('/resume', 'Resume & Curriculum Vitae | Raj Hamal', 'View and download the professional resume of Raj Hamal, MSc Applied AI & Data Analytics student at the University of Bradford.', 'https://rajhamal.com.np/resume', false),
('/contact', 'Contact Raj Hamal | Data Analytics & Applied AI', 'Get in touch with Raj Hamal for graduate data analyst roles, business intelligence opportunities, applied AI projects, and professional inquiries.', 'https://rajhamal.com.np/contact', false)
ON CONFLICT (page) DO NOTHING;
