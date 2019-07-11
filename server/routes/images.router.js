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

// GET route to retrieve all review images from database
router.get('/', (req, res) => {
    const queryText = `
        SELECT * FROM "images" ORDER BY "review_id";`;
    pool.query(queryText)
    .then(response => {
        console.log(response);
        res.send(response.rows);
    }).catch(error => {
        console.log('error with retrieving review images from database:', error);
        res.sendStatus(500);
    }); // end pool query
}); // end get

// GET route to retrieve review images from database
router.get('/review/:id', (req, res) => {
    const queryText = `
        SELECT * FROM "images" 
        WHERE "review_id" = $1 ORDER BY "id";`;
    pool.query(queryText, [req.params.id])
        .then(response => {
            console.log(response);
            res.send(response.rows);
        }).catch(error => {
            console.log('error with retrieving review images from database:', error);
            res.sendStatus(500);
        }); // end pool query
}); // end get

// DELETE route to delete review images from database
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `
        DELETE FROM "images" USING "park_reviews" AS "review"
        WHERE "review_id" = $1 AND 
            ("review"."user_id" = $2 OR "review"."clearance_level" <= $3);`;
    pool.query(queryText, [req.params.id, req.user.id, req.user.clearance_level])
        .then(() => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error with DELETE on /api/images route:', error);
            res.sendStatus(500);
        }); // end pool query
}); // end delete

module.exports = router;