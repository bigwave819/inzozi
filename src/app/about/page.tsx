import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn the story behind Inzozi Labs — a software development studio born in Kigali, Rwanda, with a mission to build world-class digital products for Africa and beyond.',
}

const values = [
  { title: 'Craft Over Speed', desc: 'We never rush quality. We ship fast because we plan well, not because we cut corners.', accent: '#00d4ff' },
  { title: 'Radical Transparency', desc: 'No surprises. No fluff. You always know exactly where your project stands.', accent: '#39ff14' },
  { title: 'Impact-Driven', desc: 'We build for the user first. Everything else is secondary to creating real value.', accent: '#ffaa00' },
  { title: 'Always Learning', desc: 'Tech moves fast. We move faster. Our team is obsessed with staying at the bleeding edge.', accent: '#ff006e' },
]

const team = [
  { name: 'Alex Mugisha', role: 'Founder & Lead Engineer', stack: 'React Native · Next.js · AWS', accent: '#00d4ff' },
  { name: 'Grace Uwera', role: 'Head of Design', stack: 'Figma · Framer · Design Systems', accent: '#39ff14' },
  { name: 'Eric Nzeyimana', role: 'Backend Architect', stack: 'Node.js · Python · PostgreSQL', accent: '#ffaa00' },
  { name: 'Diana Ishimwe', role: 'Mobile Lead', stack: 'Flutter · Swift · Kotlin', accent: '#ff006e' },
]

export default function AboutPage() {
  return (
    <div style={{ background: '#020205', minHeight: '100vh', paddingTop: '7rem' }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(0,212,255,0.4)', textTransform: 'uppercase', marginBottom: '2rem' }}>
            001 / OUR STORY
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem,10vw,9rem)', color: '#f0ede8', lineHeight: 0.9, letterSpacing: '-0.01em', marginBottom: '3rem' }}>
            WE ARE<br /><span style={{ color: '#00d4ff' }}>INZOZI LABS</span>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            <p style={{ color: 'rgba(240,237,232,0.6)', fontSize: '1.1rem', lineHeight: 1.85, fontWeight: 300 }}>
              Inzozi Labs was founded with a simple but wild belief: that Africa deserves world-class software, built by African talent, for global ambitions.
            </p>
            <p style={{ color: 'rgba(240,237,232,0.4)', fontSize: '0.95rem', lineHeight: 1.85, fontWeight: 300 }}>
              We're a team of engineers, designers, and product thinkers based in Kigali, Rwanda. We've shipped apps used by hundreds of thousands of people. Every project is a chance to prove that the best work in the world can come from anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: 'clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)', borderTop: '1px solid rgba(240,237,232,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(57,255,20,0.4)', textTransform: 'uppercase', marginBottom: '3rem' }}>
            002 / VALUES
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,6vw,5rem)', color: '#f0ede8', marginBottom: '4rem' }}>
            WHAT WE<br /><span style={{ color: '#39ff14' }}>STAND FOR</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'rgba(240,237,232,0.04)' }}>
            {values.map(v => (
              <div key={v.title} style={{ padding: '2.5rem', background: '#020205' }}>
                <div style={{ width: 36, height: 3, background: v.accent, marginBottom: '1.5rem', borderRadius: 2 }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#f0ede8', marginBottom: '1rem', letterSpacing: '0.02em' }}>{v.title}</h3>
                <p style={{ color: 'rgba(240,237,232,0.45)', fontSize: '0.9rem', lineHeight: 1.75, fontWeight: 300 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: 'clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)', borderTop: '1px solid rgba(240,237,232,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(255,170,0,0.4)', textTransform: 'uppercase', marginBottom: '3rem' }}>
            003 / TEAM
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,6vw,5rem)', color: '#f0ede8', marginBottom: '4rem' }}>
            THE PEOPLE<br /><span style={{ color: '#ffaa00' }}>BEHIND IT</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {team.map(member => (
              <div key={member.name} style={{ padding: '2rem', border: '1px solid rgba(240,237,232,0.06)' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${member.accent}20`, border: `1px solid ${member.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: member.accent, marginBottom: '1.5rem' }}>
                  {member.name.charAt(0)}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#f0ede8', marginBottom: '0.3rem', letterSpacing: '0.02em' }}>{member.name}</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: member.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{member.role}</p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(240,237,232,0.3)', fontFamily: 'var(--font-mono)' }}>{member.stack}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,4rem)', textAlign: 'center', borderTop: '1px solid rgba(240,237,232,0.06)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#f0ede8', marginBottom: '2rem' }}>
          READY TO <span style={{ color: '#00d4ff' }}>BUILD?</span>
        </h2>
        <Link href="/contact" style={{ padding: '1rem 3rem', background: '#00d4ff', color: '#020205', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
          Let's Talk →
        </Link>
      </section>
    </div>
  )
}