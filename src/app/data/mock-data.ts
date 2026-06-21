import { Campaign, Child, Vaccine, VaccineRecord } from '../models/vaccine.models';

export const initialChildren: Child[] = [
  {
    id: 'ana',
    name: 'Ana Clara',
    birthDate: '2025-01-12',
    gender: 'Feminino',
  },
  {
    id: 'lucas',
    name: 'Lucas',
    birthDate: '2022-09-03',
    gender: 'Masculino',
  },
];

export const vaccines: Vaccine[] = [
  {
    id: 'bcg',
    name: 'BCG',
    description: 'Protege contra formas graves de tuberculose.',
    recommendedAgeMonths: 0,
  },
  {
    id: 'hepb',
    name: 'Hepatite B',
    description: 'Previne a infeccao pelo virus da hepatite B.',
    recommendedAgeMonths: 0,
  },
  {
    id: 'penta',
    name: 'Pentavalente',
    description: 'Protege contra difteria, tetano, coqueluche, hepatite B e Hib.',
    recommendedAgeMonths: 2,
  },
  {
    id: 'polio',
    name: 'Poliomielite',
    description: 'Ajuda a prevenir a paralisia infantil.',
    recommendedAgeMonths: 4,
  },
  {
    id: 'triplice-viral',
    name: 'Triplice viral',
    description: 'Protege contra sarampo, caxumba e rubeola.',
    recommendedAgeMonths: 12,
  },
  {
    id: 'varicela',
    name: 'Varicela',
    description: 'Reduz o risco de catapora e suas complicacoes.',
    recommendedAgeMonths: 15,
  },
  {
    id: 'influenza',
    name: 'Influenza',
    description: 'Vacina anual para reducao de complicacoes da gripe.',
    recommendedAgeMonths: 6,
  },
];

export const initialRecords: VaccineRecord[] = [
  { id: 'r1', childId: 'ana', vaccineId: 'bcg', appliedDate: '2025-01-13' },
  { id: 'r2', childId: 'ana', vaccineId: 'hepb', appliedDate: '2025-01-13' },
  { id: 'r3', childId: 'ana', vaccineId: 'penta', appliedDate: '2025-03-16' },
  { id: 'r4', childId: 'ana', vaccineId: 'polio', appliedDate: '2025-05-14' },
  { id: 'r5', childId: 'lucas', vaccineId: 'bcg', appliedDate: '2022-09-04' },
  { id: 'r6', childId: 'lucas', vaccineId: 'hepb', appliedDate: '2022-09-04' },
  { id: 'r7', childId: 'lucas', vaccineId: 'penta', appliedDate: '2022-11-08' },
  { id: 'r8', childId: 'lucas', vaccineId: 'polio', appliedDate: '2023-01-10' },
  { id: 'r9', childId: 'lucas', vaccineId: 'triplice-viral', appliedDate: '2023-09-12' },
];

export const campaigns: Campaign[] = [
  {
    id: 'c1',
    title: 'Campanha Nacional contra Influenza',
    description: 'Reforco anual indicado para criancas a partir de 6 meses.',
    startDate: '2026-04-01',
    endDate: '2026-07-31',
    targetAudience: 'Criancas de 6 meses a 5 anos',
    minAgeMonths: 6,
    maxAgeMonths: 60,
  },
  {
    id: 'c2',
    title: 'Multivacinacao infantil',
    description: 'Atualizacao da caderneta para criancas com doses pendentes.',
    startDate: '2026-06-01',
    endDate: '2026-08-30',
    targetAudience: 'Criancas e adolescentes ate 15 anos',
    minAgeMonths: 0,
    maxAgeMonths: 180,
  },
  {
    id: 'c3',
    title: 'Protecao contra sarampo',
    description: 'Busca ativa para criancas que ainda nao receberam a triplice viral.',
    startDate: '2026-05-15',
    endDate: '2026-06-30',
    targetAudience: 'Criancas a partir de 12 meses',
    minAgeMonths: 12,
    maxAgeMonths: 180,
  },
];
