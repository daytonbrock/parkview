const express = require('express');
const router = express.Router();

// Upload endpoint
router.post('/', (req, res) => {
    if(req.files === null){
        res.sendStatus(400).json({ msg: 'No file was uploaded' });
    }

    const image = req.files.image;

    image.mv(`${__dirname}/public/uploads/${image.name}`, err => {
        if (error) {
            console.error(error);
            return res.status(500).send(error);
        }

        res.json({
            imageName: image.name,
            imagePath: `/uploads/${image.name}`
        });
    });
});

module.exports = router;