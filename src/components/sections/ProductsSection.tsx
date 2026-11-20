'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const RENTA_URL = 'https://renta.inzozilabs.dev'
const tags = ['React', 'Vite', 'NestJS', 'PostgreSQL']

export default function ProductsSection() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{
      padding: 'clamp(6rem,12vw,10rem) clamp(1.5rem,5vw,4rem) 0',
      background: '#05050f',
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(57,255,20,0.4)', textTransform: 'uppercase', marginBottom: '3rem' }}>
        005 / OUR PRODUCTS
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,6rem)',
          color: '#f0ede8', lineHeight: 0.95, marginBottom: '4rem',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,1,0.5,1)'
        }}>
          OUR<br /><span style={{ color: 'var(--neon)' }}>PRODUCTS</span>
        </h2>

        <article className="product-card" style={{
          display: 'grid', gridTemplateColumns: '1.15fr 1fr',
          border: '1px solid rgba(240,237,232,0.08)', background: 'rgba(240,237,232,0.02)',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.25,1,0.5,1) 0.15s, border-color 0.4s'
        }}>
          <a href={RENTA_URL} aria-label="Visit Renta" style={{ display: 'block', position: 'relative', minHeight: 260, overflow: 'hidden' }}>
            <Image
              src="/work/renta.jpg" alt="Renta: Know what every owner is owed. Rental management software for property managers in Rwanda."
              fill sizes="(max-width: 860px) 100vw, 900px" className="product-img"
              // The OG image's text spans ~7–73% of its width; 15% keeps all of it inside the desktop crop.
              style={{ objectFit: 'cover', objectPosition: '15% center', transition: 'transform 0.8s cubic-bezier(0.25,1,0.5,1)' }}
            />
          </a>

          <div style={{ padding: 'clamp(2rem,4vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--neon)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--neon)', boxShadow: '0 0 10px var(--neon)' }} />
                LIVE
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(240,237,232,0.35)', textTransform: 'uppercase', padding: '0.3rem 0.7rem', border: '1px solid rgba(240,237,232,0.08)' }}>
                SaaS · PropTech · Rwanda
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#f0ede8', letterSpacing: '0.02em', lineHeight: 1, marginBottom: '1.25rem' }}>
              Renta
            </h3>

            <p style={{ color: 'rgba(240,237,232,0.55)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.75rem', fontWeight: 300, maxWidth: 460 }}>
              Rental management software for property managers in Rwanda: rent, part payments, expenses, commission and owner payouts in one ledger.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2.25rem' }}>
              {tags.map(tag => (
                <span key={tag} style={{ padding: '0.2rem 0.6rem', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--electric)', border: '1px solid rgba(0,212,255,0.25)', letterSpacing: '0.08em' }}>
                  {tag}
                </span>
              ))}
            </div>

            <a href={RENTA_URL} className="product-link" style={{
              alignSelf: 'flex-start', color: 'var(--electric)', textDecoration: 'none',
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '0.85rem 1.6rem', border: '1px solid rgba(0,212,255,0.4)', transition: 'background 0.3s, color 0.3s'
            }}>
              Visit Renta →
            </a>
          </div>
        </article>
      </div>

      <style>{`
        .product-card:hover { border-color: rgba(57,255,20,0.25) !important; }
        .product-card:hover .product-img { transform: scale(1.03); }
        .product-link:hover { background: var(--electric); color: var(--black) !important; }
        @media (max-width: 860px) {
          .product-card { grid-template-columns: 1fr !important; }
          .product-card > a:first-child { aspect-ratio: 1200 / 630; min-height: 0 !important; }
        }
      `}</style>
    </section>
  )
}
