require('dotenv').config();

var express = require('express'); // Express web server framework
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.status(404).send("<h1>Sorry nothing found!<h1>");
});
console.log('Listening on 8888');
app.listen(8888);