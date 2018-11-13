var items = ['Pre-roll', 'In-read', 'MPU', 'Double-MPU'];
var links = ['https://testdemo.good-loop.com/pre-roll.html', 
            'https://testdemo.good-loop.com/in-read.html', 
            'https://testdemo.good-loop.com/mpu.html', 
            'https://testdemo.good-loop.com/mpu2.html'];

// var links = ['https://testdemo.good-loop.com/preroll.html', 
//             'https://testdemo.good-loop.com/in-read.html', 
//             'https://testdemo.good-loop.com/mpu.html', 
//             'https://testdemo.good-loop.com/mpu2.html', 
//             'https://testdemo.good-loop.com/vertical.html'];


function clickedItem(selectedIndex, mobile=false) {
    ReactDOM.render(React.createElement('span', {className: ''}, items[selectedIndex]), document.getElementById(mobile ? 'demo-mobile-adtype' : 'demo-adtype'));
    ReactDOM.render(React.createElement('iframe', {className: 'image', src: links[selectedIndex], frameBorder: '0'}, items[0]), document.getElementById(mobile ? 'mobile-outer' : 'outer'));
}
