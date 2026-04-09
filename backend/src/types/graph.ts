export interface RawInputs {
  audio?: string;
  images?: string[]; // Base64 data
  text?: string;
  audioMimeType?: string;
  imageMimeTypes?: string[];
}

export interface AgentSummaries {
  acoustic?: string;
  visual?: string;
  textual?: string;
}

export interface Diagnosis {
  primary_diagnosis: string;
  confidence: number;
  actions: string[];
  safety_warnings: string[];
}

export interface HistoryMessage {
  role: 'user' | 'mechanic';
  content: string;
}

export interface DiagnosticState {
  rawInputs: RawInputs;
  agentSummaries: AgentSummaries;
  history: HistoryMessage[];
  status: 'analyzing' | 'awaiting_user' | 'complete';
  finalDiagnosis?: Diagnosis;
  synthesis?: string;
  // internal fields for routing
  activeAgents?: string[];
}
