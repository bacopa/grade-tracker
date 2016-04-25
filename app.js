'use strict';

const PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var Grade = require("./models/grade");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.redirect('/api/grades');
});



app.use('/api', require('./routes/api'));

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
