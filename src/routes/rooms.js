'use strict'
const roomController = require('../controller/rooms')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {

        const result = await roomController.get(req.query);

        res.status(200).send({
            message: "Success",
            data: result,
        });

    } catch (err) {
        res.status(406).send({
            message: err?.message
        })
    }
});

router.get('/home', async (req, res) => {
    try {

        const result = await roomController.getAllForHome(req.query);

        res.status(200).send({
            message: "Success",
            data: result,
        });

    } catch (err) {
        res.status(406).send({
            message: err?.message
        })
    }
});

module.exports = router;
