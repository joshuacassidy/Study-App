const express = require('express');
const reload = require('reload');
const http = require('http');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser());
const routes = require('./routes/index')
const mongoose = require('mongoose');
const Cards =require('./models/Cards');
const keys = require('./config/keys')


mongoose.connect(keys.mongoURI);
const db = mongoose.connection;
app.use(bodyParser.json());


app.get('/api', (req, res) => {
    Cards.getFlashCards( (err, flashcards) => {
		if (err) {
			throw err;
		}
		res.json(flashcards);
	});
});

app.post('/api', (req, res) => {
    const flashcards = req.body;
    flashcards.question = req.body.question;
    flashcards.hint = req.body.hint;
    flashcards.answer = req.body.answer;
	Cards.addFlashCards(flashcards, (err, flashcards) => {
		if (err) {
			throw err;
		}
		res.json(flashcards);
	});
});

app.use(bodyParser.urlencoded({extended: false}))
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});


app.listen(3000, () => console.log("Loaded!"));