import React, { useEffect, useRef, useState } from 'react';
import {
  Briefcase,
  Droplet,
  GraduationCap,
  HeartPulse,
  Landmark,
  MapPin,
  Newspaper,
  Phone,
  PhoneCall,
  Search,
  X,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    searchQuery,
    setSearchQuery,
    data,
    serviceCategories,
    language,
    setActiveSection
  } = useApp();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchModalOpen]);

  // Global key listener for '/' and 'Escape'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchModalOpen && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const q = searchQuery.toLowerCase().trim();

  // Filter across all collections
  const matchedServices = q
    ? serviceCategories.filter(
        s =>
          s.titleBn.toLowerCase().includes(q) ||
          s.titleEn.toLowerCase().includes(q) ||
          s.descriptionBn.toLowerCase().includes(q)
      )
    : [];

  const matchedEmergency = q
    ? data.emergencyContacts.filter(
        c =>
          c.nameBn.toLowerCase().includes(q) ||
          c.nameEn.toLowerCase().includes(q) ||
          c.number.includes(q)
      )
    : [];

  const matchedJobs = q
    ? data.jobs.filter(
        j =>
          j.titleBn.toLowerCase().includes(q) ||
          j.companyBn.toLowerCase().includes(q) ||
          j.category.toLowerCase().includes(q)
      )
    : [];

  const matchedHospitals = q
    ? data.hospitals.filter(
        h =>
          h.nameBn.toLowerCase().includes(q) ||
          h.addressBn.toLowerCase().includes(q) ||
          h.type.toLowerCase().includes(q)
      )
    : [];

  const matchedGovt = q
    ? data.govtOffices.filter(
        g =>
          g.nameBn.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.servicesBn.some(s => s.toLowerCase().includes(q))
      )
    : [];

  const totalResults =
    matchedServices.length +
    matchedEmergency.length +
    matchedJobs.length +
    matchedHospitals.length +
    matchedGovt.length;

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsSearchModalOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 sm:pt-24 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[80vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-slate-200 dark:border-slate-800 px-5 py-4">
          <Search className="w-5 h-5 text-sky-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={
              language === 'bn'
                ? 'জয়পুরহাটের যেকোনো সেবা, চাকরি, হাসপাতাল, জরুরি নম্বর খুঁজুন...'
                : 'Search any service, jobs, hospital, emergency hotline...'
            }
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {!q ? (
            <div className="py-10 text-center text-slate-400">
              <Search className="mx-auto w-10 h-10 mb-2 opacity-50" />
              <p className="text-sm font-medium">
                {language === 'bn' ? 'কী খুঁজতে চান লিখুন...' : 'Type to search...'}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
                {['হাসপাতাল', 'চাকরি', 'জরুরি', 'পুলিশ', 'রক্ত', 'ডিসি অফিস'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-950"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                "{searchQuery}" {language === 'bn' ? 'এর জন্য কোনো ফলাফল পাওয়া যায়নি।' : 'yielded no results.'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'bn' ? 'শব্দটি পরিবর্তন করে আবার চেষ্টা করুন।' : 'Try checking your spelling or search terms.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Matched Emergency Numbers */}
              {matchedEmergency.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 mb-2">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'জরুরি হটলাইন' : 'Emergency Hotlines'}</span>
                  </div>
                  <div className="space-y-2">
                    {matchedEmergency.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/60"
                      >
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {language === 'bn' ? item.nameBn : item.nameEn}
                          </h4>
                          <span className="text-xs text-red-600 dark:text-red-400 font-mono font-bold">
                            {item.number}
                          </span>
                        </div>
                        <a
                          href={`tel:${item.number}`}
                          className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs"
                        >
                          <Phone className="w-3 h-3" />
                          <span>কল করুন</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Services */}
              {matchedServices.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'সেবাসমূহ' : 'Services'}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedServices.map(srv => (
                      <button
                        key={srv.id}
                        onClick={() => navigateToSection('services')}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-left hover:bg-sky-50 dark:hover:bg-sky-950/50 border border-slate-200/60 dark:border-slate-700/60 transition"
                      >
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {language === 'bn' ? srv.titleBn : srv.titleEn}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-1">{srv.descriptionBn}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-sky-500 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Jobs */}
              {matchedJobs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'চাকরির বিজ্ঞপ্তি' : 'Jobs'}</span>
                  </div>
                  <div className="space-y-2">
                    {matchedJobs.map(job => (
                      <div
                        key={job.id}
                        onClick={() => navigateToSection('jobs')}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {language === 'bn' ? job.titleBn : job.titleEn}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {job.companyBn} • {job.category}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-sky-600">দেখুন →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Hospitals */}
              {matchedHospitals.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 mb-2">
                    <HeartPulse className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'স্বাস্থ্যসেবা ও হাসপাতাল' : 'Healthcare'}</span>
                  </div>
                  <div className="space-y-2">
                    {matchedHospitals.map(h => (
                      <div
                        key={h.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {language === 'bn' ? h.nameBn : h.nameEn}
                          </h4>
                          <p className="text-xs text-slate-500">{h.addressBn}</p>
                        </div>
                        <a
                          href={`tel:${h.phone}`}
                          className="flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs"
                        >
                          <Phone className="w-3 h-3" />
                          <span>কল</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Govt */}
              {matchedGovt.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'সরকারি অফিস' : 'Govt Offices'}</span>
                  </div>
                  <div className="space-y-2">
                    {matchedGovt.map(g => (
                      <div
                        key={g.id}
                        onClick={() => navigateToSection('govt')}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {language === 'bn' ? g.nameBn : g.nameEn}
                          </h4>
                          <p className="text-xs text-slate-500">{g.addressBn}</p>
                        </div>
                        <span className="text-xs font-bold text-indigo-600">বিস্তারিত →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
