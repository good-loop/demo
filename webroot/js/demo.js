// TODO pick a different test ad, and fix wrappers to reflect this
const DEFAULT_AD = "JvtlN3pk"; // Method ad
const DEFAULT_TEST_AD = "JvtlN3pk"; // Relish broadband ad

const $player = $("#demo-iframe");
const $mobile = $("#mobile");
const $desktop = $("#desktop");
const $mobileLandscape = $("#mobile-landscape");
const $body = $("body");

const newParams = new URLSearchParams();

const isMobile = window.innerWidth <= 767;

const queryFormatter = function(params) {
	if (!params) return;
	for (const pair of params.entries()) {
		const key = pair[0],
			val = pair[1];
		if (key.match(/^gl\.w+/)) newParams.set(key, value);
	}
};

const getAllParams = function(win) {
	queryFormatter(new URLSearchParams(win.location.search));
	if (win !== win.top) getAllParams(win.parent);
};
getAllParams(window);

const isTest = window.location.href.includes('test');
console.warn("isTest", isTest);
//if (isTest) newParams.set("server", "test");

if (!newParams.get("gl.vert")) {
	newParams.set("gl.vert", isTest ? DEFAULT_TEST_AD : DEFAULT_AD);
}
$("body").on("gl:adblock", function() {
	$(".adblock-warning").css({
		display: "block"
	});
	console.warn("Adblocker detected - expect some things to break.");
});

const detectAdBlock = () => {
	const $script = document.createElement('script');
	// Adblockers are expected to always block js files with "ads" in the name
	$script.setAttribute('src', 'https://as.good-loop.com/ads.js');
	document.head.appendChild($script);
	setTimeout(() => {
		if (document.getElementById('aiPai9th') === null) {
			$('.alert').css('display', 'block');
		};
	}, 1000);
}

//Todo: Update wrapper after picking new test id
let wrapperserver = "https://" + (isTest ? "" : "") + "demo.good-loop.com";
const videoLandscapeUrl =
	wrapperserver + "/adtype/generic.html?gl.size=landscape&" + newParams;
const videoPortraitUrl =
	wrapperserver + "/adtype/generic.html?gl.size=portrait&" + newParams;
const socialUrl = wrapperserver + "/snapchat.html"; // Picture of Snapchat ad. TODO: Get actual demo.
const displayUrl =
	wrapperserver + "/display.html?gl.size=portrait&" + newParams;

// TODO change 'landscape' to 'desktop'
const SCREEN = ["mobile-portrait", "desktop", "mobile-landscape"];
const FORMAT = ["social", "video", "display"];
/**
 * format -> screen -> reason-why-not
 */
const notAllowed = {
	social: {
		desktop:
			"We only support social media apps on mobile - as that is how most people use them",
		"mobile-landscape":
			"Social media apps are almost always used in portrait mode"
	},
	video: {}, // works everywhere
	display: {} // works everywhere
};

let screen = "desktop";
let format = "video";
// for detecting change
let oldScreen, oldFormat;

$(".option-button").click(function() {
	const btnId = this.id;
	setupDemo(btnId);
});

// Event listener for SEARCH button. Simple hack to avoid using Webflow weird classes.
let displaySearch = false;
const $searchDiv = $('#search-div');
$('#search-button').click(() => {
	!displaySearch ? $searchDiv.css('display', 'block') : $searchDiv.css('display', 'none');
	displaySearch = !displaySearch;
	// Needed to avoid refresh after click
	$('#search-button').removeAttr('tabindex');
})

function setupDemo(btnId) {
	// // what is the current screen and format?
	// // is this needed?? DW
	// const bodyClasses = document.body.className.split(' ');
	// bodyClasses.forEach(function(className) {
	// 	// NB: includes works for all but IE ref: https://caniuse.com/#search=includes
	//     if (SCREEN.includes(className)) screen = className;
	//     if (FORMAT.includes(className)) format = className;
	// });
	let isMobile = window.innerWidth <= 767;

	if(!btnId) btnId = 'video';

	if (SCREEN.includes(btnId)) screen = btnId;
	if (FORMAT.includes(btnId)) format = btnId;

	// force some combinations
	if (btnId === "social") screen = "mobile-portrait";
	if (btnId === "display") screen = "desktop";

	// Fullscreen button url.
	const $fsBtn = $('#fullscreen-button');
	if (btnId === 'video') $fsBtn.attr('href', 'https://demo.good-loop.com/adtype/generic.html?gl.size=landscape&gl.vert=JvtlN3pk');
	if (btnId === 'video' && isMobile) {
		$fsBtn.attr('href', 'https://demo.good-loop.com/adtype/generic.html?gl.size=portrait&gl.vert=JvtlN3pk');
	}
	if (btnId === 'display') $fsBtn.attr('href', 'https://as.good-loop.com/pagewrapper.html?gl.status=DRAFT&gl.vert=Bysic1fI');
	btnId === 'social' ? $fsBtn.addClass('d-none') : $fsBtn.removeClass('d-none');

	// TODO we must guard against this being possible by disabling buttons
	if (notAllowed[format][screen]) {
		console.log("forbidden combo! " + format + " + " + screen);
		return;
	}
	$(".second.row > .button-box")
		.removeClass("disabled-button")
		.attr("title", "Click to view demo for this device");
	let badDevices = notAllowed[format];
	Object.keys(badDevices).forEach(k => {
		let reason = badDevices[k];
		$("#" + k)
			.addClass("disabled-button")
			.attr("title", reason);
	});

	$(".button-box").removeClass("highlighted-button");
	$("#" + screen).addClass("highlighted-button");
	$("#" + format).addClass("highlighted-button");

	// change the player
	$player.hide();
	let playerSrc;
	if (format === "video") {
		playerSrc =
			screen === "mobile-portrait" ? videoPortraitUrl : videoLandscapeUrl;
	} else if (format === "social") {
		playerSrc = socialUrl;
	} else if (format === "display") {
		playerSrc = displayUrl;
	}
	console.log("Change player url to " + playerSrc);
	$player.attr("src", playerSrc);
	$player.fadeIn(200);

	$body.attr("class", "");
	$body.addClass(screen).addClass(format);
	console.log("Change body class to " + $body.attr("class"));

	$(".description-text > p")
		.removeClass("d-block")
		.addClass("d-none");
	$(".description-text > p#describe-" + format)
		.removeClass("d-none")
		.addClass("d-block");

	oldScreen = screen;
	oldFormat = format;
}

detectAdBlock();

$(document).ready(function() {
	setupDemo();
});
