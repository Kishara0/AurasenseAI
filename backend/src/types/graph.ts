import { Provider, Issues } from "@prisma/client";


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
  role: "user" | "mechanic";
  content: string;
}

export interface DiagnosticState {
  rawInputs: RawInputs;
  agentSummaries: AgentSummaries;
  history: HistoryMessage[];
  status: "analyzing" | "awaiting_user" | "complete";
  finalDiagnosis?: Diagnosis;
  synthesis?: string;
  // internal fields for routing
  activeAgents?: string[];
}


export interface LoginProps {
  userName: string;
  email: string;
  avatar?: string;
  password?: string;
  provider: Provider;
}


export interface User {
  id: string;
  userName: string;
  email: string;
  password?: string | null;
  avatar?: string | null;
  provider: Provider;
  cars?: Cars[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Cars {
  id: string;
  userId: string;
  user?: User;
  make: string;
  year: number;
  mileage: number;
  diagnosticHistory?: DiagnosticHistory | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiagnosticHistory {
  id: string;
  carId: string;
  car: Cars;
  issue: Issues;
  diagnosisConfidence: number;
  estimateCost: string;
  audio: number;
  visual: number;
  createdAt: Date;
  updatedAt: Date;
}
