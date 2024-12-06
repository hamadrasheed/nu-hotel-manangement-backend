const express = require('express');
const router = express.Router();
const authAndRoleMiddleware = require('../middlewares/auth');


const auth = require('./auth');
const rooms = require('./rooms');
const images = require('./images');

router.use('/user', auth);
router.use('/rooms', rooms);
router.use('/images', images);

router.get('/', function (req, res, next) {
  res.send({ title: 'Bellona' });
});

module.exports = router;
