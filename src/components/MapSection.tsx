import React, { useState } from 'react';
import {
  Building2,
  ExternalLink,
  MapPin,
  Navigation,
  Sparkles,
  Users,
  Compass,
  Landmark,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface UpazilaDetail {
  id: string;
  nameBn: string;
  nameEn: string;
  area: string;
  population: string;
  unions: string;
  mouza: string;
  specialtyBn: string;
  specialtyEn: string;
  spotsBn: string[];
  color: string;
}

const UPAZILAS_DATA: UpazilaDetail[] = [
  {
    id: 'sadar',
    nameBn: 'জয়পুরহাট সদর',
    nameEn: 'Joypurhat Sadar',
    area: '২৫০.৯৩ বর্গ কিমি',
    population: '৩,৩০,০০০ (প্রায়)',
    unions: '৯টি ইউনিয়ন, ১টি পৌরসভা',
    mouza: '১৯২টি মৌজা',
    specialtyBn: 'জেলা প্রশাসনিক কেন্দ্র, প্রধান ডাকঘর (৫৯০০), সুগার মিল ও রেলওয়ে জংশন।',
    specialtyEn: 'District administrative center, Head Post Office (5900), Joypurhat Sugar Mill and rail junction.',
    spotsBn: ['হিন্দা-কসবা শাহী জামে মসজিদ', 'পাগল দেওয়ান মাজার ও বধ্যভূমি', 'সুগার মিল'],
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'panchbibi',
    nameBn: 'পাঁচবিবি উপজেলা',
    nameEn: 'Panchbibi Upazila',
    area: '২৭৮.৫৩ বর্গ কিমি',
    population: '২,৬০,০০০ (প্রায়)',
    unions: '৮টি ইউনিয়ন, ১টি পৌরসভা',
    mouza: '২২২টি মৌজা',
    specialtyBn: 'ঐতিহাসিক লকমা রাজবাড়ি, আছরঙ্গা দিঘি ও ভারত সীমান্তবর্তী সমৃদ্ধ বাণিজ্য এলাকা।',
    specialtyEn: 'Historic Lokma Rajbari, Achranga Dighi and border trade center.',
    spotsBn: ['লকমা রাজবাড়ি', 'আছরঙ্গা দিঘি', 'পাথরঘাটা প্রত্নতাত্ত্বিক এলাকা'],
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'kalai',
    nameBn: 'কালাই উপজেলা',
    nameEn: 'Kalai Upazila',
    area: '১৬৬.৩০ বর্গ কিমি',
    population: '১,৪৫,০০০ (প্রায়)',
    unions: '৫টি ইউনিয়ন, ১টি পৌরসভা',
    mouza: '১০৯টি মৌজা',
    specialtyBn: 'ঐতিহাসিক নান্দাইল দিঘি ও দেশের অন্যতম প্রধান আলু উৎপাদনকারী সমৃদ্ধ কৃষি জনপদ।',
    specialtyEn: 'Nandail Dighi and one of Bangladesh largest potato producing hubs.',
    spotsBn: ['নান্দাইল দিঘি', 'ঐতিহাসিক শিবমন্দির'],
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'khetlal',
    nameBn: 'ক্ষেতলাল উপজেলা',
    nameEn: 'Khetlal Upazila',
    area: '১৪৫.৯০ বর্গ কিমি',
    population: '১,২০,০০০ (প্রায়)',
    unions: '৫টি ইউনিয়ন, ১টি পৌরসভা',
    mouza: '৮৮টি মৌজা',
    specialtyBn: 'শান্ত ও শ্যামল প্রাকৃতিক পরিবেশ, ধানের খামার ও ঐতিহাসিক আছরঙ্গা দিঘির সংযোগ।',
    specialtyEn: 'Lush agricultural landscape, paddy production and historical links.',
    spotsBn: ['হাড়ুঞ্জ বধ্যভূমি', 'কালাচাঁদ মন্দির'],
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'akkelpur',
    nameBn: 'আক্কেলপুর উপজেলা',
    nameEn: 'Akkelpur Upazila',
    area: '১৩৯.৪৭ বর্গ কিমি',
    population: '১,৪৫,০০০ (প্রায়)',
    unions: '৫টি ইউনিয়ন, ১টি পৌরসভা',
    mouza: '১১৬টি মৌজা',
    specialtyBn: 'গোপীনাথপুর ঐতিহ্যবাহী দোল পূর্ণিমা মেলা ও প্রাচীন প্রত্নতাত্ত্বিক মন্দির।',
    specialtyEn: 'Gopinathpur historic Temple and century-old Dol Purnima cultural fair.',
    spotsBn: ['গোপীনাথপুর মন্দির', 'রুখনীপুর বধ্যভূমি', 'তুলসীগঙ্গা নদী তীর'],
    color: 'from-rose-500 to-pink-600'
  }
];

export const MapSection: React.FC = () => {
  const { language } = useApp();
  const [selectedUpazila, setSelectedUpazila] = useState<UpazilaDetail>(UPAZILAS_DATA[0]);

  return (
    <section id="map" className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 dark:bg-sky-950/80 px-3.5 py-1 text-xs font-bold text-sky-800 dark:text-sky-300 mb-3 border border-sky-200/60 dark:border-sky-800/60">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            <span>{language === 'bn' ? 'জেলা মানচিত্র ও ভূগোল' : 'District Geography & Map'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'bn' ? 'জয়পুরহাট ম্যাপ ও উপজেলা পরিচিতি' : 'Joypurhat Map & Upazilas'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {language === 'bn'
              ? 'জয়পুরহাট জেলার ৫টি উপজেলার আয়তন, জনসংখ্যা, ইউনিয়ন ও বিশেষ পরিচিতি এক নজরে দেখুন।'
              : 'Interactive profile of 5 upazilas in Joypurhat district with geographical overview.'}
          </p>
        </div>

        {/* Interactive Upazila Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {UPAZILAS_DATA.map(up => {
            const isSelected = selectedUpazila.id === up.id;
            return (
              <button
                key={up.id}
                id={`btn-upazila-tab-${up.id}`}
                onClick={() => setSelectedUpazila(up)}
                className={`rounded-2xl px-4 sm:px-5 py-3 text-xs sm:text-sm font-bold transition-all cursor-pointer transform active:scale-95 ${
                  isSelected
                    ? `bg-gradient-to-r ${up.color} text-white shadow-md shadow-sky-500/20 scale-105`
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
              >
                📍 {language === 'bn' ? up.nameBn : up.nameEn}
              </button>
            );
          })}
        </div>

        {/* Main Content: Details on Left, Map Canvas on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Upazila Profile Card */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-md">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  UPAZILA PROFILE
                </span>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  পোস্টকোড: ৫৯০০
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {language === 'bn' ? selectedUpazila.nameBn : selectedUpazila.nameEn}
              </h3>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'bn' ? selectedUpazila.specialtyBn : selectedUpazila.specialtyEn}
              </p>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block">{language === 'bn' ? 'মোট আয়তন' : 'Area'}</span>
                  <span className="text-base font-black text-slate-900 dark:text-white mt-0.5 block">
                    {selectedUpazila.area}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block">{language === 'bn' ? 'আনুমানিক জনসংখ্যা' : 'Population'}</span>
                  <span className="text-base font-black text-slate-900 dark:text-white mt-0.5 block">
                    {selectedUpazila.population}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block">{language === 'bn' ? 'ইউনিয়ন ও পৌরসভা' : 'Unions'}</span>
                  <span className="text-base font-black text-slate-900 dark:text-white mt-0.5 block">
                    {selectedUpazila.unions}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block">{language === 'bn' ? 'গ্রাম / মৌজা' : 'Mouza'}</span>
                  <span className="text-base font-black text-slate-900 dark:text-white mt-0.5 block">
                    {selectedUpazila.mouza}
                  </span>
                </div>
              </div>

              {/* Prominent Spots */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {language === 'bn' ? 'উল্লেখযোগ্য স্থান ও স্থাপনা:' : 'Notable Landmarks:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedUpazila.spotsBn.map((spot, idx) => (
                    <span
                      key={idx}
                      className="rounded-xl bg-sky-50 dark:bg-sky-950/70 border border-sky-200/60 dark:border-sky-800/60 px-3 py-1 text-xs font-semibold text-sky-800 dark:text-sky-300"
                    >
                      {spot}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${selectedUpazila.nameEn}, Joypurhat, Bangladesh`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 py-3 px-4 text-xs sm:text-sm font-bold shadow-md transition"
              >
                <Navigation className="w-4 h-4" />
                <span>{language === 'bn' ? 'গুগল ম্যাপে উপজেলা দেখুন' : 'Explore Upazila on Google Maps'}</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map iframe & District Card */}
          <div className="lg:col-span-6 flex flex-col rounded-3xl bg-white dark:bg-slate-900 overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md">
            <div className="p-5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {language === 'bn' ? 'জয়পুরহাট জেলা জিপিও (৫৯০০) মানচিত্র' : 'Joypurhat District GPO (5900) Live Map'}
                </span>
              </div>

              <a
                href="https://www.google.com/maps/place/Joypurhat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-600 dark:text-sky-400 font-semibold flex items-center gap-1 hover:underline"
              >
                <span>{language === 'bn' ? 'বড় ম্যাপ' : 'Full Map'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative flex-1 min-h-[380px] w-full bg-slate-200 dark:bg-slate-800">
              <iframe
                title="Joypurhat District Map"
                src="https://maps.google.com/maps?q=Joypurhat%20Sadar%20Bangladesh&t=&z=12&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
