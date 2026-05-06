import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Browse Inzozi Labs portfolio of mobile apps, web platforms and digital products built for clients across Africa and beyond.',
}

const projects = [
  {
    num: '01', title: 'FinEdge Mobile Banking', category: 'Mobile App · Fintech', accent: '#00d4ff',
    description: 'A full-featured mobile banking app with real-time transactions, biometric auth, and AI spending insights. 50K+ active users, 4.9 App Store rating.',
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'Redis'], outcome: '50K+ users · 4.9★ rating'
  },
  {
    num: '02', title: 'Kanda Market', category: 'Web App · E-Commerce', accent: '#39ff14',
    description: 'A multi-vendor marketplace for East African artisans. Built to handle 10x traffic spikes. Integrated M-Pesa, Stripe, and local payment gateways.',
    tags: ['Next.js', 'Stripe', 'Redis', 'AWS'], outcome: '3x conversion rate improvement'
  },
  {
    num: '03', title: 'HealthTrack Pro', category: 'Mobile App · HealthTech', accent: '#ffaa00',
    description: 'Wearable-connected health tracking app with AI health insights. Featured by Google Play as "Editor\'s Choice" in health category.',
    tags: ['Flutter', 'Firebase', 'TensorFlow', 'GCP'], outcome: 'Google Play Editor\'s Choice'
  },
  {
    num: '04', title: 'DataViz SaaS Platform', category: 'Web App · SaaS', accent: '#ff006e',
    description: 'White-label analytics dashboard with real-time streaming data, custom chart builders, and multi-tenant architecture.',
    tags: ['React', 'D3.js', 'WebSocket', 'Go'], outcome: '40+ business clients'
  },
  {
    num: '05', title: 'MoveIT Logistics', category: 'Mobile + Web · Logistics', accent: '#7b2fff',
    description: 'End-to-end logistics management platform: driver app, client app, and admin dashboard. Real-time tracking, route optimization, invoicing.',
    tags: ['React Native', 'Next.js', 'GraphQL', 'MongoDB'], outcome: 'Serving 8 cities in Africa'
  },
  {
    num: '06', title: 'EduRwanda LMS', category: 'Web App · EdTech', accent: '#00d4ff',
    description: 'A learning management system serving 12,000 students. Video streaming, live classes, progress tracking, certificate generation.',
    tags: ['Next.js', 'PostgreSQL', 'AWS S3', 'Stripe'], outcome: '12K+ students enrolled'
  },
]

export default function WorkPage() {
  return (
    <div style={{ background: '#020205', minHeight: '100vh', paddingTop: '7rem' }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(255,0,110,0.4)', textTransform: 'uppercase', marginBottom: '2rem' }}>
            PORTFOLIO
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem,10vw,9rem)', color: '#f0ede8', lineHeight: 0.9, letterSpacing: '-0.01em', marginBottom: '2rem' }}>
            THINGS WE'VE<br /><span style={{ color: '#ff006e' }}>BUILT</span>
          </h1>
          <p style={{ color: 'rgba(240,237,232,0.4)', fontSize: '1.05rem', lineHeight: 1.85, maxWidth: 540, fontWeight: 300 }}>
            Every project in this list is a real product, shipped to real users. No concept work. No fakes. Just results.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section style={{ padding: '0 clamp(1.5rem,5vw,4rem) clamp(4rem,10vw,8rem)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(240,237,232,0.04)' }}>
          {projects.map(project => (
            <div key={project.num} style={{ background: '#020205', padding: 'clamp(2rem,5vw,3.5rem)', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '2rem', alignItems: 'start' }} className="project-item">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: project.accent, letterSpacing: '0.2em', paddingTop: '0.4rem' }}>{project.num}</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#f0ede8', letterSpacing: '0.02em' }}>
                    {project.title}
                  </h2>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: project.accent, border: `1px solid ${project.accent}30`, padding: '0.2rem 0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {project.category}
                  </span>
                </div>
                <p style={{ color: 'rgba(240,237,232,0.45)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem', fontWeight: 300, maxWidth: 560 }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{ padding: '0.2rem 0.6rem', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'rgba(240,237,232,0.3)', border: '1px solid rgba(240,237,232,0.08)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right', paddingTop: '0.4rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: project.accent, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                  {project.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,4rem)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(240,237,232,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Your product could be next
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#f0ede8', marginBottom: '2.5rem' }}>
          LET'S ADD YOURS TO THE LIST
        </h2>
        <Link href="/contact" style={{ padding: '1rem 3rem', background: '#ff006e', color: '#f0ede8', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
          Start a Project →
        </Link>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .project-item { grid-template-columns: 1fr !important; }
          .project-item > :last-child { display: none; }
        }
      `}</style>
    </div>
  )
}