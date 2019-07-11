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