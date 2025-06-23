import  { useEffect, useState } from 'react';
import './style.css';
import { BiBookmark } from 'react-icons/bi';
import { IoIosRemoveCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../redux/action';


function ArticleList({ articles }) {
    const [savedArticles, setSavedArticles] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const emailObj = JSON.parse(localStorage.getItem('user'));
    const email = emailObj?.email || '';


    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedArticles')) || [];
        setSavedArticles(saved);
        if (email) {
            dispatch(action.getUser({ email: email }));
        }
    }, [email]);

    const isArticleSaved = (article) => {
        return savedArticles.some(saved => saved.url === article.url);
    };

    const toggleBookmark = async (article) => {
        const saved = JSON.parse(localStorage.getItem('savedArticles')) || [];

        const exists = saved.find(item => item.url === article.url);

        let updated;
        if (exists) {
            updated = saved.filter(item => item.url !== article.url);
            await dispatch(action.saveArticle({
                userId: user.id,
                article_content: JSON.stringify(article.title),
                is_saved: 1
            }));
        } else {
            updated = [...saved, article];
            await dispatch(action.saveArticle({
                userId: user.id,
                article_content: JSON.stringify(article.title),
                is_saved: 0
            }));
        }

        setSavedArticles(updated);
        localStorage.setItem('savedArticles', JSON.stringify(updated));

    };

    if (!articles || articles.length === 0) {
        return <div className="no-articles">No articles found.</div>;
    }

    return (
        <div className="dashboard-articles">
            {articles.map((article, idx) => (
                <div className="dashboard-article" key={idx}>
                    {article.urlToImage || article.image ? (
                        <img
                            className="dashboard-article-image"
                            src={article.urlToImage || article.image}
                            alt={article.title}
                        />
                    ) : (
                        <div
                            className="dashboard-article-image"
                            style={{ background: '#e3e9f7', height: 190 }}
                        />
                    )}
                    <div className="dashboard-article-content">
                        <h3>{article.title}</h3>
                        <p>{article.description || article.abstract}</p>
                        <div className="dashboard-article-actions">
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                Read more
                            </a>
                            <div onClick={() => toggleBookmark(article)} style={{ cursor: 'pointer' }}>
                                {isArticleSaved(article) ? (
                                    <IoIosRemoveCircle size={24} title="Remove Bookmark" />
                                ) : (
                                    <BiBookmark size={24} title="Add Bookmark" />
                                )}
                            </div>
                        </div>
                        <div className="dashboard-article-meta">
                            <span>{article.source?.name || 'Unknown Source'}</span>
                            <span>
                                {article.publishedAt
                                    ? new Date(article.publishedAt).toLocaleDateString()
                                    : ''}
                            </span>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}

export default ArticleList;
