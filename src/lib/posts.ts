import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'data', 'posts')

export interface PostMeta {
  slug: string
  titulo: string
  data: string
  categoria: string
  resumo: string
  imagem?: string
}

export interface Post extends PostMeta {
  conteudoHtml: string
}

// Lista todos os slugs disponíveis
export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return []
  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}

// Retorna metadados de todos os posts, ordenados por data
export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map(slug => getPostMeta(slug))
    .filter(Boolean)
    .sort((a, b) => (a!.data > b!.data ? -1 : 1)) as PostMeta[]
}

// Retorna só metadados (sem renderizar HTML — mais rápido para listagens)
export function getPostMeta(slug: string): PostMeta | null {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)
  return {
    slug,
    titulo: data.titulo ?? slug,
    data: data.data ?? '',
    categoria: data.categoria ?? 'Reflexão',
    resumo: data.resumo ?? '',
    imagem: data.imagem,
  }
}

// Retorna post completo com HTML renderizado
export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)
  return {
    slug,
    titulo: data.titulo ?? slug,
    data: data.data ?? '',
    categoria: data.categoria ?? 'Reflexão',
    resumo: data.resumo ?? '',
    imagem: data.imagem,
    conteudoHtml: processed.toString(),
  }
}
