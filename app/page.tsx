import { getProjects, getExperience } from "@/lib/notion";
import { HomeClient } from "@/components/home-client";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const projects = await getProjects();
  const experience = await getExperience();

  return <HomeClient projects={projects} experience={experience} />;
}

