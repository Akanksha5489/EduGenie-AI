const Groq = require("groq-sdk");

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const trimmedMessage = message.trim();
    const groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groqClient.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI tutor. Answer clearly and directly in plain text without markdown or code blocks.",
        },
        {
          role: "user",
          content: trimmedMessage,
        },
      ],
      max_tokens: 512,
      temperature: 0.7,
    });

    const replyText =
      completion?.choices?.[0]?.message?.content?.trim() || "";

    if (!replyText) {
      throw new Error("Groq returned an empty reply");
    }

    return res.json({
      reply: replyText,
    });
  } catch (err) {
    console.error("Groq AI error:", err);

    return res.status(200).json({
      reply: "AI Tutor is temporarily unavailable. Please try again later.",
    });
  }
};