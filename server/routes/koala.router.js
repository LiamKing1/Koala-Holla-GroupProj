const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg');

// DB CONNECTION
const Pool = pg.Pool;

const pool = new Pool({
    database: 'Koala_Holla',
    host: 'localhost',
    port: 5433,
    max: 10,
    idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
    console.log('postgres is connected');
});
pool.on('error', (error) => {
    console.log('error with postgres pool', error);
});

// GET
koalaRouter.get('/', function (req, res) {
    let queryText = 'SELECT * FROM "Koalas";';
    pool.query(queryText)
        .then((result) => {
            console.log('results from db', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error making a query', error);
            res.sendStatus(500);
        })
    });


// POST
koalaRouter.post('/', function (req, res) {
    const newKoala = req.body;
    console.log('in post req.body', req.body);
    const queryText = `
    INSERT INTO "Koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES ('${newKoala.name}', '${newKoala.gender}', ${newKoala.age}, '${newKoala.ready_to_transfer}', '${newKoala.notes}');
    `;
    pool.query(queryText)
        .then((result) => {
            console.log('result', result);
            res.sendStatus(201);
        }).catch((error) => {
            console.log('WE GOT AN ERROR', error);
            res.sendStatus(500);
        })
});

// PUT


// DELETE

module.exports = koalaRouter;