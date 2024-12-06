'use strict'
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    try {

        const imageName = req.query.imageName;

        res.sendFile(path.join(__dirname, '../public/rooms', imageName));


    } catch (err) {
        console.log('err',err);
        res.status(406).send({
            message: err?.message
        })
    }
});

module.exports = router;
