import { projects } from '@/data/projects';
import ProjectsClientPage from './ProjectsClientPage';

export default function ProjectsPage() {
  return <ProjectsClientPage initialProjects={projects} />;
}
