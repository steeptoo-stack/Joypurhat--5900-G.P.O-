import React, { useState } from 'react';
import {
  Ambulance,
  Briefcase,
  Building2,
  Car,
  Droplet,
  Flame,
  GraduationCap,
  HeartPulse,
  Home,
  Hotel,
  Landmark,
  Mail,
  MapPin,
  Newspaper,
  PhoneCall,
  Plane,
  Scale,
  Shield,
  Utensils,
  Wheat,
  Zap,
  Bus,
  ArrowRight,
  X,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceCategory } from '../types';

// Map icon string names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  HeartPulse,
  GraduationCap,
  Briefcase,
  Newspaper,
  Shield,
  Flame,
  Ambulance,
  Droplet,
  Landmark,
  Wheat,
  Zap,
  Car,
  Home,
  Mail,
  Plane,
  Scale,
  Building2,
  Utensils,
  Hotel,
  MapPin,
  Bus,
  PhoneCall
};

export const ServicesGrid: React.FC = () => {
  const { serviceCategories, language, setActiveSection } = useApp();
  const [activeModalCategory, setActiveModalCategory] = useState<ServiceCategory | null>(null);

  const handleCardClick = (cat: ServiceCategory) => {
    // Map service category to existing sections if available
    switch (cat.id) {
      case 'health':
      case 'hospitals_clinics':
      case 'ambulance':
        scrollToSection('hospitals');
        break;
      case 'jobs':
        scrollToSection('jobs');
        break;
      case 'news':
        scrollToSection('news');
        break;
      case 'education':
        scrollToSection('education');
        break;
      case 'police':
      case 'fire':
      case 'emergency_numbers':
        scrollToSection('emergency');
        break;
      case 'blood':
        scrollToSection('blood');
        break;
      case 'govt':
      case 'brta':
      case 'land':
      case 'post':
      case 'agriculture':
      case 'electricity':
      case 'legal':
      case 'expat':
        scrollToSection('govt');
        break;
      case 'tourism':
      case 'restaurants':
      case 'hotels':
        scrollToSection('tourism');
        break;
      case 'transport':
        scrollToSection('numbers');
        break;
      default:
        setActiveModalCategory(cat);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 dark:bg-sky-950/80 px-3.5 py-1 text-xs font-bold text-sky-700 dark:text-sky-300 mb-3 border border-sky-200/60 dark:border-sky-800/60">
            <span>{language === 'bn' ? 'সকল সেবা ক্যাটাগরি' : 'All Service Categories'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'bn' ? 'জয়পুরহাট নাগরিক সেবাসমূহ' : 'Joypurhat Citizen Services'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {language === 'bn'
              ? 'দৈনন্দিন জীবনের প্রয়োজনীয় ২২টি প্রধান সেবা এক ঠিকানায়। যে কোনো সেবা সম্পর্কে বিস্তারিত জানতে ক্লিক করুন।'
              : '22 essential daily public services organized for easy access and instant connectivity.'}
          </p>
        </div>

        {/* 22 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {serviceCategories.map(service => {
            const Icon = iconMap[service.icon] || HeartPulse;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => handleCardClick(service)}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-50 dark:bg-slate-800/70 p-5 border border-slate-200/70 dark:border-slate-700/60 hover:border-sky-500/50 dark:hover:border-sky-500/50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.popular && (
                      <span className="rounded-full bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300">
                        {language === 'bn' ? 'জনপ্রিয়' : 'Popular'}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {language === 'bn' ? service.titleBn : service.titleEn}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {language === 'bn' ? service.descriptionBn : service.descriptionEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 group-hover:underline">
                    {language === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}
                  </span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-600 dark:text-sky-300 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveModalCategory(null)}
              className="absolute right-4 top-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-300">
                {(() => {
                  const Icon = iconMap[activeModalCategory.icon] || HeartPulse;
                  return <Icon className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {language === 'bn' ? activeModalCategory.titleBn : activeModalCategory.titleEn}
                </h3>
                <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                  JOYPURHAT 5900 G.P.O PORTAL
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {language === 'bn' ? activeModalCategory.descriptionBn : activeModalCategory.descriptionEn}
            </p>

            <div className="space-y-2 mb-6 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 text-xs text-slate-600 dark:text-slate-400">
              <p>• জেলা সদর ও ৫ উপজেলার সকল তথ্য নিয়মিত হালনাগাদ করা হয়।</p>
              <p>• যে কোনো সমস্যা বা তথ্য সংশোধন করতে এডমিন প্যানেলে যোগাযোগ করুন।</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  handleCardClick(activeModalCategory);
                  setActiveModalCategory(null);
                }}
                className="flex-1 rounded-xl bg-sky-600 hover:bg-sky-500 py-2.5 text-sm font-semibold text-white shadow-md transition"
              >
                {language === 'bn' ? 'সংশ্লিষ্ট সেকশনে যান' : 'Go to Section'}
              </button>
              <button
                onClick={() => setActiveModalCategory(null)}
                className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
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
