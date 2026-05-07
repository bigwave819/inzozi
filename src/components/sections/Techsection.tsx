'use client'
import { useEffect, useRef, useState } from 'react'

const techs = [
  'React Native', 'Flutter', 'Next.js', 'React', 'TypeScript', 'Node.js',
  'Python', 'FastAPI', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis',
  'AWS', 'GCP', 'Docker', 'Kubernetes', 'Figma', 'TensorFlow',
  'Swift', 'Kotlin', 'Expo', 'Supabase', 'Prisma', 'Tailwind CSS'
]

const stats = [
  { value: '30+', label: 'Projects Shipped', accent: '#00d4ff' },
  { value: '15+', label: 'Happy Clients', accent: '#39ff14' },
  { value: '99%', label: 'On-Time Delivery', accent: '#ffaa00' },
  { value: '5★', label: 'Client Rating', accent: '#ff006e' },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      textAlign: 'center', padding: '2.5rem',
      borderLeft: index > 0 ? '1px solid rgba(240,237,232,0.06)' : 'none',
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s cubic-bezier(0.25,1,0.5,1) ${index * 0.1}s`
    }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,5vw,5rem)',
        color: stat.accent, lineHeight: 1, marginBottom: '0.5rem',
        textShadow: `0 0 40px ${stat.accent}50`
      }}>
        {stat.value}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(240,237,232,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        {stat.label}
      </div>
    </div>
  )
}

export default function TechSection() {
  const duplicated = [...techs, ...techs]

  return (
    <section style={{ padding: 'clamp(6rem,10vw,8rem) 0', background: '#020205', overflow: 'hidden' }}>
      {/* Chapter label */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(123,47,255,0.4)', textTransform: 'uppercase', marginBottom: '4rem', paddingLeft: 'clamp(1.5rem,5vw,4rem)' }}>
        006 / TECH STACK
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: 1200, margin: '0 auto 5rem', padding: '0 clamp(1.5rem,5vw,4rem)' }} className="stats-grid">
        {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>

      {/* Marquee row 1 */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(240,237,232,0.06)', borderBottom: '1px solid rgba(240,237,232,0.06)', padding: '1.2rem 0', marginBottom: '0' }}>
        <div className="marquee-track">
          {duplicated.map((tech, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '2rem', paddingRight: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.35)', whiteSpace: 'nowrap' }}>
                {tech}
              </span>
              <span style={{ color: '#00d4ff', opacity: 0.4, fontSize: '0.5rem' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Marquee row 2 - reverse */}
      <div style={{ overflow: 'hidden', borderBottom: '1px solid rgba(240,237,232,0.06)', padding: '1.2rem 0' }}>
        <div className="marquee-track" style={{ animationDirection: 'reverse', animationDuration: '30s' }}>
          {[...duplicated].reverse().map((tech, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '2rem', paddingRight: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.2)', whiteSpace: 'nowrap' }}>
                {tech}
              </span>
              <span style={{ color: '#39ff14', opacity: 0.3, fontSize: '0.5rem' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid > div { border-left: none !important; border-top: 1px solid rgba(240,237,232,0.06); }
          .stats-grid > div:nth-child(even) { border-left: 1px solid rgba(240,237,232,0.06) !important; }
        }
      `}</style>
    </section>
  )
}