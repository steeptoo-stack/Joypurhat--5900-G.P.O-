import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Newspaper,
  Tag,
  X,
  Share2,
  Info,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NewsArticle, Upazila } from '../types';

export const NewsSection: React.FC = () => {
  const { data, language } = useApp();
  const [selectedUpazila, setSelectedUpazila] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticleModal, setActiveArticleModal] = useState<NewsArticle | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const upazilaFilters = [
    { id: 'all', labelBn: 'সকল উপজেলা', labelEn: 'All Upazilas' },
    { id: 'সদর', labelBn: 'জয়পুরহাট সদর', labelEn: 'Sadar' },
    { id: 'পাঁচবিবি', labelBn: 'পাঁচবিবি', labelEn: 'Panchbibi' },
    { id: 'কালাই', labelBn: 'কালাই', labelEn: 'Kalai' },
    { id: 'ক্ষেতলাল', labelBn: 'ক্ষেতলাল', labelEn: 'Khetlal' },
    { id: 'আক্কেলপুর', labelBn: 'আক্কেলপুর', labelEn: 'Akkelpur' }
  ];

  const categoryFilters = [
    { id: 'all', labelBn: 'সব খবর', labelEn: 'All News' },
    { id: 'কৃষি', labelBn: 'কৃষি', labelEn: 'Agriculture' },
    { id: 'স্বাস্থ্য', labelBn: 'স্বাস্থ্য', labelEn: 'Health' },
    { id: 'শিক্ষা', labelBn: 'শিক্ষা', labelEn: 'Education' },
    { id: 'সরকারি ঘোষণা', labelBn: 'সরকারি ঘোষণা', labelEn: 'Govt. Notice' },
    { id: 'স্থানীয় ঘটনা', labelBn: 'স্থানীয় ঘটনা', labelEn: 'Local Events' }
  ];

  const filteredNews = data.news.filter(article => {
    if (selectedUpazila !== 'all' && article.upazila !== selectedUpazila) {
      return false;
    }
    if (selectedCategory !== 'all' && article.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const handleShare = (article: NewsArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.titleBn,
        text: article.summaryBn,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${article.titleBn} - ${window.location.href}`);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="news" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-3 border border-emerald-200/60 dark:border-emerald-800/60">
              <Newspaper className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'bn' ? 'জেলা সংবাদ ও বার্তা' : 'District News & Bulletins'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'bn' ? 'আজকের জয়পুরহাট' : 'Today’s Joypurhat News'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {language === 'bn'
                ? 'জয়পুরহাটের উন্নয়ন, কৃষি, শিক্ষা, স্বাস্থ্য ও স্থানীয় ঘটনার সর্বশেষ আপডেট।'
                : 'Development, agriculture, events and government announcements in Joypurhat.'}
            </p>
          </div>

          {/* Demo Content Disclaimer Badge as instructed */}
          <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 p-3 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-800 dark:text-amber-200 self-start md:self-auto max-w-md">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {language === 'bn'
                ? 'ডেমো নিউজ / পরীক্ষামূলক তথ্য — এডমিন প্যানেল থেকে আসল সংবাদ যুক্ত ও সম্পাদনা করা যাবে।'
                : 'Demo Content Notice — Real articles can be published & edited via the Admin Panel.'}
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="space-y-3 mb-8">
          {/* Upazila filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 shrink-0">
              {language === 'bn' ? 'উপজেলা:' : 'Upazila:'}
            </span>
            {upazilaFilters.map(up => (
              <button
                key={up.id}
                id={`news-upazila-${up.id}`}
                onClick={() => setSelectedUpazila(up.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedUpazila === up.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {language === 'bn' ? up.labelBn : up.labelEn}
              </button>
            ))}
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 shrink-0">
              {language === 'bn' ? 'বিভাগ:' : 'Category:'}
            </span>
            {categoryFilters.map(cat => (
              <button
                key={cat.id}
                id={`news-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-3 py-1 text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-bold'
                    : 'bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {language === 'bn' ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* News Cards Grid */}
        {filteredNews.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-850 p-12 text-center border border-slate-200 dark:border-slate-800">
            <Newspaper className="mx-auto h-12 w-12 text-slate-400 mb-3" />
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
              {language === 'bn' ? 'এই বিভাগে কোনো সংবাদ পাওয়া যায়নি' : 'No news found in this category'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map(article => (
              <article
                key={article.id}
                id={`news-card-${article.id}`}
                className="group flex flex-col justify-between rounded-2xl bg-slate-50 dark:bg-slate-800/80 overflow-hidden border border-slate-200/80 dark:border-slate-700/70 shadow-xs hover:shadow-md transition-all duration-200"
              >
                {/* Image & Badges */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                  <img
                    src={article.imageUrl}
                    alt={article.titleBn}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
                      {article.category}
                    </span>
                    <span className="rounded-md bg-slate-900/80 backdrop-blur-xs px-2 py-1 text-[11px] font-medium text-white">
                      📍 {article.upazila}
                    </span>
                  </div>

                  {article.isDemo && (
                    <div className="absolute bottom-2 right-2 rounded bg-amber-500/90 text-slate-950 font-bold px-2 py-0.5 text-[10px] shadow-xs">
                      ডেমো নিউজ
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Timestamp & Source */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date} • {article.time}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                      {language === 'bn' ? article.titleBn : article.titleEn}
                    </h3>

                    {/* Summary */}
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {language === 'bn' ? article.summaryBn : article.summaryEn}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                    <button
                      onClick={() => setActiveArticleModal(article)}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      {language === 'bn' ? 'বিস্তারিত পড়ুন →' : 'Read Full Story →'}
                    </button>

                    <button
                      onClick={() => handleShare(article)}
                      title="Share Article"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition"
                    >
                      {copiedId === article.id ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Full News Reader Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveArticleModal(null)}
              className="absolute right-4 top-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-2">
              <span>{activeArticleModal.category}</span>
              <span>•</span>
              <span>উপজেলা: {activeArticleModal.upazila}</span>
              {activeArticleModal.isDemo && (
                <span className="rounded bg-amber-100 dark:bg-amber-950 px-2 py-0.5 text-amber-800 dark:text-amber-300">
                  ডেমো নিউজ
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
              {language === 'bn' ? activeArticleModal.titleBn : activeArticleModal.titleEn}
            </h3>

            <div className="flex items-center gap-4 my-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {activeArticleModal.date} ({activeArticleModal.time})
              </span>
              <span>উৎস: {activeArticleModal.source}</span>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden my-4 bg-slate-100 dark:bg-slate-800">
              <img
                src={activeArticleModal.imageUrl}
                alt={activeArticleModal.titleBn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed space-y-4">
              <p className="font-semibold text-slate-800 dark:text-slate-100">
                {language === 'bn' ? activeArticleModal.summaryBn : activeArticleModal.summaryEn}
              </p>
              <p className="whitespace-pre-line">
                {language === 'bn' ? activeArticleModal.contentBn : activeArticleModal.contentEn}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleShare(activeArticleModal)}
                className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'সংবাদটি শেয়ার করুন' : 'Share Article'}</span>
              </button>

              <button
                onClick={() => setActiveArticleModal(null)}
                className="rounded-xl bg-slate-100 dark:bg-slate-800 px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
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
