const articles = [
  {
    id: 1,
    title: "🎉 Backend Successfully Connected!",
    summary: "Your AI newsletter platform now has a working backend with real API endpoints serving dynamic content.",
    category: "System Update",
    source: "AI Simplified Backend",
    date: new Date().toISOString(),
    readTime: "1 min",
    isDaily: true
  },
  {
    id: 2,
    title: "OpenAI Releases GPT-5: Major AI Breakthrough",
    summary: "The new model shows significant improvements in reasoning and problem-solving capabilities.",
    category: "AI Research", 
    source: "MIT Technology Review",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    readTime: "4 min",
    isDaily: true
  },
  {
    id: 3,
    title: "Healthcare AI Startup Receives $50M Funding",
    summary: "Revolutionary cancer detection AI achieves 95% accuracy in clinical trials.",
    category: "Healthcare",
    source: "TechCrunch",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    readTime: "3 min",
    isDaily: false,
    funding: "$50M Series B"
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { category, search } = req.query;
    
    let filteredArticles = articles;
    
    if (category && category !== 'all') {
      filteredArticles = filteredArticles.filter(article => 
        article.category === category
      );
    }
    
    if (search) {
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.summary.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    res.status(200).json({ 
      articles: filteredArticles, 
      total: filteredArticles.length 
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
