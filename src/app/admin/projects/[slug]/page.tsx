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
    return <div className="p-10 text-center text-red-500">Project not found</div>;
  }

  return (
    <div className="w-full min-h-screen p-5 flex justify-center items-center">
      <ProjectDetailsComponent project={project} />
    </div>
  );
}

export default ProjectDetails;