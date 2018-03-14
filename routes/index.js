const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    
        res.render("index")
});

router.post('/change', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
});



module.exports = router;