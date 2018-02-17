const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const username = req.cookies.username;
    if (username) {
        res.render("index", { username })
    } else {
        res.redirect('/welcome');
    }
});

router.post('/change', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
});

router.get('/welcome', (req, res) => {
    const username = req.cookies.username;
    if (username) {
        res.redirect('/');
    } else {
        res.render('welcome', { username: req.cookies.username });
    }
});

router.post('/welcome', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

module.exports = router;