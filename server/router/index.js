const express = require('express');
const { controller } = require('../controller/auth');
const { articleController } = require('../controller/articles'); // Assuming you have an articleController
const router = express.Router();
const passport = require('passport');

router.post('/register', controller.signIn); 
router.post('/login', controller.logIn)
router.post('/list', articleController.getAllArticles); // Assuming you have a getList method in your controller
router.post('/save', articleController.saveArticle); // Assuming you have a getArticleById method in your controller
// router.post('/auth/google', controller.googleAuth);
router.put('/update', controller.updateProfile)
router.post('/user', controller.getUser); // Use GET for fetching user info
router.post('/getBookmark', articleController.getSavedArticles);
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/dashboard');
    }
);

module.exports = router;
