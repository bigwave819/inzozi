'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const projects = [
  {
    id: 'fintech-app',
    title: 'FinTech Mobile App',
    category: 'Mobile · Fintech',
    description: 'A cross-platform mobile banking app serving 50K+ users. Real-time transactions, biometric auth, stunning charts.',
    accent: '#00d4ff',
    tags: ['React Native', 'Node.js', 'PostgreSQL'],
    num: '01'
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'Web · Retail',
    description: 'A high-conversion e-commerce platform with AI product recommendations, built to handle Black Friday loads.',
    accent: '#39ff14',
    tags: ['Next.js', 'Stripe', 'Redis'],
    num: '02'
  },
  {
    id: 'health-app',
    title: 'Health Tracking App',
    category: 'Mobile · Health',
    description: 'Flutter app that syncs with wearables, tracks vitals, and gives AI-powered health insights. Featured in App Store.',
    accent: '#ffaa00',
    tags: ['Flutter', 'Firebase', 'TensorFlow'],
    num: '03'
  },
  {
    id: 'saas-dashboard',
    title: 'Analytics SaaS',
    category: 'Web · SaaS',
    description: 'Beautiful data analytics dashboard with real-time streaming, custom charts, and white-label support.',
    accent: '#ff006e',
    tags: ['React', 'D3.js', 'WebSocket'],
    num: '04'
  }
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
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
        position: 'relative', overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s cubic-bezier(0.25,1,0.5,1) ${index * 0.1}s`,
        cursor: 'none'
      }}
    >
      {/* Main card */}
      <div style={{
        padding: '3rem',
        background: hovered ? `rgba(${project.accent === '#00d4ff' ? '0,212,255' : project.accent === '#39ff14' ? '57,255,20' : project.accent === '#ffaa00' ? '255,170,0' : '255,0,110'},0.06)` : 'rgba(240,237,232,0.02)',
        border: `1px solid ${hovered ? project.accent + '40' : 'rgba(240,237,232,0.06)'}`,
        transition: 'all 0.4s cubic-bezier(0.25,1,0.5,1)',
        height: '100%'
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: project.accent, letterSpacing: '0.2em' }}>
            {project.num}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em',
            color: 'rgba(240,237,232,0.3)', textTransform: 'uppercase',
            padding: '0.3rem 0.7rem', border: '1px solid rgba(240,237,232,0.08)'
          }}>
            {project.category}
          </span>
        </div>

        {/* Visual placeholder (colored block) */}
        <div style={{
          width: '100%', height: 160, marginBottom: '2rem',
          background: `linear-gradient(135deg, ${project.accent}15, ${project.accent}05)`,
          border: `1px solid ${project.accent}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            border: `2px solid ${project.accent}50`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: project.accent, fontSize: '1.5rem', opacity: 0.6
          }}>⬡</div>
          {/* Animated corner */}
          <div style={{
            position: 'absolute', top: 0, right: 0, width: hovered ? 60 : 0, height: 2,
            background: project.accent, transition: 'width 0.4s ease'
          }} />
        </div>

        {/* Content */}
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,2.5vw,1.9rem)',
          color: '#f0ede8', letterSpacing: '0.02em', marginBottom: '1rem', lineHeight: 1.1
        }}>
          {project.title}
        </h3>

        <p style={{ color: 'rgba(240,237,232,0.45)', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '1.5rem', fontWeight: 300 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              padding: '0.2rem 0.6rem', fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
              color: project.accent, border: `1px solid ${project.accent}25`,
              letterSpacing: '0.08em'
            }}>{tag}</span>
          ))}
        </div>

        {/* Arrow */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: hovered ? '0.75rem' : '0.5rem',
          color: hovered ? project.accent : 'rgba(240,237,232,0.3)',
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.15em',
          textTransform: 'uppercase' as const, transition: 'color 0.3s, gap 0.3s',
        }}>
          View Case Study <span>→</span>
        </div>
      </div>
    </div>
  )
}

export default function WorkSection() {
  const [titleVisible, setTitleVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
      background: 'linear-gradient(180deg, #05050f 0%, #020205 100%)',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Chapter label */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(255,0,110,0.4)', textTransform: 'uppercase', marginBottom: '3rem' }}>
        005 / SELECTED WORK
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,6rem)',
            color: '#f0ede8', lineHeight: 0.95,
            opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)'
          }}>
            OUR<br /><span style={{ color: '#ff006e' }}>WORK</span>
          </h2>
          <Link href="/work" style={{
            color: 'rgba(240,237,232,0.4)', textDecoration: 'none',
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', display: 'flex', alignItems: 'center',
            transition: 'color 0.3s'
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#ff006e'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(240,237,232,0.4)'}
          >
            All Projects →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}