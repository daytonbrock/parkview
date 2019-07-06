const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// GET route to retrieve all parks from open data
// data.features is an array of objects
router.get('/', (req, res) => {
    axios.get(`
    https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Parks/FeatureServer/0/query?where=1%3D1&outFields=FID,PARK_NAME1,PARK_PARK3&outSR=4326&f=json
    `)
    .then(response => {
        res.send(response.data.features);
    }).catch(error => {
        console.log('error with GET request to Open Data Minneapolis', error);
        res.sendStatus(500);
    }); // end axios get
}); // end get

// GET route to search open data by park name
// data.features is an array of objects
router.get('/search', (req, res) => {
    axios.get(`
    https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Parks/FeatureServer/0/query?where=PARK_NAME1%20like%20%27%25${req.query.search}%25%27%20OR%20PARK_PARK3%20%3D%20%27${req.query.search}%27&outFields=FID,PARK_NAME1,PARK_PARK3&outSR=4326&f=json
    `)
    .then(response => {
        res.send(response.data.features);
    }).catch(error => {
        console.log('error with GET request to Open Data Minneapolis', error);
        res.sendStatus(500);
    }); // end axios get
}); // end get

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