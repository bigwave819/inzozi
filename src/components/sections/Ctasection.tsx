'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{
      padding: 'clamp(8rem,15vw,12rem) clamp(1.5rem,5vw,4rem)',
      background: '#080812', position: 'relative', overflow: 'hidden', textAlign: 'center'
    }}>
      {/* Chapter label */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(255,0,110,0.4)', textTransform: 'uppercase', marginBottom: '3rem' }}>
        008 / FINALE
      </div>

      {/* Glowing orb */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.3em',
          color: '#ff006e', textTransform: 'uppercase', marginBottom: '2rem',
          opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease'
        }}>
          ◆ Ready to build something insane? ◆
        </p>

        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem,11vw,10rem)',
          color: '#f0ede8', lineHeight: 0.88, letterSpacing: '-0.01em',
          marginBottom: '3rem',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(60px)',
          transition: 'opacity 0.9s ease 0.1s, transform 0.9s cubic-bezier(0.25,1,0.5,1) 0.1s'
        }}>
          LET'S BUILD<br /><span className="gradient-text">TOGETHER</span>
        </h2>

        <p style={{
          color: 'rgba(240,237,232,0.45)', fontSize: '1rem', maxWidth: 480,
          margin: '0 auto 3rem', lineHeight: 1.85, fontWeight: 300,
          opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.3s'
        }}>
          Have an idea? A problem to solve? A product to scale? We want to hear it. Drop us a message and let's talk.
        </p>

        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
          opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.45s'
        }}>
          <Link href="/contact" style={{
            padding: '1.1rem 3rem', background: '#ff006e', color: '#f0ede8',
            textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
            letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700,
            boxShadow: '0 0 40px rgba(255,0,110,0.3)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 50px rgba(255,0,110,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(255,0,110,0.3)' }}
          >
            Start Your Project →
          </Link>
          <a href="mailto:hello@inzozilabs.com" style={{
            padding: '1.1rem 3rem', border: '1px solid rgba(240,237,232,0.2)',
            color: '#f0ede8', textDecoration: 'none', fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            transition: 'border-color 0.3s'
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240,237,232,0.5)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240,237,232,0.2)'}
          >
            hello@inzozilabs.com
          </a>
        </div>
      </div>
    </section>
  )
}