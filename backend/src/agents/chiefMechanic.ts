import { GoogleGenerativeAI } from "@google/generative-ai";
import type { DiagnosticState } from '../types/graph.js';
import { config } from '../config/env.js';

const genAI = new GoogleGenerativeAI(config.geminiApiKey as string);

export const chiefMechanicAgent = async (state: DiagnosticState): Promise<Partial<DiagnosticState>> => {
    // Generate JSON response for final output, or text for conversational output
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: { responseMimeType: "application/json" } });
    
    // Fallback normal model for casual conversation if we need to ask user
    // We instantiate two configs to make it easy.
    const conversationalModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const historyText = state.history.map(msg => `${msg.role.toUpperCase()}: ${msg.content}`).join('\n');
    const synthesis = state.synthesis || '';

    const instructionPrompt = `You are a casual, laid-back mechanic diagnosing a car problem. Review this synthesis of acoustic, visual, and textual data:
=== SYNTHESIS ===
${synthesis}
=== HISTORY ===
${historyText}

Determine if you have enough information to make a final diagnosis with high confidence. 
If YES, you must output a valid JSON with the exact structure:
{
  "ready": true,
  "primary_diagnosis": "String describing the issue",
  "confidence": 95,
  "actions": ["Action 1", "Action 2"],
  "safety_warnings": ["Warning 1"]
}

If NO, you must output a valid JSON with the exact structure asking a casual, friendly follow-up question:
{
  "ready": false,
  "follow_up": "Hey buddy, I'm gonna need to know..."
}

Always respond in strictly valid JSON.
`;

    const result = await model.generateContent(instructionPrompt);
    const textResponse = result.response.text();
    
    try {
        const parsed = JSON.parse(textResponse);
        if (parsed.ready) {
             return {
                 status: 'complete',
                 finalDiagnosis: {
                     primary_diagnosis: parsed.primary_diagnosis,
                     confidence: parsed.confidence,
                     actions: parsed.actions,
                     safety_warnings: parsed.safety_warnings || []
                 }
             };
        } else {
             // Appending to history
             return {
                 status: 'awaiting_user',
                 history: [...state.history, { role: 'mechanic', content: parsed.follow_up }]
             };
        }
    } catch (e) {
        // Fallback if JSON parsing fails to avoid crashing
        return {
             status: 'awaiting_user',
             history: [...state.history, { role: 'mechanic', content: "Something got crossed in my wires there. Can you tell me a bit more about what's happening just to be sure?" }]
        };
    }
};
