var express = require('express');
var matches = require('../data/friends');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/api/friends', function (req, res) {
    res.json(matches);
});

router.post('/api/friends', function (req, res) {
    const newFriend = req.body;
    let higestPossibleScoreDifference = 40;
    const matchedFriend = matches.reduce((matchedFriend, friend) => {
        let scoreDifference = 0;

        friend.scores.forEach((score, i) => {
            scoreDifference += Math.abs(parseInt(score) - parseInt(newFriend.scores[i]));
        })

        if (scoreDifference <= higestPossibleScoreDifference) {
            higestPossibleScoreDifference = scoreDifference;
            matchedFriend = {
                name: friend.name,
                image: friend.image,
                score: higestPossibleScoreDifference
            };
        }
        return matchedFriend;
    }, {});
    
    matches.push(newFriend);
    res.json(matchedFriend);
});

module.exports = router;