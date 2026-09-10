import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_APP_DATA, SERVICE_CATEGORIES } from '../data/initialData';
import {
  AppStateData,
  BloodDonor,
  EducationInstitute,
  EmergencyContact,
  GovtOffice,
  HealthFacility,
  JobPost,
  Language,
  NewsArticle,
  ServiceCategory,
  Theme,
  TouristSpot
} from '../types';

// Precomputed SHA-256 hash of the private admin access code
const ADMIN_HASH_HEX = 'bf223155671c5987a0004c4c04aaf6ff2534612907fea60502b7c20c9afcd18c';
const STORAGE_KEY = 'joypurhat_5900_portal_v1';
const SESSION_AUTH_KEY = 'joypurhat_admin_auth_session';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isAdminLoggedIn: boolean;
  verifyAdminCode: (code: string) => Promise<boolean>;
  adminLogout: () => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;

  // Data
  data: AppStateData;
  serviceCategories: ServiceCategory[];

  // CRUD actions
  addNews: (news: Omit<NewsArticle, 'id'>) => void;
  updateNews: (id: string, news: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;

  addJob: (job: Omit<JobPost, 'id'>) => void;
  updateJob: (id: string, job: Partial<JobPost>) => void;
  deleteJob: (id: string) => void;

  addHospital: (hosp: Omit<HealthFacility, 'id'>) => void;
  updateHospital: (id: string, hosp: Partial<HealthFacility>) => void;
  deleteHospital: (id: string) => void;

  addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  updateEmergencyContact: (id: string, contact: Partial<EmergencyContact>) => void;
  deleteEmergencyContact: (id: string) => void;

  addTouristSpot: (spot: Omit<TouristSpot, 'id'>) => void;
  updateTouristSpot: (id: string, spot: Partial<TouristSpot>) => void;
  deleteTouristSpot: (id: string) => void;

  addEducation: (edu: Omit<EducationInstitute, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<EducationInstitute>) => void;
  deleteEducation: (id: string) => void;

  registerBloodDonor: (donor: Omit<BloodDonor, 'id' | 'isApproved' | 'registeredDate'>) => void;
  approveBloodDonor: (id: string, approved: boolean) => void;
  deleteBloodDonor: (id: string) => void;

  updateSiteSettings: (settings: Partial<AppStateData['siteSettings']>) => void;
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to compute SHA-256 using standard Web Crypto API
async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('joypurhat_theme') as Theme;
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Language state
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('joypurhat_lang') as Language;
    return saved === 'en' ? 'en' : 'bn';
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Admin session authentication
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_AUTH_KEY) === 'valid_session';
  });

  // Portal Data State with persistence
  const [data, setData] = useState<AppStateData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_APP_DATA;
  });

  // Sync theme changes to document HTML class
  useEffect(() => {
    localStorage.setItem('joypurhat_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Sync language changes
  useEffect(() => {
    localStorage.setItem('joypurhat_lang', language);
  }, [language]);

  // Sync data changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage full or disabled
    }
  }, [data]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'bn' ? 'en' : 'bn'));
  };

  // Secure Admin Authentication verification
  const verifyAdminCode = async (code: string): Promise<boolean> => {
    if (!code) return false;
    try {
      const hash = await sha256(code);
      if (hash === ADMIN_HASH_HEX) {
        setIsAdminLoggedIn(true);
        sessionStorage.setItem(SESSION_AUTH_KEY, 'valid_session');
        return true;
      }
    } catch {
      // Fallback
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(SESSION_AUTH_KEY);
  };

  // CRUD Implementations
  const addNews = (item: Omit<NewsArticle, 'id'>) => {
    const newItem: NewsArticle = { ...item, id: `news-${Date.now()}` };
    setData(prev => ({ ...prev, news: [newItem, ...prev.news] }));
  };

  const updateNews = (id: string, updated: Partial<NewsArticle>) => {
    setData(prev => ({
      ...prev,
      news: prev.news.map(n => (n.id === id ? { ...n, ...updated } : n))
    }));
  };

  const deleteNews = (id: string) => {
    setData(prev => ({
      ...prev,
      news: prev.news.filter(n => n.id !== id)
    }));
  };

  const addJob = (item: Omit<JobPost, 'id'>) => {
    const newItem: JobPost = { ...item, id: `job-${Date.now()}` };
    setData(prev => ({ ...prev, jobs: [newItem, ...prev.jobs] }));
  };

  const updateJob = (id: string, updated: Partial<JobPost>) => {
    setData(prev => ({
      ...prev,
      jobs: prev.jobs.map(j => (j.id === id ? { ...j, ...updated } : j))
    }));
  };

  const deleteJob = (id: string) => {
    setData(prev => ({
      ...prev,
      jobs: prev.jobs.filter(j => j.id !== id)
    }));
  };

  const addHospital = (item: Omit<HealthFacility, 'id'>) => {
    const newItem: HealthFacility = { ...item, id: `hosp-${Date.now()}` };
    setData(prev => ({ ...prev, hospitals: [newItem, ...prev.hospitals] }));
  };

  const updateHospital = (id: string, updated: Partial<HealthFacility>) => {
    setData(prev => ({
      ...prev,
      hospitals: prev.hospitals.map(h => (h.id === id ? { ...h, ...updated } : h))
    }));
  };

  const deleteHospital = (id: string) => {
    setData(prev => ({
      ...prev,
      hospitals: prev.hospitals.filter(h => h.id !== id)
    }));
  };

  const addEmergencyContact = (item: Omit<EmergencyContact, 'id'>) => {
    const newItem: EmergencyContact = { ...item, id: `em-${Date.now()}` };
    setData(prev => ({ ...prev, emergencyContacts: [...prev.emergencyContacts, newItem] }));
  };

  const updateEmergencyContact = (id: string, updated: Partial<EmergencyContact>) => {
    setData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map(c => (c.id === id ? { ...c, ...updated } : c))
    }));
  };

  const deleteEmergencyContact = (id: string) => {
    setData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter(c => c.id !== id)
    }));
  };

  const addTouristSpot = (item: Omit<TouristSpot, 'id'>) => {
    const newItem: TouristSpot = { ...item, id: `tour-${Date.now()}` };
    setData(prev => ({ ...prev, touristSpots: [...prev.touristSpots, newItem] }));
  };

  const updateTouristSpot = (id: string, updated: Partial<TouristSpot>) => {
    setData(prev => ({
      ...prev,
      touristSpots: prev.touristSpots.map(s => (s.id === id ? { ...s, ...updated } : s))
    }));
  };

  const deleteTouristSpot = (id: string) => {
    setData(prev => ({
      ...prev,
      touristSpots: prev.touristSpots.filter(s => s.id !== id)
    }));
  };

  const addEducation = (item: Omit<EducationInstitute, 'id'>) => {
    const newItem: EducationInstitute = { ...item, id: `edu-${Date.now()}` };
    setData(prev => ({ ...prev, education: [...prev.education, newItem] }));
  };

  const updateEducation = (id: string, updated: Partial<EducationInstitute>) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(e => (e.id === id ? { ...e, ...updated } : e))
    }));
  };

  const deleteEducation = (id: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  const registerBloodDonor = (item: Omit<BloodDonor, 'id' | 'isApproved' | 'registeredDate'>) => {
    const newItem: BloodDonor = {
      ...item,
      id: `donor-${Date.now()}`,
      isApproved: false, // requires admin verification for public listing
      registeredDate: new Date().toISOString().split('T')[0]
    };
    setData(prev => ({ ...prev, bloodDonors: [newItem, ...prev.bloodDonors] }));
  };

  const approveBloodDonor = (id: string, approved: boolean) => {
    setData(prev => ({
      ...prev,
      bloodDonors: prev.bloodDonors.map(d => (d.id === id ? { ...d, isApproved: approved } : d))
    }));
  };

  const deleteBloodDonor = (id: string) => {
    setData(prev => ({
      ...prev,
      bloodDonors: prev.bloodDonors.filter(d => d.id !== id)
    }));
  };

  const updateSiteSettings = (settings: Partial<AppStateData['siteSettings']>) => {
    setData(prev => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...settings }
    }));
  };

  const resetToDefaultData = () => {
    setData(INITIAL_APP_DATA);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        toggleLanguage,
        activeSection,
        setActiveSection,
        searchQuery,
        setSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isAdminLoggedIn,
        verifyAdminCode,
        adminLogout,
        selectedCategory,
        setSelectedCategory,
        data,
        serviceCategories: SERVICE_CATEGORIES,
        addNews,
        updateNews,
        deleteNews,
        addJob,
        updateJob,
        deleteJob,
        addHospital,
        updateHospital,
        deleteHospital,
        addEmergencyContact,
        updateEmergencyContact,
        deleteEmergencyContact,
        addTouristSpot,
        updateTouristSpot,
        deleteTouristSpot,
        addEducation,
        updateEducation,
        deleteEducation,
        registerBloodDonor,
        approveBloodDonor,
        deleteBloodDonor,
        updateSiteSettings,
        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
