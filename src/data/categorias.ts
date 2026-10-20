import type { Lang } from '../i18n/ui';

export type CategoriaKey =
  | 'entrenamiento'
  | 'material'
  | 'nutricion'
  | 'salud'
  | 'carreras';

export type Categoria = {
  slug: CategoriaKey;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  tone: string;
};

export const CATEGORIAS: Record<CategoriaKey, Categoria> = {
  entrenamiento: {
    slug: 'entrenamiento',
    name: 'Entrenamiento',
    nameEn: 'Training',
    description:
      'Planes, ritmos y sesiones para correr mejor sin vivir lesionado. Menos épica, más constancia.',
    descriptionEn:
      'Plans, paces and sessions to run better without living injured. Less heroics, more consistency.',
    tone: '#123F52',
  },
  material: {
    slug: 'material',
    name: 'Material',
    nameEn: 'Gear',
    description:
      'Zapatillas, relojes y todo lo que se gasta. Qué importa, qué es marketing y cuándo jubilar algo.',
    descriptionEn:
      'Shoes, watches and everything that wears out. What matters, what is marketing and when to retire something.',
    tone: '#8A3B20',
  },
  nutricion: {
    slug: 'nutricion',
    name: 'Nutrición',
    nameEn: 'Nutrition',
    description:
      'Qué comer, cuándo beber y qué no complicar antes de salir. Sin dietas milagro.',
    descriptionEn:
      'What to eat, when to drink and what not to complicate before a run. No miracle diets.',
    tone: '#6B5A1B',
  },
  salud: {
    slug: 'salud',
    name: 'Salud',
    nameEn: 'Health',
    description:
      'Lesiones, recuperación y sueño. Cuándo apretar, cuándo parar y a quién preguntar.',
    descriptionEn:
      'Injuries, recovery and sleep. When to push, when to stop and who to ask.',
    tone: '#1B5C5A',
  },
  carreras: {
    slug: 'carreras',
    name: 'Carreras',
    nameEn: 'Races',
    description:
      'De tu primera media maratón a la maratón. Planes, semanas de descarga y día de carrera.',
    descriptionEn:
      'From your first half marathon to the marathon. Plans, down weeks and race day.',
    tone: '#1C2559',
  },
};

export const CATEGORIA_LIST = Object.values(CATEGORIAS);

export function getCategoria(key: CategoriaKey, lang: Lang = 'es'): Categoria {
  const categoria = CATEGORIAS[key];
  if (lang === 'en') {
    return {
      ...categoria,
      name: categoria.nameEn,
      description: categoria.descriptionEn,
    };
  }
  return categoria;
}

export function getCategoriaList(lang: Lang = 'es'): Categoria[] {
  return CATEGORIA_LIST.map((categoria) => getCategoria(categoria.slug, lang));
}
