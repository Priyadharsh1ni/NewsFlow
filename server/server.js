const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router'); 
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8900;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router)

app.use(session({
  name: 'session',
  secret: 'your_secret', // use a strong secret in production
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await db('users').where({ email: profile.emails[0].value }).first();
        if (!user) {
            const [id] = await db('users').insert({
                email: profile.emails[0].value,
                name: profile.displayName,
                created_at: new Date(),
                updated_at: new Date()
            }).returning('id');
            user = await db('users').where({ id }).first();
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await db('users').where({ id }).first();
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

app.listen(8900, () => {
  console.log(`Server is running on port ${8900}`);
});