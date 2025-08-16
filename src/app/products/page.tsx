// app/products/page.tsx
import { Sprout, Music2, Ticket, Boxes, Car } from "lucide-react";
import ProductCard from "@/components/product-card";

const products = [
  {
    title: "Menya Muhinzi",
    description: "A platform dedicated to agriculture, helping farmers access resources, tips, and market connections.",
    icon: Sprout,
    color: "#16A34A", // green for agriculture
  },
  {
    title: "Bruce Melody",
    description: "A modern web platform for uploading and sharing music videos and branded merchandise.",
    icon: Music2,
    color: "#2563EB", // blue for entertainment
  },
  {
    title: "Itike",
    description: "An online ticketing system for convenient and secure event and transport ticket payments.",
    icon: Ticket,
    color: "#EA580C", // orange for payment
  },
  {
    title: "Genzura",
    description: "A management tool that helps organizations efficiently track and maintain their assets.",
    icon: Boxes,
    color: "#9333EA", // purple for management
  },
  {
    title: "Zenguruka Umujyi",
    description: "A smart platform that connects drivers and clients across Kigali and other Rwandan cities.",
    icon: Car,
    color: "#DC2626", // red for transport
  },
];

export default function ProductsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#2B4468] text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Our Products</h1>
        <p className="text-xl max-w-2xl mx-auto text-gray-200">
          Explore innovative solutions crafted by Inzozi Labs to empower your business and achieve your goals.
        </p>
      </section>

      {/* Description Section */}
      <section className="py-12 px-6 text-center max-w-5xl mx-auto">
        <p className="text-lg text-gray-700 mb-4">
          At Inzozi Labs, we build products that combine <span className="text-[#2B4468] font-semibold">technology</span> 
          and <span className="text-[#FFD166] font-semibold">innovation</span> to deliver results that matter. 
          Each product is designed with <span className="text-[#06B6D4] font-semibold">usability</span> and <span className="text-[#EF4444] font-semibold">efficiency</span> in mind.
        </p>
      </section>

      {/* Products Cards Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              icon={product.icon}
              color={product.color}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
