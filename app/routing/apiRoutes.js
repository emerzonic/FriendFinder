var express = require('express');
var matches = require('../data/friends');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');

router.use(bodyParser.urlencoded({
    extended: true
}));

//api GET route for friends json
router.get('/api/friends', function (req, res) {
    res.json(matches);
});

//post route to submit new friend
router.post('/api/friends', function (req, res) {
    var newFriend = {
        name: req.body.name,
        image: req.body.image,
        scores: []
    };

    var keys = Object.keys(req.body);
    keys.forEach(function (key) {
        if (/q.*/.test(key) && req.body[key] !== null && req.body[key] !== '') {
            newFriend.scores.push(parseInt(req.body[key]));
        }
    });

    var bestMatch = 50;
    var matchedFriend = {};
    var variance = 40;
    matches.forEach(friend => {
        console.log('now checking: ' + friend.name + ' vs ' + newFriend.name);
        variance = 0;
        for (var i = 0; i < friend.scores.length && i < newFriend.scores.length; i++) {
            variance += Math.abs(parseInt(friend.scores[i]) - parseInt(newFriend.scores[i]));
            console.log(variance);
        }
        console.log(variance);
        if (variance <= bestMatch) {
            bestMatch = variance;
            matchedFriend = {
                name: friend.name,
                image: friend.image,
                Score: bestMatch
            };
        }
    });
    console.log('Varance: ' + variance);
    console.log(' bestmatch score: ' + bestMatch + '-- Match name: ' + matchedFriend.name);
    console.log('=================================');

    matches.push(newFriend);
    // res.render(matchedFriend);

});

module.exports = router;