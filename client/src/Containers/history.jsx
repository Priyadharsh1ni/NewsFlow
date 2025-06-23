import React, { useEffect, useState } from 'react';
import ArticleList from '../Components/ArticleContainer';
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../redux/action';
import style from './style.css';


const History = () => {
    const [Bookmarks, setBookmarks] = useState([]);
    console.log("🚀 ~ History ~ Bookmarks:", Bookmarks)
    const { articles, article, user } = useSelector(state => state)
    console.log("🚀 ~ History ~ articles:", articles)
    const emailObj = JSON.parse(localStorage.getItem('user'));
    const email = emailObj?.email || '';
    console.log("🚀 ~ Profile ~ email:", emailObj?.email)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(action.ListArticle());
    }, [article]);


    useEffect(() => {
        dispatch(action.getUser({ email: email }))
    }, []);

    useEffect(() => {
        if (user) {
            dispatch(action.getBookmarks({ user_id: user?.id }))
            setBookmarks(article);
        }
    }, [user])



return (
    <div>
        <h2 className="dashboard-title" style={{ textAlign: 'center' }}>Saved Articles</h2>
        {Bookmarks?.length > 0 ? (
            <ArticleList
                articles={articles?.filter(article =>
                    Bookmarks.some(bookmark => bookmark.author === article.author)
                )}
            />
        ) : (
            <p>No articles saved yet.</p>
        )}
    </div>
);

};

export default History; 