import React, { useState } from 'react';
import { ArrowRight, MapPin, PhoneCall, Search, Sparkles, Building2, Flame, HeartPulse, Droplet } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { language, setSearchQuery, setIsSearchModalOpen, setActiveSection } = useApp();
  const [localSearch, setLocalSearch] = useState('');

  const searchExamples = [
    { labelBn: 'হাসপাতাল খুঁজুন', labelEn: 'Find Hospital', query: 'হাসপাতাল' },
    { labelBn: 'চাকরি খুঁজুন', labelEn: 'Find Jobs', query: 'চাকরি' },
    { labelBn: 'জরুরি নম্বর', labelEn: 'Emergency Numbers', query: 'জরুরি' },
    { labelBn: 'থানা', labelEn: 'Police Station', query: 'থানা' },
    { labelBn: 'রক্তদাতা', labelEn: 'Blood Donors', query: 'রক্ত' },
    { labelBn: 'সরকারি অফিস', labelEn: 'Govt Offices', query: 'সরকারি' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setIsSearchModalOpen(true);
    }
  };

  const handleChipClick = (query: string) => {
    setLocalSearch(query);
    setSearchQuery(query);
    setIsSearchModalOpen(true);
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center justify-center">
      {/* Background with lush green landscape & Joypurhat thematic imagery */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 transform scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80')`,
        }}
      >
        {/* Dark transparent gradient overlay for optimal legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/95 backdrop-blur-[2px]" />
        {/* Radial brand color tint */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-600/25 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center z-10">
        {/* Location Indicator & Postcode Pill */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium text-sky-200 mb-6 animate-fade-in shadow-lg">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <span>📍 Joypurhat, Bangladesh — 5900</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="hidden sm:inline text-white/70">| জেলা পোর্টাল</span>
        </div>

        {/* Main Headings */}
        <h1 className="font-extrabold tracking-tight text-white text-3xl sm:text-5xl lg:text-6xl font-['Plus_Jakarta_Sans',sans-serif] leading-tight drop-shadow-sm">
          JOYPURHAT <span className="text-sky-400">5900</span> G.P.O
        </h1>

        <p className="mt-4 text-xl sm:text-2xl lg:text-3xl font-bold text-sky-100 font-['Hind_Siliguri',sans-serif]">
          {language === 'bn' 
            ? 'জয়পুরহাটের সকল সেবা ও তথ্য এক জায়গায়' 
            : 'All Joypurhat District Services & Info in One Place'}
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
          {language === 'bn'
            ? 'চাকরি, সংবাদ, জরুরি নম্বর, হাসপাতাল, শিক্ষা, সরকারি সেবা, রক্তদাতা, যোগাযোগ ও প্রয়োজনীয় তথ্য সহজেই খুঁজে নিন।'
            : 'Jobs, local news, emergency contacts, healthcare, education, government services, blood donors and tourism.'}
        </p>

        {/* Large Global Search Box */}
        <div className="mx-auto mt-8 max-w-2xl">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-5 text-slate-400">
              <Search className="w-5 h-5 text-sky-400" />
            </div>
            <input
              id="hero-global-search-input"
              type="text"
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
              placeholder={language === 'bn' ? 'আপনি কী খুঁজছেন? (যেমন: হাসপাতাল, পুলিশ, চাকরি...)' : 'What are you looking for? (e.g. Hospital, Jobs...)'}
              className="w-full rounded-2xl bg-white/95 dark:bg-slate-900/95 py-4 pl-12 sm:pl-14 pr-28 sm:pr-36 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 shadow-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/40 border border-white/20"
            />
            <button
              type="submit"
              id="hero-search-submit-btn"
              className="absolute right-2 sm:right-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:from-sky-500 hover:to-blue-500 transition-all cursor-pointer"
            >
              {language === 'bn' ? 'খুঁজুন' : 'Search'}
            </button>
          </form>

          {/* Quick Search Suggestion Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">
              {language === 'bn' ? 'জনপ্রিয় অনুসন্ধান:' : 'Quick examples:'}
            </span>
            {searchExamples.map((chip, idx) => (
              <button
                key={idx}
                id={`chip-search-${idx}`}
                type="button"
                onClick={() => handleChipClick(chip.query)}
                className="rounded-lg bg-white/10 hover:bg-white/20 px-2.5 py-1 text-sky-200 border border-white/15 backdrop-blur-sm transition hover:text-white cursor-pointer"
              >
                {language === 'bn' ? chip.labelBn : chip.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Two Attractive CTA Action Buttons */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            id="btn-hero-all-services"
            onClick={() => scrollTo('services')}
            className="flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-6 py-3.5 text-sm sm:text-base font-bold text-slate-950 shadow-lg shadow-sky-500/25 hover:shadow-sky-400/35 transition-all transform hover:-translate-y-0.5"
          >
            <span>{language === 'bn' ? 'সকল সেবা দেখুন' : 'View All Services'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn-hero-emergency"
            onClick={() => scrollTo('emergency')}
            className="flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 border border-red-500/50 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-red-600/30 hover:shadow-red-500/40 transition-all transform hover:-translate-y-0.5"
          >
            <PhoneCall className="w-4 h-4 text-white animate-bounce" />
            <span>{language === 'bn' ? 'জরুরি সহায়তা' : 'Emergency Help'}</span>
          </button>
        </div>

        {/* Upazilas Quick Ribbon */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-5 gap-2 text-center text-xs text-slate-300 font-medium">
          <div className="p-1 rounded bg-white/5 backdrop-blur-xs">জয়পুরহাট সদর</div>
          <div className="p-1 rounded bg-white/5 backdrop-blur-xs">পাঁচবিবি</div>
          <div className="p-1 rounded bg-white/5 backdrop-blur-xs">কালাই</div>
          <div className="p-1 rounded bg-white/5 backdrop-blur-xs">ক্ষেতলাল</div>
          <div className="p-1 rounded bg-white/5 backdrop-blur-xs">আক্কেলপুর</div>
        </div>
      </div>
    </section>
  );
};
