import AddProjects from "@/components/project/AddProject";
import ViewProjects from "@/components/project/ViewProjects";

function ProjectPage() {
  return (
    <div className="w-full min-h-screen p-8 bg-white dark:bg-gray-950">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-2xl text-gray-900 dark:text-gray-100">Projects</h1>
        <AddProjects />
      </div>
      <div>
        <ViewProjects />
      </div>
    </div>
  );
}

export default ProjectPage;