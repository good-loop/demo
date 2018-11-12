var items = ['Pre-roll', 'In-read', 'MPU', 'Double-MPU', 'Banner'];
var links = ['https://testdemo.good-loop.com/adtypes.html?gl.format=pre-roll', 
            'https://testdemo.good-loop.com/adtypes.html?gl.format=in-read', 
            'https://testdemo.good-loop.com/adtypes.html?gl.format=mpu', 
            'https://testdemo.good-loop.com/adtypes.html?gl.format=mpu2', 
            'https://testdemo.good-loop.com/adtypes.html?gl.format=banner'];

function clickedItem(selectedIndex, mobile=false) {
    ReactDOM.render(React.createElement('span', {className: ''}, items[selectedIndex]), document.getElementById(mobile ? 'demo-mobile-adtype' : 'demo-adtype'));
    ReactDOM.render(React.createElement('iframe', {className: 'image', src: links[selectedIndex], frameBorder: '0'}, items[0]), document.getElementById(mobile ? 'mobile-outer' : 'outer'));
}
