const express = require('express');
const router = express.Router();
const auth = require('auth');

const stuffCtrl = require('../controllers/stuff');

router.get('/', auth);
router.post('/', auth);

module.exports = router;
