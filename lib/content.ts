import fs from "fs/promises";
import path from "path";
import { getDriveViewUrl, getDrivePreviewUrl } from "./drive";

export interface ProfileData {
  name: string;
  headline: string;
  sub: string;
  availability: string;
  degree: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  profilePhoto: string;
  cvLink: string;
  trustBadge?: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  decimals: number;
  suffix?: string;
  order: number;
  visible: boolean;
}

export interface ExperienceItem {
  id: string;
  organisation: string;
  role: string;
  location: string;
  year: string;
  bulletPoints: string[];
  certificateLink?: string;
  certificateLabel?: string;
  lorLink?: string;
  lorLabel?: string;
  order: number;
  visible: boolean;
}

export interface ResearchResultRow {
  label: string;
  range: string;
  percentage: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  meta: string;
  description: string;
  resultRows: ResearchResultRow[];
  note?: string;
  certificateLink?: string;
  certificateLabel?: string;
  order: number;
  visible: boolean;
}

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description: string;
  category:
    | "Internship Certificate"
    | "Letter of Recommendation"
    | "Professional Certification"
    | "Project Certificate"
    | "Appreciation Certificate";
  driveLink: string;
  order: number;
  visible: boolean;
}

export interface AwardItem {
  id: string;
  title: string;
  description: string;
  year?: string;
  driveLink?: string;
  linkText?: string;
  order: number;
  visible: boolean;
}

export interface SkillItem {
  id: string;
  groupName: string;
  skills: string[];
  certificateLink?: string;
  certificateLabel?: string;
  order: number;
  visible: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  years: string;
  details?: string;
  order: number;
  visible: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function readCollection<T extends { order?: number; visible?: boolean }>(
  folderName: string
): Promise<T[]> {
  const dirPath = path.join(CONTENT_DIR, folderName);
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const items: T[] = [];

    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith(".json")) {
        const item = await readJsonFile<T>(path.join(dirPath, entry.name));
        if (item) {
          const id = entry.name.replace(/\.json$/, "");
          items.push({ id, ...item });
        }
      }
    }

    // Filter by visible !== false and sort by order
    return items
      .filter((i) => i.visible !== false)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  } catch {
    return [];
  }
}

export async function getProfile(): Promise<ProfileData> {
  const profile = await readJsonFile<ProfileData>(
    path.join(CONTENT_DIR, "profile.json")
  );

  if (profile) return profile;

  // Safe fallback default
  return {
    name: "Md Belal Ashraf",
    headline: "Civil engineer building quality into every pour.",
    sub: "B.Tech Civil Engineering, Jamia Millia Islamia. QA/QC, quantity surveying and project controls across DLF, ONGC and IIT Delhi.",
    availability: "Available for Site QA/QC & QS",
    degree: "B.Tech Civil Engineering · Jamia Millia Islamia",
    email: "belalashraf687@gmail.com",
    phone: "+91 7481014674",
    location: "New Delhi, India",
    linkedin: "https://www.linkedin.com/in/md-belal-ashraf/",
    profilePhoto: "/belal-profile.jpg",
    cvLink: "/Md_Belal_Ashraf_cv.pdf",
    trustBadge: "DLF · ONGC · MEPF · IIT Delhi · ASCE Certificates Verified",
  };
}

export async function getStats(): Promise<StatItem[]> {
  return readCollection<StatItem>("stats");
}

export async function getExperiences(): Promise<ExperienceItem[]> {
  return readCollection<ExperienceItem>("experience");
}

export async function getResearch(): Promise<ResearchItem[]> {
  return readCollection<ResearchItem>("research");
}

export async function getCredentials(): Promise<CredentialItem[]> {
  return readCollection<CredentialItem>("credentials");
}

export async function getAwards(): Promise<AwardItem[]> {
  return readCollection<AwardItem>("awards");
}

export async function getSkills(): Promise<SkillItem[]> {
  return readCollection<SkillItem>("skills");
}

export async function getEducation(): Promise<EducationItem[]> {
  return readCollection<EducationItem>("education");
}

