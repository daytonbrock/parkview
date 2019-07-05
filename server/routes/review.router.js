const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

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
}); // end post

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
}); // end get

// GET route to retrieve details for one review
router.get('/details/:id', (req, res) => {
    const queryText = 'SELECT * FROM "park_reviews" WHERE "id"=$1;';
    pool.query(queryText, [req.params.id])
        .then(response => {
            console.log(response);
            res.send(response.rows);
        }).catch(error => {
            console.log('error with retrieving details for one review:', error);
            res.sendStatus(500);
        }); // end pool query
}); // end get

// PUT route to update review details
// BASE MODE: only updates the body of the review
// STRETCH: will also update review images
router.put('/:id', (req, res) => {
    const queryText = `UPDATE "park_reviews" SET "body"=$1 WHERE "id"=$2;`;
    pool.query(queryText, [req.body.body, req.params.id])
        .then(() => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error with UPDATE on /api/review/update route:', error);
            res.sendStatus(500);
        }); // end pool query
}); // end put

// DELETE route to delete a review
// this will only delete if logged in user created the review OR if logged in user is an admin
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `
        DELETE FROM "park_reviews" WHERE "id"=$1 AND ("user_id"=$2 OR "clearance_level"<=$3);`
    pool.query(queryText, [req.params.id, req.user.id, req.user.clearance_level])
    .then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error with DELETE on /api/review/delete route:', error);
        res.sendStatus(500);
    }); // end pool query
}); // end delete

module.exports = router;