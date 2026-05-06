import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'From mobile apps to web platforms, APIs to cloud infrastructure — Inzozi Labs offers full-stack software development services that scale.',
}

const services = [
  {
    num: '01', title: 'Mobile App Development', accent: '#00d4ff',
    desc: 'Cross-platform and native mobile apps built for performance, beauty, and scale. Whether React Native, Flutter, or native Swift/Kotlin — we pick the right tool, not the trendy one.',
    includes: ['iOS & Android apps', 'React Native & Flutter', 'App Store optimization', 'Push notifications', 'Offline-first architecture', 'Performance profiling']
  },
  {
    num: '02', title: 'Web Application Development', accent: '#39ff14',
    desc: 'From MVPs to enterprise platforms. Server-side rendering, edge functions, real-time features. We build web apps that load instantly and scale silently.',
    includes: ['Next.js & React', 'Full-stack TypeScript', 'SEO-optimized architecture', 'Real-time features', 'Progressive Web Apps', 'Performance optimization']
  },
  {
    num: '03', title: 'UI/UX Design', accent: '#ffaa00',
    desc: 'Design that converts and delights. We go from user research and wireframes to high-fidelity Figma prototypes to pixel-perfect implementation.',
    includes: ['User research', 'Wireframing & prototyping', 'Design systems', 'Figma to code', 'Usability testing', 'Motion design']
  },
  {
    num: '04', title: 'API & Backend Engineering', accent: '#ff006e',
    desc: 'Scalable, secure backends that power your product. REST, GraphQL, microservices. Built to handle your worst traffic day like it\'s a Tuesday.',
    includes: ['REST & GraphQL APIs', 'Microservices architecture', 'Authentication & security', 'Database design', 'Real-time WebSockets', 'API documentation']
  },
  {
    num: '05', title: 'Cloud & DevOps', accent: '#7b2fff',
    desc: 'Infrastructure that lets your team move fast without breaking things. CI/CD, containerization, monitoring, alerting — fully automated.',
    includes: ['AWS & GCP setup', 'Docker & Kubernetes', 'CI/CD pipelines', 'Monitoring & alerting', 'Auto-scaling', 'Cost optimization']
  },
  {
    num: '06', title: 'Tech Consulting', accent: '#00d4ff',
    desc: 'Need a second opinion on your architecture? A code review before launch? A CTO for hire? We\'ve seen hundreds of codebases. We\'ll tell you the truth.',
    includes: ['Architecture review', 'Code audits', 'Tech stack selection', 'Team training', 'Security assessment', 'Growth planning']
  },
]

export default function ServicesPage() {
  return (
    <div style={{ background: '#020205', minHeight: '100vh', paddingTop: '7rem' }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(57,255,20,0.4)', textTransform: 'uppercase', marginBottom: '2rem' }}>
            SERVICES
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem,10vw,9rem)', color: '#f0ede8', lineHeight: 0.9, letterSpacing: '-0.01em', marginBottom: '2rem' }}>
            FULL STACK,<br /><span style={{ color: '#39ff14' }}>FULL POWER</span>
          </h1>
          <p style={{ color: 'rgba(240,237,232,0.4)', fontSize: '1.05rem', lineHeight: 1.85, maxWidth: 540, fontWeight: 300 }}>
            We're not a "click buttons and call it design" shop. We're engineers and designers who care deeply about every layer of your product.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section style={{ padding: '0 clamp(1.5rem,5vw,4rem) clamp(4rem,10vw,8rem)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {services.map((service, i) => (
            <div key={service.num} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem',
              padding: '4rem 0', borderBottom: '1px solid rgba(240,237,232,0.06)',
              alignItems: 'start'
            }} className="service-row">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: service.accent, letterSpacing: '0.2em' }}>{service.num}</span>
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${service.accent}40, transparent)` }} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#f0ede8', letterSpacing: '0.02em', lineHeight: 1.05, marginBottom: '1.5rem' }}>
                  {service.title}
                </h2>
                <p style={{ color: 'rgba(240,237,232,0.5)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 }}>
                  {service.desc}
                </p>
              </div>
              <div style={{ paddingTop: '3rem' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: service.accent, textTransform: 'uppercase', marginBottom: '1rem' }}>What's included</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {service.includes.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: service.accent, flexShrink: 0 }} />
                      <span style={{ color: 'rgba(240,237,232,0.45)', fontSize: '0.875rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,4rem)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#f0ede8', marginBottom: '1rem' }}>
          NEED SOMETHING BUILT?
        </h2>
        <p style={{ color: 'rgba(240,237,232,0.4)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
          Let's scope your project — no commitment, no pitch deck. Just an honest conversation.
        </p>
        <Link href="/contact" style={{ padding: '1rem 3rem', background: '#39ff14', color: '#020205', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
          Get a Free Consultation →
        </Link>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .service-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}