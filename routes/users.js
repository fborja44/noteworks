/* Server routes related to users
 ---------------------------------------------------------------------------*/
const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const xss = require('xss');
const bcrypt = require('bcrypt');

/**
 * Route: /
 * Render the homepage.
 */
 router.get('/', async (req, res) => {
    res.render('general/home', { title: "Denote! | Home" })
});

module.exports = router;