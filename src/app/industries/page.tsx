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
    <div className="min-h-screen w-full flex flex-col space-y-2 items-center p-5">
      <h1 className="font-bold text-[#2B4468] text-2xl">Industries</h1>
      <p className="mt-2 text-center max-w-4xl">
        Technology enablers. In different industries we seek to empower businesses
        to develop strategies of transformation with the aim to move to a
        data-centric business model. We are committed to being at the forefront
        of digital transformation both in Rwanda and beyond.
      </p>

      <div className="space-y-5 p-5 w-full items-center">
        {industries.map((i) => (
          <div
            key={i.id}
            className="max-w-5xl mx-auto bg-gray-50 grid grid-cols-1 md:grid-cols-3 gap-8 p-5 rounded-lg shadow-md 
                       hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out cursor-pointer"
          >
            {/* Icon */}
            <div className="flex justify-center items-center">
              <img
                src={i.icon}
                alt={i.title}
                className="w-40 h-40 object-contain"
              />
            </div>

            {/* Centered Title */}
            <div className="flex justify-center items-center text-center">
              <h1 className="text-2xl text-[#AA8300] font-bold">{i.title}</h1>
            </div>

            {/* Description */}
            <div className="flex items-center">
              <p className="text-muted-foreground">{i.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndustriesPage;
