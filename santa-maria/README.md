# Santa Maria Ora Pro Nobis — Blog

Blog católico construído com **Next.js 14** + **Tailwind CSS**, hospedável no Vercel.

---

## Estrutura do projeto

```
santa-maria/
├── data/
│   ├── liturgia/          ← JSONs mensais da liturgia
│   │   └── maio-2026.json
│   └── posts/             ← Posts em Markdown
│       └── meu-post.md
├── src/
│   ├── app/               ← Páginas Next.js (App Router)
│   │   ├── page.tsx       ← Página inicial
│   │   ├── liturgia/      ← /liturgia
│   │   └── blog/          ← /blog e /blog/[slug]
│   └── lib/
│       ├── liturgia.ts    ← Funções para ler os JSONs
│       └── posts.ts       ← Funções para ler os Markdowns
```

---

## Como publicar uma reflexão (post)

1. Crie um arquivo `.md` em `data/posts/`, ex: `data/posts/meu-titulo.md`
2. Adicione o cabeçalho (frontmatter):

```markdown
---
titulo: Título da reflexão
data: 2026-05-23
categoria: Mariologia         # ou: Tempo Litúrgico, Reflexão, Orações
resumo: Breve resumo do post.
---

Seu texto em Markdown aqui...
```

3. Faça commit no GitHub — o Vercel publica automaticamente.

---

## Como atualizar a Liturgia Diária

Edite (ou crie) o arquivo JSON do mês em `data/liturgia/`:

### Nome do arquivo
`[mês-em-português]-[ano].json`

Exemplos: `maio-2026.json`, `junho-2026.json`, `marco-2026.json`

### Estrutura do JSON

```json
{
  "mes": "maio",
  "ano": 2026,
  "dias": {
    "2026-05-23": {
      "data": "2026-05-23",
      "tempo_liturgico": "Tempo Comum",
      "semana": "VII Semana do Tempo Comum",
      "cor": "verde",
      "santo_do_dia": {
        "nome": "Nome do Santo",
        "descricao": "Breve descrição hagiográfica."
      },
      "leituras": {
        "primeira": {
          "referencia": "Tg 5,13-20",
          "titulo": "Título opcional",
          "texto": "Trecho da leitura..."
        },
        "salmo": {
          "referencia": "Sl 140",
          "antifona": "Antífona do salmo"
        },
        "segunda": {
          "referencia": "Rm 5,6-11",
          "titulo": "Título opcional",
          "texto": "Trecho da segunda leitura (domingos/festas)"
        },
        "evangelho": {
          "referencia": "Mc 10,13-16",
          "titulo": "Título do evangelho",
          "texto": "Trecho do evangelho..."
        }
      },
      "sermao_youtube": {
        "titulo": "Nome do vídeo/sermão",
        "url": "https://www.youtube.com/watch?v=ID_DO_VIDEO",
        "canal": "Nome do canal"
      },
      "reflexao_editorial": ""
    }
  }
}
```

### Cores litúrgicas válidas
| Valor | Quando usar |
|-------|-------------|
| `verde` | Tempo Comum |
| `roxo` | Advento e Quaresma |
| `vermelho` | Pentecostes, mártires, Paixão |
| `branco` | Natal, Páscoa, Solenidades, N. Sra. |
| `rosa` | Domingo Gaudete e Laetare |
| `preto` | Exéquias (uso raro) |

---

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`

---

## Como publicar no Vercel

1. Suba o projeto para um repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. O Vercel detecta Next.js automaticamente — clique em **Deploy**
4. Cada `git push` na branch `main` publica automaticamente

---

## Dicas

- **Não há banco de dados** — tudo é lido dos arquivos JSON e Markdown a cada build
- **Edite os JSONs direto no GitHub** — o editor web do GitHub funciona bem para isso
- **O site é gerado estaticamente** — rápido, seguro e gratuito no Vercel
- Para adicionar páginas novas (ex: `/rosario`), crie `src/app/rosario/page.tsx`
