const knex = require('knex');
require('dotenv').config(); 

const db = knex({
    client: 'pg',
    connection: {
        port: 5432, 
        password: "password",
        database: 'Article',
        user: 'postgres',
        host: 'localhost',
    },
    pool: { min: 0, max: 10 },
})

// Check if the connection is successful
db.raw('SELECT 1')
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((error) => { 
        console.error('Database connection error:', error);
    });
module.exports = db;