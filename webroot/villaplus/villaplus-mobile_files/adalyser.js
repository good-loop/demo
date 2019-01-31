$(document).ready(function () {
    try {
        Tracker.track();
    }
    catch (e)
    { }
});

Tracker = {
    track: function () {
        var dlItems = ['saleValue','action','postcode'],
    		hasDlItems = false,
			isNewSession = false,
			cookies = document.cookie.split(";"),
			firstVisitCookieEq = "__adal_first_visit=",
			sessionStartCookieEq = "__adal_session_start=",
			lastVisitCookieEq = "__adal_last_visit=",
			firstVisit = 0,
			sessionStart = 0,
			lastVisit = 0,
			now = +new Date;
    	
        if (/googlebot|mediapartners-google|adsbot-google|slurp|bingbot|adidxbot|msnbot|bingpreview|baiduspider/i.test(navigator.userAgent)) {
            return;
        }
    	
        for(var i = 0; i < cookies.length; i++) {
            var c = cookies[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(firstVisitCookieEq) == 0) { firstVisit = parseInt(c.substring(firstVisitCookieEq.length,c.length), 10); }
            else if (c.indexOf(sessionStartCookieEq) == 0) { sessionStart = parseInt(c.substring(sessionStartCookieEq.length,c.length), 10); }
            else if (c.indexOf(lastVisitCookieEq) == 0) { lastVisit = parseInt(c.substring(lastVisitCookieEq.length,c.length), 10); }
        }
		
        if(lastVisit == 0 || lastVisit > now || now - lastVisit > 1000 * 60 * 30) {
            lastVisit = now;
            isNewSession = true;
        }
		
        if(isNewSession || sessionStart == 0 || sessionStart > lastVisit) {
            sessionStart = lastVisit;
        }
		
        if(firstVisit == 0 || firstVisit > sessionStart) {
            firstVisit = sessionStart;
        }
		
        document.cookie = firstVisitCookieEq + firstVisit + "; expires=" + new Date(now+1000*60*60*24*365).toGMTString() + "; path=/";
        document.cookie = sessionStartCookieEq + sessionStart + "; expires=" + new Date(now+1000*60*60*24).toGMTString() + "; path=/";
        document.cookie = lastVisitCookieEq + now + "; expires=" + new Date(now+1000*60*60*24).toGMTString() + "; path=/";
    	
        if(typeof dataLayer != "undefined" && dataLayer.length > 0) {
            for(var i = 0; i < dlItems.length; i++) {
                if(typeof dataLayer[0][dlItems[i]] != "undefined") {
                    hasDlItems = true;
                    break;
                }
            }
        }
		
        if(!hasDlItems && !isNewSession) {
            return;
        }
		
        var params = [];
        params.push(encodeURIComponent("referrer") + "=" +
            encodeURIComponent(document.referrer));
        params.push(encodeURIComponent("userAgent") + "=" +
            encodeURIComponent(navigator.userAgent));
        params.push(encodeURIComponent("domain") + "=" +
            encodeURIComponent(document.domain));
        params.push(encodeURIComponent("url") + "=" +
            encodeURIComponent(document.location.href));
        params.push(encodeURIComponent("firstVisit") + "=" +
            encodeURIComponent(firstVisit));
        params.push(encodeURIComponent("sessionStart") + "=" +
            encodeURIComponent(sessionStart));
        
        if(typeof dataLayer != "undefined" && dataLayer.length > 0) {
            for(var i = 0; i < dlItems.length; i++) {
                var itemName = dlItems[i];
                if(typeof dataLayer[0][itemName] != "undefined") {
                    params.push(encodeURIComponent(itemName) + "=" + 
						encodeURIComponent(dataLayer[0][itemName]));
                }
            }
        }
		        
        var url = ('https:' == document.location.protocol ? 'https://tracking.adalyser.com?' :
            'http://tracking.adalyser.com:8000?') + params.join('&') + '&rnd=' +
            Math.floor(Math.random() * 10e12);
        try {
            if (navigator.appName == 'Microsoft Internet Explorer' && navigator.userAgent.indexOf("MSIE 8") != -1) {
                var request = new XDomainRequest();
            } else {
                var request = new XMLHttpRequest();
            }
            request.open("GET", url, true);
            request.send();
            setTimeout(function () {
                if (request.readyState < 4) {
                    request.abort();
                }
            },
                3000);
        } catch (err) {
            var at = document.createElement('script');
            at.type = 'text/javascript';
            at.async = true;
            at.src = url;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(at, s);
        }
    }
};
