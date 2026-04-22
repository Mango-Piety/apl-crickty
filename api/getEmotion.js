const mockSamples = [
  { author: "cricket_fan_99", text: "WHAT A SIX! The timing was absolute perfection.", source: "Reddit", time: "just now" },
  { author: "rr_supporter", text: "Our bowling is collapsing completely. Where are the yorkers?", source: "Reddit", time: "1m ago" },
  { author: "neutral_observer", text: "This match is turning out to be a classic. Both teams fighting hard.", source: "Reddit", time: "2m ago" },
  { author: "lsg_forever", text: "I can't believe that catch! Unbelievable athleticism on the boundary.", source: "Reddit", time: "4m ago" },
  { author: "stat_guru", text: "The run rate has spiked significantly in the last 3 overs. Massive momentum shift.", source: "Reddit", time: "5m ago" }
];

module.exports = async (req, res) => {
  // CORS setup for Vercel Serverless
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // 100% MOCKED DEMO MODE
  try {
    // Generate a realistic random score between -1 and +1
    const score = parseFloat((Math.random() * 2 - 1).toFixed(2));
    
    // Map score to a specific emotion label
    let emotion;
    if (score > 0.6) emotion = "Euphoria";
    else if (score > 0.2) emotion = "Excitement";
    else if (score > -0.2) emotion = "Neutral";
    else if (score > -0.6) emotion = "Frustration";
    else emotion = "Disbelief";

    // Shuffle and pick 4 random samples to make the live feed look dynamic
    const shuffled = [...mockSamples].sort(() => 0.5 - Math.random());
    const samples = shuffled.slice(0, 4);

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
