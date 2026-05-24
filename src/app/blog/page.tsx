import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div>
      <div className="mb-8" style={{ borderTop: '2px solid var(--gold)', paddingTop: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>
          Reflexões
        </h1>
      </div>

      {posts.length === 0 ? (
        <div style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#7a6a52', fontSize: '1.1rem' }}>
          <p>Ainda não há reflexões publicadas.</p>
          <p className="mt-2 text-sm">Para publicar, crie um arquivo <code>.md</code> em <code>data/posts/</code> com o seguinte cabeçalho:</p>
          <pre style={{ background: '#f5f0e8', padding: '1rem', marginTop: '0.75rem', fontSize: '0.85rem', fontFamily: 'monospace', color: '#3d3220' }}>
{`---
titulo: Título da reflexão
data: 2026-05-23
categoria: Mariologia
resumo: Um breve resumo que aparece na listagem.
---

Conteúdo em Markdown aqui...`}
          </pre>
        </div>
      ) : (
        <div className="space-y-5">
          {posts.map(post => (
            <article key={post.slug} style={{ border: '1px solid var(--cream-dark)', borderLeft: '3px solid var(--gold)', background: '#fff', padding: '1.25rem 1.5rem' }}>
              <div className="flex items-center gap-3 mb-2">
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--marian)', background: '#e8edf8', padding: '0.2rem 0.6rem', borderRadius: '2px' }}>
                  {post.categoria}
                </span>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '0.85rem', color: '#7a6a52' }}>
                  {new Date(post.data + 'T00:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <h2 style={{ fontFamily: 'IM Fell English, serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                {post.titulo}
              </h2>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#3d3220', fontWeight: 300, marginBottom: '0.75rem' }}>
                {post.resumo}
              </p>
              <Link href={`/blog/${post.slug}`} style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none' }}>
                Continuar lendo →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
