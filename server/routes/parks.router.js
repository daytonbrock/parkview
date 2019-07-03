const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// GET route to retrieve parks data 
router.get('/', (req, res) => {
    axios({
        method: 'GET',
        url: 'https://opendata.arcgis.com/datasets/a1847c4cc69940f99b46b16e2b4fe7e3_0.geojson',
    }).then((response) => {
        console.log(response.data);
        // data.features is an array of objects
        res.send(response.data.features);
    }).catch((error) => {
        console.log('error with GET request to Open Data Minneapolis', error);
        res.sendStatus(500);
    }); // end axios
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;