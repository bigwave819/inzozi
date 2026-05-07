'use client'
import { useEffect, useRef, useState } from 'react'

const steps = [
  { num: '01', title: 'Discovery', desc: 'We dig deep. Understand your vision, users, market, and constraints. No guesswork. Pure clarity.', accent: '#00d4ff' },
  { num: '02', title: 'Architecture', desc: 'We design the system before we write a single line. Scalable. Secure. Maintainable.', accent: '#39ff14' },
  { num: '03', title: 'Build Sprint', desc: 'Rapid iteration with weekly demos. You see progress. You feel momentum. It\'s alive.', accent: '#ffaa00' },
  { num: '04', title: 'Launch', desc: 'QA, deployment, App Store submission, monitoring setup. Launch day is a celebration, not a prayer.', accent: '#ff006e' },
  { num: '05', title: 'Evolve', desc: 'We don\'t disappear after launch. Analytics, updates, new features. We\'re in it for the long game.', accent: '#7b2fff' },
]

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => setActiveStep(p => (p + 1) % steps.length), 2500)
    return () => clearInterval(interval)
  }, [visible])

  const current = steps[activeStep]

  return (
    <section ref={sectionRef} style={{
      padding: 'clamp(6rem,12vw,10rem) clamp(1.5rem,5vw,4rem)',
      background: '#020205', position: 'relative', overflow: 'hidden'
    }}>
      {/* Chapter label */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(255,170,0,0.4)', textTransform: 'uppercase', marginBottom: '3rem' }}>
        004 / PROCESS
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,6rem)',
          color: '#f0ede8', lineHeight: 0.95, marginBottom: '5rem',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)'
        }}>
          HOW WE<br /><span style={{ color: '#ffaa00' }}>OPERATE</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="process-grid">
          {/* Steps list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {steps.map((step, i) => (
              <div
                key={step.num}
                onClick={() => setActiveStep(i)}
                style={{
                  padding: '1.5rem 0', borderBottom: '1px solid rgba(240,237,232,0.06)',
                  display: 'flex', alignItems: 'center', gap: '1.5rem',
                  cursor: 'none', transition: 'all 0.3s ease',
                  opacity: activeStep === i ? 1 : 0.35
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em',
                  color: activeStep === i ? step.accent : 'rgba(240,237,232,0.3)',
                  minWidth: 32, transition: 'color 0.3s'
                }}>
                  {step.num}
                </span>
                <div style={{ flex: 1, height: 1, background: activeStep === i ? step.accent : 'rgba(240,237,232,0.06)', transition: 'background 0.3s ease' }} />
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,2.5vw,2rem)',
                  color: activeStep === i ? step.accent : '#f0ede8',
                  letterSpacing: '0.03em', transition: 'color 0.3s ease'
                }}>
                  {step.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          <div style={{
            padding: '3rem', border: `1px solid ${current.accent}25`,
            background: `rgba(${current.accent === '#00d4ff' ? '0,212,255' : current.accent === '#39ff14' ? '57,255,20' : current.accent === '#ffaa00' ? '255,170,0' : current.accent === '#ff006e' ? '255,0,110' : '123,47,255'},0.04)`,
            position: 'relative', transition: 'all 0.5s ease'
          }}>
            {/* Top accent bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${current.accent}, transparent)` }} />

            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '6rem', color: current.accent,
              opacity: 0.1, lineHeight: 1, marginBottom: '-1.5rem', transition: 'color 0.5s'
            }}>
              {current.num}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: '3rem', color: current.accent,
              letterSpacing: '0.04em', marginBottom: '1.5rem', transition: 'color 0.5s'
            }}>
              {current.title}
            </h3>

            <p style={{ color: 'rgba(240,237,232,0.6)', fontSize: '1rem', lineHeight: 1.85, fontWeight: 300 }}>
              {current.desc}
            </p>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem' }}>
              {steps.map((_, i) => (
                <div key={i} onClick={() => setActiveStep(i)} style={{
                  width: i === activeStep ? 24 : 6, height: 6, borderRadius: 3,
                  background: i === activeStep ? current.accent : 'rgba(240,237,232,0.15)',
                  cursor: 'none', transition: 'all 0.4s ease'
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}