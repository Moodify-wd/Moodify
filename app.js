// @ts-check 

require('dotenv').config();

var express = require('express'); // Express web server framework
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.status(404).send("<h1>Error 404<h1>");
});

console.log('Listening on 8888');
app.listen(8888);