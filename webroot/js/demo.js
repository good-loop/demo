$('#goodloopad-mobile').click(function() {
    $('#appear-after-click').css({
        'display': 'block'
    });
    $('#goodloopad-mobile').css({
        'display': 'none'
    });
});


$('.goodloopad').click(function() {
    $('.appear-after-click').css({
        'display': 'block'
    });
});

$("#sendMessage").on("click", function() {
    message = $("#contactform").serialize();
    $.ajax({
        url: "//formspree.io/xowwlvjx", 
        method: "POST",
        data: {message: message},
        dataType: "json"
    });
    if(result === "no_errors") location.href = "https://www.good-loop.com/success"
});

// Adblocker on?
$('body').on('gl:adblock', function() {
    $('.adblock-warning').css({
        'display': 'block'
    });
	// TODO a message to the user.
	console.warn("Adblocker detected - expect some things to break.");
});