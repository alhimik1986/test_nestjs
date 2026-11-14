export interface ProfileSummary {
  id: string;
  name: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  // startDate: string; // Глюки новой версии с датами
  // endDate?: string;
  achievements: string;
}

export interface Project {
  id: string;
  name: string;
  url?: string;
}

export interface Profile extends ProfileSummary {
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
}
