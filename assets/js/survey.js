$("#submit").on("click", function (event) {
    event.preventDefault();
    if (isValid()) {
        processFormSubmission();
    } else {
        displayInvalidFormSubmissionMessage();
    }
});

function isValid() {
    const numberOfFields = 12;
    let numberOfCompletedFields = 0;

    $('.form-control').each(function () {
        if ($(this).val() !== '') {
            numberOfCompletedFields++;
        }
    });
    return numberOfCompletedFields === numberOfFields;
}

function processFormSubmission() {
    const newFriend = getNewFriend();
    findMatch(newFriend);
}

function getNewFriend() {
    return {
        name: $("#name").val(),
        image: $("#image").val(),
        scores: getScores()
    };
}

function getScores() {
    const scores = [];
    $('select').each(function () {
         score = parseInt($(this).val());
        scores.push(score);
    });
    return scores;
}

function findMatch(newFriend) {
    $.post("/api/friends", newFriend, function (match) {
        displayMatchInfo(match);
    });
    $("#largeModal").modal("toggle");
}

function displayMatchInfo(match) {
    $("#matchedName").text(match.name);
    $("#score").text(match.score);
    $("#matchedImage").attr("src", match.image);
}

function displayInvalidFormSubmissionMessage() {
    $("#smallModal").modal("toggle");
}