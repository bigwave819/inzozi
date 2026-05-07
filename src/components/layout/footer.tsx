'use client'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: '#020205', borderTop: '1px solid rgba(0,212,255,0.08)',
      padding: '4rem 2rem 2rem', position: 'relative', overflow: 'hidden'
    }}>
      {/* Grid background */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.08em', color: '#f0ede8', marginBottom: '1rem' }}>
              INZOZI LABS
            </h3>
            <p style={{ color: 'rgba(240,237,232,0.5)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 250 }}>
              Turning bold ideas into insane digital experiences. Building the future, one pixel at a time.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {['Twitter', 'LinkedIn', 'GitHub', 'Dribbble'].map(s => (
                <a key={s} href="#" aria-label={s} className="footer-social-link">{s}</a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00d4ff', marginBottom: '1.5rem' }}>Navigate</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/work', 'Work'], ['/contact', 'Contact']].map(([href, label]) => (
                <Link key={href} href={href} className="link-underline" style={{ color: 'rgba(240,237,232,0.5)', textDecoration: 'none', fontSize: '0.875rem', width: 'fit-content', transition: 'color 0.3s' }}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#39ff14', marginBottom: '1.5rem' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Mobile Apps', 'Web Apps', 'UI/UX Design', 'API Development', 'Cloud Solutions', 'Consulting'].map(s => (
                <span key={s} style={{ color: 'rgba(240,237,232,0.5)', fontSize: '0.875rem' }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffaa00', marginBottom: '1.5rem' }}>Get In Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="mailto:hello@inzozilabs.com" style={{ color: 'rgba(240,237,232,0.5)', fontSize: '0.875rem', textDecoration: 'none' }}>hello@inzozilabs.com</a>
              <span style={{ color: 'rgba(240,237,232,0.5)', fontSize: '0.875rem' }}>Kigali, Rwanda</span>
              <Link href="/contact" style={{
                marginTop: '0.5rem', padding: '0.6rem 1.2rem', background: '#ffaa00',
                color: '#020205', fontSize: '0.8rem', fontFamily: 'var(--font-mono)',
                letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
                display: 'inline-block', fontWeight: 700
              }}>
                Start a Project →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(0,212,255,0.06)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(240,237,232,0.3)', letterSpacing: '0.1em' }}>
            © {year} INZOZI LABS. ALL RIGHTS RESERVED.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(240,237,232,0.3)', letterSpacing: '0.1em' }}>
            BUILT WITH ♦ IN KIGALI
          </p>
        </div>
      </div>
    </footer>
  )
}