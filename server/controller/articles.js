const axios = require("axios");
const db = require("../dbConfig");

const NEWS_API_KEY = '6998e371129d4c608107b8f734de14f5';

const articleController = {
    getAllArticles: async (req, res) => {
        try {
             const { category = '', country = '', source = '', search = '' } = req.body || {};

            // If no filters, fetch all sources and combine

            if (!category && !country && !source && !search) {
                const articles = await axios.get(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${NEWS_API_KEY}`);
                const newArticles = await axios.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${NEWS_API_KEY}`);
                const newyorkTimes = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=ejnO8lbJeWny4xEKmttSmV176i5Ed9Tk');
                const articlesbyApple = await axios.get(`https://newsapi.org/v2/everything?q=apple&from=2025-06-19&to=2025-06-19&sortBy=popularity&apiKey=${NEWS_API_KEY}`);
                const businessArticles = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${NEWS_API_KEY}`);
                const healthArticles = await axios.get('https://content.guardianapis.com/search?api-key=836bc1a0-1378-439b-b98d-275f11e6adf9');

                const combinedArticles = [
                    ...articles.data.articles,
                    ...newArticles.data.articles,
                    ...articlesbyApple.data.articles,
                    ...businessArticles.data.articles,
                    ...healthArticles.data.response.results,
                    ...newyorkTimes.data.response.docs.map(doc => ({
                        title: doc.headline.main,
                        description: doc.abstract,
                        url: doc.web_url,
                        urlToImage: doc.multimedia.length > 0 ? `https://www.nytimes.com/${doc.multimedia[0].url}` : null,
                        publishedAt: doc.publication_date,
                        source: { name: 'New York Times' }
                    }))
                ];
                return res.json(combinedArticles);
            }

            // If any filter is selected, build NewsAPI URL dynamically
            let url = `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}`;
            if (source) {
                url += `&sources=${source.toLowerCase()}`;
            } else {
                if (category) url += `&category=${category.toLowerCase()}`;
                if (country) url += `&country=${country.toLowerCase()}`;
            }
            if (search) url += `&q=${encodeURIComponent(search)}`;

            const response = await axios.get(url);
            res.json(response.data.articles);

        } catch (error) {
            console.error('Fetch error:', error.response ? error.response.data : error.message);
            res.status(500).json({ error: 'Failed to fetch articles' });
        }
    },

    saveArticle: async (req, res) => {
        try {
            const {article_content, userId, is_saved} = req.body;
            const result = await db('article_views').insert({ article_content: article_content, user_id: userId, is_saved: is_saved });
            if (result.rowCount === 1) {
                return res.json({ success: true });
            } else {
                return res.status(500).json({ error: 'Failed to save article' });
            }
        } catch (error) {
            console.error('Save article error:', error);
            return res.status(500).json({ error: 'Failed to save article' });
        }
    },

    getSavedArticles : async(req, res) => {
        try{
            const {user_id} = req.body
            const savedArticles = await db('article_views').where({ is_saved: 0, user_id: user_id }).select("*")
            res.status(200).json(savedArticles);
        }catch(err){
            return res.status(500).json({ error: 'Failed to get article' });
        }
    }

}

module.exports = {  
    articleController
}