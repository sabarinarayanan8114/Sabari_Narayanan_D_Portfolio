export type ProjectCategory = 'all' | 'fullstack' | 'web' | 'backend-systems' | 'hackathon';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  featured: boolean;
  description: string;
  longDescription?: string;
  keyFeatures: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
  metrics?: string;
  role?: string;
  imageColor?: string;
  gradient?: string;
  imageUrl?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  iconName: string;
  category: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  employmentType?: string;
  duration: string;
  location?: string;
  description: string[];
  skills: string[];
  stats?: { label: string; value: string }[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  score: string;
  duration: string;
  location: string;
  courses: string[];
  highlights?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
  skills: string[];
  badgeColor: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  rank?: string;
  description: string;
  date: string;
  highlightText: string;
  stats?: string;
  tags: string[];
}

export interface VolunteeringItem {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string[];
  impact: string;
  skillsGained: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  avatar?: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  leetcode: string;
  availability: string;
  yearsOfStudy: string;
  cgpa: string;
  leetcodeSolved: number;
}
