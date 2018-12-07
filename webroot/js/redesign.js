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
    var adNameDiv = document.getElementById(mobile ? 'demo-mobile-adtype' : 'demo-adtype');
    adNameDiv.innerHTML = '<span>' + items[selectedIndex] + '</span>';
    var iframeDiv = document.getElementById(mobile ? 'wrapper-iframe' : 'outer');
    // add iframe to id, making sure to pass URL params
    iframeDiv.innerHTML = '<iframe class="image" frameborder=0 src="' + links[selectedIndex] + window.location.search + '"></iframe>';
}

