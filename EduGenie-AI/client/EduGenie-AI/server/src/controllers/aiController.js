const Groq = require("groq-sdk");

exports.chat = async (req, res) => {
  try {
    const { message, mode } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const trimmedMessage = message.trim();
    const isCareerRoadmap = mode === "career-roadmap";
    const systemPrompt = isCareerRoadmap
      ? `You are an expert career mentor for students and early-career learners. Create realistic, personalized career roadmaps for any career goal. Focus on learning progression, actionable steps, projects, resources, interview preparation, career growth, and salary insights. Return only valid JSON with these exact keys: careerOverview, first30Days, threeMonthPlan, sixMonthPlan, oneYearPlan, skillsToLearn, toolsToMaster, projectsToBuild, recommendedCourses, recommendedBooks, recommendedYouTubeChannels, interviewPreparation, careerGrowthOpportunities, salaryInsights. Use arrays of concise strings for every key except careerOverview and salaryInsights.

careerOverview must be a concise but informative overview of 120-200 words.

Include:
- What this career is
- Daily responsibilities
- Key skills required
- Career growth opportunities
- Industry demand

Keep the explanation engaging, practical, and easy for students to understand.

salaryInsights should be a concise paragraph about salary trends, future demand, and growth opportunities.`
      : "You are a helpful AI tutor. Answer clearly and directly in plain text without markdown or code blocks.";
    const groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groqClient.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: trimmedMessage,
        },
      ],
      max_tokens: isCareerRoadmap ? 1800 : 512,
      temperature: 0.7,
    });

    console.log("Career Mode:", isCareerRoadmap);
    console.log("Completion Response:");
    console.log(JSON.stringify(completion, null, 2));

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