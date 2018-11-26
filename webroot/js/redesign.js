var items = ['Double-MPU', 'Pre-roll', 'In-read', 'Click-to-expand'];
var links = ['/mpu2.html',
            '/pre-roll.html', 
            '/in-read.html', 
            '/mpu.html'];

function clickedItem(selectedIndex, mobile=false) {
    ReactDOM.render(React.createElement('span', {className: items[selectedIndex]}, items[selectedIndex]), document.getElementById(mobile ? 'demo-mobile-adtype' : 'demo-adtype'));
    ReactDOM.render(React.createElement('iframe', {className: 'image', src: links[selectedIndex], frameBorder: '0' }, items[0]), document.getElementById(mobile ? 'wrapper-iframe' : 'outer'));

}