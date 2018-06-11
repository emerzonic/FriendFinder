var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    apiRoutes = require('./app/routing/apiRoutes'),
    htmlRoutes = require('./app/routing/htmlRoutes'),
    friends = require('./app/data/friends');

    var app = express();
app.use(apiRoutes);
app.use(htmlRoutes);
// app.use(friends);

// var router = express.Router();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());



//catch all routes for home page

// app.get('/',function (req, res) { 
//     res.sendFile(path.join(__dirname, "app/public/home.html"));

//      });

// //get route for survey page

// app.get('/survey',function (req, res) { 
//     res.sendFile(path.join(__dirname, "app/public/survey.html"));
//   });









app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});



module.exports = app;