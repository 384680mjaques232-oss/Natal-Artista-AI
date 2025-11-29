import { GoogleGenAI } from "@google/genai";
import { ArtStyle } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateChristmasImage = async (
  userPrompt: string,
  style: ArtStyle
): Promise<string> => {
  try {
    // Construct a rich prompt based on user input and selected style
    const fullPrompt = `Crie uma imagem de Natal festiva e visualmente impressionante.
    Descrição do usuário: ${userPrompt}.
    Estilo artístico: ${style}.
    Certifique-se de que a imagem capture a magia e o espírito natalino.
    Alta qualidade, detalhado.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using standard image generation model
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1", // Square for sharing
        }
      }
    });

    // Extract image from response
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
            const base64Data = part.inlineData.data;
            return `data:image/png;base64,${base64Data}`;
        }
      }
    }

    throw new Error("Nenhuma imagem foi gerada. Tente novamente com uma descrição diferente.");

  } catch (error: any) {
    console.error("Erro ao gerar imagem:", error);
    throw new Error(error.message || "Falha ao conectar com o serviço de IA.");
  }
};