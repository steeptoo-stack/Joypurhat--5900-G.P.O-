import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle,
  Droplet,
  HeartHandshake,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  UserCheck,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BloodDonor, BloodGroup, Upazila } from '../types';

export const BloodDonorSection: React.FC = () => {
  const { data, registerBloodDonor, language } = useApp();
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('all');
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

  // Registration form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [upazila, setUpazila] = useState<Upazila>('সদর');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [consentPublic, setConsentPublic] = useState(true);

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const upazilaList: Upazila[] = ['সদর', 'পাঁচবিবি', 'কালাই', 'ক্ষেতলাল', 'আক্কেলপুর'];

  const filteredDonors = data.bloodDonors.filter(donor => {
    if (selectedGroup !== 'all' && donor.bloodGroup !== selectedGroup) return false;
    if (selectedUpazila !== 'all' && donor.upazila !== selectedUpazila) return false;
    return true;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    registerBloodDonor({
      nameBn: name.trim(),
      bloodGroup,
      upazila,
      phone: phone.trim(),
      lastDonationDate: lastDonationDate || '৩ মাসের বেশি আগে',
      available: true
    });

    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
      setIsRegisterOpen(false);
      setName('');
      setPhone('');
      setLastDonationDate('');
    }, 2000);
  };

  return (
    <section id="blood" className="py-16 bg-gradient-to-b from-slate-50 to-red-50/40 dark:from-slate-950 dark:to-red-950/20 border-b border-slate-200/60 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-100 dark:bg-red-950/80 px-3.5 py-1 text-xs font-bold text-red-700 dark:text-red-300 mb-3 border border-red-200/60 dark:border-red-800/60">
              <Droplet className="w-3.5 h-3.5 text-red-600 fill-current" />
              <span>{language === 'bn' ? 'জীবন রক্ষায় রক্তদান' : 'Blood Donation Service'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'bn' ? 'জয়পুরহাট রক্তদান ও রক্তদাতা ডিরেক্টরি' : 'Joypurhat Blood Donors'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {language === 'bn'
                ? 'জরুরি রক্তের প্রয়োজনে রক্তের গ্রুপ ও উপজেলা অনুযায়ী সেচ্ছাসেবী রক্তদাতাদের তালিকা।'
                : 'Find volunteer blood donors across Joypurhat by blood group and upazila.'}
            </p>
          </div>

          {/* Add Donor Registration CTA */}
          <button
            onClick={() => setIsRegisterOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-red-600/25 transition cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'bn' ? 'রক্তদাতা হিসেবে যুক্ত হোন' : 'Join as Blood Donor'}</span>
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-8">
          {/* Blood Group Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedGroup('all')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                selectedGroup === 'all'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {language === 'bn' ? 'সকল গ্রুপ' : 'All Groups'}
            </button>
            {bloodGroups.map(group => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`flex items-center gap-1 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                  selectedGroup === group
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Droplet className="w-3 h-3 text-red-500 fill-current" />
                <span>{group}</span>
              </button>
            ))}
          </div>

          {/* Upazila filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 shrink-0">উপজেলা:</span>
            <button
              onClick={() => setSelectedUpazila('all')}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                selectedUpazila === 'all'
                  ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {language === 'bn' ? 'সকল উপজেলা' : 'All'}
            </button>
            {upazilaList.map(up => (
              <button
                key={up}
                onClick={() => setSelectedUpazila(up)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                  selectedUpazila === up
                    ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-bold'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {up}
              </button>
            ))}
          </div>
        </div>

        {/* Donors Cards */}
        {filteredDonors.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-12 text-center border border-slate-200 dark:border-slate-800">
            <Droplet className="mx-auto h-12 w-12 text-red-400 mb-3" />
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'এই গ্রুপের রক্তদাতা বর্তমানে তালিকায় নেই' : 'No donors found for this selection'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'bn' ? 'আপনি এই গ্রুপের হলে আজই রক্তদাতা হিসেবে নিবন্ধিত হোন।' : 'Please consider joining as a donor.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredDonors.map(donor => (
              <div
                key={donor.id}
                id={`donor-card-${donor.id}`}
                className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-red-400/50 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    {/* Big Blood Badge */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white font-black text-base shadow-sm">
                      {donor.bloodGroup}
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                        <ShieldCheck className="w-3 h-3" />
                        <span>রক্তদানে প্রস্তুত</span>
                      </span>
                      <span className="block text-[11px] text-slate-400 mt-0.5">
                        📍 {donor.upazila}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {donor.nameBn || donor.name}
                  </h3>

                  <div className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>শেষ রক্তদান: {donor.lastDonationDate}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={`tel:${donor.phone}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 py-2.5 px-4 text-xs font-bold text-white shadow-xs transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? '📞 যোগাযোগ করুন' : '📞 Contact Donor'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Privacy Note */}
        <div className="mt-8 rounded-xl bg-white dark:bg-slate-900 p-4 text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <p>
            {language === 'bn'
              ? 'গোপনীয়তা সুরক্ষা: এই তালিকার রক্তদাতাগণ স্বেচ্ছায় মানবসেবায় তাদের যোগাযোগ নম্বর প্রকাশে সম্মতি প্রদান করেছেন। অযথা কাউকে বিরক্ত করা আইনত দণ্ডনীয়।'
              : 'Privacy Protected: All listed donors have voluntarily consented to share their contact information to save lives in medical emergencies.'}
          </p>
        </div>
      </div>

      {/* Registration Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setIsRegisterOpen(false)}
              className="absolute right-4 top-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-red-600 mb-2">
              <Droplet className="w-5 h-5 fill-current" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'bn' ? 'স্বেচ্ছাসেবী রক্তদাতা নিবন্ধন' : 'Volunteer Donor Registration'}
              </h3>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {language === 'bn'
                ? 'জয়পুরহাটের মানুষের জরুরি চিকিৎসায় রক্তদানে সহায়তা করতে আপনার তথ্য যুক্ত করুন।'
                : 'Join the Joypurhat life-saving donor registry.'}
            </p>

            {registerSuccess ? (
              <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/60 p-4 text-center border border-emerald-200 dark:border-emerald-800">
                <CheckCircle className="mx-auto w-8 h-8 text-emerald-600 mb-2" />
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                  {language === 'bn' ? 'নিবন্ধন সফল হয়েছে!' : 'Registered Successfully!'}
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                  {language === 'bn' ? 'ধন্যবাদ আপনার মহান আত্মত্যাগের জন্য।' : 'Thank you for your life-saving service.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? 'আপনার নাম' : 'Your Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="যেমন: মোঃ কামরুল ইসলাম"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group'} *
                    </label>
                    <select
                      value={bloodGroup}
                      onChange={e => setBloodGroup(e.target.value as BloodGroup)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                    >
                      {bloodGroups.map(bg => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {language === 'bn' ? 'উপজেলা' : 'Upazila'} *
                    </label>
                    <select
                      value={upazila}
                      onChange={e => setUpazila(e.target.value as Upazila)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                    >
                      {upazilaList.map(up => (
                        <option key={up} value={up}>
                          {up}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {language === 'bn' ? 'সর্বশেষ রক্তদানের তারিখ' : 'Last Donation Date'}
                  </label>
                  <input
                    type="text"
                    value={lastDonationDate}
                    onChange={e => setLastDonationDate(e.target.value)}
                    placeholder="যেমন: ৩ মাস আগে / কখনও দেইনি"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="consent-check"
                    required
                    checked={consentPublic}
                    onChange={e => setConsentPublic(e.target.checked)}
                    className="mt-0.5 rounded text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="consent-check" className="text-[11px] text-slate-600 dark:text-slate-400">
                    {language === 'bn'
                      ? 'আমি স্বেচ্ছায় রক্তের প্রয়োজনে রোগীদের সাথে যোগাযোগ করতে আমার ফোন নম্বর প্রদর্শনে সম্মতি দিচ্ছি।'
                      : 'I consent to displaying my contact phone number for blood donation requests.'}
                  </label>
                </div>

                <div className="flex gap-2 pt-3">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-red-600 hover:bg-red-500 py-2.5 text-xs font-bold text-white shadow-md transition"
                  >
                    {language === 'bn' ? 'নিবন্ধন সম্পন্ন করুন' : 'Submit Registration'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRegisterOpen(false)}
                    className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {language === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
