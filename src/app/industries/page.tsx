import Image from "next/image";

function IndustriesPage() {
  const industries = [
    {
      id: 1,
      icon: "/images/industries/edu.svg",
      title: "Education",
      description:
        "Technology has a role to play in transforming the education sector for the better. We want to facilitate learning for all. Solutions built help learning institutions tackle their most significant challenges. These challenges range from allowing payment of school fees to managing the school staff.",
    },
    {
      id: 2,
      icon: "/images/industries/agri.svg",
      title: "Agriculture",
      description:
        "Technology has a role to play in transforming the education sector for the better. We want to facilitate learning for all. Solutions built help learning institutions tackle their most significant challenges. These challenges range from allowing payment of school fees to managing the school staff.",
    },
    {
      id: 3,
      icon: "/images/industries/fina.svg",
      title: "Finance",
      description:
        "Technology has a role to play in transforming the education sector for the better. We want to facilitate learning for all. Solutions built help learning institutions tackle their most significant challenges. These challenges range from allowing payment of school fees to managing the school staff.",
    },
    {
      id: 4,
      icon: "/images/industries/retai.svg",
      title: "E-commerce",
      description:
        "Technology has a role to play in transforming the education sector for the better. We want to facilitate learning for all. Solutions built help learning institutions tackle their most significant challenges. These challenges range from allowing payment of school fees to managing the school staff.",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col space-y-4 items-center p-5 bg-white dark:bg-gray-950 transition-colors duration-200">
      <h1 className="font-bold text-[#2B4468] dark:text-blue-400 text-3xl md:text-4xl">Industries</h1>
      <p className="mt-2 text-center max-w-4xl text-gray-700 dark:text-gray-300">
        Technology enablers. In different industries we seek to empower businesses
        to develop strategies of transformation with the aim to move to a
        data-centric business model. We are committed to being at the forefront
        of digital transformation both in Rwanda and beyond.
      </p>

      <div className="space-y-6 p-5 w-full">
        {industries.map((i) => (
          <div
            key={i.id}
            className="max-w-5xl mx-auto bg-gray-50 dark:bg-gray-800 grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-lg shadow-md dark:shadow-gray-900/50
                       hover:shadow-lg dark:hover:shadow-gray-800/70 hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer border border-gray-200 dark:border-gray-700"
          >
            {/* Icon */}
            <div className="flex justify-center items-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src={i.icon}
                  alt={i.title}
                  fill
                  className="object-contain dark:invert dark:brightness-200"
                />
              </div>
            </div>

            {/* Title */}
            <div className="flex justify-center items-center text-center">
              <h1 className="text-xl md:text-2xl text-[#AA8300] dark:text-amber-400 font-bold">{i.title}</h1>
            </div>

            {/* Description */}
            <div className="flex items-center">
              <p className="text-gray-600 dark:text-gray-400">{i.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndustriesPage;