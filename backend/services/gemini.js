import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

let genAIClient = null;
export const getGenAI = () => {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }
    genAIClient = new GoogleGenerativeAI(apiKey);
  }
  return genAIClient;
};

export const generateRelaxationActivities = async ({ stressLevel, preferences = {} }) => {
  const client = getGenAI();
  const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const system = `You are an empathetic mental wellness assistant that suggests AI-generated relaxation activities.
Return concise JSON only.
The type of activities depends on stress level:
- For LOW stress: suggest funny and lighthearted AI-generated content such as memes and jokes.
- For MEDIUM stress: suggest calming music and breathing animation exercises.
- For HIGH stress: suggest AI-generated affirmations and meditation guidance.
Each activity must have a short, creative title, description, and a suitable duration in minutes.
Always return valid JSON only.`;

  const prompt = `
Stress level: ${stressLevel}
Preferences: ${JSON.stringify(preferences)}

Return JSON exactly in this format:
{
  "activities": [
    {
      "activityType": "meme|joke|music|breathing|affirmation|meditation",
      "title": "string",
      "description": "string",
      "duration": number
    }
  ]
}

Rules:
- For "low" stress → use only "meme" or "joke" types (duration 5–15 minutes)
- For "medium" stress → use only "music" or "breathing" types (duration 5–30 minutes)
- For "high" stress → use only "affirmation" or "meditation" types (duration 10–45 minutes)
`.trim();

  const result = await model.generateContent([{ text: system }, { text: prompt }]);
  const raw = result.response.text();

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (_) {
    const match = raw.match(/\{[\s\S]*\}/);
    parsed = match ? JSON.parse(match[0]) : null;
  }

  if (!parsed || !Array.isArray(parsed.activities)) {
    throw new Error('Gemini returned unexpected format');
  }

  const allowed = new Set(['meme', 'joke', 'music', 'breathing', 'affirmation', 'meditation']);
  parsed.activities = parsed.activities
    .filter(a => a && allowed.has(a.activityType))
    .map(a => ({
      activityType: a.activityType,
      title: String(a.title || '').slice(0, 80),
      description: String(a.description || '').slice(0, 240),
      duration: Math.max(1, Math.min(60, Number(a.duration || 10)))
    }));

  return parsed.activities;
};
