const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// GET route to retrieve parks data 
router.get('/', (req, res) => {
    axios({
        method: 'GET',
        url: 'https://opendata.arcgis.com/datasets/a1847c4cc69940f99b46b16e2b4fe7e3_0.geojson',
    }).then(response => {
        console.log(response.data);
        // data.features is an array of objects
        res.send(response.data.features);
    }).catch(error => {
        console.log('error with GET request to Open Data Minneapolis', error);
        res.sendStatus(500);
    }); // end axios get
});

// POST route to add a new park review
router.post('/', (req, res) => {
    const queryText = `
        INSERT INTO "park_reviews"("user_id", "body", "park_name")
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

module.exports = router;