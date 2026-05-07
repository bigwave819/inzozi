'use client'
import { useEffect, useRef } from 'react'

const statements = [
  { text: 'We don\'t do average.', accent: '#00d4ff', delay: 0 },
  { text: 'We don\'t do boring.', accent: '#39ff14', delay: 0.15 },
  { text: 'We build things that make people say', accent: '#ffaa00', delay: 0.3 },
  { text: '"THIS IS INSANE."', accent: '#ff006e', delay: 0.45, large: true },
]

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.manifesto-line').forEach(el => {
              (el as HTMLElement).style.opacity = '1';
              (el as HTMLElement).style.transform = 'translateX(0)'
            })
          }
        })
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{
      padding: 'clamp(6rem,12vw,10rem) clamp(1.5rem,5vw,4rem)',
      background: '#020205', position: 'relative', overflow: 'hidden'
    }}>
      {/* Chapter label */}
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em',
        color: 'rgba(0,212,255,0.35)', textTransform: 'uppercase', marginBottom: '4rem'
      }}>
        002 / MANIFESTO
      </div>

      {/* Big statements */}
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {statements.map((s, i) => (
          <div
            key={i}
            className="manifesto-line"
            style={{
              opacity: 0,
              transform: 'translateX(-60px)',
              transition: `opacity 0.8s ease ${s.delay}s, transform 0.8s cubic-bezier(0.25,1,0.5,1) ${s.delay}s`,
              marginBottom: s.large ? '0' : '0.5rem'
            }}
          >
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: s.large ? 'clamp(3rem,8vw,7rem)' : 'clamp(2rem,5vw,4.5rem)',
              color: s.large ? s.accent : '#f0ede8',
              lineHeight: 1,
              letterSpacing: s.large ? '-0.01em' : '0.01em',
              textShadow: s.large ? `0 0 60px ${s.accent}50` : 'none'
            }}>
              {s.text}
            </p>
          </div>
        ))}
      </div>

      {/* Supporting text */}
      <div className="manifesto-line" style={{
        maxWidth: 600, marginTop: '4rem',
        opacity: 0, transform: 'translateX(-60px)',
        transition: 'opacity 0.8s ease 0.6s, transform 0.8s cubic-bezier(0.25,1,0.5,1) 0.6s'
      }}>
        <p style={{ color: 'rgba(240,237,232,0.45)', fontSize: '1.05rem', lineHeight: 1.85, fontWeight: 300 }}>
          At Inzozi Labs, every line of code is a commitment. We craft digital products that don't just function — they <em style={{ color: 'rgba(240,237,232,0.7)', fontStyle: 'normal', fontWeight: 500 }}>feel</em>. Products that scale. Products that ship. Products people love.
        </p>
      </div>

      {/* Decorative horizontal line with glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,0,110,0.3), rgba(57,255,20,0.3), transparent)'
      }} />

      {/* Big faded background text */}
      <div style={{
        position: 'absolute', right: '-2rem', top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem,20vw,18rem)',
        color: 'rgba(240,237,232,0.02)', userSelect: 'none', pointerEvents: 'none',
        lineHeight: 1, whiteSpace: 'nowrap'
      }}>
        DREAM
      </div>
    </section>
  )
}