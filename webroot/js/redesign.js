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

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}​

var format = GetURLParameter('gl.format');
var elements = document.getElementsByClassName('adlink'); 
elements[0].src = '//as.good-loop.com/unit.js?gl.variant=pre-roll';
switch(format) {
    case 'pre-roll':
        elements[0].src = '//as.good-loop.com/unit.js?gl.variant=pre-roll';
        break;
    case 'in-read':
        elements[0].src = '//as.good-loop.com/unit.js?gl.variant=in-read';
        break;
    case 'mpu':
        elements[0].src = '//as.good-loop.com/unit.js?gl.variant=mpu';
        break;
    case 'mpu2':
        elements[0].src = '//as.good-loop.com/unit.js?gl.variant=mpu2';
        break;
    case 'banner':
        elements[0].src = '//as.good-loop.com/unit.js?gl.variant=banner';
        break;
    default:
        elements[0].src = '//as.good-loop.com/unit.js?gl.variant=pre-roll';
} 
