'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
          background: scrolled ? 'rgba(2,2,5,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,212,255,0.08)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.25,1,0.5,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #00d4ff, #39ff14)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', fontWeight: 700, color: '#020205', fontFamily: 'var(--font-display)'
          }}>
            IL
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '0.08em', color: '#f0ede8' }}>
            INZOZI LABS
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="hidden-mobile">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline"
              style={{
                color: pathname === link.href ? '#00d4ff' : '#f0ede8',
                textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', fontFamily: 'var(--font-mono)',
                opacity: pathname === link.href ? 1 : 0.7, transition: 'opacity 0.3s, color 0.3s'
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" style={{
            padding: '0.6rem 1.4rem', border: '1px solid #00d4ff', borderRadius: '2px',
            color: '#00d4ff', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', fontFamily: 'var(--font-mono)',
            transition: 'background 0.3s, color 0.3s',
          }}
            onMouseEnter={e => {
              (e.target as HTMLAnchorElement).style.background = '#00d4ff';
              (e.target as HTMLAnchorElement).style.color = '#020205'
            }}
            onMouseLeave={e => {
              (e.target as HTMLAnchorElement).style.background = 'transparent';
              (e.target as HTMLAnchorElement).style.color = '#00d4ff'
            }}
          >
            Let's Build →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none', border: 'none', cursor: 'none',
            display: 'none', flexDirection: 'column', gap: '5px', padding: '4px'
          }}
          className="menu-toggle"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 1.5,
              background: menuOpen && i === 1 ? 'transparent' : '#f0ede8',
              transition: 'all 0.3s ease',
              transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(4px,4px)' : i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none') : 'none'
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(2,2,5,0.97)',
        zIndex: 999, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2rem',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.25,1,0.5,1)'
      }}>
        {links.map((link, i) => (
          <Link key={link.href} href={link.href} style={{
            color: '#f0ede8', textDecoration: 'none',
            fontFamily: 'var(--font-display)', fontSize: '3rem', letterSpacing: '0.1em',
            transition: `opacity 0.3s ease ${i * 0.05}s`,
            opacity: menuOpen ? 1 : 0
          }}>
            {link.label}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .menu-toggle { display: flex !important; }
        }
      `}</style>
    </>
  )
}