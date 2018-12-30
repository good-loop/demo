
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

var items = ['Double-MPU', 'Pre-roll', 'In-read', 'Click-to-expand'];
var links = ['/mpu2.html',
            '/pre-roll.html', 
            '/in-read.html', 
            '/mpu.html'];

// default ad shown on demo page
// add iframe to id, making sure to pass URL params 
var iframeDiv = document.getElementsByClassName('image');
// make sure to add it to both mobile and desktop
iframeDiv[0].src = links[0] + window.location.search;
iframeDiv[1].src = links[0] + window.location.search;

// click to go to different types of ads on demo page
function clickedItem(selectedIndex, mobile) {
    var adNameDiv = document.getElementById('demo-adtype');
    adNameDiv.innerHTML = '<span>' + items[selectedIndex] + '</span>';
    var iframeDiv = document.getElementById(mobile ? 'wrapper-iframe' : 'outer');
    // add iframe to id, making sure to pass URL params
    iframeDiv.innerHTML = '<iframe class="image" frameborder=0 src="' + links[selectedIndex] + window.location.search + '"></iframe>';
}

