
// WARNING - This is the develop file -- the live version is copy=pasted into WebFlow!


// If gl.vert id param included, use that one. Otherwise default.
// Because we want to cherry-pick a nice default for the demo.
const DEFAULT_AD = 'JvtlN3pk'; // which ad is this??
const DEFAULT_TEST_AD = 'ceMIwmVH'; // Relish broadband ad

const $player = $('#demo-iframe');
const $mobile = $('#mobile');
const $landscape = $('#landscape');
const $mobileLandscape = $('#mobile-landscape');
const $body = $('body');

// NB: losing IE and a couple of others https://caniuse.com/#search=URLSearchParams
const newParams = new URLSearchParams();

/** Copy only gl.* params to the new object, then set gl.vert to default if absent.
 * This is used to grab gl.* params from each iframe level
 */
const queryFormatter = function(params) {
    if ( ! params) return;
	for (const pair of params.entries()) {
		const key = pair[0], val = pair[1];
		if (key.match(/^gl\.w+/)) newParams.set(key, value);
	}    
};

// recursively grabs params from all parent windows and passes them to the queryFormatter.
const getAllParams = function(win) {
	queryFormatter(new URLSearchParams(win.location.search));
	if (win !== win.top) getAllParams(win.parent);
}
getAllParams(window);

// TODO Test or Live? Needs code in the adtype pages
const isTest = (""+window.location).indexOf("test") !== -1 || (""+window.location).indexOf("local");
console.warn("isTest", isTest);
if (isTest) newParams.set("server", "test");

// We want to cherry-pick a nice default for the demo.
if ( ! newParams.get('gl.vert')) {
	newParams.set('gl.vert', isTest? DEFAULT_TEST_AD : DEFAULT_AD);
}

// FIXME this doesnt work (NB: testing on local)
// TODO Have a good-looking .adblock-warning element to warn the user
$('body').on('gl:adblock', function() {
    $('.adblock-warning').css({
        'display': 'block'
    });
	console.warn('Adblocker detected - expect some things to break.');
});

// Links for video, social, and display units.
// NB: use absolute urls, so that this code can be copy pasted into webflow
// As long as they maintain video-ad-unit ratios
// no further tweaking should be needed when changed.
// NB: URLSearchParams.toString() handles url encoding nicely
let wrapperserver = 'https://'+(isTest?'test':'')+'demo.good-loop.com';
const videoLandscapeUrl = wrapperserver+'/adtype/generic.html?gl.size=landscape&'+newParams;
const videoPortraitUrl = wrapperserver+'/adtype/generic.html?gl.size=portrait&'+newParams;
const socialUrl = ''; //  Whatever we end up putting here,
const displayUrl = wrapperserver+'/adtype/generic.html?gl.size=landscape&'+newParams; // and here.

// TODO change "landscape" to "desktop"
const SCREEN = ['mobile-portrait', 'landscape', 'mobile-landscape'];
const FORMAT = ['social', 'video', 'display'];
const notAllowed = {
    social: {
        'landscape': "We only support social media apps on mobile - as that is how most people use them", 
        'mobile-landscape': ""},
    video: {'mobile-portrait': (window.innerHeight > window.innerWidth)},
    display: { 'mobile-landscape': true, 'mobile-portrait': true },
};


let screen = 'landscape';
let format = 'video';
// for detecting change
let oldScreen, oldFormat;

$('.option-button').click(function () {
    const btnId = this.id;
	setupDemo(btnId);
});

function setupDemo(btnId) {
	// // what is the current screen and format? 
	// // is this needed?? DW
    // const bodyClasses = document.body.className.split(' ');
    // bodyClasses.forEach(function(className) {
	// 	// NB: includes works for all but IE ref: https://caniuse.com/#search=includes
    //     if (SCREEN.includes(className)) screen = className;
    //     if (FORMAT.includes(className)) format = className;
    // });
    if (SCREEN.includes(btnId)) screen = btnId;
    if (FORMAT.includes(btnId)) format = btnId;

	// force some combinations
    if (btnId === 'social') screen = 'mobile-portrait';
    if (btnId === 'display') screen = 'landscape';
    
	// TODO we must guard against this being possible by disabling buttons
    if (notAllowed[format][screen]) {
		console.log("forbidden combo! "+format+" + "+screen);
		return;
	}

	// change the player
    $player.hide();
    let playerSrc;
    if (format === 'video') {
        playerSrc = (screen === 'mobile-portrait') ? videoPortraitUrl : videoLandscapeUrl;
    } else if (format === 'social') {
        playerSrc = socialUrl;
    } else if (format === 'display') {
        playerSrc = displayUrl;
    }
	console.log("Change player url to "+playerSrc);
    $player.attr('src', playerSrc);
    $player.fadeIn(200);

	// Set the body screen / format classes
	$body.attr('class', '');	
    $body.addClass(screen).addClass(format);
	console.log("Change body class to "+$body.attr("class"));

	// show the right text
	// ?? use jquery hide + fadeIn instead of BS d-none / d-block??
	$('.description-text > p').removeClass("d-block").addClass("d-none");
	$('.description-text > p#describe-'+format).removeClass("d-none").addClass("d-block");

	// TODO disable invalid devices

	oldScreen = screen;
	oldFormat = format;
};

// init
setupDemo();

// FIXME handle phone rotation and resize
//
// Need to package as function for eventListener
// May be wrong, but felt that using anonymous function would cause issues when later removing the listener?
// function calcAndSetHeight_16_9(el) {
//     let width = el.getBoundingClientRect().width;
//     // 0.76 is to account for width padding
//     let height = width * 0.76 * ( 9 / 16 );

//     el.style.height = height + 'px';
// }
//
// const calcAndSetHeightDemoFrame = () => calcAndSetHeight_16_9(demoFrame);
//
// if( format === 'landscape' && !iframeDiv.classList.contains('rotated')  ) {
//     iframeDiv.classList.add('rotated');
//     calcAndSetHeightDemoFrame();
//
//     window.addEventListener('resize', calcAndSetHeightDemoFrame);
//     window.addEventListener('onorientationchange', calcAndSetHeightDemoFrame);
// } else {
//     iframeDiv.classList.remove('rotated');
//     // Get rid of height calculated for landscape
//     demoFrame.style.height = '';

//     window.removeEventListener('resize', calcAndSetHeightDemoFrame);
//     window.removeEventListener('onorientationchange', calcAndSetHeightDemoFrame);
// }
