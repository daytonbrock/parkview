const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// POST route to post review images to database
router.post('/', (req, res) => {
    const queryText = `
        INSERT INTO "images" ("name", "url", "review_id")
        VALUES ($1, $2, $3);`;
    pool.query(queryText, [req.body.name, req.body.url, req.body.review_id])
        .then(response => {
            console.log(response);
            res.sendStatus(200);
        }).catch(error => {
            console.log('error with posting review images to database:', error);
            res.sendStatus(500);
        }); // end pool query
}); // end post

module.exports = router;