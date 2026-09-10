import React, { useState } from 'react';
import {
  Compass,
  ExternalLink,
  Info,
  MapPin,
  Navigation,
  Sparkles,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TouristSpot } from '../types';

export const TourismSection: React.FC = () => {
  const { data, language } = useApp();
  const [selectedSpotModal, setSelectedSpotModal] = useState<TouristSpot | null>(null);

  return (
    <section id="tourism" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 dark:bg-teal-950/80 px-3.5 py-1 text-xs font-bold text-teal-800 dark:text-teal-300 mb-3 border border-teal-200/60 dark:border-teal-800/60">
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              <span>{language === 'bn' ? 'ঐতিহ্য ও প্রত্নতত্ত্ব' : 'History & Heritage'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'bn' ? 'জয়পুরহাটের দর্শনীয় স্থান ও পর্যটন' : 'Tourist Spots & Historic Places'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {language === 'bn'
                ? 'লকমা রাজবাড়ি, নান্দাইল দিঘি, হিন্দা-কসবা শাহী জামে মসজিদ ও মুক্তিযুদ্ধের ঐতিহাসিক নিদর্শন।'
                : 'Lokma Rajbari, Nandail Dighi, historical mosques, ancient temples and scenic wonders.'}
            </p>
          </div>
        </div>

        {/* Tourist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.touristSpots.map(spot => (
            <div
              key={spot.id}
              id={`tourist-card-${spot.id}`}
              className="group flex flex-col justify-between rounded-2xl bg-slate-50 dark:bg-slate-800/80 overflow-hidden border border-slate-200/80 dark:border-slate-700/70 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                <img
                  src={spot.imageUrl}
                  alt={spot.nameBn}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 rounded-md bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 text-xs font-medium text-white flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-teal-400" />
                  <span>{spot.upazila}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {language === 'bn' ? spot.nameBn : spot.nameEn}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    📍 {language === 'bn' ? spot.locationBn : spot.locationEn}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {language === 'bn' ? spot.historyBn : spot.historyEn}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedSpotModal(spot)}
                    className="flex-1 rounded-xl bg-teal-600 hover:bg-teal-500 py-2.5 text-xs font-bold text-white shadow-xs transition cursor-pointer"
                  >
                    {language === 'bn' ? 'যাওয়ার উপায় ও বিস্তারিত' : 'How to Visit & Details'}
                  </button>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${spot.mapQuery}, Joypurhat`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-700 p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition"
                    title="Google Maps"
                  >
                    <Navigation className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spot Detail Modal */}
      {selectedSpotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setSelectedSpotModal(null)}
              className="absolute right-4 top-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 bg-slate-100">
              <img
                src={selectedSpotModal.imageUrl}
                alt={selectedSpotModal.nameBn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
              📍 {selectedSpotModal.upazila} উপজেলা
            </span>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {language === 'bn' ? selectedSpotModal.nameBn : selectedSpotModal.nameEn}
            </h3>

            <div className="my-4 space-y-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {language === 'bn' ? 'ইতিহাস ও গুরুত্ব' : 'History & Significance'}
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {language === 'bn' ? selectedSpotModal.historyBn : selectedSpotModal.historyEn}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/70 p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-bold text-teal-700 dark:text-teal-300 mb-1 flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  <span>{language === 'bn' ? 'কীভাবে যাবেন (যাতায়াত নির্দেশিকা):' : 'How to Reach:'}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {language === 'bn' ? selectedSpotModal.howToGoBn : selectedSpotModal.howToGoEn}
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${selectedSpotModal.mapQuery}, Joypurhat`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-500 py-2.5 text-sm font-bold text-white shadow-md transition"
              >
                <Navigation className="w-4 h-4" />
                <span>{language === 'bn' ? 'গুগল ম্যাপে লোকেশন দেখুন' : 'View on Google Maps'}</span>
              </a>
              <button
                onClick={() => setSelectedSpotModal(null)}
                className="rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
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
