import { OpenAIEdgeStream } from "openai-edge-stream";

export const config = {
    runtime: "edge",
}

export default async function handler(req){
    try {
        const {message} = await req.json();
        console.log("message: ", message);
        const intialChatMessage = {
            role: "system",
            content: "Your name is GPT speak in a poetic way."
        };
        const stream = await OpenAIEdgeStream(
            "https://api.openai.com/v1/chat/completions",
            {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                method: "POST",
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [initialChatMessage, {content: message, role: "user"}],
                    stream: true
                }),
            }
        );
        return new Response(stream);
    } catch (e) {
        console.log('error ocurred.', e);
    }
}