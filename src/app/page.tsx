"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/card";
import { usePortfolioData } from "@/hooks/useData";
import { CreditCard, Activity, Globe, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { features, techStack, isLoading } = usePortfolioData();

  // Map backend mock icon indices to actual Lucide icons for the UI
  const featureIcons = [
    <CreditCard key="credit" />,
    <Activity key="activity" />,
    <Globe key="globe" />,
    <BarChart3 key="bar" />
  ];

  return (
    <div className="w-full flex-col flex animate-in fade-in duration-500">
      {/* 1. Hero Section */}
      <SectionWrapper background="dark-blue" className="pt-32 pb-40 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-200 text-sm font-medium mb-4 tracking-wide">
            Next Generation Payment Solutions
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Secure Government <span className="text-blue-400">Payment System</span>
          </h1>
          <p className="text-xl text-blue-100/80 max-w-2xl leading-relaxed">
            A robust, scalable platform designed to streamline bill management and digital services with enterprise-grade reliability.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
            <Link
              href="#about"
              className="px-8 py-4 bg-white text-[#1e3a5f] font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Explore Project
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors duration-200 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* 2. About Project */}
      <SectionWrapper id="about" background="white">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#1e3a5f] dark:text-blue-400">About The Project</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Simplifying Digital Payments at Scale
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed pt-2">
              Our platform bridges the gap between citizens and government services. By providing a unified interface for bills management and secure transactions, we eliminate the friction in public revenue collection.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Designed from the ground up for maximum throughput, the system ensures real-time updates and high availability for both end-users and administrators.
            </p>
          </div>
          <div className="relative h-[400px] w-full rounded-3xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center">
            {/* Minimal abstract representation instead of a complex graphic */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900" />
            <div className="relative grid grid-cols-2 gap-4 p-8 w-full max-w-sm">
              <div className="h-24 bg-white dark:bg-gray-700 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600 animate-pulse" />
              <div className="h-24 bg-[#1e3a5f] dark:bg-blue-600 rounded-2xl shadow-sm" />
              <div className="h-24 bg-blue-100 dark:bg-blue-900/50 rounded-2xl shadow-sm border border-blue-200 dark:border-blue-800" />
              <div className="h-24 bg-white dark:bg-gray-700 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600" />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 3. Features Section */}
      <SectionWrapper background="light-gray">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#1e3a5f] dark:text-blue-400">Core Features</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Everything required for modern payment tracking</h3>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                title={feature.title}
                description={feature.description}
                icon={featureIcons[feature.iconIndex]}
              />
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* 4. Tech Stack Section */}
      <SectionWrapper background="white">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#1e3a5f] dark:text-blue-400">Upcoming Architecture</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Powered by a robust Tech Stack</h3>
          <p className="text-gray-600 dark:text-gray-400 pt-2">
            Configured with clean architecture to allow seamless enterprise integration with backend services.
          </p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {techStack.map((tech, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">{tech.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tech.type}</p>
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* 5. Call to Action */}
      <SectionWrapper background="light-gray" className="py-32">
        <div className="bg-[#1e3a5f] dark:bg-gray-900 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl border border-[#2a4d7a] dark:border-gray-800">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">Ready to transform your digital services?</h2>
            <p className="text-xl text-blue-100/90 leading-relaxed">
              Contact us to learn more about our implementation and how it can scale for your enterprise needs.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex px-10 py-5 bg-white text-[#1e3a5f] font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}