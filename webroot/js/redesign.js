var items = ['Pre-roll', 'In-read', 'MPU', 'Double-MPU'];
var links = ['/pre-roll.html', 
            '/in-read.html', 
            '/mpu.html', 
            '/mpu2.html'];

function clickedItem(selectedIndex, mobile=false) {
    ReactDOM.render(React.createElement('span', {className: ''}, items[selectedIndex]), document.getElementById(mobile ? 'demo-mobile-adtype' : 'demo-adtype'));
    ReactDOM.render(React.createElement('iframe', {className: 'image', src: links[selectedIndex], frameBorder: '0'}, items[0]), document.getElementById(mobile ? 'wrapper-iframe' : 'outer'));
}
