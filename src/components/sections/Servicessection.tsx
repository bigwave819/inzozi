'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const services = [
  {
    number: '01',
    title: 'Mobile Applications',
    description: 'Cross-platform apps that feel native. React Native, Flutter, Swift & Kotlin. From MVP to millions of users.',
    accent: '#00d4ff',
    tags: ['React Native', 'Flutter', 'iOS', 'Android', 'Expo'],
    icon: '◈'
  },
  {
    number: '02',
    title: 'Web Applications',
    description: 'Fast, scalable, beautiful web apps. Next.js, React, Vue. Server-side rendering. Zero compromises.',
    accent: '#39ff14',
    tags: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    icon: '◉'
  },
  {
    number: '03',
    title: 'UI/UX Design',
    description: 'Interfaces that stop people mid-scroll. We design with obsession. Figma to pixel-perfect reality.',
    accent: '#ffaa00',
    tags: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    icon: '◎'
  },
  {
    number: '04',
    title: 'API & Backend',
    description: 'Rock-solid APIs and microservices. REST, GraphQL, WebSockets. Infrastructure that scales silently.',
    accent: '#ff006e',
    tags: ['Node.js', 'Python', 'GraphQL', 'REST', 'Docker', 'AWS'],
    icon: '◐'
  },
  {
    number: '05',
    title: 'Cloud & DevOps',
    description: 'Deploy with confidence. CI/CD pipelines, containerization, monitoring. Your infra, bulletproofed.',
    accent: '#7b2fff',
    tags: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD'],
    icon: '◑'
  },
  {
    number: '06',
    title: 'Tech Consulting',
    description: 'Architecture review, tech stack selection, code audits. We\'ve seen it all. Let\'s save you time.',
    accent: '#00d4ff',
    tags: ['Architecture', 'Code Review', 'Strategy', 'Mentorship'],
    icon: '◒'
  }
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '2.5rem',
        border: `1px solid ${hovered ? service.accent : 'rgba(240,237,232,0.07)'}`,
        background: hovered ? `rgba(${service.accent === '#00d4ff' ? '0,212,255' : service.accent === '#39ff14' ? '57,255,20' : service.accent === '#ffaa00' ? '255,170,0' : service.accent === '#ff006e' ? '255,0,110' : '123,47,255'},0.04)` : 'rgba(240,237,232,0.01)',
        transition: 'all 0.4s cubic-bezier(0.25,1,0.5,1)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${index * 0.08}s`,
        position: 'relative', overflow: 'hidden', cursor: 'none'
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: hovered ? 80 : 0, height: 1,
        background: service.accent, transition: 'width 0.4s ease'
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 1, height: hovered ? 80 : 0,
        background: service.accent, transition: 'height 0.4s ease 0.1s'
      }} />

      {/* Number + Icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: service.accent, letterSpacing: '0.2em' }}>
          {service.number}
        </span>
        <span style={{ fontSize: '2rem', color: service.accent, opacity: 0.6 }}>{service.icon}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,2.5vw,2rem)',
        color: '#f0ede8', letterSpacing: '0.03em', marginBottom: '1rem', lineHeight: 1.1
      }}>
        {service.title}
      </h3>

      {/* Description */}
      <p style={{ color: 'rgba(240,237,232,0.5)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.5rem', fontWeight: 300 }}>
        {service.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {service.tags.map(tag => (
          <span key={tag} style={{
            padding: '0.25rem 0.6rem', border: `1px solid ${hovered ? service.accent + '40' : 'rgba(240,237,232,0.1)'}`,
            color: hovered ? service.accent : 'rgba(240,237,232,0.3)',
            fontSize: '0.7rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
            transition: 'all 0.3s ease'
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{
      padding: 'clamp(6rem,12vw,10rem) clamp(1.5rem,5vw,4rem)',
      background: 'linear-gradient(180deg, #020205 0%, #05050f 100%)',
      position: 'relative', overflow: 'hidden'
    }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Chapter label */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(57,255,20,0.4)', textTransform: 'uppercase', marginBottom: '3rem' }}>
          003 / SERVICES
        </div>

        {/* Section header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,6rem)',
              color: '#f0ede8', lineHeight: 0.95, letterSpacing: '-0.01em',
              opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)'
            }}>
              WHAT WE<br /><span style={{ color: '#39ff14' }}>BUILD</span>
            </h2>
          </div>
          <p style={{
            maxWidth: 360, color: 'rgba(240,237,232,0.4)', fontSize: '0.9rem', lineHeight: 1.8,
            opacity: titleVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.3s'
          }}>
            From zero to launch. From idea to App Store. Full-stack. Full-commitment. Full-speed.
          </p>
        </div>

        {/* Services grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1px', background: 'rgba(240,237,232,0.04)' }}>
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <Link href="/services" style={{
            display: 'inline-block', padding: '1rem 3rem',
            border: '1px solid #39ff14', color: '#39ff14', textDecoration: 'none',
            fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            transition: 'background 0.3s, color 0.3s'
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#39ff14'; (e.currentTarget as HTMLElement).style.color = '#020205' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#39ff14' }}
          >
            Explore All Services →
          </Link>
        </div>
      </div>
    </section>
  )
}