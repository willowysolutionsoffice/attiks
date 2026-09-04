import { getAllProjects } from '@/lib/projects';
import ProjectsClientPage from './ProjectsClientPage';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return <ProjectsClientPage initialProjects={projects} />;
}

