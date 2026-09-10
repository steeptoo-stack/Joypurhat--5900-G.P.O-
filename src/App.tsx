/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EmergencySection } from './components/EmergencySection';
import { ServicesGrid } from './components/ServicesGrid';
import { JobsSection } from './components/JobsSection';
import { NewsSection } from './components/NewsSection';
import { HealthDirectory } from './components/HealthDirectory';
import { GovernmentServices } from './components/GovernmentServices';
import { EducationSection } from './components/EducationSection';
import { BloodDonorSection } from './components/BloodDonorSection';
import { ImportantNumbers } from './components/ImportantNumbers';
import { TourismSection } from './components/TourismSection';
import { MapSection } from './components/MapSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AdminModal } from './components/AdminModal';
import { Bell, Flame, PhoneCall, Sparkles } from 'lucide-react';

const MainPortal: React.FC = () => {
  const { data, language, setActiveSection } = useApp();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-['Hind_Siliguri',sans-serif] selection:bg-sky-500 selection:text-white transition-colors duration-200">
      {/* Top Urgent Ticker / Live Bulletin */}
      <div className="bg-gradient-to-r from-sky-700 via-blue-700 to-indigo-800 text-white text-xs py-2 px-4 shadow-inner">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span className="font-bold text-[11px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded shrink-0">
              {language === 'bn' ? 'জরুরি বিজ্ঞপ্তি' : 'Notice'}
            </span>
            <span className="text-sky-100 truncate text-xs">
              {language === 'bn'
                ? 'জয়পুরহাট জেলা নাগরিক সেবা পোর্টালে আপনাকে স্বাগতম। জরুরি প্রয়োজনে অবিলম্বে ৯৯৯ এ কল করুন।'
                : 'Welcome to Joypurhat 5900 G.P.O Citizen Service Portal. Dial 999 for critical emergency.'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-sky-200 shrink-0">
            <button
              onClick={() => {
                setActiveSection('emergency');
                document.getElementById('emergency')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white flex items-center gap-1 font-semibold"
            >
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span>{language === 'bn' ? 'হটলাইনসমূহ' : 'Hotlines'}</span>
            </button>
            <span>•</span>
            <span>ডাকঘর কোড: ৫৯০০</span>
          </div>
        </div>
      </div>

      {/* Sticky Blurred Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Emergency Section */}
        <EmergencySection />

        {/* 3. 22 Service Categories Grid */}
        <ServicesGrid />

        {/* 4. Jobs Section */}
        <JobsSection />

        {/* 5. Today's Joypurhat News Section */}
        <NewsSection />

        {/* 6. Health & Medical Directory */}
        <HealthDirectory />

        {/* 7. Government Offices Directory */}
        <GovernmentServices />

        {/* 8. Education & Institutions */}
        <EducationSection />

        {/* 9. Blood Donors Network */}
        <BloodDonorSection />

        {/* 10. Important Numbers & Contacts */}
        <ImportantNumbers />

        {/* 11. Tourism & Historic Landmarks */}
        <TourismSection />

        {/* 12. Upazila Profiles & Interactive Map */}
        <MapSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <SearchModal />
      <AdminModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainPortal />
    </AppProvider>
  );
}

