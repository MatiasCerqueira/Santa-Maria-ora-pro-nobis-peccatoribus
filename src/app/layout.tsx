import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Santa Maria Ora Pro Nobis',
  description: 'Blog católico de espiritualidade, liturgia e reflexões marianas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>

        {/* HEADER */}
        <header style={{ background: 'var(--navy)', borderBottom: '2px solid var(--gold)' }}>
          <div className="max-w-4xl mx-auto px-6 py-8 text-center">
            <p className="text-xs tracking-[0.5em] mb-3" style={{ color: 'var(--gold-light)', fontFamily: 'Cinzel, serif', opacity: 0.75 }}>
              ✦ &nbsp; Fiat Mihi Secundum Verbum Tuum &nbsp; ✦
            </p>
            <Link href="/">
              <h1 style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold-pale)', fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', letterSpacing: '0.08em', lineHeight: 1.15 }}>
                Santa Maria
                <span style={{ display: 'block', fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: '0.55em', color: 'var(--gold-light)', letterSpacing: '0.2em', marginTop: '0.3rem' }}>
                  Ora Pro Nobis
                </span>
              </h1>
            </Link>
            <div className="flex items-center gap-4 max-w-xs mx-auto mt-4">
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }} />
              <span style={{ color: 'var(--gold)', opacity: 0.7 }}>✦</span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }} />
            </div>
          </div>
        </header>

        {/* NAV */}
        <nav style={{ background: 'var(--navy-mid)', borderBottom: '1px solid rgba(181,149,74,0.3)' }}>
          <div className="max-w-4xl mx-auto flex justify-center flex-wrap">
            {[
              { href: '/', label: 'Início' },
              { href: '/liturgia', label: 'Liturgia Diária' },
              { href: '/blog', label: 'Reflexões' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gold-light)',
                  textDecoration: 'none',
                  padding: '0.85rem 1.5rem',
                  textTransform: 'uppercase',
                  borderRight: '1px solid rgba(181,149,74,0.15)',
                  opacity: 0.85,
                  transition: 'opacity 0.2s',
                }}
                className="hover:opacity-100 hover:bg-yellow-900/10"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* CONTEÚDO */}
        <main className="max-w-4xl mx-auto px-6 py-10">
          {children}
        </main>

        {/* FOOTER */}
        <footer style={{ background: 'var(--navy)', borderTop: '2px solid var(--gold)', textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: 'var(--gold-light)', fontSize: '1rem', opacity: 0.8, marginBottom: '0.4rem' }}>
            Sub tuum praesidium confugimus, Sancta Dei Genetrix.
          </p>
          <small style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(240,228,195,0.35)', textTransform: 'uppercase' }}>
            Santa Maria Ora Pro Nobis · Blog de espiritualidade católica
          </small>
        </footer>

      </body>
    </html>
  )
}
