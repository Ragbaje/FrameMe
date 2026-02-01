
import { GoogleGenAI, GenerateContentResponse, Type } from '@google/genai';

if (!process.env.API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // This is a safeguard for development.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const callAI = async (prompt: string, schema: any) => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: schema,
            }
        });

        const text = response.text;
        if (!text) {
            throw new Error("AI did not return any text.");
        }
        
        const parsed = JSON.parse(text);
        return parsed;

    } catch (error: any) {
        console.error('Error calling Gemini API:', error);
        // Provide a more specific error message if possible
        const message = error.message?.includes('API key not valid') 
            ? 'Invalid API Key. Please check your configuration.'
            : 'Failed to get a response from the AI. Please try again.';
        throw new Error(message);
    }
}

export const rewriteWithAI = async (text: string): Promise<string[]> => {
    const prompt = `You are a professional CV writing assistant for students with little experience.
    Rewrite the following rough notes into 3-4 concise, professional, achievement-focused bullet points for a CV. 
    Use strong action verbs and quantify results where possible. 
    Return the result as a JSON array of strings.
    
    Example input: "I worked on the tills and helped customers find stuff. Also did stock checks."
    Example output: ["Processed customer transactions efficiently using POS systems, ensuring accuracy and providing excellent service.", "Assisted customers by proactively identifying their needs and locating suitable products, improving their shopping experience.", "Conducted regular stock audits to maintain inventory accuracy and ensure product availability."]

    Rough notes: "${text}"`;

    const schema = { type: Type.ARRAY, items: { type: Type.STRING } };
    const parsed = await callAI(prompt, schema);
    
    if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
      return parsed;
    } else {
      throw new Error("AI response was not a valid JSON array of strings.");
    }
};

export const rewriteProfile = async (text: string): Promise<string> => {
    const prompt = `You are a professional CV writing assistant. Rewrite the following rough notes into a concise and compelling professional summary for a CV (about 40-60 words). 
    Focus on key skills and career aspirations. Return the result as a JSON object with a single key "profile".
    
    Example input: "I'm a student looking for a job. I'm good with people and a hard worker."
    Example output: { "profile": "A highly motivated and enthusiastic student seeking an opportunity to leverage strong interpersonal skills and a dedicated work ethic. Eager to contribute to a team and develop professional experience." }

    Rough notes: "${text}"`;

    const schema = { type: Type.OBJECT, properties: { profile: { type: Type.STRING } } };
    const parsed = await callAI(prompt, schema);

    if (parsed && typeof parsed.profile === 'string') {
        return parsed.profile;
    } else {
        throw new Error("AI response was not in the expected format.");
    }
};


export const suggestSkills = async (text: string): Promise<string[]> => {
    const prompt = `You are a skills analysis expert who helps students identify valuable skills from their experiences. 
    Based on the following job or education description, extract a list of 5-7 relevant soft and technical skills.
    Return ONLY a JSON array of strings. Do not include any other text.
    
    Example input: "Volunteered at a local charity shop. I organised donated books and helped customers."
    Example output: ["Customer Service", "Organisation", "Communication", "Teamwork", "Problem Solving"]
    
    Description: "${text}"`;
    
    const schema = { type: Type.ARRAY, items: { type: Type.STRING } };
    const parsed = await callAI(prompt, schema);

    if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
        return parsed;
    } else {
        throw new Error("AI skill suggestion was not a valid JSON array of strings.");
    }
};
