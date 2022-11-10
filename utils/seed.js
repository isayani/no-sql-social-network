const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { username, email, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing Users
    // Drop existing Thoughts
    // Create empty array to hold Users
    // Loop through User Data
    // Insert Many for userData
    // Insert Many for thoughtData
})