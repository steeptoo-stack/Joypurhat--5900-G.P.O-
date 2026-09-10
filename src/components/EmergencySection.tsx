import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Flame,
  PhoneCall,
  Shield,
  Zap,
  Landmark,
  Scale,
  Phone,
  HeartHandshake,
  Car,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EmergencyContact } from '../types';

export const EmergencySection: React.FC = () => {
  const { data, language } = useApp();
  const [filter, setFilter] = useState<'all' | 'national' | 'local'>('all');

  const filteredContacts = data.emergencyContacts.filter(c => {
    if (filter === 'national') return c.isNational;
    if (filter === 'local') return !c.isNational;
    return true;
  });

  const getEmergencyIcon = (cat: string) => {
    switch (cat) {
      case 'police':
        return Shield;
      case 'fire':
        return Flame;
      case 'utility':
        return Zap;
      case 'legal':
        return Scale;
      default:
        return PhoneCall;
    }
  };

  return (
    <section id="emergency" className="py-16 bg-gradient-to-b from-red-50/50 via-white to-slate-50 dark:from-red-950/20 dark:via-slate-900 dark:to-slate-950 border-y border-red-100/60 dark:border-red-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-100 dark:bg-red-950/80 px-3 py-1 text-xs font-bold text-red-700 dark:text-red-300 mb-3">
              <PhoneCall className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>{language === 'bn' ? '২৪ ঘণ্টা সক্রিয় হটলাইন' : '24/7 Active Hotlines'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'bn' ? 'জরুরি প্রয়োজনে' : 'Emergency Services & Hotlines'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              {language === 'bn'
                ? 'জাতীয় ও জয়পুরহাট জেলা পর্যায়ের সার্বক্ষণিক ভেরিফাইড জরুরি নম্বর। সরাসরি ফোনে কথা বলতে "কল করুন" চাপুন।'
                : 'Verified national and Joypurhat district emergency phone numbers with one-tap instant calling.'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {language === 'bn' ? 'সকল নম্বর' : 'All'}
            </button>
            <button
              onClick={() => setFilter('national')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === 'national'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {language === 'bn' ? 'জাতীয় হটলাইন' : 'National'}
            </button>
            <button
              onClick={() => setFilter('local')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === 'local'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {language === 'bn' ? 'জয়পুরহাট স্থানীয়' : 'Joypurhat Local'}
            </button>
          </div>
        </div>

        {/* Emergency Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredContacts.map(contact => {
            const Icon = getEmergencyIcon(contact.category);
            const isPriority = contact.number === '999' || contact.number === '102' || contact.number === '01730-324545';

            return (
              <div
                key={contact.id}
                id={`emergency-card-${contact.id}`}
                className={`group relative flex flex-col justify-between rounded-2xl p-5 transition-all duration-200 ${
                  isPriority
                    ? 'bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-lg shadow-red-600/20 ring-2 ring-red-500/50'
                    : 'bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700/70 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl font-bold ${
                        isPriority
                          ? 'bg-white/20 text-white'
                          : 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1">
                      {contact.verified ? (
                        <span
                          title={language === 'bn' ? 'তথ্য যাচাইকৃত' : 'Verified Info'}
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold ${
                            isPriority
                              ? 'bg-white/20 text-white'
                              : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{language === 'bn' ? 'ভেরিফাইড' : 'Verified'}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{language === 'bn' ? 'তথ্য যাচাই প্রয়োজন' : 'Verification Needed'}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className={`font-bold text-base sm:text-lg leading-snug line-clamp-1 ${
                      isPriority ? 'text-white' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {language === 'bn' ? contact.nameBn : contact.nameEn}
                  </h3>

                  <p
                    className={`mt-1.5 text-xs leading-relaxed line-clamp-2 ${
                      isPriority ? 'text-red-100' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {language === 'bn' ? contact.descriptionBn : contact.descriptionEn}
                  </p>
                </div>

                {/* Big Number & Large Direct Call Button */}
                <div className="mt-5 pt-3 border-t border-black/5 dark:border-white/10">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-wider font-semibold opacity-70">
                      {language === 'bn' ? 'হেল্পলাইন নম্বর' : 'Helpline'}
                    </span>
                    <span
                      className={`text-xl sm:text-2xl font-black font-mono tracking-tight ${
                        isPriority ? 'text-amber-300' : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {contact.number}
                    </span>
                  </div>

                  <a
                    id={`btn-call-${contact.number.replace(/[^0-9]/g, '')}`}
                    href={`tel:${contact.number}`}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-sm font-bold shadow-md transition transform active:scale-95 ${
                      isPriority
                        ? 'bg-white text-red-700 hover:bg-red-50 shadow-black/20'
                        : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/20'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>{language === 'bn' ? '📞 কল করুন' : '📞 Call Now'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Note */}
        <div className="mt-8 rounded-xl bg-slate-100 dark:bg-slate-800/60 p-4 text-center text-xs text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
          <p>
            {language === 'bn'
              ? '📌 সতর্কতা: যেকোনো জরুরি পরিস্থিতিতে অবিলম্বে সংশ্লিষ্ট হটলাইনে সরাসরি কল করুন। এই সেবাসমূহ সার্বক্ষণিক সচল।'
              : '📌 Notice: In any critical emergency, immediately dial the verified hotline directly. These hotlines operate 24/7.'}
          </p>
        </div>
      </div>
    </section>
  );
};
