
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

// Need to package as function for eventListener
// May be wrong, but felt that using anonymous function would cause issues when later removing the listener?
function calcAndSetHeight_16_9(el) {
    let width = el.getBoundingClientRect().width;
    // 0.76 is to account for width padding
    let height = width * 0.76 * ( 9 / 16 );

    el.style.height = height + 'px';
}

// handle the user picking a format
function setFormat() {
	let format = $(selsel).val() || 'mpu2';
    let iframeDiv = document.getElementById('outer');

    // add iframe to id, making sure to pass URL params
	let src = '/adtype/'+format+".html" + passparams;
    iframeDiv.innerHTML = '<iframe id="demo-iframe" frameborder=0 src="' + src + '"></iframe>';

    // Display rotated phone image if landscape is selected
    let demoFrame = document.getElementById('demo-iframe');

    const calcAndSetHeightDemoFrame = () => calcAndSetHeight_16_9(demoFrame);

    if( format === 'landscape' && !iframeDiv.classList.contains('rotated')  ) {
        iframeDiv.setAttribute('class', 'rotated');
        calcAndSetHeightDemoFrame();

        window.addEventListener('resize', calcAndSetHeightDemoFrame);
        window.addEventListener('onorientationchange', calcAndSetHeightDemoFrame);
    } else {
        iframeDiv.removeAttribute('class', 'rotated');
        // Get rid of height calculated for landscape
        demoFrame.style.height = '';

        window.removeEventListener('resize', calcAndSetHeightDemoFrame);
        window.removeEventListener('onorientationchange', calcAndSetHeightDemoFrame);
    }

    // Formats that require fixed-width to display correctly
    if ( format === 'mpu' || format === 'mpu2' ) {
        iframeDiv.setAttribute('class', 'fixed-width');
    } else {
        iframeDiv.removeAttribute('class', 'fixed-width');
    }
}
$(selsel).change(setFormat);
// trigger a set-format to init the default view
setFormat();
