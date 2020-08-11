require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(x => 
    console.log(`Connected to Mongo! Database name: ${x.connections[0].name}`))
    .catch(reason => console.log("Error: ", reason));

console.log(process.env.DB);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Es opcional para los emails, se muestra sómo se utilizaría handlebars para crear vistas en el backend
app.set("views", path.join(__dirname, "views"));  // se traduce al final como ruta al proyecto/views
app.set("view engine", "hbs");

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
