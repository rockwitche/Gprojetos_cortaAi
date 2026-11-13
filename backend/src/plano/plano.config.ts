export type PlanoType = 'BASICO' | 'PROFISSIONAL' | 'PREMIUM';

export const PLANO_LIMITES: Record<
  PlanoType,
  { maxAgendamentosMes: number }
> = {
  BASICO: { maxAgendamentosMes: 30 },
  PROFISSIONAL: { maxAgendamentosMes: -1 },
  PREMIUM: { maxAgendamentosMes: -1 },
};
