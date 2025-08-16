// app/page.tsx
import { Rocket, Code, Server, Shield, Sprout, Music2, Ticket, Boxes, Car } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <Rocket className="w-8 h-8 text-amber-400" />,
      title: "Innovative Solutions",
      description: "Cutting-edge technology tailored to your business needs",
    },
    {
      icon: <Code className="w-8 h-8 text-teal-300" />,
      title: "Quality Code",
      description: "Clean, maintainable, and scalable software architecture",
    },
    {
      icon: <Server className="w-8 h-8 text-rose-300" />,
      title: "Robust Infrastructure",
      description: "Reliable cloud and on-premise deployment options",
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-300" />,
      title: "Secure Systems",
      description: "Enterprise-grade security for your peace of mind",
    },
  ];

  const products = [
    {
      title: "Menya Muhinzi",
      description: "A platform dedicated to agriculture, helping farmers access resources, tips, and market connections.",
      icon: Sprout,
      color: "#16A34A", // green
    },
    {
      title: "Bruce Melody",
      description: "A modern web platform for uploading and sharing music videos and branded merchandise.",
      icon: Music2,
      color: "#2563EB", // blue
    },
    {
      title: "Itike",
      description: "An online ticketing system for convenient and secure event and transport ticket payments.",
      icon: Ticket,
      color: "#EA580C", // orange
    },
    {
      title: "Genzura",
      description: "A management tool that helps organizations efficiently track and maintain their assets.",
      icon: Boxes,
      color: "#9333EA", // purple
    },
    {
      title: "Zenguruka Umujyi",
      description: "A smart platform that connects drivers and clients across Kigali and other Rwandan cities.",
      icon: Car,
      color: "#DC2626", // red
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 w-full mx-auto"
        style={{ backgroundColor: "#2B4468" }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Building <span className="text-amber-400">Digital Futures</span>{" "}
              with Inzozi Labs
            </h1>
            <p className="text-xl text-gray-300">
              We craft exceptional software solutions that drive growth and
              innovation for forward-thinking businesses.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors">
                Get Started
              </button>
              <button className="border border-white hover:bg-white/10 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                <Link href={"/contact"}>Contact Us</Link>
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src="/images/profile/here.png"
              alt="Technology illustration"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 bg-white rounded-xl">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-[#2B4468] mb-4">
            About Inzozi Labs
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At Inzozi Labs, we are passionate about turning ideas into impactful
            digital solutions. From SaaS platforms to IoT innovations, our team
            combines creativity, technical expertise, and business insight to
            craft products that empower businesses and delight users. We believe
            in clean code, robust infrastructure, and secure systems that scale
            as your vision grows.
          </p>
          <p className="text-gray-700 text-lg mt-4 leading-relaxed">
            Our mission is to help companies navigate the digital future with
            confidence, providing innovative solutions that drive efficiency,
            growth, and transformation.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img
            src="/about.png"
            alt="About Inzozi Labs"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Inzozi Labs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine technical excellence with business understanding to
            deliver real results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-6 rounded-xl border border-gray-200 hover:border-amber-400 transition-all"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our range of innovative products designed to empower your
            business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition"
            >
              {/* Icon in Circle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: product.color }}
              >
                <product.icon className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {product.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600">{product.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
