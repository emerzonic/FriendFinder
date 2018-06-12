var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    apiRoutes = require('./app/routing/apiRoutes'),
    htmlRoutes = require('./app/routing/htmlRoutes');

var app = express();
app.use(express.static('app/public'));
app.use(apiRoutes);
app.use(htmlRoutes);

var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


module.exports = app;