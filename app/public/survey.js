function getScore() {
    var arr = [];
    $('select').each(function () {
        arr.push(parseInt($(this).val()));
    });
    return arr;
}


$("#submit").on("click", function (event) {
    event.preventDefault();
    var fieldChecker = 0;
    $('.form-control').each(function () {
        if ($(this).val() !== '') {
            fieldChecker++;
        }
    });

    if (fieldChecker !== 12) {
        $("#smallModal").modal("toggle");
    } else {
        var newFriend = {
            name: $("#name").val(),
            image: $("#image").val(),
            scores: getScore()
        };
        console.log(newFriend);

        // AJAX post the data to the friends API.
        $.post("/api/friends", newFriend, function (data) {
            // Grab the result from the AJAX post so that the best match's name and photo are displayed.
            $("#matchedName").text(data.name);
            $("#score").text(data.score);
            $("#matchedImage").attr("src", data.image);
        });
        $("#largeModal").modal("toggle");
    }
});