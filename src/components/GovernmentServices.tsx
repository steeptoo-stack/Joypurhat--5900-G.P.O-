import React, { useState } from 'react';
import {
  Building2,
  Clock,
  ExternalLink,
  Globe,
  Landmark,
  MapPin,
  Navigation,
  Phone,
  Search,
  CheckCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GovtOffice } from '../types';

export const GovernmentServices: React.FC = () => {
  const { data, language } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOfficeModal, setSelectedOfficeModal] = useState<GovtOffice | null>(null);

  const filteredOffices = data.govtOffices.filter(office => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      office.nameBn.toLowerCase().includes(q) ||
      office.nameEn.toLowerCase().includes(q) ||
      office.category.toLowerCase().includes(q) ||
      office.servicesBn.some(s => s.toLowerCase().includes(q))
    );
  });

  return (
    <section id="govt" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-950/80 px-3.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-3 border border-indigo-200/60 dark:border-indigo-800/60">
              <Landmark className="w-3.5 h-3.5 text-indigo-600" />
              <span>{language === 'bn' ? 'প্রশাসন ও জনসেবা' : 'Public Administration'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'bn' ? 'সরকারি অফিস ও নাগরিক সেবাকেন্দ্র' : 'Government Services Directory'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {language === 'bn'
                ? 'ডিসি অফিস, ভূমি অফিস, বিআরটিএ, পল্লী বিদ্যুৎ, ডাক বিভাগ ও অন্যান্য দপ্তরের নাগরিক সেবাসমূহ।'
                : 'DC Office, Land Office, BRTA, Postal, Palli Bidyut, Police and Citizen Services in Joypurhat.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'অফিস বা সেবা খুঁজুন...' : 'Search office or service...'}
              className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 pl-9 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Office Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffices.map(office => (
            <div
              key={office.id}
              id={`govt-office-${office.id}`}
              className="flex flex-col justify-between rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-6 border border-slate-200/80 dark:border-slate-700/70 shadow-xs hover:shadow-md hover:border-indigo-500/40 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-md bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900">
                    {office.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    📍 {office.upazila}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {language === 'bn' ? office.nameBn : office.nameEn}
                </h3>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{language === 'bn' ? office.addressBn : office.addressEn}</span>
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="line-clamp-1">{language === 'bn' ? office.officeHoursBn : office.officeHoursEn}</span>
                </div>

                {/* Key Available Services */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    {language === 'bn' ? 'প্রদত্ত সেবাসমূহ:' : 'Available Services:'}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {(language === 'bn' ? office.servicesBn : office.servicesEn).slice(0, 3).map((srv, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span className="line-clamp-1">{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons: Call, Map, Website */}
              <div className="mt-6 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
                <a
                  href={`tel:${office.phone}`}
                  className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2.5 px-3 text-xs font-bold text-white shadow-xs transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'কল করুন' : 'Call'}</span>
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${office.mapQuery}, Joypurhat`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-xl bg-slate-200/70 dark:bg-slate-700 p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition"
                  title="Google Maps"
                >
                  <Navigation className="w-4 h-4 text-sky-500" />
                </a>

                {office.website && (
                  <a
                    href={office.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-xl bg-slate-200/70 dark:bg-slate-700 p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition"
                    title="Official Portal"
                  >
                    <Globe className="w-4 h-4 text-emerald-500" />
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
