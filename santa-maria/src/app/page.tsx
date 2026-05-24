import Link from 'next/link'
import { getLiturgiaHoje, COR_CLASSES, COR_LABELS } from '@/lib/liturgia'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const hoje = getLiturgiaHoje()
  const posts = getAllPosts().slice(0, 3)

  const dataHoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div>

      {/* LITURGIA DE HOJE */}
      <section className="mb-12">
        <div style={{ borderTop: '2px solid var(--gold)', paddingTop: '1.5rem' }}>
          <p className="text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold)', opacity: 0.8 }}>
            Liturgia de Hoje
          </p>
          <p className="mb-4" style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#7a6a52' }}>
            {dataHoje}
          </p>
        </div>

        {hoje ? (
          <div style={{ border: '1px solid var(--cream-dark)', borderLeft: '3px solid var(--marian)', background: '#fff', padding: '1.5rem 1.75rem' }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-xs px-3 py-1 rounded-sm font-semibold tracking-wide ${COR_CLASSES[hoje.cor]}`}
                style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.15em' }}>
                {COR_LABELS[hoje.cor]}
              </span>
              <span className="text-sm" style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#7a6a52' }}>
                {hoje.tempo_liturgico} · {hoje.semana}
              </span>
            </div>

            <h2 style={{ fontFamily: 'IM Fell English, serif', fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
              ✦ {hoje.santo_do_dia.nome}
            </h2>
            <p style={{ color: '#3d3220', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300, marginBottom: '1rem' }}>
              {hoje.santo_do_dia.descricao}
            </p>

            {hoje.leituras.evangelho && (
              <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: '1rem' }}>
                <p className="text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold)', opacity: 0.8 }}>
                  Evangelho
                </p>
                <p style={{ fontFamily: 'IM Fell English, serif', fontSize: '1.05rem', color: 'var(--navy-mid)' }}>
                  {hoje.leituras.evangelho.referencia} — {hoje.leituras.evangelho.titulo}
                </p>
              </div>
            )}

            <div className="mt-4">
              <Link href="/liturgia" style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid var(--gold-pale)', paddingBottom: '1px' }}>
                Ver liturgia completa →
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ border: '1px solid var(--cream-dark)', background: '#fff', padding: '1.5rem', color: '#7a6a52', fontFamily: 'IM Fell English, serif', fontStyle: 'italic' }}>
            Liturgia de hoje ainda não cadastrada. Adicione o arquivo <code>data/liturgia/[mês]-[ano].json</code>.
          </div>
        )}
      </section>

      {/* POSTS RECENTES */}
      <section>
        <h2 className="flex items-center gap-3 mb-6" style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7a6a52' }}>
          Reflexões recentes
          <span className="flex-1 h-px" style={{ background: 'var(--cream-dark)' }} />
        </h2>

        {posts.length === 0 ? (
          <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#7a6a52' }}>
            Ainda não há reflexões publicadas. Adicione arquivos Markdown em <code>data/posts/</code>.
          </p>
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
                <h3 style={{ fontFamily: 'IM Fell English, serif', fontSize: '1.35rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
                  {post.titulo}
                </h3>
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
      </section>

    </div>
  )
}
