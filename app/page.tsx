import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Experience from "@/components/Experience";
import Credentials from "@/components/Credentials";
import { Research, Skills, Awards, Contact } from "@/components/Sections";
import {
  getProfile,
  getStats,
  getExperiences,
  getResearch,
  getCredentials,
  getSkills,
  getAwards,
} from "@/lib/content";

// Static generation with 60s ISR for instant loads and live content updates
export const revalidate = 60;

export default async function Home() {
  const [profile, stats, experiences, research, credentials, skills, awards] =
    await Promise.all([
      getProfile(),
      getStats(),
      getExperiences(),
      getResearch(),
      getCredentials(),
      getSkills(),
      getAwards(),
    ]);

  return (
    <main>
      <Nav profile={profile} />
      <Hero profile={profile} credentialsCount={credentials.length} />
      <Stats stats={stats} />
      <Experience experiences={experiences} />
      <Research items={research} />
      <Credentials credentials={credentials} />
      <Skills skills={skills} />
      <Awards awards={awards} />
      <Contact profile={profile} />
    </main>
  );
}
