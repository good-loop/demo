var items = ['Pre-roll', 'In-read', 'MPU', 'Double-MPU', 'Banner'];
var links = ['https://testdemo.good-loop.com/adtypes.html?gl.variant=pre-roll', 
            'https://testdemo.good-loop.com/adtypes.html?gl.variant=in-read', 
            'https://testdemo.good-loop.com/adtypes.html?gl.variant=mpu', 
            'https://testdemo.good-loop.com/adtypes.html?gl.variant=mpu2', 
            'https://testdemo.good-loop.com/adtypes.html?gl.variant=banner'];

// var links = ['https://testdemo.good-loop.com/preroll.html', 
//             'https://testdemo.good-loop.com/in-read.html', 
//             'https://testdemo.good-loop.com/mpu.html', 
//             'https://testdemo.good-loop.com/mpu2.html', 
//             'https://testdemo.good-loop.com/vertical.html'];


function clickedItem(selectedIndex, mobile=false) {
    ReactDOM.render(React.createElement('span', {className: ''}, items[selectedIndex]), document.getElementById(mobile ? 'demo-mobile-adtype' : 'demo-adtype'));
    ReactDOM.render(React.createElement('iframe', {className: 'image', src: links[selectedIndex], frameBorder: '0'}, items[0]), document.getElementById(mobile ? 'mobile-outer' : 'outer'));
}
