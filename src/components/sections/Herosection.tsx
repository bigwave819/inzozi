'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  // Particle field
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = []
    const colors = ['#00d4ff', '#39ff14', '#ffaa00', '#ff006e', '#7b2fff']

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x, dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId) }
  }, [])

  // Text split animation on mount
  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const words = el.innerText.split(' ')
    el.innerHTML = words.map((w, i) =>
      `<span style="display:inline-block;opacity:0;transform:translateY(60px);transition:opacity 0.7s ease ${0.1 + i * 0.12}s, transform 0.7s cubic-bezier(0.25,1,0.5,1) ${0.1 + i * 0.12}s">${w}&nbsp;</span>`
    ).join('')
    setTimeout(() => {
      el.querySelectorAll('span').forEach(s => {
        (s as HTMLElement).style.opacity = '1';
        (s as HTMLElement).style.transform = 'translateY(0)'
      })
    }, 100)
  }, [])

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#020205' }}>
      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Chapter number */}
      <div style={{
        position: 'absolute', top: '6rem', left: '2rem', zIndex: 2,
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em',
        color: 'rgba(0,212,255,0.4)', textTransform: 'uppercase'
      }}>
        001 / INTRODUCTION
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 1.5rem', maxWidth: 1100 }}>
        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
          marginBottom: '2rem', padding: '0.4rem 1rem',
          border: '1px solid rgba(0,212,255,0.2)', borderRadius: '100px',
          background: 'rgba(0,212,255,0.04)'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#39ff14', display: 'block', boxShadow: '0 0 8px #39ff14' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(240,237,232,0.6)', textTransform: 'uppercase' }}>
            Software Development Studio · Kigali, Rwanda
          </span>
        </div>

        {/* Main headline */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem,11vw,10rem)',
            lineHeight: 0.9, letterSpacing: '-0.02em', color: '#f0ede8',
            marginBottom: '2rem', overflow: 'hidden'
          }}
        >
          WE BUILD DIGITAL FUTURES
        </h1>

        {/* Colored sub-headline */}
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,4vw,3.5rem)',
          letterSpacing: '0.04em', marginBottom: '1.5rem'
        }}>
          <span className="gradient-text">MOBILE · WEB · EVERYTHING INSANE</span>
        </p>

        {/* Description */}
        <p style={{
          color: 'rgba(240,237,232,0.55)', fontSize: 'clamp(0.9rem,1.5vw,1.1rem)',
          maxWidth: 540, margin: '0 auto 3rem', lineHeight: 1.8, fontWeight: 300
        }}>
          Inzozi Labs is the studio that turns your most ambitious product ideas into reality. We speak React Native, Flutter, Next.js, and a dozen other languages fluently.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/work" style={{
            padding: '1rem 2.5rem', background: '#00d4ff', color: '#020205',
            textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
            letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 0 30px rgba(0,212,255,0.3)'
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(0,212,255,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0,212,255,0.3)' }}
          >
            See Our Work
          </Link>
          <Link href="/contact" style={{
            padding: '1rem 2.5rem', border: '1px solid rgba(240,237,232,0.2)',
            color: '#f0ede8', textDecoration: 'none', fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            transition: 'border-color 0.3s, background 0.3s'
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#00d4ff'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.05)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240,237,232,0.2)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            Start a Project →
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 2
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'rgba(240,237,232,0.3)', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 50, background: 'linear-gradient(to bottom, rgba(0,212,255,0.5), transparent)', animation: 'float 2s ease-in-out infinite' }} />
      </div>

      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: '5rem', right: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(57,255,20,0.3)', textTransform: 'uppercase', zIndex: 2 }}>
        EST. 2024
      </div>
    </section>
  )
}