import React from 'react';
import {
  ArrowUp,
  Heart,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { language, setActiveSection, setIsAdminModalOpen } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white font-mono font-black text-sm shadow-md">
                5900
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  JOYPURHAT <span className="text-sky-400">G.P.O</span>
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">
                  পোস্টকোড: ৫৯০০ | জয়পুরহাট জেলা নাগরিক সেবা
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              “জয়পুরহাটের সকল প্রয়োজনীয় সেবা, তথ্য, চাকরি ও সংবাদ — এক ঠিকানায়”
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>জয়পুরহাট প্রধান ডাকঘর চত্বর, জয়পুরহাট সদর — ৫৯০০</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>info@joypurhat5900.portal</span>
              </p>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              {language === 'bn' ? 'প্রধান সেবাসমূহ' : 'Quick Services'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('emergency')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {language === 'bn' ? 'জরুরি হেল্পলাইন ৯৯৯' : 'Emergency 999'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('jobs')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {language === 'bn' ? 'আজকের চাকরির খবর' : 'Jobs Circulars'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('news')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {language === 'bn' ? 'আজকের জয়পুরহাট নিউজ' : 'District News'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('hospitals')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {language === 'bn' ? 'হাসপাতাল ও অ্যাম্বুলেন্স' : 'Hospitals & Health'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('blood')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {language === 'bn' ? 'রক্তদান সেবা' : 'Blood Donors'}
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              {language === 'bn' ? 'উপজেলা ও প্রশাসন' : 'Upazilas & Admin'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('map')}
                  className="hover:text-white transition cursor-pointer"
                >
                  জয়পুরহাট সদর
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('map')}
                  className="hover:text-white transition cursor-pointer"
                >
                  পাঁচবিবি উপজেলা
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('map')}
                  className="hover:text-white transition cursor-pointer"
                >
                  কালাই উপজেলা
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('map')}
                  className="hover:text-white transition cursor-pointer"
                >
                  ক্ষেতলাল উপজেলা
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('map')}
                  className="hover:text-white transition cursor-pointer"
                >
                  আক্কেলপুর উপজেলা
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Admin */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              {language === 'bn' ? 'পোর্টাল এডমিন' : 'Administration'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition font-semibold"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'এডমিন লগইন' : 'Admin Login'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('tourism')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {language === 'bn' ? 'দর্শনীয় স্থানসমূহ' : 'Tourist Places'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('numbers')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {language === 'bn' ? 'গুরুত্বপূর্ণ ফোন নম্বর' : 'Phone Directory'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('govt')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {language === 'bn' ? 'সরকারি অফিসসমূহ' : 'Government Offices'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory User Requirement: Official Platform Disclaimer */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 mb-8">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-slate-200 text-xs mb-1">
                {language === 'bn' ? 'সংবিধিবদ্ধ সতর্কবার্তা ও দায়মুক্তি (Disclaimer):' : 'Platform Notice & Disclaimer:'}
              </h5>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                “এই ওয়েবসাইটটি একটি তথ্য ও সেবা প্ল্যাটফর্ম। সরকারি ওয়েবসাইট নয়। সরকারি তথ্যের ক্ষেত্রে সংশ্লিষ্ট সরকারি উৎস যাচাই করুন।”
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-900">
          <p className="text-[11px] text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} JOYPURHAT 5900 G.P.O Portal. Crafted for the citizens of Joypurhat District, Bangladesh.
          </p>

          <button
            onClick={scrollToTop}
            id="btn-scroll-to-top"
            aria-label="Back to top"
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-2 text-xs border border-slate-800 transition"
          >
            <span>{language === 'bn' ? 'উপরে উঠুন' : 'Back to top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
