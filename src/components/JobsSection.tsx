import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  Clock,
  ExternalLink,
  GraduationCap,
  MapPin,
  Search,
  Wallet,
  X,
  Building,
  CheckCircle,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobPost } from '../types';

export const JobsSection: React.FC = () => {
  const { data, language } = useApp();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [activeJobModal, setActiveJobModal] = useState<JobPost | null>(null);

  const jobCategories = [
    { id: 'all', labelBn: 'সকল চাকরি', labelEn: 'All Jobs' },
    { id: 'সরকারি চাকরি', labelBn: 'সরকারি চাকরি', labelEn: 'Govt. Jobs' },
    { id: 'বেসরকারি চাকরি', labelBn: 'বেসরকারি চাকরি', labelEn: 'Private Jobs' },
    { id: 'ব্যাংক চাকরি', labelBn: 'ব্যাংক চাকরি', labelEn: 'Bank Jobs' },
    { id: 'শিক্ষক নিয়োগ', labelBn: 'শিক্ষক নিয়োগ', labelEn: 'Teaching' },
    { id: 'স্বাস্থ্য বিভাগ', labelBn: 'স্বাস্থ্য বিভাগ', labelEn: 'Healthcare' },
    { id: 'জয়পুরহাটের স্থানীয় চাকরি', labelBn: 'জয়পুরহাট স্থানীয়', labelEn: 'Local Joypurhat' }
  ];

  const upazilas = [
    { id: 'all', labelBn: 'সকল উপজেলা', labelEn: 'All Upazilas' },
    { id: 'সদর', labelBn: 'জয়পুরহাট সদর', labelEn: 'Sadar' },
    { id: 'পাঁচবিবি', labelBn: 'পাঁচবিবি', labelEn: 'Panchbibi' },
    { id: 'কালাই', labelBn: 'কালাই', labelEn: 'Kalai' },
    { id: 'ক্ষেতলাল', labelBn: 'ক্ষেতলাল', labelEn: 'Khetlal' },
    { id: 'আক্কেলপুর', labelBn: 'আক্কেলপুর', labelEn: 'Akkelpur' }
  ];

  const filteredJobs = data.jobs.filter(job => {
    if (selectedType !== 'all') {
      if (selectedType === 'জয়পুরহাটের স্থানীয় চাকরি' && !job.isLocal) return false;
      if (selectedType !== 'জয়পুরহাটের স্থানীয় চাকরি' && job.category !== selectedType) return false;
    }
    if (selectedUpazila !== 'all' && job.upazila !== selectedUpazila) {
      return false;
    }
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchTitle = job.titleBn.toLowerCase().includes(q) || job.titleEn.toLowerCase().includes(q);
      const matchCompany = job.companyBn.toLowerCase().includes(q) || job.companyEn.toLowerCase().includes(q);
      const matchEdu = job.educationBn.toLowerCase().includes(q);
      if (!matchTitle && !matchCompany && !matchEdu) return false;
    }
    return true;
  });

  return (
    <section id="jobs" className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-950/80 px-3.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 mb-3 border border-blue-200/60 dark:border-blue-800/60">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'bn' ? 'ক্যারিয়ার ও কর্মসংস্থান' : 'Career Opportunities'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'bn' ? 'আজকের চাকরির খবর' : 'Today’s Job Circulars'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {language === 'bn'
                ? 'জয়পুরহাট জেলা ও জাতীয় পর্যায়ের নিয়মিত সরকারি, বেসরকারি, ব্যাংক ও শিক্ষক নিয়োগ বিজ্ঞপ্তি।'
                : 'Verified local Joypurhat and national job vacancies with direct application links.'}
            </p>
          </div>

          {/* Quick Search in Jobs */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              placeholder={language === 'bn' ? 'চাকরি বা প্রতিষ্ঠান খুঁজুন...' : 'Search jobs or company...'}
              className="w-full rounded-xl bg-white dark:bg-slate-900 pl-9 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="space-y-3 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              {language === 'bn' ? 'ধরন:' : 'Type:'}
            </span>
            {jobCategories.map(cat => (
              <button
                key={cat.id}
                id={`filter-job-cat-${cat.id}`}
                onClick={() => setSelectedType(cat.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedType === cat.id
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {language === 'bn' ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Upazila Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {language === 'bn' ? 'উপজেলা:' : 'Upazila:'}
            </span>
            {upazilas.map(up => (
              <button
                key={up.id}
                id={`filter-job-upazila-${up.id}`}
                onClick={() => setSelectedUpazila(up.id)}
                className={`rounded-lg px-3 py-1 text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedUpazila === up.id
                    ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-bold'
                    : 'bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {language === 'bn' ? up.labelBn : up.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs Cards Grid */}
        {filteredJobs.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-12 text-center border border-slate-200 dark:border-slate-800">
            <Briefcase className="mx-auto h-12 w-12 text-slate-400 mb-3" />
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'কোনো চাকরির বিজ্ঞপ্তি পাওয়া যায়নি' : 'No job circulars found'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'bn' ? 'অন্য ক্যাটাগরি বা উপজেলা নির্বাচন করুন।' : 'Try changing your filter criteria.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.map(job => (
              <div
                key={job.id}
                id={`job-card-${job.id}`}
                className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-sky-500/40 transition-all duration-200"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="rounded-md bg-sky-50 dark:bg-sky-950/70 px-2.5 py-0.5 text-[11px] font-bold text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-900">
                      {job.category}
                    </span>
                    {job.isLocal && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                        <MapPin className="w-2.5 h-2.5" />
                        {language === 'bn' ? `জয়পুরহাট (${job.upazila})` : `Joypurhat (${job.upazila})`}
                      </span>
                    )}
                  </div>

                  {/* Title & Company */}
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-1">
                    {language === 'bn' ? job.titleBn : job.titleEn}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-300 line-clamp-1 flex items-center gap-1">
                    <Building className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{language === 'bn' ? job.companyBn : job.companyEn}</span>
                  </p>

                  {/* Key Info Badges */}
                  <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <span className="line-clamp-1">
                        <strong>{language === 'bn' ? 'যোগ্যতা: ' : 'Edu: '}</strong>
                        {language === 'bn' ? job.educationBn : job.educationEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="font-medium text-emerald-700 dark:text-emerald-400">
                        {language === 'bn' ? job.salaryBn : job.salaryEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="font-semibold text-red-600 dark:text-red-400">
                        {language === 'bn' ? 'শেষ তারিখ: ' : 'Deadline: '}
                        {job.deadline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => setActiveJobModal(job)}
                    className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 transition"
                  >
                    {language === 'bn' ? 'বিস্তারিত' : 'Details'}
                  </button>

                  {job.applyUrl && (
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 rounded-xl bg-sky-600 hover:bg-sky-500 px-3 py-2 text-xs font-bold text-white shadow-xs transition"
                    >
                      <span>{language === 'bn' ? 'আবেদন' : 'Apply'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {activeJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveJobModal(null)}
              className="absolute right-4 top-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block rounded-md bg-sky-100 dark:bg-sky-950 px-2.5 py-0.5 text-xs font-bold text-sky-700 dark:text-sky-300 mb-2">
              {activeJobModal.category}
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {language === 'bn' ? activeJobModal.titleBn : activeJobModal.titleEn}
            </h3>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">
              {language === 'bn' ? activeJobModal.companyBn : activeJobModal.companyEn} • {activeJobModal.upazila}
            </p>

            <div className="grid grid-cols-2 gap-3 my-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs">
              <div>
                <span className="text-slate-400 block">{language === 'bn' ? 'বেতন কাঠামো:' : 'Salary:'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {language === 'bn' ? activeJobModal.salaryBn : activeJobModal.salaryEn}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">{language === 'bn' ? 'আবেদনের শেষ তারিখ:' : 'Deadline:'}</span>
                <span className="font-bold text-red-600 dark:text-red-400">{activeJobModal.deadline}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{language === 'bn' ? 'শিক্ষাগত যোগ্যতা:' : 'Education:'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {language === 'bn' ? activeJobModal.educationBn : activeJobModal.educationEn}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">{language === 'bn' ? 'পদ সংখ্যা:' : 'Vacancies:'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{activeJobModal.vacancies || 'উল্লেখ নেই'}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                {language === 'bn' ? 'কাজের বিবরণ ও শর্তাবলী:' : 'Job Description & Requirements:'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {language === 'bn' ? activeJobModal.descriptionBn : activeJobModal.descriptionEn}
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              {activeJobModal.applyUrl && (
                <a
                  href={activeJobModal.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-500 py-2.5 text-sm font-bold text-white shadow-md transition"
                >
                  <span>{language === 'bn' ? 'আবেদন লিংকে যান' : 'Go to Application'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => setActiveJobModal(null)}
                className="rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
