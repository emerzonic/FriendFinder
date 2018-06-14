$("#submit").on("click", function (event) {
    event.preventDefault();
    var fieldChecker = 0;
    //check for emptied field
    $('.form-control').each(function () {
        if ($(this).val() !== '') {
            fieldChecker++;
        }
    });

    //validate all fields are entered
    if (fieldChecker !== 12) {
        $("#smallModal").modal("toggle");
    } else {
        //create new friend to be submitted
        var newFriend = {
            name: $("#name").val(),
            image: $("#image").val(),
            scores: function () {
                var arr = [];
                $('select').each(function () {
                    arr.push(parseInt($(this).val()));
                });
                return arr;
            }()
        };
       
        // AJAX post the data to the friends API.
        $.post("/api/friends", newFriend, function (match) {
            // Grab the best matched from the AJAX response.
            $("#matchedName").text(match.name);
            $("#score").text(match.score);
            $("#matchedImage").attr("src", match.image);
        });
        $("#largeModal").modal("toggle");
    }
});