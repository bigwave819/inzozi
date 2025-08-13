import { Cloud, Database, CreditCard, Wifi, Globe } from "lucide-react";

const services = [
  {
    icon: <Cloud size={50} className="text-blue-500" />,
    title: "SAAS",
    description: "Delivering scalable, secure, and user-friendly software solutions through the cloud."
  },
  {
    icon: <Database size={50} className="text-green-500" />,
    title: "DAAS",
    description: "Providing real-time, reliable, and structured data as a service to power your business."
  },
  {
    icon: <CreditCard size={50} className="text-purple-500" />,
    title: "Digital Payment",
    description: "Secure, fast, and convenient payment solutions for modern businesses and consumers."
  },
  {
    icon: <Wifi size={50} className="text-orange-500" />,
    title: "Internet of Things",
    description: "Connecting devices to create smarter, more efficient, and data-driven environments."
  },
  {
    icon: <Globe size={50} className="text-red-500" />,
    title: "Broad Services",
    description: "Comprehensive digital solutions tailored to meet diverse business needs."
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition duration-300"
            >
              <div className="flex justify-center mb-6">
                {service.icon}
              </div>
              <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
