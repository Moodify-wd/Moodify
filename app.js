// @ts-check 

require('dotenv').config();

var express = require('express'); // express web server 
var app = express();

app.use(express.static(__dirname + '/public'));

// 404 Error 
app.use(function (req, res, next) {
    res.status(404).send("<h1>Error 404<h1>");
});

// Creating 
console.log('Listening on env port');
app.listen(process.env.PORT || 80);