const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// POST route to add a new park review
router.post('/', (req, res) => {
    const queryText = `
        INSERT INTO "park_reviews" ("user_id", "body", "park_name")
        VALUES($1, $2, $3);`
    pool.query(queryText, [req.body.user_id, req.body.body, req.body.park_name])
        .then(response => {
            console.log(response);
            res.sendStatus(201);
        }).catch(error => {
            console.log('error with POST requesting to add park review:', error);
            res.sendStatus(500);
        }); // end pool query
});

// GET route to retrieve all reviews
router.get('/', (req, res) => {
    const queryText = `
        SELECT * FROM "park_reviews" ORDER BY "id" DESC;`
    pool.query(queryText)
    .then(response => {
        console.log(response);
        res.send(response.rows);
    }).catch(error => {
        console.log('error with GET request to retrieve all reviews:', error);
        res.sendStatus(500);
    }); // end pool query
})

module.exports = router;