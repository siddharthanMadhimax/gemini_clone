// Import the necessary modules
import { GoogleGenerativeAI } from "@google/generative-ai";

// Set up the API key and initialize the Generative AI instance
const apiKey = "AIzaSyAlfEm9hbiHbWQU-w8S-h8ISgGUQ5ZUJig";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

// Function to send a prompt and get a response
async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    var response=result.response
    // console.log(response.text())
    return response.text()
    
}

// Export the function for use in other modules
export default run;
