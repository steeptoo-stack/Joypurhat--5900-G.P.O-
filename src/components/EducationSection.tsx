import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  GraduationCap,
  MapPin,
  Phone,
  Search,
  School,
  Building
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EducationInstitute } from '../types';

export const EducationSection: React.FC = () => {
  const { data, language } = useApp();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const typeTabs = [
    { id: 'all', labelBn: 'সকল প্রতিষ্ঠান', labelEn: 'All Institutes' },
    { id: 'college', labelBn: 'কলেজ', labelEn: 'Colleges' },
    { id: 'cadet', labelBn: 'ক্যাডেট কলেজ', labelEn: 'Cadet College' },
    { id: 'school', labelBn: 'মাধ্যমিক বিদ্যালয়', labelEn: 'Schools' },
    { id: 'technical', labelBn: 'পলিটেকনিক / কারিগরি', labelEn: 'Polytechnic' }
  ];

  const upazilaFilters = [
    { id: 'all', labelBn: 'সকল উপজেলা', labelEn: 'All Upazilas' },
    { id: 'সদর', labelBn: 'সদর', labelEn: 'Sadar' },
    { id: 'পাঁচবিবি', labelBn: 'পাঁচবিবি', labelEn: 'Panchbibi' },
    { id: 'কালাই', labelBn: 'কালাই', labelEn: 'Kalai' },
    { id: 'ক্ষেতলাল', labelBn: 'ক্ষেতলাল', labelEn: 'Khetlal' },
    { id: 'আক্কেলপুর', labelBn: 'আক্কেলপুর', labelEn: 'Akkelpur' }
  ];

  const filteredInstitutes = data.education.filter(inst => {
    if (selectedType !== 'all' && inst.type !== selectedType) return false;
    if (selectedUpazila !== 'all' && inst.upazila !== selectedUpazila) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = inst.nameBn.toLowerCase().includes(q) || inst.nameEn.toLowerCase().includes(q);
      const matchEIIN = inst.eiin?.includes(q);
      if (!matchName && !matchEIIN) return false;
    }
    return true;
  });

  return (
    <section id="education" className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-950/80 px-3.5 py-1 text-xs font-bold text-amber-800 dark:text-amber-300 mb-3 border border-amber-200/60 dark:border-amber-800/60">
              <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'bn' ? 'শিক্ষা ও একাডেমি' : 'Education Directory'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'bn' ? 'জয়পুরহাট শিক্ষা প্রতিষ্ঠান ও নোটিশ' : 'Joypurhat Education Institutes'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {language === 'bn'
                ? 'জয়পুরহাটের নামকরা কলেজ, ক্যাডেট কলেজ, টেকনিক্যাল ইনস্টিটিউট, স্কুল ও শিক্ষা তথ্য।'
                : 'Top colleges, cadet college, polytechnic, technical high schools and EIIN directory.'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'প্রতিষ্ঠান বা EIIN খুঁজুন...' : 'Search school, college, EIIN...'}
              className="w-full rounded-xl bg-white dark:bg-slate-900 pl-9 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {typeTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedType === tab.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {language === 'bn' ? tab.labelBn : tab.labelEn}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 shrink-0">উপজেলা:</span>
            {upazilaFilters.map(up => (
              <button
                key={up.id}
                onClick={() => setSelectedUpazila(up.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedUpazila === up.id
                    ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-bold'
                    : 'bg-white dark:bg-slate-850 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {language === 'bn' ? up.labelBn : up.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Institutes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstitutes.map(inst => (
            <div
              key={inst.id}
              id={`edu-card-${inst.id}`}
              className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-amber-500/40 transition-all duration-200"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400">
                    <School className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    {inst.eiin && (
                      <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-slate-600 dark:text-slate-400 font-semibold">
                        EIIN: {inst.eiin}
                      </span>
                    )}
                    <span className="rounded-md bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 font-bold text-amber-800 dark:text-amber-300 text-[11px]">
                      📍 {inst.upazila}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                  {language === 'bn' ? inst.nameBn : inst.nameEn}
                </h3>

                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{language === 'bn' ? inst.addressBn : inst.addressEn}</span>
                </p>

                <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {inst.descriptionBn}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <a
                  href={`tel:${inst.phone}`}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 py-2.5 px-3 text-xs font-bold text-white shadow-xs transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'যোগাযোগ' : 'Contact'}</span>
                </a>

                {inst.website && (
                  <a
                    href={inst.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2.5 text-slate-700 dark:text-slate-300 transition"
                    title="Website"
                  >
                    <ExternalLink className="w-4 h-4 text-sky-500" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
