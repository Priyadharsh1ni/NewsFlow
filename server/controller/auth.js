const jwt = require('jsonwebtoken');
const db = require('../dbConfig');
const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const controller = {
    signIn: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const data = await db('users').insert({ email: email, password: password, created_at: new Date(), updated_at: new Date() })
            const token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error) {
            console.error('Error during sign-in:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    logIn: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            // Here you would typically verify the username and password against a database
            // For demonstration, we assume the credentials are valid
            const user = await db('users').where({ email, password }).first();
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            // If the user is found, generate a token
            const token = await jwt.sign({ email }, process.env.JWT_SECRET);
            res.status(200).json({ token });
        } catch (error) {
            console.error('Error during log-in:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { email, name } = req.body;
            const user = await db('users').where({ email: email }).first();
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const updatedUser = await db('users')
                .where({ email: email })
                .update({ email, name });

            const getUser = await db('users').select("*").where({ email: email }).first();
            res.status(200).json(getUser);
        } catch (error) {
            console.error('Error during update profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // ...existing code...
    getUser: async (req, res) => {
        try {
            const email = req.body;
            const user = await db('users').where({ email: email.email }).first();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = { controller };