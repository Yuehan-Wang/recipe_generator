import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: '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'
});
export async function handler(event, context) {
    try {
        const body = JSON.parse(event.body);

        const response = await openai.chat.completions.create({
            messages: [
                {
                  role: "system",
                  content: "You are a helpful assistant designed to output a recipe suggestion based on the given prompt.",
                },
                { role: "user", content:  body.prompt},
              ],
              model: "gpt-3.5-turbo-1106",
              
            });
        return {
            statusCode: 200,
            body: JSON.stringify(response.choices[0].message.content)
        };
    } catch (error) {
        console.error("Error occurred:", error);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ 
                message: error.message, 
                stack: error.stack 
            }) 
        };
    }
};
