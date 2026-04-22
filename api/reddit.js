module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const response = await fetch("https://www.reddit.com/r/Cricket/search.json?q=LSG%20RR&sort=new&limit=5", {
      headers: { 'User-Agent': 'Mozilla/5.0 CricktyBot/1.0' }
    });
    
    if (!response.ok) throw new Error("Reddit fetch failed");
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Reddit" });
  }
};
