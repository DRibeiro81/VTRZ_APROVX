const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI('AIzaSyDjFGPRCek0JVcZgxx_eBw5Xoo5XOjFMSM');

async function list() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  try {
    const result = await model.generateContent("hi");
    console.log(result.response.text());
  } catch (e) {
    console.log(e.message);
  }
}
list();
