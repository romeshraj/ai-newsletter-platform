const sampleArticles = [
  {
    id: 1,
    title: "OpenAI Releases GPT-5: Major Breakthrough in AI Reasoning",
    summary: "The new model shows significant improvements in mathematical problem-solving and logical reasoning, making AI more helpful for everyday tasks.",
    category: "AI Research",
    source: "MIT Technology Review",
    date: new Date().toISOString(),
    readTime: "3 min",
    isDaily: true,
    industry: "General AI",
    views: 1247
  },
  {
    id: 2,
    title: "Healthcare AI Startup Receives $50M Funding for Cancer Detection",
    summary: "New AI system can detect early-stage cancer with 95% accuracy, potentially saving thousands of lives through early diagnosis.",
    category: "Healthcare",
    source: "TechCrunch",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    readTime: "4 min",
    isDaily: false,
    industry: "Healthcare",
    funding: "$50M Series B",
    views: 892
  },
  {
    id: 3,
    title: "Google's New AI Chip Reduces Energy Consumption by 40%",
    summary: "The tech giant's latest processor makes AI computing more environmentally friendly while increasing performance for machine learning tasks.",
    category: "Hardware",
    source: "Wired",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: "5 min",
    isDaily: true,
    industry: "Hardware",
    views: 2156
  },
  {
    id: 4,
    title: "AI Newsletter Platform Successfully Launched!",
    summary: "Your AI newsletter platform is now running with full backend functionality, ready to aggregate real news and send newsletters.",
    category: "System Update",
    source: "AI Simplified",
    date: new Date().toISOString(),
    readTime: "2 min",
    isDaily: true,
    industry: "Platform",
    views: 1
  }
];

export default function handler(req, res) {
  const { method, query } = req;

  if (method === 'GET') {
    const { category = 'all', search } = query;

    let filteredArticles = sampleArticles;

    if (category !== 'all') {
      filteredArticles = filteredArticles.filter(article => 
        article.category === category
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(searchLower) ||
        article.summary.toLowerCase().includes(searchLower)
      );
    }

    res.status(200).json({
      articles: filteredArticles,
      message: 'Articles fetched successfully'
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
