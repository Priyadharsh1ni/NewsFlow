import React, { useEffect, useState } from 'react';
import './style.css';
import { action } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Components/button';
import ArticleList from '../Components/ArticleContainer';

const categories = ['Business', 'Tech', 'Sports', 'Health', 'Science', 'Entertainment'];
const countries = ['us', 'in', 'uk'];
const sources = ['CNN', 'BBC', 'TechCrunch'];

function Dashboard() {
    const dispatch = useDispatch();
    const articles = useSelector((state) => state.articles);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [country, setCountry] = useState('');
    const [source, setSource] = useState('');

    useEffect(() => {
        dispatch(action.ListArticle({ search: search, category: category, country: country, source: source }));
    }, [search, category, country, source]);

    return (
        <div className="dashboard-bg">
            <div className="dashboard-card">
                <div className="dashboard-title">NewsFlow</div>
                <div className="dashboard-subtitle">✨ Your Personalized News Universe ✨</div>
                <div className="dashboard-desc">
                    Discover stories that shape your world. Curated news from global sources, tailored to your interests.
                </div>
                <input
                    className="dashboard-search"
                    type="text"
                    placeholder="Search articles by keyword..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div className="dashboard-filters">
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select value={country} onChange={e => setCountry(e.target.value)}>
                        <option value="">All Countries</option>
                        {countries.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                    </select>
                    <select value={source} onChange={e => setSource(e.target.value)}>
                        <option value="">All Sources</option>
                        {sources.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="dashboard-sections">
                    <div className="dashboard-section"><span>📈</span> Trending</div>
                    <div className="dashboard-section"><span>🧲</span> Filter</div>
                    <div className="dashboard-section"><span>🌐</span> Global</div>
                </div>
            </div>

            <ArticleList articles={articles} />
        </div>
    );
}

export default Dashboard;