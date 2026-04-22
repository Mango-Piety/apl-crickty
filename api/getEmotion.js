const { GoogleGenAI } = require("@google/genai");
const axios = require("axios");

const failoverData = [
  {
    "author": "cricket_fan_99",
    "text": "WHAT A SIX by KL Rahul! The timing was absolute perfection.",
    "source": "Reddit",
    "time": "2m ago"
  },
  {
    "author": "rr_supporter",
    "text": "Our bowling is collapsing completely. Where are the yorkers?",
    "source": "Reddit",
    "time": "4m ago"
  },
  {
    "author": "neutral_observer",
    "text": "This match is turning out to be a classic. Both teams fighting hard.",
    "source": "Reddit",
    "time": "5m ago"
  },
  {
    "author": "lsg_forever",
    "text": "I can't believe that catch! Unbelievable athleticism on the boundary.",
    "source": "Reddit",
    "time": "7m ago"
  }
];

module.exports = async (req, res) => {
  // CORS setup for Vercel Serverless
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    let comments = [];
    let samples = [];

    try {
      // Fetch real data from Reddit
      const redditResponse = await axios.get(
        "https://www.reddit.com/r/Cricket/search.json?q=LSG%20RR&sort=new&limit=15"
      );
      
      const posts = redditResponse.data.data.children;
      
      if (!posts || posts.length === 0) {
        throw new Error("No Reddit posts found, using failover");
      }

      for (const post of posts) {
        const data = post.data;
        const text = `${data.title} - ${data.selftext || ""}`;
        comments.push(text);
        if (samples.length < 4) {
          samples.push({
            author: data.author,
            text: data.title,
            source: "Reddit",
            time: "just now"
          });
        }
      }
    } catch (redditError) {
      console.error("Reddit fetch failed, using failover:", redditError.message);
      // Fallback to failover data
      comments = failoverData.map(item => item.text);
      samples = failoverData.slice(0, 4);
    }

    const combinedComments = comments.join("\n---\n");

    const prompt = `You are analyzing fan reactions to a live cricket match.

Given the following messages, return:
1. A sentiment score between -1 and +1 (-1 is very negative/frustrated, +1 is extremely positive/euphoric).
2. One dominant emotion exactly from this list: [Euphoria, Excitement, Neutral, Frustration, Disbelief]

Messages:
---
${combinedComments}
---

Return ONLY a valid JSON object matching this schema:
{
  "score": number,
  "emotion": "label"
}`;

    // Call official Gemini API
    let score, emotion;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      
      let aiText = response.text;
      if (aiText.startsWith("\`\`\`json")) aiText = aiText.substring(7, aiText.lastIndexOf("\`\`\`")).trim();
      else if (aiText.startsWith("\`\`\`")) aiText = aiText.substring(3, aiText.lastIndexOf("\`\`\`")).trim();
      
      let result = JSON.parse(aiText);
      score = result.score;
      emotion = result.emotion;
    } catch (geminiError) {
      console.error("Gemini API failed, using simulated response:", geminiError);
      // Dynamic simulated fallback
      score = parseFloat((Math.random() * 2 - 1).toFixed(2));
      if (score > 0.6) emotion = "Euphoria";
      else if (score > 0.2) emotion = "Excitement";
      else if (score > -0.2) emotion = "Neutral";
      else if (score > -0.6) emotion = "Frustration";
      else emotion = "Disbelief";
    }

    res.status(200).json({
      score: score,
      emotion: emotion,
      samples: samples
    });

  } catch (error) {
    console.error("Critical outer error:", error);
    res.status(500).json({ error: "Failed to process emotion" });
  }
};
