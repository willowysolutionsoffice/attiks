import { readDatabase } from '@/lib/db';
import { projects as seedProjects } from '@/data/projects';
import ProjectsClientPage from './ProjectsClientPage';

export default async function ProjectsPage() {
  let allProjects = seedProjects;
  try {
    const db = readDatabase();
    if (db && db.projects && db.projects.length > 0) {
      allProjects = db.projects;
    }
  } catch (err) {
    console.error('Failed to load database in Projects page:', err);
  }

  return <ProjectsClientPage initialProjects={allProjects} />;
}
