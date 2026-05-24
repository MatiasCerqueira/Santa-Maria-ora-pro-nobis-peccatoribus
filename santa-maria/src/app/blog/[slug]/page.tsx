import { getPost, getAllSlugs } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <article>
      <div className="mb-6" style={{ borderTop: '2px solid var(--gold)', paddingTop: '1.5rem' }}>
        <div className="flex items-center gap-3 mb-3">
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--marian)', background: '#e8edf8', padding: '0.2rem 0.6rem', borderRadius: '2px' }}>
            {post.categoria}
          </span>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '0.9rem', color: '#7a6a52' }}>
            {new Date(post.data + 'T00:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <h1 style={{ fontFamily: 'IM Fell English, serif', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: 'var(--navy)', lineHeight: 1.25, marginBottom: '0.5rem' }}>
          {post.titulo}
        </h1>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.1rem', color: '#7a6a52', fontWeight: 300 }}>
          {post.resumo}
        </p>
        <div className="flex items-center gap-4 mt-4" style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: '1rem' }}>
          <div className="flex-1 h-px" style={{ background: 'var(--cream-dark)' }} />
          <span style={{ color: 'var(--gold)', opacity: 0.5 }}>✦</span>
          <div className="flex-1 h-px" style={{ background: 'var(--cream-dark)' }} />
        </div>
      </div>

      <div
        className="prose-liturgica"
        dangerouslySetInnerHTML={{ __html: post.conteudoHtml }}
      />

      <div className="mt-10" style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: '1.5rem' }}>
        <Link href="/blog" style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none' }}>
          ← Voltar para as reflexões
        </Link>
      </div>
    </article>
  )
}
