var items = {
    mpu2: 'Double-MPU', 
    'pre-roll': 'Pre-roll', 
    'in-read': 'In-read', 
    mpu: 'Click-to-expand'
};
var links = {
    mpu2: '/mpu2.html',
    'pre-roll': '/preroll.html',
    'in-read': '/in-read.html',
    mpu: '/mpu.html'
};

function clickedItem(selectedIndex, mobile=false) {
    ReactDOM.render(React.createElement('span', {className: items[selectedIndex]}, items[selectedIndex]), document.getElementById(mobile ? 'demo-mobile-adtype' : 'demo-adtype'));
    ReactDOM.render(React.createElement('iframe', {className: 'image', src: links[selectedIndex], frameBorder: '0' }, items[0]), document.getElementById(mobile ? 'wrapper-iframe' : 'outer'));

}