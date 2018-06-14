var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    apiRoutes = require('./app/routing/apiRoutes'),
    htmlRoutes = require('./app/routing/htmlRoutes');

var PORT = process.env.PORT || 3000;
var app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use('/assets', express.static('assets'));

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

module.exports = app;