// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Access your API key as an environment variable (see "Set up your API key" above)
// const apiKey = process.env.API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// async function run() {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//   const chat = model.startChat({
//     history: [
//       {
//         role: "user",
//         parts: [{ text: "Hello, I have 2 dogs in my house." }],
//       },
//       {
//         role: "model",
//         parts: [{ text: "Great to meet you. What would you like to know?" }],
//       },
//     ],
//     generationConfig: {
//       maxOutputTokens: 100,
//     },
//   });

//   const msg = data;

//   const result = await chat.sendMessage(msg);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();