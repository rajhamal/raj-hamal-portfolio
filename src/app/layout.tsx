import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { profileData } from "@/data/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${profileData.domain}`),
  title: {
    default: `${profileData.displayName} | ${profileData.title}`,
    template: `%s | ${profileData.displayName}`,
  },
  description: `${profileData.displayName} is a postgraduate student in Applied AI & Data Analytics at the University of Bradford, with 3+ years of tourism operations and analytics experience. View verified data analytics case studies, SQL & Tableau dashboards.`,
  keywords: [
    "Raj Hamal",
    "Raj Kumar Hamal",
    "Data Analyst",
    "Applied AI",
    "Data Analytics",
    "Business Intelligence",
    "Tableau Analyst",
    "SQL Analytics",
    "Bradford UK Data Analyst",
    "University of Bradford",
    "Nepal Tourism Analytics"
  ],
  authors: [{ name: profileData.displayName, url: `https://${profileData.domain}` }],
  creator: profileData.displayName,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: `https://${profileData.domain}`,
    title: `${profileData.displayName} | ${profileData.title}`,
    description: profileData.tagline,
    siteName: `${profileData.displayName} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.displayName} | ${profileData.title}`,
    description: profileData.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.fullName,
    alternateName: profileData.displayName,
    jobTitle: profileData.title,
    worksFor: {
      "@type": "EducationalOrganization",
      name: "University of Bradford",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "University of Bradford",
      },
      {
        "@type": "EducationalOrganization",
        name: "Kathmandu Academy of Travel and Tourism Hospitality",
      },
    ],
    sameAs: [profileData.linkedinUrl, profileData.githubUrl],
    url: `https://${profileData.domain}`,
    email: profileData.email,
    telephone: profileData.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bradford",
      addressRegion: "West Yorkshire",
      addressCountry: "UK",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
