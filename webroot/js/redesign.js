var items = ['Double-MPU', 'Pre-roll', 'In-read', 'Click-to-expand'];
var links = ['/mpu2.html',
            '/pre-roll.html', 
            '/in-read.html', 
            '/mpu.html'];

function clickedItem(selectedIndex, mobile) {
//    ReactDOM.render(React.createElement('span', {className: ''}, items[selectedIndex]), document.getElementById(mobile ? 'demo-mobile-adtype' : 'demo-adtype'));
    var adNameDiv = document.getElementById(mobile ? 'demo-mobile-adtype' : 'demo-adtype');
    adNameDiv.innerHTML = '<span>' + items[selectedIndex] + '</span>';
//    ReactDOM.render(React.createElement('iframe', {className: 'image', src: links[selectedIndex], frameBorder: '0'}, items[0]), document.getElementById(mobile ? 'wrapper-iframe' : 'outer'));
    var iframeDiv = document.getElementById(mobile ? 'wrapper-iframe' : 'outer');
    iframeDiv.innerHTML = '<iframe class="image" frameborder=0 src=' + links[selectedIndex] + '></iframe>';
}
