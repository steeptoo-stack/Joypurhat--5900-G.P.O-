import React, { useState } from 'react';
import {
  Building2,
  Check,
  Copy,
  Phone,
  PhoneCall,
  Search,
  Train,
  Bus,
  Shield,
  Zap,
  Mail,
  Scale,
  Newspaper
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ImportantContact {
  id: string;
  nameBn: string;
  nameEn: string;
  category: string;
  phone: string;
  addressBn: string;
  iconType: string;
}

const CONTACTS_DIRECTORY: ImportantContact[] = [
  {
    id: 'c1',
    nameBn: 'জেলা প্রশাসক (DC) অফিস, জয়পুরহাট',
    nameEn: 'Deputy Commissioner Office',
    category: 'প্রশাসন',
    phone: '02588881200',
    addressBn: 'কালেক্টরেট ভবন, জয়পুরহাট',
    iconType: 'admin'
  },
  {
    id: 'c2',
    nameBn: 'পুলিশ সুপার (SP) অফিস, জয়পুরহাট',
    nameEn: 'Superintendent of Police Office',
    category: 'পুলিশ',
    phone: '01320-128400',
    addressBn: 'পুলিশ সুপারের কার্যালয়, শান্তিনগর',
    iconType: 'police'
  },
  {
    id: 'c3',
    nameBn: 'জয়পুরহাট সদর মডেল থানা (ডিউটি অফিসার)',
    nameEn: 'Joypurhat Sadar Model Thana',
    category: 'পুলিশ',
    phone: '01320-128503',
    addressBn: 'মডেল থানা রোড, সদর',
    iconType: 'police'
  },
  {
    id: 'c4',
    nameBn: 'পাঁচবিবি থানা (ডিউটি অফিসার)',
    nameEn: 'Panchbibi Thana',
    category: 'পুলিশ',
    phone: '01320-128528',
    addressBn: 'পাঁচবিবি উপজেলা রোড',
    iconType: 'police'
  },
  {
    id: 'c5',
    nameBn: 'কালাই থানা (ডিউটি অফিসার)',
    nameEn: 'Kalai Thana',
    category: 'পুলিশ',
    phone: '01320-128553',
    addressBn: 'কালাই বাজার, জয়পুরহাট',
    iconType: 'police'
  },
  {
    id: 'c6',
    nameBn: 'ক্ষেতলাল থানা (ডিউটি অফিসার)',
    nameEn: 'Khetlal Thana',
    category: 'পুলিশ',
    phone: '01320-128578',
    addressBn: 'ক্ষেতলাল উপজেলা হেডকোয়ার্টার',
    iconType: 'police'
  },
  {
    id: 'c7',
    nameBn: 'আক্কেলপুর থানা (ডিউটি অফিসার)',
    nameEn: 'Akkelpur Thana',
    category: 'পুলিশ',
    phone: '01320-128603',
    addressBn: 'আক্কেলপুর বাজার',
    iconType: 'police'
  },
  {
    id: 'c8',
    nameBn: 'জয়পুরহাট রেলওয়ে স্টেশন (মাস্টার)',
    nameEn: 'Joypurhat Railway Station',
    category: 'পরিবহন',
    phone: '01711-692558',
    addressBn: 'স্টেশন রোড, জয়পুরহাট সদর',
    iconType: 'train'
  },
  {
    id: 'c9',
    nameBn: 'জয়পুরহাট কেন্দ্রীয় বাস টার্মিনাল',
    nameEn: 'Central Bus Terminal',
    category: 'পরিবহন',
    phone: '01712-889922',
    addressBn: 'নতুন বাসস্ট্যান্ড, জয়পুরহাট',
    iconType: 'bus'
  },
  {
    id: 'c10',
    nameBn: 'জয়পুরহাট প্রধান ডাকঘর (G.P.O 5900)',
    nameEn: 'Joypurhat Head Post Office (5900)',
    category: 'ডাক',
    phone: '02588881255',
    addressBn: 'পোস্ট অফিস মোড়, জয়পুরহাট',
    iconType: 'post'
  },
  {
    id: 'c11',
    nameBn: 'পল্লী বিদ্যুৎ সমিতি অভিযোগ কেন্দ্র (জয়পুরহাট)',
    nameEn: 'Palli Bidyut Samity Complaint',
    category: 'বিদ্যুৎ',
    phone: '01769-400100',
    addressBn: 'পল্লী বিদ্যুৎ ভবন, জয়পুরহাট',
    iconType: 'utility'
  },
  {
    id: 'c12',
    nameBn: 'জয়পুরহাট প্রেস ক্লাব (সাধারণ সম্পাদক)',
    nameEn: 'Joypurhat Press Club',
    category: 'মিডিয়া',
    phone: '01712-224466',
    addressBn: 'প্রেস ক্লাব ভবন, সিনেমা রোড',
    iconType: 'news'
  },
  {
    id: 'c13',
    nameBn: 'জেলা আইনজীবী সমিতি (বার অ্যাসোসিয়েশন)',
    nameEn: 'District Bar Association',
    category: 'আইন',
    phone: '02588881340',
    addressBn: 'কোর্ট চত্বর, জয়পুরহাট',
    iconType: 'law'
  }
];

export const ImportantNumbers: React.FC = () => {
  const { language } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = [
    { id: 'all', labelBn: 'সকল নম্বর', labelEn: 'All' },
    { id: 'প্রশাসন', labelBn: 'প্রশাসন', labelEn: 'Admin' },
    { id: 'পুলিশ', labelBn: 'থানা ও পুলিশ', labelEn: 'Police' },
    { id: 'পরিবহন', labelBn: 'ট্রেন ও বাস', labelEn: 'Transport' },
    { id: 'বিদ্যুৎ', labelBn: 'বিদ্যুৎ', labelEn: 'Power' },
    { id: 'মিডিয়া', labelBn: 'প্রেস ক্লাব', labelEn: 'Media' },
    { id: 'আইন', labelBn: 'আইনজীবী', labelEn: 'Law' }
  ];

  const filteredContacts = CONTACTS_DIRECTORY.filter(item => {
    if (selectedCat !== 'all' && item.category !== selectedCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.nameBn.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.phone.includes(q)
      );
    }
    return true;
  });

  const handleCopy = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'police':
        return Shield;
      case 'train':
        return Train;
      case 'bus':
        return Bus;
      case 'utility':
        return Zap;
      case 'post':
        return Mail;
      case 'law':
        return Scale;
      case 'news':
        return Newspaper;
      default:
        return Building2;
    }
  };

  return (
    <section id="numbers" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 dark:bg-sky-950/80 px-3.5 py-1 text-xs font-bold text-sky-800 dark:text-sky-300 mb-3 border border-sky-200/60 dark:border-sky-800/60">
              <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
              <span>{language === 'bn' ? 'টেলিফোন নির্দেশিকা' : 'Directory & Hotlines'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'bn' ? 'জয়পুরহাট গুরুত্বপূর্ণ নম্বরসমূহ' : 'Joypurhat Important Numbers'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {language === 'bn'
                ? 'ডিসি অফিস, এসপি অফিস, থানা, রেলওয়ে স্টেশন, বাস টার্মিনাল ও প্রেস ক্লাবের যোগাযোগের নম্বর।'
                : 'Direct contact phone numbers for local police, administration, transport and media.'}
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={language === 'bn' ? 'নাম বা নম্বর খুঁজুন...' : 'Search contact or number...'}
              className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 pl-9 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {language === 'bn' ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredContacts.map(contact => {
            const Icon = getIcon(contact.iconType);

            return (
              <div
                key={contact.id}
                id={`contact-box-${contact.id}`}
                className="flex flex-col justify-between rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-5 border border-slate-200/80 dark:border-slate-700/70 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="rounded-md bg-sky-50 dark:bg-sky-950 px-2 py-0.5 text-[11px] font-bold text-sky-700 dark:text-sky-300">
                      {contact.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                    {language === 'bn' ? contact.nameBn : contact.nameEn}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {contact.addressBn}
                  </p>

                  <div className="mt-3 flex items-center justify-between font-mono text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                    <span>{contact.phone}</span>
                    <button
                      onClick={() => handleCopy(contact.id, contact.phone)}
                      title="Copy Number"
                      className="p-1 rounded text-slate-400 hover:text-sky-600 transition"
                    >
                      {copiedId === contact.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 py-2.5 text-xs font-bold text-white shadow-xs transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? '📞 কল করুন' : '📞 Call Now'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
