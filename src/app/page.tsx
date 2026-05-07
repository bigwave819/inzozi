import type { Metadata } from 'next'
import HeroSection from '@/components/sections/Herosection'
import ManifestoSection from '@/components/sections/Manifestosection'
import ServicesSection from '@/components/sections/Servicessection'
import ProcessSection from '@/components/sections/Processsection '
import WorkSection from '@/components/sections/Worksection'
import TechSection from '@/components/sections/Techsection'
import TestimonialsSection from '@/components/sections/Testimonialssection'
import CtaSection from '@/components/sections/Ctasection'

export const metadata: Metadata = {
  title: 'Inzozi Labs — We Build Digital Futures',
  description: 'We are a software development company that builds insane mobile and web applications. Scroll and be amazed.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <ServicesSection />
      <ProcessSection />
      <WorkSection />
      <TechSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}