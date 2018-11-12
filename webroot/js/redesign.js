var items = ['Pre-roll', 'In-read', 'MPU', 'Double-MPU', 'Banner'];
// var links = ['https://testdemo.good-loop.com/adtypes.html?gl.format=pre-roll', 
//             'https://testdemo.good-loop.com/adtypes.html?gl.format=in-read', 
//             'https://testdemo.good-loop.com/adtypes.html?gl.format=mpu', 
//             'https://testdemo.good-loop.com/adtypes.html?gl.format=mpu2', 
//             'https://testdemo.good-loop.com/adtypes.html?gl.format=banner', 
//             'https://www.google.com'];

var links = ['https://testdemo.good-loop.com/preroll.html', 
            'https://testdemo.good-loop.com/in-read.html', 
            'https://testdemo.good-loop.com/mpu.html', 
            'https://testdemo.good-loop.com/mpu2.html', 
            'https://testdemo.good-loop.com/leaderboard.html'];


function clickedItem(selectedIndex, mobile=false) {
    ReactDOM.render(React.createElement('span', {className: ''}, items[selectedIndex]), document.getElementById(mobile ? 'demo-mobile-adtype' : 'demo-adtype'));
    ReactDOM.render(React.createElement('iframe', {className: 'image', src: links[selectedIndex], frameBorder: '0'}, items[0]), document.getElementById(mobile ? 'mobile-outer' : 'outer'));
};

// function GetURLParameter(sParam) {
//     var sPageURL = window.location.search.substring(1);
//     var sURLVariables = sPageURL.split('&');
//     for (var i = 0; i < sURLVariables.length; i++) 
//     {
//         var sParameterName = sURLVariables[i].split('=');
//         if (sParameterName[0] == sParam) 
//         {
//             return sParameterName[1];
//         }
//     }
// }​;

// var format = GetURLParameter('gl.format');
// var aslink = document.getElementsByClassName('aslink')[0]; 
// var goodloopad = document.getElementsByClassName('goodloopad')[0]; 

// aslink.src = '//as.good-loop.com/unit.js?gl.variant=pre-roll';
// switch(format) {
//     case 'pre-roll':
//         aslink.src = '//as.good-loop.com/unit.js?gl.variant=pre-roll';
//         goodloopad.setAttribute("data-format", "player"); 
//         break;
//     case 'in-read':
//         aslink.src = '//as.good-loop.com/unit.js?gl.variant=in-read';
//         goodloopad.setAttribute("data-format", "in-read"); 
//         break;
//     case 'mpu':
//         aslink.src = '//as.good-loop.com/unit.js?gl.variant=mpu';
//         goodloopad.setAttribute("data-format", "mpu"); 
//         break;
//     case 'mpu2':
//         aslink.src = '//as.good-loop.com/unit.js?gl.variant=mpu2';
//         goodloopad.setAttribute("data-format", "mpu2"); 
//        break;
//     case 'banner':
//         aslink.src = '//as.good-loop.com/unit.js?gl.variant=banner';
//         goodloopad.setAttribute("data-format", "banner"); 
//        break;
//     default:
//         aslink.src = '//as.good-loop.com/unit.js?gl.variant='+format;
//         goodloopad.setAttribute("data-format", format); 
// } 
