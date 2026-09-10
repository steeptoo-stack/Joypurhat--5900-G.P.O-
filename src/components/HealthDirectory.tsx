import React, { useState } from 'react';
import {
  Activity,
  Ambulance,
  Clock,
  HeartPulse,
  MapPin,
  Navigation,
  Phone,
  Search,
  Stethoscope,
  Building2,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HealthFacility, Upazila } from '../types';

export const HealthDirectory: React.FC = () => {
  const { data, language } = useApp();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const typeTabs = [
    { id: 'all', labelBn: 'সকল স্বাস্থ্যসেবা', labelEn: 'All Health' },
    { id: 'govt_hospital', labelBn: 'সরকারি হাসপাতাল', labelEn: 'Govt Hospital' },
    { id: 'private_hospital', labelBn: 'বেসরকারি হাসপাতাল', labelEn: 'Private Hospital' },
    { id: 'clinic', labelBn: 'ক্লিনিক ও ডায়াগনস্টিক', labelEn: 'Clinic & Diagnostic' },
    { id: 'ambulance', labelBn: 'অ্যাম্বুলেন্স সার্ভিস', labelEn: 'Ambulance' }
  ];

  const upazilaFilters = [
    { id: 'all', labelBn: 'সকল উপজেলা', labelEn: 'All Upazilas' },
    { id: 'সদর', labelBn: 'জয়পুরহাট সদর', labelEn: 'Sadar' },
    { id: 'পাঁচবিবি', labelBn: 'পাঁচবিবি', labelEn: 'Panchbibi' },
    { id: 'কালাই', labelBn: 'কালাই', labelEn: 'Kalai' },
    { id: 'ক্ষেতলাল', labelBn: 'ক্ষেতলাল', labelEn: 'Khetlal' },
    { id: 'আক্কেলপুর', labelBn: 'আক্কেলপুর', labelEn: 'Akkelpur' }
  ];

  const filteredFacilities = data.hospitals.filter(h => {
    if (selectedType !== 'all') {
      if (selectedType === 'clinic' && h.type !== 'clinic' && h.type !== 'diagnostic') return false;
      if (selectedType !== 'clinic' && h.type !== selectedType) return false;
    }
    if (selectedUpazila !== 'all' && h.upazila !== selectedUpazila) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = h.nameBn.toLowerCase().includes(q) || h.nameEn.toLowerCase().includes(q);
      const matchAddr = h.addressBn.toLowerCase().includes(q);
      if (!matchName && !matchAddr) return false;
    }
    return true;
  });

  return (
    <section id="hospitals" className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 dark:bg-rose-950/80 px-3.5 py-1 text-xs font-bold text-rose-700 dark:text-rose-300 mb-3 border border-rose-200/60 dark:border-rose-800/60">
              <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
              <span>{language === 'bn' ? 'চিকিৎসা ও ডায়াগনস্টিক' : 'Healthcare Directory'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'bn' ? 'জয়পুরহাট স্বাস্থ্যসেবা ডিরেক্টরি' : 'Joypurhat Health Services'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {language === 'bn'
                ? 'জেলা আধুনিক হাসপাতাল, উপজেলা স্বাস্থ্য কমপ্লেক্স, ডায়াগনস্টিক ও জরুরি অ্যাম্বুলেন্স সেবা।'
                : 'District modern hospital, upazila healthcare centers, diagnostics and ambulance fleet.'}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={language === 'bn' ? 'হাসপাতাল বা ঠিকানা খুঁজুন...' : 'Search hospital, address...'}
              className="w-full rounded-xl bg-white dark:bg-slate-900 pl-9 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Filter controls */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {typeTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedType === tab.id
                    ? 'bg-rose-600 text-white shadow-xs'
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

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFacilities.map(facility => (
            <div
              key={facility.id}
              id={`hospital-card-${facility.id}`}
              className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-rose-500/40 transition-all duration-200"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400">
                    {facility.type === 'ambulance' ? (
                      <Ambulance className="w-5 h-5" />
                    ) : (
                      <Building2 className="w-5 h-5" />
                    )}
                  </div>

                  <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                    📍 {facility.upazila}
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white line-clamp-1">
                  {language === 'bn' ? facility.nameBn : facility.nameEn}
                </h3>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{language === 'bn' ? facility.addressBn : facility.addressEn}</span>
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{language === 'bn' ? facility.openingHoursBn : facility.openingHoursEn}</span>
                </div>

                {facility.services && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {facility.services.slice(0, 4).map((srv, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] text-slate-600 dark:text-slate-400 font-medium"
                      >
                        {srv}
                      </span>
                    ))}
                    {facility.services.length > 4 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{facility.services.length - 4} আরও
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons: Direct Call & Map Location */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${facility.phone}`}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 py-2.5 px-3 text-xs font-bold text-white shadow-xs transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'কল করুন' : 'Call'}</span>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${facility.mapQuery}, Joypurhat`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 py-2.5 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-sky-500" />
                  <span>{language === 'bn' ? 'ম্যাপে দেখুন' : 'Map'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
