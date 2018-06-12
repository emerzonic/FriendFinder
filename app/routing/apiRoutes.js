var express = require('express');
var matches = require('../data/friends');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));
//api GET route for friends json
router.get('/api/friends', function (req, res) {
    res.json(matches);
});

//post route to submit new friend
router.post('/api/friends', function (req, res) {
    var newFriend = req.body;
    //initialize bestMatch number that starts at the highest possible variance
    var bestMatch = 40;
    var matchedFriend = {};
    var variance;
    //select each friend from the group
    matches.forEach(friend => {
        variance = 0;
        //Compare each friend score to the score of the new friend 
        for (var i = 0; i < friend.scores.length && i < newFriend.scores.length; i++) {
            //Add up the absolute difference from comparing each of their score
            variance += Math.abs(parseInt(friend.scores[i]) - parseInt(newFriend.scores[i]));
        }
        //compare the total difference to the highest possible difference
        if (variance <= bestMatch) {
            //if the difference is less or equal, the difference is now the best matched
            bestMatch = variance;
            //create a new object of the matched friend to be send back in the response
            matchedFriend = {
                name: friend.name,
                image: friend.image,
                score: bestMatch
            };
        }
    });
    matches.push(newFriend);
    //send the matched friend back
    res.json(matchedFriend);

});

module.exports = router;