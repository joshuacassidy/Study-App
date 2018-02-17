const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cards =require('../models/Cards');
const keys = require('../config/keys')

mongoose.connect(keys.mongoURI);

const db = mongoose.connection;

router.get('/', (req, res) => {
    Cards.getFlashCards( (err, flashCards) => {
        if (err) {
            throw err;
        } 
    }).then((cards) => {
        const numberOfCards = cards.length;
        const flashcardId = Math.floor( Math.random() * numberOfCards);
        res.redirect(`/cards/${flashcardId}?side=question`);
    })
});

router.get('/:id', (req, res) => {

    
    Cards.getFlashCards( (err, flashCards) => {
        if (err) {
            throw err;
        } 
    }).then((cards) => {
        const { side } = req.query;
        const { id } = req.params;
        if (!side) {
            return res.redirect(`/cards/${id}?side=question`);
        }
        const text = cards[id][side];
        const { hint } = cards[id];
        const templateData = {text};
        if (side === 'question') {
            templateData.hint = hint
            templateData.sideToShow = 'answer';
            templateData.sideToShowDisplay = 'Answer';
        } else if (side === 'answer') {
            templateData.sideToShow = 'question';
            templateData.sideToShowDisplay = 'Question';
        } else {
            res.redirect(`/cards/${id}?side=question`);
        }
        res.render('card', templateData);
    })
});

module.exports = router;