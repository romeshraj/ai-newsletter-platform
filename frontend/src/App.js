import React, { useState } from 'react';
import { Search, TrendingUp, BookOpen, User, ArrowRight, Menu, X } from 'lucide-react';
import './App.css';

const AINewsletterPlatform = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sampleArticles = [
    {
      id: 1,
      title: "🎉 AI Newsletter Platform Successfully Launched!",
      summary: "Your AI newsletter platform is now live on the internet! Features include article browsing, search functionality, and a beautiful responsive design.",
      category: "Platform Update",
      source: "AI Simplified",
      date: new Date().toISOString(),
      readTime: "2 min",
      isDaily: true
    },
    {
      id: 2,
      title: "OpenAI Releases GPT-5: Major AI Breakthrough",
      summary: "The new model shows significant improvements in reasoning and problem-solving, making AI more helpful for everyday tasks.",
      category: "AI Research",
      source: "MIT Technology Review",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      readTime: "4 min",
      isDaily: true
    },
    {
      id: 3,
      title: "Healthcare AI Startup Receives $50M Funding",
      summary: "New AI system can detect early-stage cancer with 95% accuracy, potentially saving thousands of lives.",
      category: "Healthcare",
      source: "TechCrunch",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      readTime: "3 min",
      isDaily: false,
      funding: "$50M Series B"
    }
  ];

  const categories = ['all', 'Platform Update', 'AI Research', 'Healthcare', 'Hardware'];

  const filteredArticles = sampleArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const HomePage = () => (
    <div className="space-y-12">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            AI Made <span className="hero-highlight">Simple</span>
          </h1>
          <p className="hero-subtitle">
            Your daily dose of AI news, explained in simple terms. Track trends, funding, and breakthroughs without the technical jargon.
          </p>
          <div className="hero-buttons">
            <button 
              onClick={() => setCurrentPage('subscribe')}
              className="btn-primary"
            >
              Start Reading Today
            </button>
            <button 
              onClick={() => setCurrentPage('articles')}
              className="btn-secondary"
            >
              Explore Articles
            </button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-green">
          <div className="stat-icon">
            <TrendingUp className="icon" />
          </div>
          <h3 className="stat-number">Live! 🚀</h3>
          <p className="stat-label">Platform Status</p>
        </div>
        <div className="stat-card stat-blue">
          <div className="stat-icon">
            <BookOpen className="icon" />
          </div>
          <h3 className="stat-number">{sampleArticles.length}+</h3>
          <p className="stat-label">AI Articles</p>
        </div>
        <div className="stat-card stat-purple">
          <div className="stat-icon">
            <User className="icon" />
          </div>
          <h3 className="stat-number">You!</h3>
          <p className="stat-label">First Visitor</p>
        </div>
      </div>

      <div className="articles-section">
        <div className="section-header">
          <h2 className="section-title">Latest AI News</h2>
          <button 
            onClick={() => setCurrentPage('articles')}
            className="section-link"
          >
            View All <ArrowRight className="icon-sm" />
          </button>
        </div>
        <div className="articles-grid">
          {sampleArticles.slice(0, 3).map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );

  const ArticleCard = ({ article }) => (
    <div className="article-card">
      <div className="article-header">
        <span className={`article-badge ${article.isDaily ? 'badge-green' : 'badge-blue'}`}>
          {article.isDaily ? 'Daily Update' : 'Weekly Analysis'}
        </span>
        <span className="article-time">{article.readTime}</span>
      </div>
      <h3 className="article-title">{article.title}</h3>
      <p className="article-summary">{article.summary}</p>
      <div className="article-footer">
        <span className="article-source">{article.source}</span>
        <span className="article-date">{new Date(article.date).toLocaleDateString()}</span>
      </div>
      {article.funding && (
        <div className="article-funding">💰 {article.funding}</div>
      )}
    </div>
  );

  const ArticlesPage = () => (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">All Articles</h1>
        <p className="page-subtitle">
          Browse through our collection of AI news, simplified for everyone to understand.
        </p>
      </div>

      <div className="filters-container">
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search articles..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="articles-grid">
        {filteredArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="empty-state">
          <Search className="empty-icon" />
          <h3 className="empty-title">No articles found</h3>
          <p className="empty-text">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );

  const SubscribePage = () => (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Subscribe to AI Simplified</h1>
        <p className="page-subtitle">
          Get the latest AI news delivered to your inbox, simplified for easy understanding.
        </p>
      </div>

      <div className="subscription-container">
        <div className="subscription-card">
          <h3>🤖 AI Newsletter (Coming Soon!)</h3>
          <ul>
            <li>✅ Daily AI news summaries</li>
            <li>✅ Weekly trend analysis</li>
            <li>✅ Funding and startup updates</li>
            <li>✅ Explained in simple terms</li>
            <li>✅ 100% Free forever</li>
          </ul>
          
          <div className="coming-soon">
            <p>📧 Email subscriptions will be available soon!</p>
            <p>For now, bookmark this site and visit daily for updates.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Navigation = () => (
    <nav className="navigation">
      <div className="nav-container">
        <div 
          className="nav-brand"
          onClick={() => setCurrentPage('home')}
        >
          <div className="brand-icon">
            <span className="brand-text">AI</span>
          </div>
          <span className="brand-name">AI Simplified</span>
        </div>

        <div className="nav-links">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('articles')}
            className={`nav-link ${currentPage === 'articles' ? 'active' : ''}`}
          >
            Articles
          </button>
          <button 
            onClick={() => setCurrentPage('subscribe')}
            className="nav-btn"
          >
            Subscribe
          </button>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-nav">
          <button 
            onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
            className="mobile-nav-link"
          >
            Home
          </button>
          <button 
            onClick={() => { setCurrentPage('articles'); setIsMenuOpen(false); }}
            className="mobile-nav-link"
          >
            Articles
          </button>
          <button 
            onClick={() => { setCurrentPage('subscribe'); setIsMenuOpen(false); }}
            className="mobile-nav-btn"
          >
            Subscribe
          </button>
        </div>
      )}
    </nav>
  );

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />;
      case 'articles': return <ArticlesPage />;
      case 'subscribe': return <SubscribePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
};

export default AINewsletterPlatform;
