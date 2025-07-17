import React, { useState, useEffect } from 'react';
import { Search, Calendar, TrendingUp, BookOpen, User, Bell, Globe, Filter, Star, ArrowRight, Menu, X } from 'lucide-react';
import './App.css';

const AINewsletterPlatform = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample data for demo
  const sampleArticles = [
    {
      id: 1,
      title: "AI Newsletter Platform Successfully Launched!",
      summary: "Your AI newsletter platform is now running and ready to aggregate AI news from multiple sources.",
      category: "System Update",
      source: "AI Simplified",
      date: new Date().toISOString().split('T')[0],
      readTime: "2 min",
      isDaily: true,
      industry: "General AI",
      funding: null
    },
    {
      id: 2,
      title: "Next Steps: Connect to Real News Sources",
      summary: "Configure RSS feeds and email services to start receiving real AI news updates automatically.",
      category: "Setup Guide",
      source: "Getting Started",
      date: new Date().toISOString().split('T')[0],
      readTime: "3 min",
      isDaily: false,
      industry: "Platform",
      funding: null
    }
  ];

  // Test API connection
  useEffect(() => {
    testAPIConnection();
  }, []);

  const testAPIConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/health');
      const data = await response.json();
      console.log('API Status:', data);
      
      const articlesResponse = await fetch('http://localhost:3001/api/articles');
      const articlesData = await articlesResponse.json();
      console.log('Articles API:', articlesData);
    } catch (error) {
      console.log('API not connected yet - using demo data');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'System Update', 'Setup Guide', 'AI Research', 'Healthcare', 'Hardware', 'Funding'];

  const filteredArticles = sampleArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const HomePage = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            AI Made <span className="hero-highlight">Simple</span>
          </h1>
          <p className="hero-subtitle">
            Your daily dose of AI news, explained in simple terms. Track trends, funding, and breakthroughs without the technical jargon.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">
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

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card stat-green">
          <div className="stat-icon">
            <TrendingUp className="icon" />
          </div>
          <h3 className="stat-number">Ready!</h3>
          <p className="stat-label">Platform Status</p>
        </div>
        <div className="stat-card stat-blue">
          <div className="stat-icon">
            <BookOpen className="icon" />
          </div>
          <h3 className="stat-number">2+</h3>
          <p className="stat-label">Demo Articles</p>
        </div>
        <div className="stat-card stat-purple">
          <div className="stat-icon">
            <User className="icon" />
          </div>
          <h3 className="stat-number">You!</h3>
          <p className="stat-label">First User</p>
        </div>
      </div>

      {/* Latest Articles */}
      <div className="articles-section">
        <div className="section-header">
          <h2 className="section-title">Getting Started</h2>
          <button 
            onClick={() => setCurrentPage('articles')}
            className="section-link"
          >
            View All <ArrowRight className="icon-sm" />
          </button>
        </div>
        <div className="articles-grid">
          {sampleArticles.slice(0, 2).map(article => (
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
          {article.isDaily ? 'Daily Update' : 'Setup Guide'}
        </span>
        <span className="article-time">{article.readTime}</span>
      </div>
      <h3 className="article-title">{article.title}</h3>
      <p className="article-summary">{article.summary}</p>
      <div className="article-footer">
        <span className="article-source">{article.source}</span>
        <span className="article-date">{new Date(article.date).toLocaleDateString()}</span>
      </div>
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

      {/* Filters */}
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

      {/* Articles Grid */}
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

        {/* Desktop Navigation */}
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
          <button className="nav-btn">
            Subscribe
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
        </button>
      </div>

      {/* Mobile Navigation */}
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
            onClick={() => setIsMenuOpen(false)}
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
      default: return <HomePage />;
    }
  };

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Connecting to API...</p>
          </div>
        )}
        {renderPage()}
      </main>
    </div>
  );
};

export default AINewsletterPlatform;
