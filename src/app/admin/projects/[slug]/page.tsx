import { getSingleProject } from "@/actions/adminActions";
import ProjectDetailsComponent from "@/components/project/ProjectDetails";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
}

async function ProjectDetails({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getSingleProject(slug);

  if (!project) {
    return <div className="p-10 text-center text-red-500 dark:text-red-400 bg-white dark:bg-gray-950 min-h-screen">Project not found</div>;
  }

  return (
    <div className="w-full min-h-screen p-5 flex justify-center items-center bg-white dark:bg-gray-950">
      <ProjectDetailsComponent project={project} />
    </div>
  );
}

export default ProjectDetails;