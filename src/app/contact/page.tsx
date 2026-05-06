'use client'
import type { Metadata } from 'next'
import { useState } from 'react'

// Note: metadata export needs to be in a server component, so this is simplified
// In production, move metadata to a separate layout or use generateMetadata

const services = ['Mobile App', 'Web App', 'UI/UX Design', 'API/Backend', 'Cloud/DevOps', 'Consulting', 'Other']
const budgets = ['< $5K', '$5K–$15K', '$15K–$50K', '$50K+', 'Let\'s discuss']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const inputStyle = (field: string) => ({
    width: '100%', padding: '1rem', background: 'transparent',
    border: `1px solid ${focused === field ? '#00d4ff' : 'rgba(240,237,232,0.1)'}`,
    color: '#f0ede8', fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.3s ease',
    caretColor: '#00d4ff'
  })

  const labelStyle = {
    fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em',
    color: 'rgba(240,237,232,0.35)', textTransform: 'uppercase' as const, display: 'block', marginBottom: '0.5rem'
  }

  if (sent) {
    return (
      <div style={{ background: '#020205', minHeight: '100vh', paddingTop: '7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <div>
          <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🚀</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,5rem)', color: '#f0ede8', marginBottom: '1rem' }}>
            MESSAGE RECEIVED
          </h1>
          <p style={{ color: 'rgba(240,237,232,0.4)', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: 1.8 }}>
            We'll be in touch within 24 hours.<br />Get ready to build something insane.
          </p>
          <a href="/" style={{ padding: '0.9rem 2.5rem', background: '#00d4ff', color: '#020205', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#020205', minHeight: '100vh', paddingTop: '7rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
        {/* Header */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'rgba(255,0,110,0.4)', textTransform: 'uppercase', marginBottom: '2rem' }}>
            CONTACT
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem,10vw,9rem)', color: '#f0ede8', lineHeight: 0.9, letterSpacing: '-0.01em', marginBottom: '2rem' }}>
            LET'S BUILD<br /><span style={{ color: '#ff006e' }}>TOGETHER</span>
          </h1>
          <p style={{ color: 'rgba(240,237,232,0.4)', fontSize: '1.05rem', lineHeight: 1.85, maxWidth: 480, fontWeight: 300 }}>
            Tell us what you're building. We'll tell you how we'd build it. No sales pitch. No commitment.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem', alignItems: 'start' }} className="contact-grid">
          {/* Contact info */}
          <div>
            <div style={{ marginBottom: '3rem' }}>
              <p style={{ ...labelStyle, marginBottom: '0.75rem' }}>Email</p>
              <a href="mailto:hello@inzozilabs.com" style={{ color: '#00d4ff', fontSize: '1rem', textDecoration: 'none', fontWeight: 500 }}>hello@inzozilabs.com</a>
            </div>
            <div style={{ marginBottom: '3rem' }}>
              <p style={{ ...labelStyle, marginBottom: '0.75rem' }}>Location</p>
              <p style={{ color: 'rgba(240,237,232,0.6)', fontSize: '1rem' }}>Kigali, Rwanda<br /><span style={{ color: 'rgba(240,237,232,0.35)', fontSize: '0.85rem' }}>Available globally</span></p>
            </div>
            <div style={{ marginBottom: '3rem' }}>
              <p style={{ ...labelStyle, marginBottom: '0.75rem' }}>Response Time</p>
              <p style={{ color: 'rgba(240,237,232,0.6)', fontSize: '1rem' }}>Within 24 hours</p>
            </div>
            <div>
              <p style={{ ...labelStyle, marginBottom: '1rem' }}>Follow us</p>
              <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                {[['Twitter', '#00d4ff'], ['LinkedIn', '#0077b5'], ['GitHub', '#f0ede8']].map(([name, color]) => (
                  <a key={name} href="#" style={{ color: 'rgba(240,237,232,0.3)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="form-row">
              <div>
                <label style={labelStyle}>Your Name *</label>
                <input
                  required type="text" placeholder="Alex Mugisha"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                  style={inputStyle('name')}
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input
                  required type="email" placeholder="alex@company.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                  style={inputStyle('email')}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Company (optional)</label>
              <input
                type="text" placeholder="Acme Corp"
                value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                onFocus={() => setFocused('company')} onBlur={() => setFocused('')}
                style={inputStyle('company')}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="form-row">
              <div>
                <label style={labelStyle}>Service Needed</label>
                <select
                  value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                  onFocus={() => setFocused('service')} onBlur={() => setFocused('')}
                  style={{ ...inputStyle('service'), appearance: 'none' as const }}
                >
                  <option value="" style={{ background: '#020205' }}>Select service...</option>
                  {services.map(s => <option key={s} value={s} style={{ background: '#020205' }}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Budget Range</label>
                <select
                  value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                  onFocus={() => setFocused('budget')} onBlur={() => setFocused('')}
                  style={{ ...inputStyle('budget'), appearance: 'none' as const }}
                >
                  <option value="" style={{ background: '#020205' }}>Select budget...</option>
                  {budgets.map(b => <option key={b} value={b} style={{ background: '#020205' }}>{b}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <label style={labelStyle}>Tell us about your project *</label>
              <textarea
                required rows={5}
                placeholder="What are you building? What's the problem you're solving? What does success look like?"
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                style={{ ...inputStyle('message'), resize: 'vertical' as const, minHeight: 140 }}
              />
            </div>

            <button type="submit" style={{
              width: '100%', padding: '1.2rem', background: '#ff006e', color: '#f0ede8',
              border: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
              letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700,
              cursor: 'none', transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 0 30px rgba(255,0,110,0.3)'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(255,0,110,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(255,0,110,0.3)' }}
            >
              Send Message — Let's Build →
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(240,237,232,0.2); }
      `}</style>
    </div>
  )
}