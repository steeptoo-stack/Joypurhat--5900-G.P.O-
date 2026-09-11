import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle,
  Database,
  Droplet,
  HeartPulse,
  KeyRound,
  Lock,
  LogOut,
  Newspaper,
  PhoneCall,
  Plus,
  RefreshCw,
  Trash2,
  X,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BloodGroup, EmergencyContact, Upazila } from '../types';

export const AdminModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    isAdminLoggedIn,
    verifyAdminCode,
    adminLogout,
    data,
    addNews,
    deleteNews,
    addJob,
    deleteJob,
    addEmergencyContact,
    deleteEmergencyContact,
    deleteBloodDonor,
    approveBloodDonor,
    resetToDefaultData,
    language
  } = useApp();

  const [inputCode, setInputCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'news' | 'jobs' | 'emergency' | 'donors' | 'system'>('news');
  const [toastMessage, setToastMessage] = useState('');

  // Form states for News
  const [newsTitleBn, setNewsTitleBn] = useState('');
  const [newsSummaryBn, setNewsSummaryBn] = useState('');
  const [newsContentBn, setNewsContentBn] = useState('');
  const [newsCategory, setNewsCategory] = useState('কৃষি');
  const [newsUpazila, setNewsUpazila] = useState<Upazila>('সদর');
  const [newsImage, setNewsImage] = useState('https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=800&auto=format&fit=crop&q=80');

  // Form states for Jobs
  const [jobTitleBn, setJobTitleBn] = useState('');
  const [jobCompanyBn, setJobCompanyBn] = useState('');
  const [jobCategory, setJobCategory] = useState('সরকারি চাকরি');
  const [jobUpazila, setJobUpazila] = useState<Upazila>('সদর');
  const [jobEducationBn, setJobEducationBn] = useState('স্নাতক / সমমান');
  const [jobSalaryBn, setJobSalaryBn] = useState('স্কেল অনুযায়ী');
  const [jobDeadline, setJobDeadline] = useState('২০২৬-০৫-১৫');
  const [jobApplyUrl, setJobApplyUrl] = useState('http://joypurhat.gov.bd');

  // Form states for Emergency Contact
  const [emNameBn, setEmNameBn] = useState('');
  const [emNumber, setEmNumber] = useState('');
  const [emCategory, setEmCategory] = useState<EmergencyContact['category']>('police');
  const [emDescBn, setEmDescBn] = useState('');

  if (!isAdminModalOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = await verifyAdminCode(inputCode);
    if (!success) {
      setAuthError(language === 'bn' ? 'ভুল এক্সেস কোড! সঠিক কোড প্রদান করুন।' : 'Invalid Admin Passcode.');
    } else {
      setInputCode('');
      showToast(language === 'bn' ? 'এডমিন হিসেবে সফলভাবে প্রবেশ করেছেন!' : 'Admin access granted!');
    }
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitleBn.trim()) return;

    addNews({
      titleBn: newsTitleBn,
      titleEn: newsTitleBn,
      summaryBn: newsSummaryBn,
      summaryEn: newsSummaryBn,
      contentBn: newsContentBn || newsSummaryBn,
      contentEn: newsContentBn || newsSummaryBn,
      category: newsCategory,
      upazila: newsUpazila,
      date: new Date().toISOString().split('T')[0],
      time: '১০:৩০ AM',
      imageUrl: newsImage,
      source: 'এডমিন প্রকাশিত',
      isDemo: false
    });

    setNewsTitleBn('');
    setNewsSummaryBn('');
    setNewsContentBn('');
    showToast('নতুন সংবাদ সফলভাবে যুক্ত হয়েছে!');
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitleBn.trim()) return;

    addJob({
      titleBn: jobTitleBn,
      titleEn: jobTitleBn,
      companyBn: jobCompanyBn,
      companyEn: jobCompanyBn,
      category: jobCategory,
      upazila: jobUpazila,
      educationBn: jobEducationBn,
      educationEn: jobEducationBn,
      salaryBn: jobSalaryBn,
      salaryEn: jobSalaryBn,
      deadline: jobDeadline,
      descriptionBn: `${jobTitleBn} - ${jobCompanyBn}`,
      descriptionEn: `${jobTitleBn} - ${jobCompanyBn}`,
      postedDate: new Date().toISOString().split('T')[0],
      isLocal: true,
      applyUrl: jobApplyUrl
    });

    setJobTitleBn('');
    setJobCompanyBn('');
    showToast('নতুন চাকরির সার্কুলার সফলভাবে যুক্ত হয়েছে!');
  };

  const handleCreateEmergency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emNameBn.trim() || !emNumber.trim()) return;

    addEmergencyContact({
      nameBn: emNameBn,
      nameEn: emNameBn,
      number: emNumber,
      category: emCategory,
      descriptionBn: emDescBn,
      descriptionEn: emDescBn,
      verified: true,
      isNational: false
    });

    setEmNameBn('');
    setEmNumber('');
    setEmDescBn('');
    showToast('জরুরি নম্বর সফলভাবে যুক্ত হয়েছে!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                JOYPURHAT 5900 G.P.O — {language === 'bn' ? 'এডমিন কন্ট্রোল প্যানেল' : 'Admin Control Panel'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isAdminLoggedIn
                  ? language === 'bn' ? 'অনুমোদিত এডমিন সেশন সক্রিয়' : 'Authenticated Admin Session Active'
                  : language === 'bn' ? 'সুরক্ষিত এক্সেস — পাসকোড প্রয়োজন' : 'Secure Access — Passcode Required'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={adminLogout}
                title="Logout"
                className="flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/60 px-3 py-1.5 rounded-lg transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
              </button>
            )}

            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast alert */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center">
            {toastMessage}
          </div>
        )}

        {/* Not Logged In: Passcode Prompt */}
        {!isAdminLoggedIn ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-300 mb-4">
              <KeyRound className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'bn' ? 'এডমিন কোড লিখুন' : 'Enter Admin Passcode'}
            </h4>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {language === 'bn'
                ? 'এই পোর্টালের তথ্য শুধুমাত্র নিবন্ধিত জেলা এডমিন আপডেট করতে পারেন।'
                : 'Enter your authorization code to access administrative controls.'}
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-3">
              <input
                type="password"
                required
                value={inputCode}
                onChange={e => setInputCode(e.target.value)}
                placeholder="গোপন এডমিন কোড লিখুন..."
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-center text-sm font-mono tracking-widest text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />

              {authError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-red-600 dark:text-red-400">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-sky-600 hover:bg-sky-500 py-3 text-sm font-bold text-white shadow-md transition"
              >
                {language === 'bn' ? 'যাচাই করে প্রবেশ করুন' : 'Verify & Sign In'}
              </button>
            </form>
          </div>
        ) : (
          /* Logged In: Full Admin Dashboard */
          <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full sm:w-48 bg-slate-50 dark:bg-slate-850 p-3 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 flex sm:flex-col gap-1 overflow-x-auto sm:overflow-x-visible shrink-0">
              <button
                onClick={() => setActiveTab('news')}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold whitespace-nowrap transition ${
                  activeTab === 'news'
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Newspaper className="w-3.5 h-3.5" />
                <span>সংবাদ ব্যবস্থাপনা ({data.news.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('jobs')}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold whitespace-nowrap transition ${
                  activeTab === 'jobs'
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>চাকরির বিজ্ঞপ্তি ({data.jobs.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('emergency')}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold whitespace-nowrap transition ${
                  activeTab === 'emergency'
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>জরুরি নম্বর ({data.emergencyContacts.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('donors')}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold whitespace-nowrap transition ${
                  activeTab === 'donors'
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Droplet className="w-3.5 h-3.5" />
                <span>রক্তদাতা তালিকা ({data.bloodDonors.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('system')}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold whitespace-nowrap transition ${
                  activeTab === 'system'
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>ডাটাবেস ও সিস্টেম</span>
              </button>
            </div>

            {/* Tab Panels */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Tab 1: News Management */}
              {activeTab === 'news' && (
                <div className="space-y-6">
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-5 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-sky-500" />
                      <span>নতুন জেলা সংবাদ প্রকাশ করুন</span>
                    </h4>
                    <form onSubmit={handleCreateNews} className="space-y-3 text-xs">
                      <div>
                        <label className="block font-semibold mb-1">শিরোনাম *</label>
                        <input
                          type="text"
                          required
                          value={newsTitleBn}
                          onChange={e => setNewsTitleBn(e.target.value)}
                          placeholder="যেমন: জয়পুরহাটে নতুন কৃষি প্রণোদনা কর্মসূচি উদ্বোধন"
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold mb-1">ক্যাটাগরি</label>
                          <select
                            value={newsCategory}
                            onChange={e => setNewsCategory(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800"
                          >
                            {['কৃষি', 'স্বাস্থ্য', 'শিক্ষা', 'সরকারি ঘোষণা', 'স্থানীয় ঘটনা', 'খেলাধুলা'].map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">উপজেলা</label>
                          <select
                            value={newsUpazila}
                            onChange={e => setNewsUpazila(e.target.value as Upazila)}
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800"
                          >
                            {['সদর', 'পাঁচবিবি', 'কালাই', 'ক্ষেতলাল', 'আক্কেলপুর'].map(u => (
                              <option key={u} value={u}>{u}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">সংক্ষিপ্ত বিবরণ *</label>
                        <textarea
                          rows={2}
                          required
                          value={newsSummaryBn}
                          onChange={e => setNewsSummaryBn(e.target.value)}
                          placeholder="সংবাদের সারসংক্ষেপ লিখুন..."
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800"
                        />
                      </div>

                      <button
                        type="submit"
                        className="rounded-xl bg-sky-600 hover:bg-sky-500 px-5 py-2.5 text-xs font-bold text-white shadow-xs"
                      >
                        সংবাদ প্রকাশ করুন
                      </button>
                    </form>
                  </div>

                  {/* List of News Articles */}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
                      প্রকাশিত সংবাদ তালিকা
                    </h4>
                    <div className="space-y-2">
                      {data.news.map(n => (
                        <div
                          key={n.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs"
                        >
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {n.titleBn}
                            </span>
                            <span className="text-slate-400 text-[11px]">
                              {n.category} • {n.upazila} • {n.date}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              deleteNews(n.id);
                              showToast('সংবাদটি মুছে ফেলা হয়েছে');
                            }}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/60"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Jobs Management */}
              {activeTab === 'jobs' && (
                <div className="space-y-6">
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-5 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-blue-500" />
                      <span>নতুন চাকরির সার্কুলার যোগ করুন</span>
                    </h4>
                    <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold mb-1">পদের নাম *</label>
                          <input
                            type="text"
                            required
                            value={jobTitleBn}
                            onChange={e => setJobTitleBn(e.target.value)}
                            placeholder="যেমন: ফিল্ড অফিসার / নার্স"
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">প্রতিষ্ঠান *</label>
                          <input
                            type="text"
                            required
                            value={jobCompanyBn}
                            onChange={e => setJobCompanyBn(e.target.value)}
                            placeholder="যেমন: জেলা স্বাস্থ্য বিভাগ"
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block font-semibold mb-1">ক্যাটাগরি</label>
                          <select
                            value={jobCategory}
                            onChange={e => setJobCategory(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800"
                          >
                            {['সরকারি চাকরি', 'বেসরকারি চাকরি', 'ব্যাংক চাকরি', 'শিক্ষক নিয়োগ', 'স্বাস্থ্য বিভাগ', 'জয়পুরহাটের স্থানীয় চাকরি'].map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">উপজেলা</label>
                          <select
                            value={jobUpazila}
                            onChange={e => setJobUpazila(e.target.value as Upazila)}
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800"
                          >
                            {['সদর', 'পাঁচবিবি', 'কালাই', 'ক্ষেতলাল', 'আক্কেলপুর'].map(u => (
                              <option key={u} value={u}>{u}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">শেষ তারিখ</label>
                          <input
                            type="date"
                            value={jobDeadline}
                            onChange={e => setJobDeadline(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white shadow-xs"
                      >
                        সার্কুলার প্রকাশ করুন
                      </button>
                    </form>
                  </div>

                  {/* List of Jobs */}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
                      চলতি চাকরির তালিকা
                    </h4>
                    <div className="space-y-2">
                      {data.jobs.map(j => (
                        <div
                          key={j.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs"
                        >
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {j.titleBn} — {j.companyBn}
                            </span>
                            <span className="text-slate-400 text-[11px]">
                              {j.category} • শেষ তারিখ: {j.deadline}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              deleteJob(j.id);
                              showToast('সার্কুলারটি মুছে ফেলা হয়েছে');
                            }}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/60"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Emergency Contacts */}
              {activeTab === 'emergency' && (
                <div className="space-y-6">
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-5 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-red-500" />
                      <span>নতুন জরুরি হটলাইন যুক্ত করুন</span>
                    </h4>
                    <form onSubmit={handleCreateEmergency} className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold mb-1">সেবার নাম *</label>
                          <input
                            type="text"
                            required
                            value={emNameBn}
                            onChange={e => setEmNameBn(e.target.value)}
                            placeholder="যেমন: জয়পুরহাট ট্রাফিক নিয়ন্ত্রণ রুম"
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">ফোন নম্বর *</label>
                          <input
                            type="text"
                            required
                            value={emNumber}
                            onChange={e => setEmNumber(e.target.value)}
                            placeholder="যেমন: 01320-XXXXXX বা 999"
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">বিবরণ</label>
                        <input
                          type="text"
                          value={emDescBn}
                          onChange={e => setEmDescBn(e.target.value)}
                          placeholder="২৪ ঘণ্টা জরুরি সহায়তা"
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800"
                        />
                      </div>

                      <button
                        type="submit"
                        className="rounded-xl bg-red-600 hover:bg-red-500 px-5 py-2.5 text-xs font-bold text-white shadow-xs"
                      >
                        হটলাইন যুক্ত করুন
                      </button>
                    </form>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
                      জরুরি নম্বর তালিকা
                    </h4>
                    <div className="space-y-2">
                      {data.emergencyContacts.map(c => (
                        <div
                          key={c.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs"
                        >
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {c.nameBn}
                            </span>
                            <span className="text-red-600 dark:text-red-400 font-mono font-bold">
                              {c.number}
                            </span>
                          </div>
                          {!c.isNational && (
                            <button
                              onClick={() => {
                                deleteEmergencyContact(c.id);
                                showToast('নম্বরটি মুছে ফেলা হয়েছে');
                              }}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/60"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Donors Management */}
              {activeTab === 'donors' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    রক্তদাতা নিবন্ধন ও অনুমোদন ({data.bloodDonors.length})
                  </h4>
                  <div className="space-y-2">
                    {data.bloodDonors.map(donor => (
                      <div
                        key={donor.id}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-red-600 text-white font-bold px-2 py-0.5 text-[10px]">
                              {donor.bloodGroup}
                            </span>
                            <span className="font-bold text-slate-900 dark:text-white">
                              {donor.nameBn || donor.name}
                            </span>
                            <span className="text-slate-400">({donor.upazila})</span>
                          </div>
                          <span className="text-slate-500 font-mono text-[11px] block mt-1">
                            মোবাইল: {donor.phone} • শেষ রক্তদান: {donor.lastDonationDate}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              deleteBloodDonor(donor.id);
                              showToast('রক্তদাতার তথ্য মোছা হয়েছে');
                            }}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/60"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: System & Reset */}
              {activeTab === 'system' && (
                <div className="space-y-6">
                  <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 p-5 border border-amber-200 dark:border-amber-800/60">
                    <h4 className="font-bold text-sm text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>ডিফল্ট তথ্য রিসেট (Reset to Initial Data)</span>
                    </h4>
                    <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed mb-4">
                      পোর্টালটির সকল তথ্য প্রাথমিক ভেরিফাইড জয়পুরহাট জেলা ডাটাবেসে ফিরিয়ে নিতে নিচের বাটনে চাপুন।
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('আপনি কি নিশ্চিত যে সকল তথ্য প্রাথমিক অবস্থায় রিসেট করতে চান?')) {
                          resetToDefaultData();
                          showToast('সফলভাবে প্রাথমিক ডাটায় রিসেট করা হয়েছে');
                        }
                      }}
                      className="rounded-xl bg-amber-600 hover:bg-amber-500 px-4 py-2.5 text-xs font-bold text-white shadow-xs"
                    >
                      রিসেট করুন
                    </button>
                  </div>

                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-5 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                    <h4 className="font-bold text-slate-900 dark:text-white">ভবিষ্যত ক্লাউড ডাটাবেস ইন্টিগ্রেশন নোট</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      বর্তমানে পোর্টালটি ব্রাউজারের সুরক্ষিত লোকাল ও সেশন স্টোরেজে পরিচালিত হচ্ছে। পরবর্তীতে রিমোট ব্যাকএন্ড (Firebase / Supabase) সংযোগের জন্য ডাটা মডেল তৈরি করা রয়েছে।
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
