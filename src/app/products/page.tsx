import ProductCard from "@/components/product-card";

const products = [
  {
    title: "Inzozi SAAS",
    description: "Cloud-based software solutions to streamline your business operations.",
    demoLink: "#"
  },
  {
    title: "Inzozi DAAS",
    description: "Real-time, structured data as a service to power smart decisions.",
    demoLink: "#"
  },
  {
    title: "Digital Payment Gateway",
    description: "Secure and fast payment solutions for your business and customers.",
    demoLink: "#"
  },
  {
    title: "IoT Platform",
    description: "Connect and monitor your devices seamlessly for smarter automation.",
    demoLink: "#"
  },
  {
    title: "Broad Services",
    description: "Comprehensive solutions tailored to diverse business needs.",
    demoLink: "#"
  }
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
              demoLink={product.demoLink}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
