"use server";

const baseUrl = "http://localhost:1337";
export const askChatbot = async (prompt: string) => {
  try {
    const response = await fetch(baseUrl + "/api/chatbot/ask-chatbot", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Error al obtener respuesta del servidor');
    }

    const data = await response.json();
    return data.Answer || 'No hay respuesta disponible.';
  } catch (error) {
    throw new Error('Error al obtener respuesta del servidor');
  }
};
