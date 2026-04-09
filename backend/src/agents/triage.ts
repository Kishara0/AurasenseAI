import type { DiagnosticState } from '../types/graph.js';

export const triageAgent = (state: DiagnosticState): Partial<DiagnosticState> => {
  const active: string[] = [];
  
  if (state.rawInputs.audio) {
    active.push('acoustic');
  }
  if (state.rawInputs.images && state.rawInputs.images.length > 0) {
    active.push('visual');
  }
  if (state.rawInputs.text) {
    active.push('symptom');
  }

  return { activeAgents: active };
};
