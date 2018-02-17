const express = require('express');
const reload = require('reload');
const http = require('http');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser());
const colors = ['red', 'blue', 'green', 'yellow'];
const routes = require('./routes/index')
const mongoose = require('mongoose');
const Cards =require('./models/Cards');
const keys = require('./config/keys')



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