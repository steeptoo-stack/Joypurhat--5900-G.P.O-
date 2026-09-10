export type Language = 'bn' | 'en';
export type Theme = 'light' | 'dark';

export type Upazila = 
  | 'সদর' 
  | 'পাঁচবিবি' 
  | 'কালাই' 
  | 'ক্ষেতলাল' 
  | 'আক্কেলপুর' 
  | 'সকল উপজেলা';

export interface ServiceCategory {
  id: string;
  titleBn: string;
  titleEn: string;
  icon: string;
  descriptionBn: string;
  descriptionEn: string;
  categoryTag: string;
  actionUrl?: string;
  popular?: boolean;
}

export interface EmergencyContact {
  id: string;
  nameBn: string;
  nameEn: string;
  number: string;
  descriptionBn: string;
  descriptionEn: string;
  category: 'national' | 'police' | 'fire' | 'hospital' | 'utility' | 'legal';
  isNational?: boolean;
  verified: boolean;
}

export interface JobPost {
  id: string;
  titleBn: string;
  titleEn: string;
  companyBn: string;
  companyEn: string;
  category: string; // সরকারি, বেসরকারি, ব্যাংক, পুলিশ, শিক্ষক, ইত্যাদি
  upazila: string;
  educationBn: string;
  educationEn: string;
  salaryBn: string;
  salaryEn: string;
  deadline: string;
  vacancies?: string;
  applyUrl?: string;
  descriptionBn: string;
  descriptionEn: string;
  postedDate: string;
  isLocal?: boolean;
}

export interface NewsArticle {
  id: string;
  titleBn: string;
  titleEn: string;
  summaryBn: string;
  summaryEn: string;
  contentBn: string;
  contentEn: string;
  category: string;
  upazila: Upazila;
  date: string;
  time: string;
  imageUrl: string;
  source: string;
  isDemo: boolean;
}

export interface HealthFacility {
  id: string;
  nameBn: string;
  nameEn: string;
  type: 'govt_hospital' | 'private_hospital' | 'clinic' | 'diagnostic' | 'pharmacy' | 'ambulance' | 'doctor';
  upazila: Upazila;
  addressBn: string;
  addressEn: string;
  phone: string;
  openingHoursBn: string;
  openingHoursEn: string;
  mapQuery: string;
  services?: string[];
  featured?: boolean;
}

export interface GovtOffice {
  id: string;
  nameBn: string;
  nameEn: string;
  category: string;
  upazila: Upazila;
  addressBn: string;
  addressEn: string;
  phone: string;
  website?: string;
  mapQuery: string;
  servicesBn: string[];
  servicesEn: string[];
  officeHoursBn: string;
  officeHoursEn: string;
}

export interface EducationInstitute {
  id: string;
  nameBn: string;
  nameEn: string;
  type: 'college' | 'school' | 'madrasa' | 'technical' | 'cadet' | 'university';
  upazila: Upazila;
  addressBn: string;
  addressEn: string;
  phone: string;
  website?: string;
  established?: string;
  eiin?: string;
  descriptionBn: string;
}

export interface TouristSpot {
  id: string;
  nameBn: string;
  nameEn: string;
  type: 'historic' | 'park' | 'mosque' | 'temple' | 'nature' | 'restaurant' | 'hotel';
  upazila: Upazila;
  locationBn: string;
  locationEn: string;
  addressBn?: string;
  addressEn?: string;
  descriptionBn: string;
  descriptionEn: string;
  historyBn?: string;
  historyEn?: string;
  howToGoBn?: string;
  howToGoEn?: string;
  imageUrl: string;
  mapQuery: string;
  highlights?: string[];
}

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface BloodDonor {
  id: string;
  name?: string;
  nameBn?: string;
  bloodGroup: BloodGroup;
  upazila: Upazila;
  area?: string;
  phone: string;
  lastDonationDate: string;
  isApproved?: boolean;
  publicPhoneConsent?: boolean;
  registeredDate?: string;
  available?: boolean;
}

export interface SiteNotice {
  id: string;
  textBn: string;
  textEn: string;
  active: boolean;
  date: string;
}

export interface AppStateData {
  jobs: JobPost[];
  news: NewsArticle[];
  hospitals: HealthFacility[];
  govtOffices: GovtOffice[];
  education: EducationInstitute[];
  touristSpots: TouristSpot[];
  emergencyContacts: EmergencyContact[];
  bloodDonors: BloodDonor[];
  notices: SiteNotice[];
  siteSettings: {
    heroTitle: string;
    heroTagline: string;
    heroDescription: string;
    announcementTicker: string;
    contactEmail: string;
    contactPhone: string;
    facebookUrl: string;
    youtubeUrl: string;
  };
}
