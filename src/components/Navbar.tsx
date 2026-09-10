import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  HeartPulse,
  Home,
  Lock,
  Menu,
  Moon,
  Newspaper,
  PhoneCall,
  Search,
  Sun,
  X,
  Layers,
  Phone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PWAInstallButton } from './PWAInstallButton';

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    language,
    toggleLanguage,
    activeSection,
    setActiveSection,
    setIsSearchModalOpen,
    setIsAdminModalOpen,
    isAdminLoggedIn
  } = useApp();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', labelBn: 'হোম', labelEn: 'Home', icon: Home },
    { id: 'services', labelBn: 'সেবাসমূহ', labelEn: 'Services', icon: Layers },
    { id: 'jobs', labelBn: 'চাকরি', labelEn: 'Jobs', icon: Briefcase },
    { id: 'news', labelBn: 'নিউজ', labelEn: 'News', icon: Newspaper },
    { id: 'emergency', labelBn: 'জরুরি নম্বর', labelEn: 'Emergency', icon: PhoneCall },
    { id: 'hospitals', labelBn: 'হাসপাতাল', labelEn: 'Health', icon: HeartPulse },
    { id: 'education', labelBn: 'শিক্ষা', labelEn: 'Education', icon: GraduationCap },
    { id: 'numbers', labelBn: 'যোগাযোগ', labelEn: 'Contact', icon: Phone }
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80'
          : 'bg-white/95 dark:bg-slate-900/95 border-b border-slate-100 dark:border-slate-800'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-18">
        {/* Brand Logo */}
        <button
          id="btn-brand-logo"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-sm tracking-wider font-mono">5900</span>
            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-amber-500 border-2 border-white dark:border-slate-900" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
              JOYPURHAT <span className="text-sky-600 dark:text-sky-400">G.P.O</span>
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none">
              {language === 'bn' ? 'জয়পুরহাট জেলা নাগরিক সেবা' : 'Citizen Service Portal — 5900'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
          {navItems.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-semibold dark:bg-sky-950/80 dark:text-sky-300'
                    : 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {language === 'bn' ? item.labelBn : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Global Search Trigger */}
          <button
            id="btn-search-trigger"
            onClick={() => setIsSearchModalOpen(true)}
            aria-label="Search"
            className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 transition-all hover:border-slate-300"
          >
            <Search className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span className="hidden md:inline font-medium">
              {language === 'bn' ? 'অনুসন্ধান...' : 'Search...'}
            </span>
            <kbd className="hidden lg:inline text-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-1 rounded text-slate-400 font-mono">
              /
            </kbd>
          </button>

          {/* PWA Install Button */}
          <PWAInstallButton variant="nav" />

          {/* Language Switch */}
          <button
            id="btn-lang-toggle"
            onClick={toggleLanguage}
            title={language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
            className="flex h-9 px-2.5 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {language === 'bn' ? 'EN' : 'বাং'}
          </button>

          {/* Dark Mode Toggle */}
          <button
            id="btn-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Admin Panel Trigger */}
          <button
            id="btn-admin-portal-trigger"
            onClick={() => setIsAdminModalOpen(true)}
            title={language === 'bn' ? 'এডমিন প্যানেল' : 'Admin Panel'}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition ${
              isAdminLoggedIn
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isAdminLoggedIn
                ? language === 'bn' ? 'এডমিন চালু' : 'Admin Live'
                : language === 'bn' ? 'এডমিন' : 'Admin'}
            </span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Menu"
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 rounded-xl p-3 text-left text-sm font-medium transition ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span className="truncate">{language === 'bn' ? item.labelBn : item.labelEn}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <PWAInstallButton variant="mobile" />
          </div>
        </div>
      )}
    </header>
  );
};
