
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
let defaultAd = "gl.vert=JvtlN3pk";
let passparams = window.location.search;
if ( ! passparams) {	
	passparams = "?"+defaultAd;
} else if (passparams.indexOf('gl.vert') ===-1) {
	passparams += "&"+defaultAd;
}
let selsel = 'select[name=format]:visible';
// demo format from url?
if (passparams.indexOf('demoformat=') !== -1) {	
	let vformat = passparams.match(/demoformat=([^&]+)/)[1];
	jQuery(selsel+" option:selected").removeAttr("selected");	
	jQuery(selsel+" option[value='"+vformat +"']").attr('selected', 'selected');  
	$(selsel).val(vformat);
}

// Calculate height to completely fit 16:9 unit plus mobile border
function calcLandscapeHeight(div) {
    let width = div.getBoundingClientRect().width;

    let height = width * ( 9 / 16 );
    // Total padding is set to 6% in less   
    height += ( height * 0.06 );

    return height;
}

// handle the user picking a format
function setFormat() {
	let format = $(selsel).val() || 'mpu2';
    let iframeDiv = document.getElementById('outer');
    let demoFrame = document.getElementById('demo-iframe');

    // add iframe to id, making sure to pass URL params
	let src = '/adtype/'+format+".html" + passparams;
    iframeDiv.innerHTML = '<iframe id="demo-iframe" frameborder=0 src="' + src + '"></iframe>';

    // Display rotated phone image if landscape is selected
    if( format === 'landscape' && !iframeDiv.classList.contains('rotated')  ) {
        iframeDiv.setAttribute('class', 'rotated');
        demoFrame.style.height = calcLandscapeHeight(demoFrame) + 'px';
    } else {
        iframeDiv.removeAttribute('class', 'rotated');
        // Get rid of height calculated for landscape
        demoFrame.style.height = '';
    }
}
$(selsel).change(setFormat);
// trigger a set-format to init the default view
setFormat();
