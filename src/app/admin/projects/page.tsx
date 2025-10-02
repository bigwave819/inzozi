import AddProjects from "@/components/project/AddProject";
import ViewProjects from "@/components/project/ViewProjects";


function ProjectPage() {
  return (
    <div className="w-full min-h-screen p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-2xl">Projects</h1>
        <AddProjects />
      </div>
      <div>
        <ViewProjects />
      </div>
    </div>
  );
}

export default ProjectPage;