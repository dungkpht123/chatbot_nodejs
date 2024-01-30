const fs = require('fs').promises;

// Replace this with your actual API key
const API_KEY = "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";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    let chatContent = className === "outgoing" ?
        `<p>${message}</p>` :
        `<img src="./image/logo.png" class="material-symbols-outlined logo-img"><p>${message}</p>`;

    chatLi.innerHTML = chatContent;
    return chatLi;
};

const generateResponse = async (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    try {
        const systemMessage = await fs.readFile('dung.txt', 'utf-8');

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: systemMessage },
                    { role: "user", content: userMessage }
                ]
            })
        };

        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();

        messageElement.textContent = data.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error.message);
        messageElement.textContent = "Oops! Something went wrong";
    } finally {
        console.log("Response generated successfully");
    }
};

const handleChat = async () => {
    const userMessage = "Sample user message";  // Replace this with actual user input
    if (!userMessage) return;

    const chatbox = document.querySelector(".chatbox");
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);

    await generateResponse(incomingChatLi);
};

// Call handleChat to simulate user interaction
handleChat();

