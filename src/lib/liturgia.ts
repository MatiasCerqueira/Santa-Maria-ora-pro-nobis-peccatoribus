import path from 'path'
import fs from 'fs'

const liturgiaDir = path.join(process.cwd(), 'data', 'liturgia')

export interface Leitura {
  referencia: string
  titulo?: string
  texto?: string
  antifona?: string
}

export interface DiaLiturgico {
  data: string
  tempo_liturgico: string
  semana: string
  cor: 'verde' | 'roxo' | 'vermelho' | 'branco' | 'rosa' | 'preto'
  santo_do_dia: {
    nome: string
    descricao: string
  }
  leituras: {
    primeira?: Leitura
    salmo?: Leitura
    segunda?: Leitura
    evangelho?: Leitura
  }
  sermao_youtube?: {
    titulo: string
    url: string
    canal: string
  }
  reflexao_editorial?: string
}

// Retorna o nome do arquivo JSON para um mês/ano
function nomeArquivo(ano: number, mes: number): string {
  const nomesMes = [
    'janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ]
  return `${nomesMes[mes - 1]}-${ano}.json`
}

// Lê e retorna o JSON de um mês inteiro
export function getLiturgiaMes(ano: number, mes: number): Record<string, DiaLiturgico> | null {
  const arquivo = path.join(liturgiaDir, nomeArquivo(ano, mes))
  if (!fs.existsSync(arquivo)) return null
  const raw = fs.readFileSync(arquivo, 'utf-8')
  const json = JSON.parse(raw)
  return json.dias as Record<string, DiaLiturgico>
}

// Retorna a liturgia de um dia específico
export function getLiturgiaDia(dataStr: string): DiaLiturgico | null {
  const d = new Date(dataStr + 'T00:00:00')
  const ano = d.getFullYear()
  const mes = d.getMonth() + 1
  const dias = getLiturgiaMes(ano, mes)
  if (!dias) return null
  return dias[dataStr] ?? null
}

// Retorna a liturgia de hoje
export function getLiturgiaHoje(): DiaLiturgico | null {
  const hoje = new Date()
  const dataStr = hoje.toISOString().split('T')[0]
  return getLiturgiaDia(dataStr)
}

// Cor em português para exibição
export const COR_LABELS: Record<string, string> = {
  verde: 'Verde',
  roxo: 'Roxo',
  vermelho: 'Vermelho',
  branco: 'Branco',
  rosa: 'Rosa',
  preto: 'Preto',
}

// Classe Tailwind para cada cor litúrgica
export const COR_CLASSES: Record<string, string> = {
  verde:    'bg-green-700 text-white',
  roxo:     'bg-purple-800 text-white',
  vermelho: 'bg-red-700 text-white',
  branco:   'bg-yellow-100 text-yellow-900 border border-yellow-400',
  rosa:     'bg-pink-400 text-white',
  preto:    'bg-gray-900 text-white',
}
