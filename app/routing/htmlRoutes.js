var express = require('express');
var router = express.Router();
var path = require('path');

//catch all routes for home page
router.get('/',function (req, res) { 
  res.sendFile(path.join(__dirname, "../public/home.html"));
   });

   
//GET route for survey page
router.get('/survey',function (req, res) { 
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });


module.exports = router;