import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  ExternalLink, 
  FileText
} from 'lucide-react';
import { profileData } from '@/data/profile';

export const metadata = {
  title: 'About Raj Hamal | From Nepal Tourism to MSc Data & AI UK',
  description: 'Learn how Raj Hamal transitioned from 3+ years of tourism operations and expedition logistics in Nepal into Data Analytics and MSc Applied AI at the University of Bradford, UK.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-16 space-y-16">
      
      {/* 1. HERO SECTION */}
      <section className="space-y-8 pb-8 border-b border-slate-200/80">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-poppins font-bold uppercase tracking-wider border border-blue-100">
            ABOUT RAJ HAMAL
          </span>
          <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            From the mountains to data, my career has always been about solving real problems.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Connecting 3+ years of tourism logistics and expedition leadership in Nepal with postgraduate Applied AI and Data Analytics study at the University of Bradford.
          </p>
        </div>

        {/* Hero Grid: Profile Cutout & Introduction */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          {/* Profile Image Cutout */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs h-80 sm:h-96 rounded-3xl overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-blue-50/60 border border-slate-200/90 shadow-sm flex items-end justify-center">
              <Image
                src="/images/about/raj-trekking-profile.png"
                alt="Raj Hamal"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-contain object-bottom drop-shadow-md"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="font-poppins font-bold text-slate-900 text-xs">Raj Hamal</h3>
                  <p className="text-[10px] text-blue-700 font-semibold">Data Analyst & MSc Applied AI</p>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-slate-600 font-medium">
                  <MapPin className="w-3 h-3 text-blue-600" />
                  Bradford, UK
                </span>
              </div>
            </div>
          </div>

          {/* Intro Paragraphs */}
          <div className="md:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              My professional journey started in Nepal's tourism industry, working directly with people, operations, logistics and the realities of running journeys in challenging environments.
            </p>
            <p>
              Over more than three years, I progressed from an Operations & Marketing Intern to a Tour Manager and Senior Trekking Guide, managing international trekking and adventure programs across Nepal.
            </p>
            <p>
              That experience taught me how to make decisions when conditions change, coordinate people and resources, manage information, and keep things moving when there is no room for confusion.
            </p>
            <blockquote className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50/60 rounded-r-xl text-slate-900 font-poppins font-semibold text-sm sm:text-base my-2">
              "I see data as another way of understanding the problems I have spent years solving in the real world."
            </blockquote>
            <p>
              Today, I am building on that foundation through data analytics and applied artificial intelligence, currently studying an MSc in Applied Artificial Intelligence and Data Analytics at the University of Bradford.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE NEPAL CHAPTER */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest block">CHAPTER 01</span>
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-900">
            THE NEPAL CHAPTER
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Before the dashboards, there were mountains.
          </p>
        </div>

        <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            My career began in Nepal's tourism and adventure industry. At Apex Himalaya Treks, I progressed from Operations & Marketing Intern to Tour Manager and Senior Trekking Guide, taking responsibility for both the planning behind the journey and the experience on the ground.
          </p>
          <p>
            I managed and supported 40+ multi-day international trekking and expedition programs, working with international clients, guides, suppliers and internal teams. The role went far beyond guiding.
          </p>
        </div>

        {/* Minimal Stats Bar */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-200/80">
          <div className="text-center sm:text-left">
            <span className="font-poppins font-extrabold text-2xl sm:text-4xl text-blue-700 block">40+</span>
            <span className="text-xs text-slate-600 font-medium">International Expeditions</span>
          </div>
          <div className="text-center sm:text-left">
            <span className="font-poppins font-extrabold text-2xl sm:text-4xl text-blue-700 block">10+</span>
            <span className="text-xs text-slate-600 font-medium">Team Members Led</span>
          </div>
          <div className="text-center sm:text-left">
            <span className="font-poppins font-extrabold text-2xl sm:text-4xl text-blue-700 block">3+ Years</span>
            <span className="text-xs text-slate-600 font-medium">Tourism Operations</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-poppins font-bold text-slate-900 text-sm uppercase tracking-wider">
            Operational Scope & Responsibilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
            {[
              'Expedition and itinerary planning',
              'Logistics and transportation',
              'Client coordination',
              'Supplier and partner management',
              'Budgeting and financial reconciliation',
              'Guide assignments and team coordination',
              'Permits and operational documentation',
              'Post-trip reporting',
              'Problem solving in remote environments'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 py-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Photo Breakdown */}
        <div className="pt-4 space-y-3">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Field Expedition Gallery</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative h-56 rounded-2xl overflow-hidden shadow-2xs">
              <Image
                src="/images/about/himalaya-expedition-1.jpg"
                alt="Himalayan Expedition"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-56 rounded-2xl overflow-hidden shadow-2xs">
              <Image
                src="/images/about/himalaya-team-rock.jpg"
                alt="Expedition Team"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-56 rounded-2xl overflow-hidden shadow-2xs">
              <Image
                src="/images/about/himalaya-expedition-team.jpg"
                alt="Base Camp Operations"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. MORE THAN GUIDING & ADVENTURE BEHIND TITLE */}
      <section className="space-y-6 pt-6 border-t border-slate-200/80">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest block">CHAPTER 02</span>
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-900">
            MORE THAN GUIDING
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            I learned to manage the system behind the journey.
          </p>
        </div>

        <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            Working in tourism showed me that successful trips depend on much more than what happens on the trail. There are bookings to track, permits to manage, suppliers to coordinate, payments to reconcile, guides to assign and clients to keep informed.
          </p>
          <p>
            I started building practical systems using Google Sheets to organize operational information, track booking pipelines, permits and guide assignments, and make important information easier for the team to access.
          </p>

          <blockquote className="border-l-4 border-blue-600 pl-4 py-3 bg-slate-50 rounded-r-xl text-slate-900 font-poppins font-bold text-base sm:text-lg my-4">
            "Better information leads to better decisions."
          </blockquote>

          <h3 className="font-poppins font-bold text-xl text-slate-900 pt-2">
            The Adventure Behind the Title
          </h3>
          <p>
            Tour Manager. Senior Trekking Guide. Problem Solver. Being in the mountains taught me lessons that don't appear on a job description.
          </p>
          <p>
            Plans change. Weather changes. People have different needs. Resources are limited. And sometimes the decision has to be made with incomplete information. Working in those environments developed my ability to stay organized, communicate clearly, adapt quickly and solve problems without losing sight of the bigger objective.
          </p>

          <blockquote className="border-l-4 border-indigo-600 pl-4 py-3 bg-indigo-50/50 rounded-r-xl text-slate-900 font-sans text-sm sm:text-base my-4">
            "I don't see analytics as only numbers, dashboards and technical tools. I see it as another way of understanding a problem before making a decision."
          </blockquote>
        </div>

        {/* Built in Nepal Section */}
        <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">BUILT IN NEPAL</span>
            <h3 className="font-poppins font-bold text-lg text-white">Co-Founder / Operations · Alpine Ace Treks</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Involved in building Alpine Ace Treks, thinking about how a travel business is built, positioned and operated.
            </p>
          </div>
          <a
            href="https://alpineacetreks.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-poppins font-bold text-xs rounded-xl shrink-0 transition-colors"
          >
            Visit Alpine Ace Treks
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 4. THE TURNING POINT & ANALYTICS IN PRACTICE */}
      <section className="space-y-6 pt-6 border-t border-slate-200/80">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest block">CHAPTER 03</span>
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-900">
            THE TURNING POINT
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            I wanted to understand the numbers behind the problems.
          </p>
        </div>

        <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            The more operational experience I gained, the more curious I became about the information behind everyday decisions. Why do some processes take longer than others? Where are costs increasing? What patterns are hidden inside customer and operational data? Could information that was being collected every day be used to make better decisions?
          </p>
          <p>
            That curiosity led me into data analytics. I completed the <strong>Google Data Analytics Professional Certificate</strong> and began working on independent projects using real-world datasets.
          </p>

          <blockquote className="border-l-4 border-emerald-600 pl-4 py-2 bg-emerald-50/60 rounded-r-xl text-slate-900 font-poppins font-semibold text-sm sm:text-base my-2">
            "The transition wasn't about leaving my previous experience behind. It was about learning a new way to understand it."
          </blockquote>
        </div>

        {/* Skill Badges */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Analytics Toolkit</span>
          <div className="flex flex-wrap gap-2">
            {['SQL', 'Excel', 'Google Sheets', 'Tableau', 'Google Data Studio', 'R Analytics', 'Data Cleaning', 'Exploratory Analysis', 'KPI Reporting'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold border border-slate-200">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Analytics in Practice Projects */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins font-bold text-xl text-slate-900">Analytics in Practice</h3>
            <Link href="/projects" className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800">
              Explore all projects
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-[10px] font-mono text-blue-700 font-bold uppercase">Nepal Tourism Analysis</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Using tourism data to explore trends and performance within an industry I already understand from professional experience.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-[10px] font-mono text-blue-700 font-bold uppercase">Sales Performance Dashboard</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Turning sales data into a structured dashboard for understanding performance and trends.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-[10px] font-mono text-blue-700 font-bold uppercase">BellaBeat Case Study</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exploring user activity data to identify patterns and translate findings into business recommendations.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-[10px] font-mono text-blue-700 font-bold uppercase">Ecotourism Market Analysis</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Examining market and tourism data to understand trends within the growing ecotourism sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE UK CHAPTER & HOW I APPROACH PROBLEMS */}
      <section className="space-y-6 pt-6 border-t border-slate-200/80">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest block">CHAPTER 04</span>
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-900">
            THE UK CHAPTER
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Now I'm building deeper technical capability.
          </p>
        </div>

        <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            I am currently studying MSc Applied Artificial Intelligence and Data Analytics at the University of Bradford. Moving from professional operations into postgraduate study has given me the opportunity to build a stronger technical foundation while exploring how data and artificial intelligence can be applied to real problems.
          </p>
        </div>

        {/* UK Photo Gallery - City & Street Views */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-2xs border border-slate-200/80">
            <Image
              src="/images/about/bradford-uk-street-1.jpg"
              alt="Bradford Street"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-2xs border border-slate-200/80">
            <Image
              src="/images/about/bradford-uk-city.jpg"
              alt="Bradford Architecture"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* UK Photo Gallery - Personal University Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative h-96 sm:h-[480px] rounded-2xl overflow-hidden shadow-2xs border border-slate-200/80">
            <Image
              src="/images/about/bradford-richmond-building.jpg"
              alt="Raj Hamal at Richmond Building, University of Bradford"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-bottom"
            />
          </div>
          <div className="relative h-96 sm:h-[480px] rounded-2xl overflow-hidden shadow-2xs border border-slate-200/80">
            <Image
              src="/images/about/bradford-university-atrium.jpg"
              alt="Raj Hamal at University of Bradford Campus Atrium"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-bottom"
            />
          </div>
        </div>

        {/* How I Approach Problems */}
        <div className="pt-6 space-y-4">
          <h3 className="font-poppins font-bold text-xl text-slate-900">How I Approach Problems</h3>
          <p className="text-xs sm:text-sm text-slate-600">Start with the problem, not the tool.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="font-mono text-xs font-bold text-blue-700 block">01 — Understand</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Before working with a dataset, I want to understand the question behind it and what decision the analysis needs to support.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-700 block">02 — Get data right</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clean, structured and reliable data matters more than building a complicated dashboard.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="font-mono text-xs font-bold text-indigo-700 block">03 — Find signal</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                I look for patterns, changes and relationships that can help explain what is happening.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="font-mono text-xs font-bold text-purple-700 block">04 — Make useful</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Analysis should lead somewhere. The final result should be understandable and useful to the decision maker.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CAREER PATHWAY & WHAT I BRING */}
      <section className="space-y-6 pt-6 border-t border-slate-200/80">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest block">PATHWAY</span>
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-900">
            FROM NEPAL TO BRADFORD
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A career that changed direction without losing its foundation.
          </p>
        </div>

        {/* Clean Pathway Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-mono font-bold text-blue-700 block">2018</span>
            <span className="font-semibold text-slate-900 block">Science Education</span>
            <span className="text-[11px] text-slate-500">Kathmandu, Nepal</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-mono font-bold text-blue-700 block">2021–2022</span>
            <span className="font-semibold text-slate-900 block">Operations & Marketing</span>
            <span className="text-[11px] text-slate-500">Apex Himalaya Treks</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-mono font-bold text-blue-700 block">2022–2025</span>
            <span className="font-semibold text-slate-900 block">Tour Manager & Guide</span>
            <span className="text-[11px] text-slate-500">40+ Expeditions</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-mono font-bold text-blue-700 block">2025–2026</span>
            <span className="font-semibold text-slate-900 block">Data Analytics</span>
            <span className="text-[11px] text-slate-500">Google Certificate</span>
          </div>
          <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 space-y-1">
            <span className="font-mono font-bold text-blue-700 block">2026–Present</span>
            <span className="font-semibold text-slate-900 block">MSc Applied AI & Data</span>
            <span className="text-[11px] text-slate-500">Univ. of Bradford</span>
          </div>
          <div className="p-3 bg-slate-900 text-white rounded-xl space-y-1">
            <span className="font-mono font-bold text-blue-400 block">NEXT</span>
            <span className="font-semibold text-white block">Career Target</span>
            <span className="text-[11px] text-slate-300">Data Analytics & AI</span>
          </div>
        </div>

        {/* What I Bring & Where I Am Now */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="space-y-3">
            <h3 className="font-poppins font-bold text-xl text-slate-900">What I Bring</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              My background sits across two worlds. Real-world operations taught me how businesses, people and processes work. Data analytics is teaching me how to understand those processes through evidence. Applied AI is opening the next layer: exploring how intelligent systems can improve the way problems are understood and solved.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-poppins font-bold text-xl text-slate-900">Where I Am Now</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Currently based in Bradford, UK, studying MSc Applied Artificial Intelligence and Data Analytics at the University of Bradford. Building toward opportunities across: Data Analytics · Business Intelligence · Applied AI · Data-Driven Business Solutions.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-poppins font-bold text-xs rounded-xl transition-colors shadow-xs"
              >
                View my projects
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-poppins font-bold text-xs rounded-xl transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                Download my CV
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-poppins font-bold text-xs rounded-xl transition-colors"
              >
                Connect with me
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
