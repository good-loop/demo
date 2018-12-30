
// ??
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

// TODO
// Adblocker on?
$('body').on('gl:adblock', function() {
    $('.adblock-warning').css({
        'display': 'block'
    });
	console.warn("Adblocker detected - expect some things to break.");
});

// set to a specific default ad (but allow the url to overwrite that)
var defaultAd = "gl.vert=JvtlN3pk";
var passparams = window.location.search;
if ( ! passparams) {	
	passparams = "?"+defaultAd;
} else if (passparams.indexOf('gl.vert') ===-1) {
	passparams += "&"+defaultAd;
}

// handle the user picking a format
$('#control-format').change(function setFormat() {
	let format = $('select[name=format]').val() || 'mpu2';
    var iframeDiv = document.getElementById('outer');
    // add iframe to id, making sure to pass URL params
	let src = '/adtype/'+format+".html" + passparams;
	console.warn("src", src);
    iframeDiv.innerHTML = '<iframe id="demo-iframe" frameborder=0 src="' + src + '"></iframe>';
});
// trigger a set-format to init the default view
$('#control-format').change();
