import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import type { RawInputs, AgentSummaries, HistoryMessage, Diagnosis } from '../types/graph.js';
import { triageAgent } from "../agents/triage.js";
import { acousticAgent, visualAgent, symptomAgent } from "../agents/specialized.js";
import { brainAgent } from "../agents/brain.js";
import { chiefMechanicAgent } from "../agents/chiefMechanic.js";

const GraphState = Annotation.Root({
  rawInputs: Annotation<RawInputs>({
    reducer: (x, y) => y ?? x,
    default: () => ({}),
  }),
  agentSummaries: Annotation<AgentSummaries>({
    reducer: (x, y) => { return { ...x, ...y }; },
    default: () => ({}),
  }),
  history: Annotation<HistoryMessage[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  status: Annotation<'analyzing' | 'awaiting_user' | 'complete'>({
    reducer: (x, y) => y ?? x,
    default: () => 'analyzing',
  }),
  finalDiagnosis: Annotation<Diagnosis | undefined>({
    reducer: (x, y) => y ?? x,
    default: () => undefined,
  }),
  synthesis: Annotation<string | undefined>({
    reducer: (x, y) => y ?? x,
    default: () => undefined,
  }),
  activeAgents: Annotation<string[]>({
      reducer: (x, y) => y ?? x,
      default: () => [],
  })
});

const workflow = new StateGraph(GraphState)
  .addNode("triage", triageAgent)
  .addNode("acoustic", acousticAgent)
  .addNode("visual", visualAgent)
  .addNode("symptom", symptomAgent)
  .addNode("brain", brainAgent)
  .addNode("chiefMechanic", chiefMechanicAgent)
  
  .addEdge(START, "triage")
  
  .addConditionalEdges("triage", (state) => {
      const routes = state.activeAgents || [];
      if (routes.length === 0) return ["brain"];
      return routes;
  })
  
  .addEdge("acoustic", "brain")
  .addEdge("visual", "brain")
  .addEdge("symptom", "brain")
  
  .addEdge("brain", "chiefMechanic")
  .addEdge("chiefMechanic", END);

export const app = workflow.compile();
