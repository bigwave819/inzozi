import { useId } from 'react'

// Colours come from the CSS tokens in globals.css, so the logo follows any palette change there.
export default function Logo({ size = 36 }: { size?: number }) {
  const id = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" role="img" aria-label="Inzozi Labs">
      <defs>
        <linearGradient id={id} x1="10" y1="46" x2="58" y2="14" gradientUnits="userSpaceOnUse">
          <stop style={{ stopColor: 'var(--electric)' }} />
          <stop offset="1" style={{ stopColor: 'var(--neon)' }} />
        </linearGradient>
      </defs>
      <path d="M18 46h28a10 10 0 0 0 1.5-19.9A14 14 0 0 0 21 24.5 10.5 10.5 0 0 0 18 46Z" stroke={`url(#${id})`} strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M52 5q.8 6.2 7 7-6.2.8-7 7-.8-6.2-7-7 6.2-.8 7-7Z" style={{ fill: 'var(--neon)' }} />
    </svg>
  )
}
