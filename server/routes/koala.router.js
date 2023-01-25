const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg');

// DB CONNECTION
const Pool = pg.Pool;

const pool = new Pool({
    database: 'Koala_Holla',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
});


// GET


// POST


// PUT


// DELETE

module.exports = koalaRouter;