'use strict'
const bookingController = require('../controller/bookings')
const express = require('express');
const router = express.Router();


router.get('/my-bookings', async (req, res) => {
    try {

        const result = await bookingController.getUserBookings(req.query);

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
