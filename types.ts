
export interface PersonalDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  details: string;
}

export interface Experience {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface CVData {
  personalDetails: PersonalDetails;
  profile: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
}

export enum Section {
  Welcome = 'welcome',
  PersonalDetails = 'personalDetails',
  Profile = 'profile',
  Education = 'education',
  Experience = 'experience',
  Skills = 'skills',
  Final = 'final',
}

export enum Template {
    Modern = 'modern',
    Creative = 'creative',
}
