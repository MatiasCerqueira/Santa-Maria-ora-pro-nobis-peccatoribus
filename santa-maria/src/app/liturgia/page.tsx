import { getLiturgiaHoje, COR_CLASSES, COR_LABELS } from '@/lib/liturgia'

function getYouTubeEmbedId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function LiturgiaPage() {
  const hoje = getLiturgiaHoje()

  const dataHoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div>
      <div className="mb-8" style={{ borderTop: '2px solid var(--gold)', paddingTop: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.25rem' }}>
          Liturgia Diária
        </h1>
        <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#7a6a52', fontSize: '1.1rem' }}>
          {dataHoje}
        </p>
      </div>

      {!hoje ? (
        <div style={{ border: '1px solid var(--cream-dark)', background: '#fff', padding: '2rem', color: '#7a6a52', fontFamily: 'IM Fell English, serif', fontStyle: 'italic' }}>
          Liturgia de hoje não encontrada. Adicione os dados no arquivo JSON do mês correspondente.
        </div>
      ) : (
        <div className="space-y-6">

          {/* CABEÇALHO LITÚRGICO */}
          <div style={{ background: '#fff', border: '1px solid var(--cream-dark)', borderTop: '3px solid var(--marian)', padding: '1.5rem' }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-xs font-semibold ${COR_CLASSES[hoje.cor]}`}
                style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.15em' }}>
                ● {COR_LABELS[hoje.cor]}
              </span>
              <span style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#7a6a52' }}>
                {hoje.tempo_liturgico}
              </span>
            </div>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#7a6a52', textTransform: 'uppercase' }}>
              {hoje.semana}
            </p>
          </div>

          {/* SANTO DO DIA */}
          <div style={{ background: '#fff', border: '1px solid var(--cream-dark)', borderLeft: '3px solid var(--gold)', padding: '1.5rem' }}>
            <p className="text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold)', opacity: 0.8 }}>
              Santo do Dia
            </p>
            <h2 style={{ fontFamily: 'IM Fell English, serif', fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
              {hoje.santo_do_dia.nome}
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#3d3220', fontWeight: 300 }}>
              {hoje.santo_do_dia.descricao}
            </p>
          </div>

          {/* LEITURAS */}
          <div style={{ background: '#fff', border: '1px solid var(--cream-dark)', padding: '1.5rem' }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold)', opacity: 0.8 }}>
              Leituras do Dia
            </p>

            {hoje.leituras.primeira && (
              <div className="mb-5">
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--marian)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Primeira Leitura · {hoje.leituras.primeira.referencia}
                </p>
                {hoje.leituras.primeira.titulo && (
                  <p style={{ fontFamily: 'IM Fell English, serif', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
                    {hoje.leituras.primeira.titulo}
                  </p>
                )}
                {hoje.leituras.primeira.texto && (
                  <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#3d3220', fontWeight: 300 }}>
                    {hoje.leituras.primeira.texto}
                  </p>
                )}
              </div>
            )}

            {hoje.leituras.salmo && (
              <div className="mb-5" style={{ borderLeft: '2px solid var(--gold-pale)', paddingLeft: '1rem' }}>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Salmo · {hoje.leituras.salmo.referencia}
                </p>
                {hoje.leituras.salmo.antifona && (
                  <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--navy-mid)' }}>
                    {hoje.leituras.salmo.antifona}
                  </p>
                )}
              </div>
            )}

            {hoje.leituras.segunda && (
              <div className="mb-5">
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--marian)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Segunda Leitura · {hoje.leituras.segunda.referencia}
                </p>
                {hoje.leituras.segunda.titulo && (
                  <p style={{ fontFamily: 'IM Fell English, serif', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
                    {hoje.leituras.segunda.titulo}
                  </p>
                )}
                {hoje.leituras.segunda.texto && (
                  <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#3d3220', fontWeight: 300 }}>
                    {hoje.leituras.segunda.texto}
                  </p>
                )}
              </div>
            )}

            {hoje.leituras.evangelho && (
              <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: '1rem' }}>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--marian)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Evangelho · {hoje.leituras.evangelho.referencia}
                </p>
                {hoje.leituras.evangelho.titulo && (
                  <p style={{ fontFamily: 'IM Fell English, serif', fontSize: '1.2rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
                    {hoje.leituras.evangelho.titulo}
                  </p>
                )}
                {hoje.leituras.evangelho.texto && (
                  <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#3d3220', fontWeight: 300 }}>
                    {hoje.leituras.evangelho.texto}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* SERMÃO DO YOUTUBE */}
          {hoje.sermao_youtube?.url && (
            <div style={{ background: '#fff', border: '1px solid var(--cream-dark)', borderLeft: '3px solid #c00', padding: '1.5rem' }}>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'Cinzel, serif', color: '#c00', opacity: 0.8 }}>
                Sermão em Vídeo
              </p>
              <p style={{ fontFamily: 'IM Fell English, serif', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '0.25rem' }}>
                {hoje.sermao_youtube.titulo}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#7a6a52', marginBottom: '1rem', fontStyle: 'italic' }}>
                {hoje.sermao_youtube.canal}
              </p>
              {getYouTubeEmbedId(hoje.sermao_youtube.url) ? (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeEmbedId(hoje.sermao_youtube.url)}`}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    allowFullScreen
                    title={hoje.sermao_youtube.titulo}
                  />
                </div>
              ) : (
                <a href={hoje.sermao_youtube.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#c00', textTransform: 'uppercase' }}>
                  Assistir no YouTube →
                </a>
              )}
            </div>
          )}

          {/* REFLEXÃO EDITORIAL */}
          {hoje.reflexao_editorial && (
            <div style={{ background: '#fff', border: '1px solid var(--cream-dark)', padding: '1.5rem' }}>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'Cinzel, serif', color: 'var(--gold)', opacity: 0.8 }}>
                Reflexão do Editor
              </p>
              <div className="prose-liturgica" dangerouslySetInnerHTML={{ __html: hoje.reflexao_editorial }} />
            </div>
          )}

        </div>
      )}
    </div>
  )
}
