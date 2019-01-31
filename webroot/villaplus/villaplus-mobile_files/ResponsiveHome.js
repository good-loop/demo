$(".bannernext").click(function () {
    var currentIndex = $('div.active').index();
    $(".line" + currentIndex).css("visibility", "hidden");
    $(".line" + (currentIndex - 1)).css("visibility", "visible");
});
$(".bannerprev").click(function () {
    var currentIndex = $('div.active').index();
    $(".line" + currentIndex).css("visibility", "visible");
    $(".line" + (currentIndex - 2)).css("visibility", "hidden");
    $(".line" + (currentIndex + 1)).css("visibility", "visible");

    if (currentIndex == 0) {
        $(".line3").css("visibility", "hidden");
    }
});


$(document).ready(function () {
    checkisincompleteBooking();

    //For Mobile - Menu
    //For Menu
    /* nav expand */
    $(".expand").unbind('click').bind('click', function () {
        $(this).closest("li").next().find(".level-3").toggleClass("hide");
        $(this).closest("li").find(".arrow").toggleClass("hide");
        $(this).toggleClass("shrink");
    });

    $('[id="menu"]').click(function () {
        try {
            $.ajax({
                url: '/shared/showmenu',
                type: 'POST',
                async: false,
                success: function (result) {
                    $("div[data-role=page]").css("opacity", "0");
                    $("div[data-role=page]").css("overflow", "hidden");
                    $('#nav').html(result);
                    $('#nav').css("overflow-y", "auto");
                    $('#nav').show();
                }
            });
        } catch (e) {

        }
    })

    $("#dvMenuCross").click(function () {
        $("div[data-role=page]").show();
        $('#nav').hide();
        $("div[data-role=page]").css("opacity", "1");
        $("div[data-role=page]").css("overflow", "auto");
        $('body').removeClass('menuClass');
        $("#addextraCarouselMob").swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left') $(this).carousel('next');
                if (direction == 'right') $(this).carousel('prev');
            },
            allowPageScroll: "vertical"
        });

        $("#bannerContainerM").swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left') $(this).carousel('next');
                if (direction == 'right') $(this).carousel('prev');
            },
            allowPageScroll: "vertical"
        });
    })
    //Menu End

});


//Alert Box
function AlertBox(content, args, callback) {

    var default_args =
        {
            'confirm': false, 		// Ok and Cancel buttons
            'verify': false, 	// Yes and No buttons
            'input': false, 		// Text input (can be true or string for default text)
            'animate': false, 	// Groovy animation (can true or number, default is 400)
            'textOk': 'OK', 	// Ok button default text
            'textCancel': 'Cancel', // Cancel button default text
            'textYes': 'Yes', 	// Yes button default text
            'textNo': 'No', 	// No button default text
            'textTitle': '#',
            'anchorObjectid': '',
            'height': '350',
            'width': '450',
            'size': '23'
        }

    if (args) {
        for (var index in default_args) { if (typeof args[index] == "undefined") args[index] = default_args[index]; }
    }


    //TODO : This code is to support Alert box display on ASP pages
    // Remove this code once ASP pages are removed 
    var isAsp = ValidateAspPage();

    if (isAsp == true) {
        //showAlert(args['textTitle'], content, 'OK', 200, 200, anchorObject, '', 'left');
        //showAlert(args['textTitle'], content, 'OK', 200, 200, anchorObject, '', 'left');
        try {
            showAlert(args['textTitle'], content, "OK", args['height'], args['width'], null, '', 'undefined');
        }
        catch (e) {
            //showAlertIFrame("Incorrect Input", "You can not select more than " + (parseInt(stp) + parseInt(extraChildren)) + " <br /> members including adults and children.", "OK", 250, 90, objAnchor, '', 'undefined');
            alert(e.get_Data());
        }
        return;
        //showAlert("Incorrect Input", "Please enter the forename", "OK", "200", "200", anchorObject, '', 'undefined');
    }
    // END : Remove this code once ASP pages are removed 
    var aHeight = $(document).height();
    var aWidth = $(document).width();
    $('body').append('<div class="AlertOverlay" id="aOverlay"></div>');
    $('.AlertOverlay').css('height', aHeight).css('width', aWidth).fadeIn(100);
    $('body').append('<div class="AlertOuter" id="AlertOuterutil"></div>');
    $('.AlertOuter').append('<div class="closeImg"><img src="/Images/Common/button_close.png" name="imgClose" onclick="CloseDiv();"/></div>');
    if ((args) && args['textTitle'] != '#') {
        $('.AlertOuter').append('<div class="aTitle"></div>');
        $('.aTitle').append(args['textTitle']);
    }

    $('.AlertOuter').append('<div class="AlertInner" id="AlertInnerutil"></div>');
    $('.AlertInner').append(content);
    $('.AlertOuter').css("left", ($(window).width() - $('.AlertOuter').width()) / 2 + $(window).scrollLeft() + "px");

    if (args) {
        if (args['animate']) {
            var aniSpeed = args['animate'];
            if (isNaN(aniSpeed)) { aniSpeed = 400; }
            $('.AlertOuter').css('top', '-200px').show().animate({ top: "35%" }, aniSpeed);
        }
        else { $('.AlertOuter').css('top', '35%').fadeIn(200); }
    }
    else { $('.AlertOuter').css('top', '35%').fadeIn(200); }

    if (args) {
        if (args['input']) {
            if (typeof (args['input']) == 'string') {
                $('.AlertInner').append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" value="' + args['input'] + '" /></div>');
            }
            else {
                $('.AlertInner').append('<div class="aInput"><input type="text" class="aTextbox" t="aTextbox" /></div>');
            }
            $('.aTextbox').focus();
        }
    }

    $('.AlertInner').append('<div class="aButtons"></div>');
    var buttonColor = 'orange';
    var buttonStyle_top = '<span class="button-wrapper"><span class="' + buttonColor + '-button-l button-size' + args['size'] + '"></span>\n<span class="' + buttonColor + '-button-r button-size' + args['size'] + '"> </span>\n';
    var buttonStyle_bottom = '\n</span>';
    if (args) {
        if (args['confirm'] || args['input']) {
            $('.aButtons').append('<button value="ok">' + args['textOk'] + '</button>');
            $('.aButtons').append('<button value="cancel">' + args['textCancel'] + '</button>');
        }
        else if (args['verify']) {
            $('.aButtons').append(buttonStyle_top + '<button value="' + args['textYes'] + '" class="button lh' + args['size'] + '">' + args['textYes'] + '</button>' + buttonStyle_bottom + '&nbsp;&nbsp;');
            $('.aButtons').append(buttonStyle_top + '<button value="' + args['textNo'] + '" class="button lh' + args['size'] + '">' + args['textNo'] + '</button>' + buttonStyle_bottom);
        }
        else { $('.aButtons').append(buttonStyle_top + '<button value="OK" id="AlertButtonutil" class="button lh' + args['size'] + '">' + args['textOk'] + '</button>' + buttonStyle_bottom); }
    }
    else { $('.aButtons').append(buttonStyle_top + '<button value="ok" class="button lh' + args['size'] + '" onclick="CloseDiv();">OK</button>' + buttonStyle_bottom); }

    $(document).keydown(function (e) {
        if ($('.AlertOverlay').is(':visible')) {
            if (e.keyCode == 13) { $('.aButtons > button[value="OK"]').click(); }
            if (e.keyCode == 27) { $('.aButtons > button[value="cancel"]').click(); }
        }
    });

    var aText = $('.aTextbox').val();
    if (!aText) { aText = false; }
    $('.aTextbox').keyup(function () { aText = $(this).val(); });

    $('.aButtons > button').click(function () {
        $('.AlertOverlay').remove();
        $('.AlertOuter').remove();
        if (callback) {
            var wButton = $(this).attr("value");
            if (wButton == 'OK') {
                if (args) {
                    if (args['input']) { callback(aText); }
                    else { callback(wButton); }
                }
                else { callback(wButton); }
            }
            else if (wButton == 'cancel') { callback(false); }
            else { callback(wButton); }
        }
    });

    $('.aButtons > span button').click(function () {
        $('.AlertOverlay').remove();
        $('.AlertOuter').remove();

        if (controlid == "enewsSubmit") {
            $("#txtNewsletter").focus();
        }
        else if (controlid == "subscribeId") {
            $("#" + controlName).focus();
        }
        else if (controlid == "FirstName") {

            $("#FirstName").focus();
        }
        else if (controlid == "Surname") {

            $("#Surname").focus();
        }
        else if (controlid == "EmailAddress") {

            $("#EmailAddress").focus();
        }
        else if (controlid == "MainContent_villaPriceLayer_ddAirports") {
            $("#MainContent_villaPriceLayer_ddAirports").focus();
        }
        else if (controlid == "btnSign") {
            $("#footer1_txtNewsletter").focus();
        }

        if (callback) {
            var wButton = $(this).attr("value");
            if (wButton == 'OK') {
                if (args) {
                    if (args['input']) { callback(aText); }
                    else { callback(wButton); }
                }
                else { callback(wButton); }
            }
            else if (wButton == 'cancel') { callback(false); }
            else { callback(wButton); }
        }
    });
}
function CloseDiv() {
    $('.AlertOverlay').remove();
    $('.AlertOuter').remove();
}

//Info Box
function showInfoBox(ctrl, title, text, placement, height, width) {
    var content = text.replace(/~~/g, "\""); //for html content replace the double quotes
    infoBox(ctrl, { title: title, placement: placement, bodyHeight: (height == 0 ? 60 : height), bodyWidth: width, autoHide: true, text: content });
}

function infoBox(ctrl, options) {
    var settings = $.extend({ delay: 500, autoHide: false, pause: 50000, animationSpeed: 500, placement: 'top', imagePath: 'images/close.png', text: 'Test.', bodyHeight: 200, bodyWidth: 250, title: 'Test' }, options);
    var control = $(ctrl);
    var frm_w = 0;
    var ie_browser = false;
    var ieversion = 9;
    return control.each(function () {
        var iconDirection = 'top';
        if (settings.placement == 'top')
            iconDirection = 'bottom';
        if (settings.placement == 'bottom')
            iconDirection = 'top';
        if (settings.placement == 'left')
            iconDirection = 'right';
        if (settings.placement == 'right')
            iconDirection = 'left';
        var usefilter = false;
        if (navigator.userAgent.match(/\bMSIE\b/) && (!document.documentMode || document.documentMode < 9)) {
            usefilter = true;
        }
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            ieversion = new Number(RegExp.$1) // capture x.x portion and store as a number
            ie_browser = true;
        }

        var closebtn = '';
        var toolTipContainer = $('<div class="infoBox-container"><div class="infoBox-body"><div class="infoBox-title"><h3>' + settings.title + '</h3><img alt="Close" src="/images/common/button_close.png" class="infoBox-closeImg" tooltip="close"/></div><div class="infoBox-content">' + settings.text +
            '' + closebtn + '</div></div><div style="left:0px;" class="infoBox-icon infoBox-icon-shadow-' + iconDirection + ' ' + iconDirection + '"></div><div class="infoBox-icon infoBox-icon-' + iconDirection + ' ' + iconDirection + '"></div></div>');
        if (control.parent().find('.infoBox-container').length) {
            if (usefilter) {
                control.parent().find('.infoBox-container').css({ display: 'block', '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)', filter: 'alpha(opacity=100)' });
                control.parent().find('.infoBox-container').find('div').css({ display: 'block', '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)', filter: 'alpha(opacity=100)' });
            }
            else {
                control.parent().find('.infoBox-container').css({ display: 'block', filter: 'alpha(opacity=100)', opacity: 1 });
                control.parent().find('.infoBox-container').find('div').css({ display: 'block', filter: 'alpha(opacity=100)', opacity: 1 });
            }
        }
        else {
            control.wrapAll('<div class="infoBox-wrap" align="left" />');
            control.parent().append(toolTipContainer);
            var delay = settings.delay;
            var toolTip = toolTipContainer;
            toolTip.css({ height: parseInt(settings.bodyHeight) + 16, width: parseInt(settings.bodyWidth) + 12 });
            toolTip.css({ display: 'none' }).find('div').css({ display: 'none', opacity: 0 });
            var toolTipBody = $('.infoBox-body', toolTipContainer);
            if (ie_browser) {
                toolTipBody.css({ 'height': 'expression( this.scrollHeight < settings.bodyHeight +1  ? settings.bodyHeight : "auto" )', width: settings.bodyWidth });
            }
            else {
                toolTipBody.css({ 'min-height': settings.bodyHeight, width: settings.bodyWidth });
            }
            var toolTitle = $('.infoBox-title', toolTipBody);
            toolTitle.css({ height: 40, width: settings.bodyWidth });
            var toolTipcontent = $('.infoBox-content', toolTipBody);
            if (ie_browser) {
                toolTipcontent.css({ 'height': 'expression(this.scrollHeight < (settings.bodyHeight -59) ? (settings.bodyHeight -60) : "auto")', width: settings.bodyWidth - 20 });
            }
            else {
                toolTipcontent.css({ 'min-height': settings.bodyHeight - 60, width: settings.bodyWidth - 20 });
            }
            $('.infoBox-title', toolTipBody).find(".infoBox-closeImg").click(function () {
                hideToolTip(toolTip);
            });
            navigator.appName = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
            var toolTipIcon = $('.infoBox-icon', toolTipContainer);
            var placement = settings.placement;
            var interval;
            var position = control.offset();
            var left = position.left;
            var top = position.top - control.height();
            var iconTop = top - 1;
            if (placement == 'top') {
                //Only for Villaplus term on google map
                top = toolTip.height();
                if ($.browser.mozilla) {
                    top = toolTip.height() + 20;
                    iconTop = top - 2;
                }
                else if ($.browser.safari) {
                    top = toolTip.height() + 10;
                    iconTop = toolTip.height() + 10;
                }
                else if ($.browser.chrome == 'true') {
                    top = toolTip.height() + 20;
                    iconTop = toolTip.height() + 10;
                }
                else {
                    top = toolTip.height();
                }
                toolTipIcon.css('top', iconTop - toolTipIcon.outerHeight() - 3);
                toolTipIcon.css('margin-left', toolTipBody.outerWidth() - 40);
                var toolTipIconShadow = $('.infoBox-icon-shadow-top', toolTipContainer);
                toolTipIconShadow.css('top', -iconTop - toolTipIcon.outerHeight() - 2);
                toolTipIconShadow.css('margin-left', toolTipBody.outerWidth() - 40);
            }
            if (placement == 'bottom') {
                top += $(this).height() + toolTipIcon.outerHeight();
                var iconTop = toolTip.position().top;
                toolTipIcon.css('top', -toolTipIcon.outerHeight() + 1);
            }
            if (placement == 'left') {
                //triangle placement
                left -= toolTip.outerWidth();
                left -= 10;
                var iconLeft = toolTipBody.position().left + toolTipBody.outerWidth() - 2;
                toolTipIcon.css('left', iconLeft);
                var toolTipIconShadow = $('.infoBox-icon-shadow-right', toolTipContainer);
                toolTipIconShadow.css('left', iconLeft + 1);
                top -= 12;
            }
            if (placement == 'right') {
                left += control.outerWidth();
                //triangle placement
                //toolTipBody.css('left', toolTipIcon.outerWidth() - 1);toolTipIcon.outerWidth() will be always 20
                toolTipBody.css('left', 19);
                toolTipIcon.css('left', 1);
                var toolTipIconShadow = $('.infoBox-icon-shadow-left', toolTipContainer);
                toolTipIconShadow.css('left', 0);
                top -= 12;
            }
            var actualleft = (-(parseInt(settings.bodyWidth) + 12) - (parseInt(settings.bodyWidth) * .01) - 1.5);
            var actualtop = -18.5;
            if (ie_browser) {
                if (ieversion >= 8) {
                    actualtop = -31.5;
                }
                else if (ieversion == 7) {
                    toolTip.css({ 'z-index': 500001 });
                }
            }
            if (placement == 'left') {
                toolTip.css({ left: actualleft + 'px', top: actualtop + 'px' });
            }
            else if (placement == 'right') {
                toolTip.css({ left: '6px', top: '-30px' });
            }
            else {
                toolTip.css({ left: -toolTipBody.outerWidth() + 70, top: -top });
            }
            if (ValidateAspPage()) {
                frm_w = parent.document.getElementById("ifrmSearch").style.width;
            }
            showToolTip(toolTip);
        }

        function showToolTip(toolTip) {
            if (ValidateAspPage()) {
                parent.document.getElementById("ifrmSearch").style.width = (settings.bodyWidth + parseInt(frm_w)) + 'px';
            }
            if (usefilter) {
                toolTip.css({ display: '' }).find('div').css('display', '').stop(false, true).animate({ '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)', filter: 'alpha(opacity=100)' }, settings.animationSpeed, function () {

                });
            }
            else {
                toolTip.css({ display: '' }).find('div').css('display', '').stop(false, true).animate({ zoom: 1, filter: 'alpha(opacity=100)', opacity: 1 }, settings.animationSpeed, function () {
                });

            }
        }
        function hideToolTip(toolTip) {
            $(toolTip).remove();
            control.unwrap();
            if (ValidateAspPage()) {
                parent.document.getElementById("ifrmSearch").style.width = frm_w;
            }
        }

    });
}

function ValidateAspPage() {

    //var asp_Parent = parent.document.getElementById("asp_dvDisableParent");
    //$(window.top)
    var localIsAsp = false;
    try {

        var asp_Parent = window.top.document.getElementById("asp_dvDisableParent");
        //$(window.top).find("#asp_dvDisableParent")
        if (asp_Parent == null || typeof asp_Parent == "undefined" || asp_Parent == "undefined") {
            localIsAsp = false;
        }
        else {
            localIsAsp = true;
        }
    }
    catch (ex) {
        localIsAsp = false;
    }
    return localIsAsp;
}
//* Jayraj Section //
//Incomplete Booking

function checkisincompleteBooking() {

    if ($("#bookFlag").val() == "true") {
        // ShowInCompleteDialog();
        $("#overlay").css("display", "flex");
        $("#IBpopup").css("display", "flex");
    }
}
function ShowInCompleteDialog() {
    //  alert("in adding pop up");
    //$("#overlay").css({ "display": "flex !important" });
    //$("#IBpopup").css({ "display": "flex !important" });


    //$("#overlay") .style("display", "flex");
    //$("#IBpopup").style("display", "flex");

    //$("#overlay").css("display", "flex");
    //$("#IBpopup").css("display", "flex");
    // var infoPanel = $('#InComBook');
    // infoPanel.insertAfter('header'); // This is for move popup div next to header tag.

    //// createBackdrop();
    // //lightboxShroud.fadeIn();
    // //infoPanel.fadeIn();
    // scrolly = $('body').scrollTop();
    // $('body').css({ position: "fixed", height: "100%" });

    // //middleContent(infoPanel);
    // //infoPanel.css({ top: "50px" });
    // var YesClick = infoPanel.find('#Yes');
    // YesClick.unbind('click');
    // YesClick.click(function () {
    //     //alert("Yes Click");
    //     bookInComplete();
    // });

    // var NoClick = infoPanel.find('#No');
    // NoClick.unbind('click');
    // NoClick.click(function () {
    //     var dataPost = { id: '1' };
    //     $.ajax({
    //         type: 'POST',
    //         url: '/home/InCompleteBookNo',
    //         //data: JSON.stringify(dataPost),
    //         contentType: 'application/json',
    //         async: true,
    //         dataType: 'html',
    //         success: function (result) {
    //         },
    //         error: function (xhr, err, thrownError) {
    //             //alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
    //             //alert("status:" + xhr.status + " responseText: " + xhr.responseText);
    //             //alert(thrownError);
    //         }
    //     });
    //     HideInCompleteDialog();

    // });
    // return false;
}

function HideInCompleteDialog() {

    var infoPanel = $('#InComBook');
    infoPanel.fadeOut();
    lightboxShroud.fadeOut();

    $('body').css({ position: "relative", height: "auto" });
    $('body').scrollTop(scrolly);

    return false;
}


function createBackdrop() {
    if (!lightboxShroud.length) {
        lightboxShroud = $("<div id='shroud-lightbox'></div>");
        lightboxShroud.hide();
        $('body').append(lightboxShroud);
    }
}


function bookInComplete() {
    //  DisplayLoadingImage();
    var bookUrl = "/booking/";
    //if (BookingUrl.length < 10) {
    //    BookingUrl = BookingProtocol + "://" + window.location.host;
    //}
    //var actionUrl = BookingUrl + bookUrl;
    var actionUrl = bookUrl;
    jQuery('<form>', {
        'method': 'post',
        'action': actionUrl,
        'target': '_parent'
    }).append(jQuery('<input>', {
        'name': 'bookingID',
        'value': $("#PrevBookingId").val(),
        'type': 'hidden'
    })).appendTo('body').submit();
}


function noincomplete() {

    //var BookingId = ModelData.BookingId;
    try {
        $.ajax({
            url: "/common/incompletebookno",
            type: 'POST',
            // data: "{bookingID :" + BookingId + ", acceptDisclaimer :true}",
            async: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR + "-" + textStatus + "-" + errorThrown);
            },
            success: function (result) {
                // CreateAndPostForm('/booking/Extras/ShowExtras', BookingId);
                //  SubmitNavigationForm('/booking/extras/showextras');
            }
        });
    }
    catch (ex) {
        //alert(ex.message);
    }

    // document.cookie = 'D.VillaPlusBookingDetails.ID=00;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    closeIBpopup();


}

function closeIBpopup() {
    $("#overlay").css("display", "none");
    $("#IBpopup").css("display", "none");

}
//incomplete booking code ends################

//* Jayraj Sections ends here//

$(document).ready(function () {

    $(".closemb").click(function () {
        $("#disablerMB").hide();
        $("#youTubeVideoOverlayMB").hide();
    });

    $("#bannerContainerD").swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            if (direction == 'left') animateBanner("prev", $(this));
            if (direction == 'right') animateBanner("next", $(this));
        },
        allowPageScroll: "vertical"
    });

    //MAKING VIDEOS CLICKABLE
    $(".youTubeVideoButton").click(function () {

        var height = $(window).height();
        var width = $(window).width();

        if (height <= 667 && width <= 375) {
            $(".card.noborder.img-fluid").css("display", "none");
            $("#youTubeVideoOverlay").css("width", "94%");
            $("#youTubeVideoOverlay").css("margin-bottom", "-7%");
            $(".youtubevideoalign").css("margin-top", "5%");
        }
        $("#primarydiv").hide();
        $("#youTubeVideoOverlay").show();
        $("#videoHolderid").show();
        $("#videoHolderid").removeClass("hide");
        $("#youTubeVideoOverlay").removeClass("hide");

        var iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", $(this).attr("data-youTubeUrl") + "?rel=0&autoplay=1&controls=1&showinfo=0");
        //iFrame.style.width = 75 + "%";
        //iFrame.style.height = 30 + "%";
        //iFrame.setAttribute("width", 822);
        //iFrame.setAttribute("height", 446);
        iFrame.setAttribute("frameborder", 0);
        iFrame.setAttribute("class", "video");
        iFrame.setAttribute("allow", "autoplay; encrypted-media");
        $("#youTubeVideoOverlay .header span").html($(this).attr("data-youTubeTitle"));
        $("#youTubeVideoOverlay .videoHolder").html("");
        $("#youTubeVideoOverlay .videoHolder").append(iFrame);
        // $("#youTubeVideoOverlay").center();
        // $("#youTubeVideoOverlay").fadeIn();
    });

    $("#youTubeMB").click(function () {
        $("#youTubeMB").hide();
        $("#youTubeVideoOverlaymobile").show();
        $("#videoHoldermobile").show();
        $("#youTubeVideoOverlaymobile").removeClass("hide");
        $("#videoHolderidmobile").removeClass("hide");

        var iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", $(this).attr("data-youTubeUrl") + "?rel=0&autoplay=1&controls=1&showinfo=0");
        iFrame.setAttribute("frameborder", 0);
        iFrame.setAttribute("class", "videoIB");
        iFrame.setAttribute("allow", "autoplay; encrypted-media");
        $("#youTubeVideoOverlaymobile .header span").html($(this).attr("data-youTubeTitle"));
        $("#youTubeVideoOverlaymobile .videoHoldermobile").html("");
        $("#youTubeVideoOverlaymobile .videoHoldermobile").append(iFrame);
    });

    $("#youTubeIB").click(function () {

        //$("#disablerMB").height($(document).height())
        //$("#disablerMB").show();
        $("#youTubeIB").hide();
        $("#youTubeVideoOverlayIB").show();
        $("#videoHolderidIB").show();
        $("#videoHolderidIB").removeClass("hide");
        $("#youTubeVideoOverlayIB").removeClass("hide");

        var iFrame = document.createElement("iframe");
        iFrame.setAttribute("src", $(this).attr("data-youTubeUrl") + "?rel=0&autoplay=1&controls=1&;showinfo=0");
        //iFrame.setAttribute("width", 100%);
        //iFrame.setAttribute("height", 100%);
        iFrame.setAttribute("frameborder", 0);
        iFrame.setAttribute("allowfullscreen", 1);
        iFrame.setAttribute("class", "videoIB");
        iFrame.setAttribute("allow", "autoplay; encrypted-media");
        $("#youTubeVideoOverlayIB .header span").html($(this).attr("data-youTubeTitle"));
        $("#youTubeVideoOverlayIB .videoHolderIB").html("");
        $("#youTubeVideoOverlayIB .videoHolderIB").append(iFrame);
        //$("#youTubeVideoOverlayIB").center();
        //$("#youTubeVideoOverlayIB").fadeIn();
    });
    $("#addextraCarousel").swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            if (direction == 'left') $(this).carousel('next');
            if (direction == 'right') $(this).carousel('prev');
        },
        allowPageScroll: "vertical"
    });

    $('#addextraCarousel .carouselitem').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i = 0; i < 2; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        }
    });

    $("#addextraCarouselMob").swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            if (direction == 'left') $(this).carousel('next');
            if (direction == 'right') $(this).carousel('prev');
        },
        allowPageScroll: "vertical"
    });

    $('#addextraCarouselMob .carouselitem').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i = 0; i < 2; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        }
    });

    $("#bannerContainerM").swipe({
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            if (direction == 'left') $(this).carousel('next');
            if (direction == 'right') $(this).carousel('prev');
        },
        allowPageScroll: "vertical"
    });

    $("#textCarouselMob").carousel({ interval: 10000 })

    var gAnalitics = [];
    gAnalitics.push({ id: 'cus', para1: 'Contact us click', para2: 'Contact us' });
    gAnalitics.push({ id: 'bc', para1: 'Booking Conditions click', para2: 'Booking Conditions' });
    gAnalitics.push({ id: 'hs', para1: 'Health and Safety click', para2: 'Health and Safety' });
    gAnalitics.push({ id: 'ui', para1: 'Useful Info click', para2: 'Useful Info' });
    gAnalitics.push({ id: 'ep', para1: 'Eco Policy click', para2: 'Eco Policy' });
    gAnalitics.push({ id: 'hb', para1: 'How to Book click', para2: 'How to Book' });
    gAnalitics.push({ id: 'ti', para1: 'Travel Insurance click', para2: 'Travel Insurance' });
    gAnalitics.push({ id: 'fk', para1: 'Feedback click', para2: 'Feedback' });
    gAnalitics.push({ id: 'own', para1: 'Villa Owners click', para2: 'Villa Owners' });
    gAnalitics.push({ id: 'wtu', para1: 'Terms of Use click', para2: 'Terms of Use' });
    gAnalitics.push({ id: 'prv', para1: 'Privacy click', para2: 'Privacy' });
    gAnalitics.push({ id: 'cp', para1: 'Cookie Policy click', para2: 'Cookie Policy' });
    gAnalitics.push({ id: 'vhg', para1: 'Holiday Games Guide click', para2: 'Holiday Games Guide' });
    gAnalitics.push({ id: 'vtg', para1: 'Top Travel Tech click', para2: 'Top Travel Tech' });
    gAnalitics.push({ id: 'smp', para1: 'Sitemap click', para2: 'Sitemap' });
    gAnalitics.push({ id: 'ceo', para1: 'Cost of eating out click', para2: 'Cost of eating out' });
    gAnalitics.push({ id: 'blg', para1: 'Villa Plus Blog click', para2: 'Villa Plus Blog' });
    gAnalitics.push({ id: 'apm', para1: 'ABTA click', para2: 'ABTA-ATOL' });
    gAnalitics.push({ id: 'bta', para1: 'ABTA click', para2: 'ABTA-ATOL' });
    gAnalitics.push({ id: 'aus', para1: 'About Us click', para2: 'About Us' });


    for (i = 0; i < gAnalitics.length; i++) {
        $('#' + gAnalitics[i].id).bind('click', function () {
            ga('send', 'event', 'Footer:1', "'" + gAnalitics[i].para1 + "'", "'" + gAnalitics[i].para2 + "'", { 'nonInteraction': 1 });
        });
    }

    $('#website_copy > span').bind('click', function () { alertDetails(); });
    $('.cookie-layer-accept').bind('click', function () {
        AcceptCookiesPolicy(1);
    });
});
//Cookies policy layer
function AcceptCookiesPolicy(param1) {
    var response = "";
    try {
        $.ajax(
            {
                url: "/webmethod.aspx/WritePolicyAccptCookie",
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: "{param :" + param1 + "}",
                async: false,
                datatype: 'json',
                success: function (output) {
                    if (output.d == undefined) {
                        //alert(output.d);
                        response = output;
                    }
                    else {
                        response = output.d;
                    }
                }
            });

        if (response || response == "true") {
            $("#CookieAccptLayer").fadeOut(600);
        }
    }
    catch (ex) { }
}

$(document).ready(function () {
    autoPlayYouTubeModal();
});

function autoPlayYouTubeModal() {
    var trigger = $("body").find('[data-toggle="modal"]');
    trigger.click(function () {
        var theModal = $(this).data("target"),
            videoSRC = $(this).attr("data-theVideo"),
            videoSRCauto = videoSRC + "?rel=0&amp;autoplay=1&amp;controls=1&amp;showinfo=0";
        $(theModal + ' iframe').attr('src', videoSRCauto);
        $(theModal + ' button.close').click(function () {
            $(theModal + ' iframe').attr('src', videoSRC);
        });
    });
}


// Start Mobile Landscape 
//$(function () {
//    var width = $(window).width();
//    window.mobilecheck = function () {
//        var check = false;
//        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
//        if (check == true) {
//            if (window.matchMedia("(orientation: landscape)").matches) {
//                /*Header*/
//                $('.mobileheaderLandscape').css("display", "block");
//                $('.mobileheaderPortrait').css("display", "none");
//                $('.desktopheader').css("display", "none");
//                $('#banner1M').css('height', '');
//                $('#banner2M').css('height', '');
//                $('#banner3M').css('height', '');
//                $('#banner4M').css('height', '');
//                $('#banner5M').css('height', '');
//                $('.showdesktopslider').css("display", "block");
//                $('.hidedesktopslider').css("display", "none");
//                /*Banner*/
//                $('#bannerContainerM').css("display", "block");
//                $('#bannerContainerD').css("display", "none");
//                $('.carouselindicatorsmobile').css("margin-bottom", "1rem");
//                $(".trustpilot-widget").css("margin-bottom", "0%");
//                $(".trustpilot-widget").css("margin-top", "0%");
//                /*Footer*/
//                $('.mobfooter').css("display", "none");
//                $('.mobfooterL').css("display", "block");
//                $('.footerback').css("display", "none");
//                $('.desktopfooter').css("display", "none");
//                $('.desktop_tab_footer').css("display", "none");
//                $('.tabfooter').css("display", "none");
//                if (width > 672) {
//                    $('#banner1M').attr('src', 'Content/Images/Common/banners/1_T_L.jpg');
//                    $('#banner2M').attr('src', 'Content/Images/Common/banners/2_T_L.jpg');
//                    $('#banner3M').attr('src', 'Content/Images/Common/banners/3_T_L.jpg');
//                    $('#banner4M').attr('src', 'Content/Images/Common/banners/4_T_L.jpg');
//                    $('#banner5M').attr('src', 'Content/Images/Common/banners/5_T_L.jpg');

//                } else {
//                    $('#banner1M').attr('src', 'Content/Images/Common/banners/1_M_L.jpg');
//                    $('#banner2M').attr('src', 'Content/Images/Common/banners/2_M_L.jpg');
//                    $('#banner3M').attr('src', 'Content/Images/Common/banners/3_M_L.jpg');
//                    $('#banner4M').attr('src', 'Content/Images/Common/banners/4_M_L.jpg');
//                    $('#banner5M').attr('src', 'Content/Images/Common/banners/5_M_L.jpg');
//                }
//            }
//            else if (window.matchMedia("(orientation: portrait)").matches) {
//                /*Header*/
//                $('.mobileheaderPortrait').css("display", "block");
//                $('.mobileheaderLandscape').css("display", "none");
//                $('.desktopheader').css("display", "none");
//                $('#banner1M').css('height', '100vh');
//                $('#banner2M').css('height', '100vh');
//                $('#banner3M').css('height', '100vh');
//                $('#banner4M').css('height', '100vh');
//                $('#banner5M').css('height', '100vh');
//                $('.showdesktopslider').css("display", "block");
//                $('.hidedesktopslider').css("display", "none");
//                /*Banner*/
//                $('#bannerContainerM').css("display", "block");
//                $('#bannerContainerD').css("display", "none");
//                $('.carouselindicatorsmobile').css("margin-bottom", "40px");
//                $(".trustpilot-widget").css("margin-bottom", "0%");
//                $(".trustpilot-widget").css("margin-top", "0%");
//                /*Footer*/
//                $('.mobfooter').css("display", "block");
//                $('.mobfooterL').css("display", "none");
//                $('.footerback').css("display", "none");
//                $('.desktopfooter').css("display", "none");
//                $('.desktop_tab_footer').css("display", "none");
//                $('.tabfooter').css("display", "none");
//                $('#banner1M').attr('src', 'Content/Images/Common/banners/1_M.jpg');
//                $('#banner2M').attr('src', 'Content/Images/Common/banners/2_M.jpg');
//                $('#banner3M').attr('src', 'Content/Images/Common/banners/3_M.jpg');
//                $('#banner4M').attr('src', 'Content/Images/Common/banners/4_M.jpg');
//                $('#banner5M').attr('src', 'Content/Images/Common/banners/5_M.jpg');
//            }
//        }
//        else {
//            /*Header*/
//            $('.desktopheader').css("display", "block");
//            $('.mobileheaderPortrait').css("display", "none");
//            $('.mobileheaderLandscape').css("display", "none");
//            /*Banner*/
//            $("#bannerContainerD").css("display", "block");
//            $('#bannerContainerM').css("display", "none");
//            $('.showdesktopslider').css("display", "none");
//            $('.hidedesktopslider').css("display", "block");
//            /*Footer*/
//            $('.mobfooter').css("display", "none");
//            $('.mobfooterL').css("display", "none");
//            $('.footerback').css("display", "block");
//            $('.desktopfooter').css("display", "block");
//            $('.desktop_tab_footer').css("display", "block");
//            $('.tabfooter').css("display", "none");
//            if (width == 1200) {
//                $('#banner1').attr('src', 'Content/Images/Common/banners/1_1200.jpg');
//                $('#banner2').attr('src', 'Content/Images/Common/banners/2_1200.jpg');
//                $('#banner3').attr('src', 'Content/Images/Common/banners/3_1200.jpg');
//                $('#banner4').attr('src', 'Content/Images/Common/banners/4_1200.jpg');
//                $('#banner5').attr('src', 'Content/Images/Common/banners/5_1200.jpg');
//            }
//            else if (width > 1200 && width <= 1280) {
//                $('#banner1').attr('src', 'Content/Images/Common/banners/1_1280.jpg');
//                $('#banner2').attr('src', 'Content/Images/Common/banners/2_1280.jpg');
//                $('#banner3').attr('src', 'Content/Images/Common/banners/3_1280.jpg');
//                $('#banner4').attr('src', 'Content/Images/Common/banners/4_1280.jpg');
//                $('#banner5').attr('src', 'Content/Images/Common/banners/5_1280.jpg');
//            }
//            else if (width > 1280 && width <= 1366) {
//                $('#banner1').attr('src', 'Content/Images/Common/banners/1_1366.jpg');
//                $('#banner2').attr('src', 'Content/Images/Common/banners/2_1366.jpg');
//                $('#banner3').attr('src', 'Content/Images/Common/banners/3_1366.jpg');
//                $('#banner4').attr('src', 'Content/Images/Common/banners/4_1366.jpg');
//                $('#banner5').attr('src', 'Content/Images/Common/banners/5_1366.jpg');
//            }
//            else if (width > 1366 && width <= 2200) {
//                $('#banner1').attr('src', 'Content/Images/Common/banners/1_2200.jpg');
//                $('#banner2').attr('src', 'Content/Images/Common/banners/2_2200.jpg');
//                $('#banner3').attr('src', 'Content/Images/Common/banners/3_2200.jpg');
//                $('#banner4').attr('src', 'Content/Images/Common/banners/4_2200.jpg');
//                $('#banner5').attr('src', 'Content/Images/Common/banners/5_2200.jpg');
//            }
//            else if (width > 2200 && width <= 2530) {
//                $('#banner1').attr('src', 'Content/Images/Common/banners/1_2530.jpg');
//                $('#banner2').attr('src', 'Content/Images/Common/banners/2_2530.jpg');
//                $('#banner3').attr('src', 'Content/Images/Common/banners/3_2530.jpg');
//                $('#banner4').attr('src', 'Content/Images/Common/banners/4_2530.jpg');
//                $('#banner5').attr('src', 'Content/Images/Common/banners/5_2530.jpg');
//            }
//            else if (width >= 768 && width < 1024) {
//                $('.mobfooter').css("display", "none");
//                $('.mobfooterL').css("display", "none");
//                $('.footerback').css("display", "block");
//                $('.desktopfooter').css("display", "none");
//                $('.desktop_tab_footer').css("display", "block");
//                $('.tabfooter').css("display", "block");
//                $('#banner1').attr('src', '/Images/Common/banners/1_T.jpg');
//                $('#banner2').attr('src', '/Images/Common/banners/2_T.jpg');
//                $('#banner3').attr('src', '/Images/Common/banners/3_T.jpg');
//                $('#banner4').attr('src', '/Images/Common/banners/4_T.jpg');
//                $('#banner5').attr('src', '/Images/Common/banners/5_T.jpg');
//            }
//            else if (width >= 1024 && width <= 1366) {
//                $('.mobfooter').css("display", "none");
//                $('.mobfooterL').css("display", "none");
//                $('.footerback').css("display", "block");
//                $('.desktopfooter').css("display", "none");
//                $('.desktop_tab_footer').css("display", "block");
//                $('.tabfooter').css("display", "block");
//                $('#banner1').attr('src', '/Images/Common/banners/1_T_L.jpg');
//                $('#banner2').attr('src', '/Images/Common/banners/2_T_L.jpg');
//                $('#banner3').attr('src', '/Images/Common/banners/3_T_L.jpg');
//                $('#banner4').attr('src', '/Images/Common/banners/4_T_L.jpg');
//                $('#banner5').attr('src', '/Images/Common/banners/5_T_L.jpg');
//            }
//            else {
//                $('#banner1').attr('src', 'Content/Images/Common/banners/1.jpg');
//                $('#banner2').attr('src', 'Content/Images/Common/banners/2.jpg');
//                $('#banner3').attr('src', 'Content/Images/Common/banners/3.jpg');
//                $('#banner4').attr('src', 'Content/Images/Common/banners/4.jpg');
//                $('#banner5').attr('src', 'Content/Images/Common/banners/5.jpg');
//            }
//        }
//    };
//    window.mobilecheck();
//    $(window).resize(function () {
//        var width = $(window).width();
//        window.mobilecheck = function () {
//            var check = false;
//            (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
//            if (check == true) {
//                if (window.matchMedia("(orientation: landscape)").matches) {
//                    /*Header*/
//                    $('.mobileheaderLandscape').css("display", "block");
//                    $('.mobileheaderPortrait').css("display", "none");
//                    $('.desktopheader').css("display", "none");
//                    $('#banner1M').css('height', '');
//                    $('#banner2M').css('height', '');
//                    $('#banner3M').css('height', '');
//                    $('#banner4M').css('height', '');
//                    $('#banner5M').css('height', '');

//                    $('.showdesktopslider').css("display", "block");
//                    $('.hidedesktopslider').css("display", "none");
//                    /*Banner*/
//                    $('#bannerContainerM').css("display", "block");
//                    $('#bannerContainerD').css("display", "none");
//                    $('.carouselindicatorsmobile').css("margin-bottom", "1rem");
//                    $(".trustpilot-widget").css("margin-bottom", "0%");
//                    $(".trustpilot-widget").css("margin-top", "0%");
//                    /*Footer*/
//                    $('.mobfooter').css("display", "none");
//                    $('.mobfooterL').css("display", "block");
//                    $('.footerback').css("display", "none");
//                    $('.desktopfooter').css("display", "none");
//                    $('.desktop_tab_footer').css("display", "none");
//                    $('.tabfooter').css("display", "none");
//                    if (width > 672) {
//                        $('#banner1M').attr('src', 'Content/Images/Common/banners/1_T_L.jpg');
//                        $('#banner2M').attr('src', 'Content/Images/Common/banners/2_T_L.jpg');
//                        $('#banner3M').attr('src', 'Content/Images/Common/banners/3_T_L.jpg');
//                        $('#banner4M').attr('src', 'Content/Images/Common/banners/4_T_L.jpg');
//                        $('#banner5M').attr('src', 'Content/Images/Common/banners/5_T_L.jpg');

//                    } else {
//                        $('#banner1M').attr('src', 'Content/Images/Common/banners/1_M_L.jpg');
//                        $('#banner2M').attr('src', 'Content/Images/Common/banners/2_M_L.jpg');
//                        $('#banner3M').attr('src', 'Content/Images/Common/banners/3_M_L.jpg');
//                        $('#banner4M').attr('src', 'Content/Images/Common/banners/4_M_L.jpg');
//                        $('#banner5M').attr('src', 'Content/Images/Common/banners/5_M_L.jpg');
//                    }
//                }
//                else if (window.matchMedia("(orientation: portrait)").matches) {
//                    /*Header*/
//                    $('.mobileheaderPortrait').css("display", "block");
//                    $('.mobileheaderLandscape').css("display", "none");
//                    $('.desktopheader').css("display", "none");
//                    $('#banner1M').css('height', '100vh');
//                    $('#banner2M').css('height', '100vh');
//                    $('#banner3M').css('height', '100vh');
//                    $('#banner4M').css('height', '100vh');
//                    $('#banner5M').css('height', '100vh');

//                    $('.showdesktopslider').css("display", "block");
//                    $('.hidedesktopslider').css("display", "none");
//                    /*Banner*/
//                    $('#bannerContainerM').css("display", "block");
//                    $('#bannerContainerD').css("display", "none");
//                    $('.carouselindicatorsmobile').css("margin-bottom", "40px");
//                    /*Footer*/
//                    $('.mobfooter').css("display", "block");
//                    $('.mobfooterL').css("display", "none");
//                    $('.footerback').css("display", "none");
//                    $('.desktopfooter').css("display", "none");
//                    $('.desktop_tab_footer').css("display", "none");
//                    $('.tabfooter').css("display", "none");
//                    $('#banner1M').attr('src', 'Content/Images/Common/banners/1_M.jpg');
//                    $('#banner2M').attr('src', 'Content/Images/Common/banners/2_M.jpg');
//                    $('#banner3M').attr('src', 'Content/Images/Common/banners/3_M.jpg');
//                    $('#banner4M').attr('src', 'Content/Images/Common/banners/4_M.jpg');
//                    $('#banner5M').attr('src', 'Content/Images/Common/banners/5_M.jpg');
//                }
//            }
//            else {
//                /*Header*/
//                $('.desktopheader').css("display", "block");
//                $('.mobileheaderPortrait').css("display", "none");
//                $('.mobileheaderLandscape').css("display", "none");
//                /*Banner*/
//                $("#bannerContainerD").css("display", "block");
//                $('#bannerContainerM').css("display", "none");
//                $('.showdesktopslider').css("display", "none");
//                $('.hidedesktopslider').css("display", "block");
//                /*Footer*/
//                $('.mobfooter').css("display", "none");
//                $('.mobfooterL').css("display", "none");
//                $('.footerback').css("display", "block");
//                $('.desktopfooter').css("display", "block");
//                $('.desktop_tab_footer').css("display", "block");
//                $('.tabfooter').css("display", "none");
//                if (width == 1200) {
//                    $('#banner1').attr('src', 'Content/Images/Common/banners/1_1200.jpg');
//                    $('#banner2').attr('src', 'Content/Images/Common/banners/2_1200.jpg');
//                    $('#banner3').attr('src', 'Content/Images/Common/banners/3_1200.jpg');
//                    $('#banner4').attr('src', 'Content/Images/Common/banners/4_1200.jpg');
//                    $('#banner5').attr('src', 'Content/Images/Common/banners/5_1200.jpg');
//                }
//                else if (width > 1200 && width <= 1280) {
//                    $('#banner1').attr('src', 'Content/Images/Common/banners/1_1280.jpg');
//                    $('#banner2').attr('src', 'Content/Images/Common/banners/2_1280.jpg');
//                    $('#banner3').attr('src', 'Content/Images/Common/banners/3_1280.jpg');
//                    $('#banner4').attr('src', 'Content/Images/Common/banners/4_1280.jpg');
//                    $('#banner5').attr('src', 'Content/Images/Common/banners/5_1280.jpg');
//                }
//                else if (width > 1280 && width <= 1366) {
//                    $('#banner1').attr('src', 'Content/Images/Common/banners/1_1366.jpg');
//                    $('#banner2').attr('src', 'Content/Images/Common/banners/2_1366.jpg');
//                    $('#banner3').attr('src', 'Content/Images/Common/banners/3_1366.jpg');
//                    $('#banner4').attr('src', 'Content/Images/Common/banners/4_1366.jpg');
//                    $('#banner5').attr('src', 'Content/Images/Common/banners/5_1366.jpg');
//                }
//                else if (width > 1366 && width <= 2200) {
//                    $('#banner1').attr('src', 'Content/Images/Common/banners/1_2200.jpg');
//                    $('#banner2').attr('src', 'Content/Images/Common/banners/2_2200.jpg');
//                    $('#banner3').attr('src', 'Content/Images/Common/banners/3_2200.jpg');
//                    $('#banner4').attr('src', 'Content/Images/Common/banners/4_2200.jpg');
//                    $('#banner5').attr('src', 'Content/Images/Common/banners/5_2200.jpg');
//                }
//                else if (width > 2200 && width <= 2530) {
//                    $('#banner1').attr('src', 'Content/Images/Common/banners/1_2530.jpg');
//                    $('#banner2').attr('src', 'Content/Images/Common/banners/2_2530.jpg');
//                    $('#banner3').attr('src', 'Content/Images/Common/banners/3_2530.jpg');
//                    $('#banner4').attr('src', 'Content/Images/Common/banners/4_2530.jpg');
//                    $('#banner5').attr('src', 'Content/Images/Common/banners/5_2530.jpg');
//                }
//                else if (width >= 768 && width < 1024) {
//                    $('.mobfooter').css("display", "none");
//                    $('.mobfooterL').css("display", "none");
//                    $('.footerback').css("display", "block");
//                    $('.desktopfooter').css("display", "none");
//                    $('.desktop_tab_footer').css("display", "block");
//                    $('.tabfooter').css("display", "block");
//                    $('#banner1').attr('src', '/Images/Common/banners/1_T.jpg');
//                    $('#banner2').attr('src', '/Images/Common/banners/2_T.jpg');
//                    $('#banner3').attr('src', '/Images/Common/banners/3_T.jpg');
//                    $('#banner4').attr('src', '/Images/Common/banners/4_T.jpg');
//                    $('#banner5').attr('src', '/Images/Common/banners/5_T.jpg');
//                }
//                else if (width >= 1024 && width <= 1366) {
//                    $('.mobfooter').css("display", "none");
//                    $('.mobfooterL').css("display", "none");
//                    $('.footerback').css("display", "block");
//                    $('.desktopfooter').css("display", "none");
//                    $('.desktop_tab_footer').css("display", "block");
//                    $('.tabfooter').css("display", "block");
//                    $('#banner1').attr('src', '/Images/Common/banners/1_T_L.jpg');
//                    $('#banner2').attr('src', '/Images/Common/banners/2_T_L.jpg');
//                    $('#banner3').attr('src', '/Images/Common/banners/3_T_L.jpg');
//                    $('#banner4').attr('src', '/Images/Common/banners/4_T_L.jpg');
//                    $('#banner5').attr('src', '/Images/Common/banners/5_T_L.jpg');
//                }
//                else {
//                    $('#banner1').attr('src', 'Content/Images/Common/banners/1.jpg');
//                    $('#banner2').attr('src', 'Content/Images/Common/banners/2.jpg');
//                    $('#banner3').attr('src', 'Content/Images/Common/banners/3.jpg');
//                    $('#banner4').attr('src', 'Content/Images/Common/banners/4.jpg');
//                    $('#banner5').attr('src', 'Content/Images/Common/banners/5.jpg');
//                }
//            }
//        };
//        window.mobilecheck();
//    });
//});

var bannerDetailsJSON = {
    "banners": [
        {
            "device": "desktop", "orientation": "none",
            "bannerDetails": [
                { "minWidth": 1200, "maxWidth": 1200, "bannerImage": "_1200" },
                { "minWidth": 1200, "maxWidth": 1280, "bannerImage": "_1280" },
                { "minWidth": 1281, "maxWidth": 1366, "bannerImage": "_1366" },
                { "minWidth": 1367, "maxWidth": 1920, "bannerImage": "_1920" },
                { "minWidth": 1921, "maxWidth": 2200, "bannerImage": "_2200" },
                { "minWidth": 2201, "maxWidth": 4000, "bannerImage": "_2530" }
            ]
        },
        {
            "device": "tablet", "orientation": "portrait",
            "bannerDetails": [
                { "minWidth": 768, "maxWidth": 1366, "bannerImage": "_T" }
            ]
        },
        {
            "device": "tablet", "orientation": "landscape",
            "bannerDetails": [
                { "minWidth": 768, "maxWidth": 1366, "bannerImage": "_T_L" }
            ]
        },
        {
            "device": "mobile", "orientation": "portrait",
            "bannerDetails": [
                { "minWidth": 300, "maxWidth": 1000, "bannerImage": "_M" }
            ]
        },
        {
            "device": "mobile", "orientation": "landscape",
            "bannerDetails": [
                { "minWidth": 300, "maxWidth": 672, "bannerImage": "_M_L" },
                { "minWidth": 673, "maxWidth": 1000, "bannerImage": "_T_L" }
            ]
        }
    ]
};


function ShowMobileDivs(width, isMobileDevice) {
    if (isMobileDevice) {
        var orientation = (window.matchMedia("(orientation: landscape)").matches) ? "landscape" : "portrait";

        $('.desktopheader').css("display", "none");
        $('#bannerContainerM').css("display", "block");
        $('#bannerContainerD').css("display", "none");
        $('.footerback').css("display", "none");
        $('.desktopfooter').css("display", "none");
        $('.desktop_tab_footer').css("display", "none");
        $('.tabfooter').css("display", "none");
        $('.hideDestopCards').css("display", "none");
        $('.ShowMobileCards').css('display', 'block');
        $('.mobilefooterpart').css("display", "block");
        $('.hideDesktopSocial').css("display", "none");
        $('.hideMobileSocial').css("display", "block");
        $('.hideaboutdesktop').css("display", "none");
        $('.showaboutmobile').css("display", "block");
        $('.mobland').addClass('col-md-4').removeClass('col-md-12');
        $('.hidedesktopslider').css("display", "none");
        $('.showdesktopslider').css("display", "block");
        $('.poolheatingland_m').attr('src', '/Content/Images/Common/Home/1_pool-heating-FE_m.jpg');
        $('.wifiland_m').attr('src', '/Content/Images/Common/Home/2_wifi-FE_m.jpg');
        $('.airconland_m').attr('src', '/Content/Images/Common/Home/3_air-con-FE_m.jpg');
        $('.resortstaffland_m').attr('src', '/Content/Images/Common/Home/4_resort-staff-FE_m.jpg');
        $('.privatepoolland_m').attr('src', '/Content/Images/Common/Home/5_private-pool-FE_m.jpg');
        $('.tabletennisland_m').attr('src', '/Content/Images/Common/Home/6_table-tennis-FE_m.jpg');
        $('.pooltableland_m').attr('src', '/Content/Images/Common/Home/7_pool-table-FE_m.jpg');
        $('.bbqland_m').attr('src', '/Content/Images/Common/Home/8_bbq-FE_m.jpg');
        $('.dishwasherland_m').attr('src', '/Content/Images/Common/Home/12_Dishwasher-microwave-FE_m.jpg');
        $('.starterpackland_m').attr('src', '/Content/Images/Common/Home/13_starter-pack-FE_m.jpg');
        $('.towelland_m').attr('src', '/Content/Images/Common/Home/14_extras_towel_FE_m.jpg');
        $('#lowdeposit_m').attr('src', '/Content/Images/Common/Home/lowdeposit.jpg');
        $('#pricematch_m').attr('src', '/Content/Images/Common/Home/pricematch.jpg');

        if (orientation == "landscape") {
            $('#banner1M').css('height', '');
            $('#banner2M').css('height', '');
            $('#banner3M').css('height', '');
            $('#banner4M').css('height', '');
            $('#banner5M').css('height', '');
            $('.carouselindicatorsmobile').css("margin-bottom", "1rem");
            $('.mobileheaderLandscape').css("display", "block");
            $('.mobileheaderPortrait').css("display", "none");
            $(".trustpilot-widget").css("margin-bottom", "-1%");
            $(".trustpilot-widget").css("margin-top", "-2%");
            $('.mobfooter').css("display", "none");
            $('.mobfooterL').css("display", "block");
            $('.portraitfindout').attr('style', 'top: -2%;');
            $('#R2MB1Img').attr('src', '/Content/Images/Common/Home/bigvilla_M_L.jpg');
            $('#R2MB2Img').attr('src', '/Content/Images/Common/Home/no-time-to-wait_M_L.jpg');
            $('#R3MB1Img').attr('src', '/Content/Images/Common/Home/TVadvert_M_L.jpg');
            $('#R3MB2Img').attr('src', '/Content/Images/Common/Home/destination_M_L.jpg');
            $('#addedextralandscape').attr('src', '/Content/Images/Common/Home/addedextras_M_L.jpg');
            $('#seaviewvillas_m').attr('src', '/Content/Images/Common/Home/seaviewvillas_M_L.jpg');
            $('#rowpoolheating_m').attr('src', '/Content/Images/Common/Home/rowpoolheating_M_L.jpg');
            $('#veryvillaplus_m').attr('src', '/Content/Images/Common/Home/veryvillaplus_M_L.jpg');
            $('#aboutlandscape').attr('src', '/Content/Images/Common/Home/aboutvillaplus_M_L.jpg');
            $('.postionrelative').css('display', 'none');
            $('.mobland').addClass('col-sm-12').removeClass('col-sm-4');
            $('#textCarouselMob').css('width', '80%');
            if (width > 672) {
                $('.container').attr('style', 'width:' + width + 'px !important');
                $('.container').attr('style', 'max-width:' + width + 'px !important');
                $('.hideDesktopadded').css("display", "none");
                $('.freeextratext1').css("color", "#f37423");
                $('.freeextratext2').css("display", "none");
                $('.freeextratext3').css("color", "black");
                $('.mobilevideodivmrg').css("display", "block");
                $(".mobland").css("flex", "0 0 100% !important");
                $(".mobland").css("max-width", "100% !important");
                $(".bannertopmgr").css("margin-top", "10%");
                $('.mobland').addClass('col-md-12').removeClass('col-md-4');
                $('#textCarouselMob').css('width', '70%');
            }
        }
        else {
            $('.mobileheaderPortrait').css("display", "block");
            $('.mobileheaderLandscape').css("display", "none");

            $('#banner1M').css('height', '100vh');
            $('#banner2M').css('height', '100vh');
            $('#banner3M').css('height', '100vh');
            $('#banner4M').css('height', '100vh');
            $('#banner5M').css('height', '100vh');
            $('.mobfooter').css("display", "block");
            $('.mobfooterL').css("display", "none");
            $('.carouselindicatorsmobile').css("margin-bottom", "40px");
            $('#aboutlandscape').attr('src', '/Content/Images/Common/Home/aboutvillaplus_M.jpg');
            $('#addedextralandscape').attr('src', '/Content/Images/Common/Home/addedextra_m.jpg');
            $('.portraitfindout').attr('style', 'justify-content: center !important;top: 5%;');
            $(".trustpilot-widget").css("margin-bottom", "-4%");
            $(".trustpilot-widget").css("margin-top", "-2%");
            $('#R2MB1Img').attr('src', '/Content/Images/Common/Home/bigvilla_M.jpg');
            $('#R2MB2Img').attr('src', '/Content/Images/Common/Home/notimetowait_m.jpg');
            $('#R3MB1Img').attr('src', '/Content/Images/Common/Home/TVadvert_M.jpg');
            $('#R3MB2Img').attr('src', '/Content/Images/Common/Home/destination_M.jpg');
            $('#seaviewvillas_m').attr('src', '/Content/Images/Common/Home/seaviewvillas_m.jpg');
            $('#rowpoolheating_m').attr('src', '/Content/Images/Common/Home/rowpoolheating_m.jpg');
            $('#veryvillaplus_m').attr('src', '/Content/Images/Common/Home/veryvillaplus_m.jpg');
            $('.postionrelative').css('display', 'block');
            $('.mobland').addClass('col-sm-4').removeClass('col-sm-12');
            $('#textCarouselMob').css('width', '108%');
            $('#textCarouselMob').css('padding-left', '5px');
            $('#textCarouselMob').css('padding-right', '5px');
            $('#textCarouselMob').css('padding-top', '10px');
            $('#textCarouselMob').css('padding-bottom', '10px');
        }
    }
    else {
        $('.desktopheader').css("display", "block");
        $('.mobileheaderPortrait').css("display", "none");
        $('.mobileheaderLandscape').css("display", "none");
        $("#bannerContainerD").css("display", "block");
        $('#bannerContainerM').css("display", "none");
        $('.mobfooter').css("display", "none");
        $('.mobfooterL').css("display", "none");
        $('.footerback').css("display", "block");
        $('.desktopfooter').css("display", "block");
        $('.desktop_tab_footer').css("display", "block");
        $('.tabfooter').css("display", "none");
        $('.hideDestopCards').css("display", "flex");
        $('.ShowMobileCards').css('display', 'none');
        $('.hideDesktopSocial').css("display", "block");
        $('.hideMobileSocial').css("display", "none");
        $('.hideaboutdesktop').css("display", "block");
        $('.showaboutmobile').css("display", "none");
        $('.hidedesktopslider').css("display", "block");
        $('.showdesktopslider').css("display", "none");
        $('#addedextradesktop').attr('src', '/Content/Images/Common/Home/addedextra.jpg');
        $('#aboutdesktop').attr('src', '/Content/Images/Common/Home/aboutvillaplus.jpg');
        $('#seaviewvillas_d').attr('src', '/Content/Images/Common/Home/seaviewvillas.jpg');
        $('#rowpoolheating_d').attr('src', '/Content/Images/Common/Home/rowpoolheating.jpg');
        $('#veryvillaplus_d').attr('src', '/Content/Images/Common/Home/veryvillaplus.jpg');
        $('.poolheatingland').attr('src', '/Content/Images/Common/Home/1_pool-heating-FE.jpg');
        $('.wifiland').attr('src', '/Content/Images/Common/Home/2_wifi-FE.jpg');
        $('.airconland').attr('src', '/Content/Images/Common/Home/3_air-con-FE.jpg');
        $('.resortstaffland').attr('src', '/Content/Images/Common/Home/4_resort-staff-FE.jpg');
        $('.privatepoolland').attr('src', '/Content/Images/Common/Home/5_private-pool-FE.jpg');
        $('.tabletennisland').attr('src', '/Content/Images/Common/Home/6_table-tennis-FE.jpg');
        $('.pooltableland').attr('src', '/Content/Images/Common/Home/7_pool-table-FE.jpg');
        $('.bbqland').attr('src', '/Content/Images/Common/Home/8_bbq-FE.jpg');
        $('.dishwasherland').attr('src', '/Content/Images/Common/Home/12_Dishwasher-microwave-FE.jpg');
        $('.starterpackland').attr('src', '/Content/Images/Common/Home/13_starter-pack-FE.jpg');
        $('.towelland').attr('src', '/Content/Images/Common/Home/14_extras_towel_FE.jpg');
        $('#lowdeposit').attr('src', '/Content/Images/Common/Home/lowdeposit.jpg');
        $('#pricematch').attr('src', '/Content/Images/Common/Home/pricematch.jpg');
    }
}

$(function () {
    var width = $(window).width();
    window.mobilecheck = function () {
        var isMobile = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) isMobile = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return isMobile;
    };
    var bannerDetailsJSONCount = bannerDetailsJSON.banners.length;
    var found = false;
    var isMobileDevice = window.mobilecheck();

    ShowMobileDivs(width, isMobileDevice);

    for (var i = 0; i < bannerDetailsJSONCount; i++) {
        var tempBannerDetails = bannerDetailsJSON.banners[i].bannerDetails;
        var bannerDetailsCount = tempBannerDetails.length;
        for (var j = 0; j < bannerDetailsCount; j++) {
            if (isMobileDevice) {
                var orientation = (window.matchMedia("(orientation: landscape)").matches) ? "landscape" : "portrait";

                var minWidth = tempBannerDetails[j].minWidth;
                var maxWidth = tempBannerDetails[j].maxWidth;

                if (width > minWidth && width <= maxWidth && orientation == bannerDetailsJSON.banners[i].orientation) {
                    $('#banner1M').attr('src', '/Content/Images/Common/banners/1' + tempBannerDetails[j].bannerImage + '.jpg');
                    $('#banner2M').attr('src', '/Content/Images/Common/banners/2' + tempBannerDetails[j].bannerImage + '.jpg');
                    $('#banner3M').attr('src', '/Content/Images/Common/banners/3' + tempBannerDetails[j].bannerImage + '.jpg');
                    $('#banner4M').attr('src', '/Content/Images/Common/banners/4' + tempBannerDetails[j].bannerImage + '.jpg');
                    $('#banner5M').attr('src', '/Content/Images/Common/banners/5' + tempBannerDetails[j].bannerImage + '.jpg');
                    found = true;
                }
            }
            else {
                var minWidth = tempBannerDetails[j].minWidth;
                var maxWidth = tempBannerDetails[j].maxWidth;

                if (width > minWidth && width <= maxWidth) {
                    $('#banner1').attr('src', '/Content/Images/Common/banners/1' + tempBannerDetails[j].bannerImage + '.jpg');
                    $('#banner2').attr('src', '/Content/Images/Common/banners/2' + tempBannerDetails[j].bannerImage + '.jpg');
                    $('#banner3').attr('src', '/Content/Images/Common/banners/3' + tempBannerDetails[j].bannerImage + '.jpg');
                    $('#banner4').attr('src', '/Content/Images/Common/banners/4' + tempBannerDetails[j].bannerImage + '.jpg');
                    $('#banner5').attr('src', '/Content/Images/Common/banners/5' + tempBannerDetails[j].bannerImage + '.jpg');
                    found = true;
                }
            }
        }
        if (found) break;
    }

    $(window).resize(function () {
        var width = $(window).width();
        window.mobilecheck = function () {
            var isMobile = false;
            (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) isMobile = true; })(navigator.userAgent || navigator.vendor || window.opera);
            return isMobile;
        };

        var bannerDetailsJSONCount = bannerDetailsJSON.banners.length;
        var found = false;
        var isMobileDevice = window.mobilecheck();

        ShowMobileDivs(width, isMobileDevice);

        for (var i = 0; i < bannerDetailsJSONCount; i++) {
            var tempBannerDetails = bannerDetailsJSON.banners[i].bannerDetails;
            var bannerDetailsCount = tempBannerDetails.length;
            for (var j = 0; j < bannerDetailsCount; j++) {
                if (isMobileDevice) {
                    var orientation = (window.matchMedia("(orientation: landscape)").matches) ? "landscape" : "portrait";

                    var minWidth = tempBannerDetails[j].minWidth;
                    var maxWidth = tempBannerDetails[j].maxWidth;

                    if (width > minWidth && width <= maxWidth && orientation == bannerDetailsJSON.banners[i].orientation) {
                        $('#banner1M').attr('src', '/Content/Images/Common/banners/1' + tempBannerDetails[j].bannerImage + '.jpg');
                        $('#banner2M').attr('src', '/Content/Images/Common/banners/2' + tempBannerDetails[j].bannerImage + '.jpg');
                        $('#banner3M').attr('src', '/Content/Images/Common/banners/3' + tempBannerDetails[j].bannerImage + '.jpg');
                        $('#banner4M').attr('src', '/Content/Images/Common/banners/4' + tempBannerDetails[j].bannerImage + '.jpg');
                        $('#banner5M').attr('src', '/Content/Images/Common/banners/5' + tempBannerDetails[j].bannerImage + '.jpg');
                        found = true;
                    }
                }
                else {
                    var minWidth = tempBannerDetails[j].minWidth;
                    var maxWidth = tempBannerDetails[j].maxWidth;

                    if (width > minWidth && width <= maxWidth) {
                        $('#banner1').attr('src', '/Content/Images/Common/banners/1' + tempBannerDetails[j].bannerImage + '.jpg');
                        $('#banner2').attr('src', '/Content/Images/Common/banners/2' + tempBannerDetails[j].bannerImage + '.jpg');
                        $('#banner3').attr('src', '/Content/Images/Common/banners/3' + tempBannerDetails[j].bannerImage + '.jpg');
                        $('#banner4').attr('src', '/Content/Images/Common/banners/4' + tempBannerDetails[j].bannerImage + '.jpg');
                        $('#banner5').attr('src', '/Content/Images/Common/banners/5' + tempBannerDetails[j].bannerImage + '.jpg');
                        found = true;
                    }
                }
            }
            if (found) break;
        }

    });

    //if (width == 1200) {
    //    $('#banner1').attr('src', '/Images/Common/banners/1_1200.jpg');
    //    $('#banner2').attr('src', '/Images/Common/banners/2_1200.jpg');
    //    $('#banner3').attr('src', '/Images/Common/banners/3_1200.jpg');
    //    $('#banner4').attr('src', '/Images/Common/banners/4_1200.jpg');
    //    $('#banner5').attr('src', '/Images/Common/banners/5_1200.jpg');
    //}
    //else if (width > 1200 && width <= 1280) {
    //    $('#banner1').attr('src', '/Images/Common/banners/1_1280.jpg');
    //    $('#banner2').attr('src', '/Images/Common/banners/2_1280.jpg');
    //    $('#banner3').attr('src', '/Images/Common/banners/3_1280.jpg');
    //    $('#banner4').attr('src', '/Images/Common/banners/4_1280.jpg');
    //    $('#banner5').attr('src', '/Images/Common/banners/5_1280.jpg');
    //}
    //else if (width > 1280 && width <= 1366) {
    //    $('#banner1').attr('src', '/Images/Common/banners/1_1366.jpg');
    //    $('#banner2').attr('src', '/Images/Common/banners/2_1366.jpg');
    //    $('#banner3').attr('src', '/Images/Common/banners/3_1366.jpg');
    //    $('#banner4').attr('src', '/Images/Common/banners/4_1366.jpg');
    //    $('#banner5').attr('src', '/Images/Common/banners/5_1366.jpg');
    //}
    //else if (width > 1366 && width <= 2200) {
    //    $('#banner1').attr('src', '/Images/Common/banners/1_2200.jpg');
    //    $('#banner2').attr('src', '/Images/Common/banners/2_2200.jpg');
    //    $('#banner3').attr('src', '/Images/Common/banners/3_2200.jpg');
    //    $('#banner4').attr('src', '/Images/Common/banners/4_2200.jpg');
    //    $('#banner5').attr('src', '/Images/Common/banners/5_2200.jpg');
    //}
    //else if (width > 2200 && width <= 2530) {
    //    $('#banner1').attr('src', '/Images/Common/banners/1_2530.jpg');
    //    $('#banner2').attr('src', '/Images/Common/banners/2_2530.jpg');
    //    $('#banner3').attr('src', '/Images/Common/banners/3_2530.jpg');
    //    $('#banner4').attr('src', '/Images/Common/banners/4_2530.jpg');
    //    $('#banner5').attr('src', '/Images/Common/banners/5_2530.jpg');
    //}
    //else if (width >= 768 && width <= 1024) {
    //    $('#banner1').attr('src', '/Images/Common/banners/1_T.jpg');
    //    $('#banner2').attr('src', '/Images/Common/banners/2_T.jpg');
    //    $('#banner3').attr('src', '/Images/Common/banners/3_T.jpg');
    //    $('#banner4').attr('src', '/Images/Common/banners/4_T.jpg');
    //    $('#banner5').attr('src', '/Images/Common/banners/5_T.jpg');
    //}
    //else if (width < 768) {
    //    $('#banner1M').attr('src', '/Images/Common/banners/1_M.jpg');
    //    $('#banner2M').attr('src', '/Images/Common/banners/3_M.jpg');
    //    $('#banner3M').attr('src', '/Images/Common/banners/2_M.jpg');
    //    $('#banner4M').attr('src', '/Images/Common/banners/4_M.jpg');
    //    $('#banner5M').attr('src', '/Images/Common/banners/5_M.jpg');
    //    $('#addedextrasmobile').attr('src', '/Images/Common/Home/addedextra_m.jpg');
    //    $('#R2MB1Img').attr('src', '/Images/Common/Home/bigvilla_m.jpg');
    //    $('#R2MB2Img').attr('src', '/Images/Common/Home/notimetowait_m.jpg');
    //    $('#R3MB1Img').attr('src', '/Images/Common/Home/TVadvert_m.jpg');
    //    $('#R3MB2Img').attr('src', '/Images/Common/Home/destination_m.jpg');
    //    $('#mediumbanner1').attr('src', '/Images/Common/Home/seaviewvillas_m.jpg');
    //    $('#mediumbanner2').attr('src', '/Images/Common/Home/rowpoolheating_m.jpg');
    //    $('#mediumbanner3').attr('src', '/Images/Common/Home/veryvillaplus_m.jpg');
    //    $('#slide1').attr('src', '/Images/Common/Home/1_pool-heating-FE_m.jpg');
    //    $('#slide2').attr('src', '/Images/Common/Home/2_wifi-FE_m.jpg');
    //    $('#slide3').attr('src', '/Images/Common/Home/3_air-con-FE_m.jpg');
    //    $('#slide4').attr('src', '/Images/Common/Home/4_resort-staff-FE_m.jpg');
    //    $('#slide5').attr('src', '/Images/Common/Home/5_private-pool-FE_m.jpg');
    //    $('#slide6').attr('src', '/Images/Common/Home/6_table-tennis-FE_m.jpg');
    //    $('#slide7').attr('src', '/Images/Common/Home/7_pool-table-FE_m.jpg');
    //    $('#slide8').attr('src', '/Images/Common/Home/8_bbq-FE_m.jpg');
    //    $('#slide9').attr('src', '/Images/Common/Home/12_Dishwasher-microwave-FE_m.jpg');
    //    $('#slide10').attr('src', '/Images/Common/Home/13_starter-pack-FE_m.jpg');
    //    $('#slide11').attr('src', '/Images/Common/Home/14_extras_towel_FE_m.jpg');
    //    $('#facebookm').attr('src', '/Images/Common/Home/Facebook.jpg');
    //    $('#tweetm').attr('src', '/Images/Common/Home/tweet.jpg');
    //    $('#instam').attr('src', '/Images/Common/Home/insta.jpg');
    //    $('#blogm').attr('src', '/Images/Common/Home/blog.jpg');
    //    $('#youtubem').attr('src', '/Images/Common/Home/YouTube.jpg');
    //    $('#abboutvillaplusmobile').attr('src', '/Images/Common/Home/aboutvillaplus_m.jpg');
    //    $('#britishimg').attr('src', '/Images/Common/Home/brtish-1.png');
    //}
    //else {
    //    $('#banner1').attr('src', '/Images/Common/banners/1.jpg');
    //    $('#banner2').attr('src', '/Images/Common/banners/2.jpg');
    //    $('#banner3').attr('src', '/Images/Common/banners/3.jpg');
    //    $('#banner4').attr('src', '/Images/Common/banners/4.jpg');
    //    $('#banner5').attr('src', '/Images/Common/banners/5.jpg');
    //}

    //$(window).resize(function () {
    //    var width = $(window).width();
    //    $('#R2MB1Img').attr('src', '/Content/Images/Common/Home/bigvilla.jpg');
    //    $('#R2MB2Img').attr('src', '/Content/Images/Common/Home/notimetowait.jpg');
    //    $('#R3MB1Img').attr('src', '/Content/Images/Common/Home/TVadvert.jpg');
    //    $('#R3MB2Img').attr('src', '/Content/Images/Common/Home/destination.jpg');
    //    if (width < 1200 && width > 1024) {
    //        $('#banner1').attr('src', '/Content/Images/Common/banners/1_1200.jpg');
    //        $('#banner2').attr('src', '/Content/Images/Common/banners/2_1200.jpg');
    //        $('#banner3').attr('src', '/Content/Images/Common/banners/3_1200.jpg');
    //        $('#banner4').attr('src', '/Content/Images/Common/banners/4_1200.jpg');
    //        $('#banner5').attr('src', '/Content/Images/Common/banners/5_1200.jpg');
    //    }
    //    else if (width > 1200 && width <= 1280) {
    //        $('#banner2').attr('src', '/Content/Images/Common/banners/2_1280.jpg');
    //        $('#banner1').attr('src', '/Content/Images/Common/banners/1_1280.jpg');
    //        $('#banner3').attr('src', '/Content/Images/Common/banners/3_1280.jpg');
    //        $('#banner4').attr('src', '/Content/Images/Common/banners/4_1280.jpg');
    //        $('#banner5').attr('src', '/Content/Images/Common/banners/5_1280.jpg');
    //    }
    //    else if (width > 1280 && width <= 1366) {
    //        $('#banner2').attr('src', '/Content/Images/Common/banners/2_1366.jpg');
    //        $('#banner1').attr('src', '/Content/Images/Common/banners/1_1366.jpg');
    //        $('#banner3').attr('src', '/Content/Images/Common/banners/3_1366.jpg');
    //        $('#banner4').attr('src', '/Content/Images/Common/banners/4_1366.jpg');
    //        $('#banner5').attr('src', '/Content/Images/Common/banners/5_1366.jpg');
    //    }
    //    else if (width > 1366 && width <= 2200) {
    //        $('#banner1').attr('src', '/Content/Images/Common/banners/1_2200.jpg');
    //        $('#banner2').attr('src', '/Content/Images/Common/banners/2_2200.jpg');
    //        $('#banner3').attr('src', '/Content/Images/Common/banners/3_2200.jpg');
    //        $('#banner4').attr('src', '/Content/Images/Common/banners/4_2200.jpg');
    //        $('#banner5').attr('src', '/Content/Images/Common/banners/5_2200.jpg');
    //    }
    //    else if (width > 2200 && width <= 2530) {
    //        $('#banner1').attr('src', '/Content/Images/Common/banners/1_2530.jpg');
    //        $('#banner2').attr('src', '/Content/Images/Common/banners/2_2530.jpg');
    //        $('#banner3').attr('src', '/Content/Images/Common/banners/3_2530.jpg');
    //        $('#banner4').attr('src', '/Content/Images/Common/banners/4_2530.jpg');
    //        $('#banner5').attr('src', '/Content/Images/Common/banners/5_2530.jpg');
    //    }
    //    else if (width >= 768 && width <= 1024) {
    //        $('#banner1').attr('src', '/Content/Images/Common/banners/1_T.jpg');
    //        $('#banner2').attr('src', '/Content/Images/Common/banners/2_T.jpg');
    //        $('#banner3').attr('src', '/Content/Images/Common/banners/3_T.jpg');
    //        $('#banner4').attr('src', '/Content/Images/Common/banners/4_T.jpg');
    //        $('#banner5').attr('src', '/Content/Images/Common/banners/5_T.jpg');
    //    }
    //    else if (width < 768) {
    //        $('#banner1M').attr('src', '/Content/Images/Common/banners/1_M.jpg');
    //        $('#banner2M').attr('src', '/Content/Images/Common/banners/3_M.jpg');
    //        $('#banner3M').attr('src', '/Content/Images/Common/banners/2_M.jpg');
    //        $('#banner4M').attr('src', '/Content/Images/Common/banners/4_M.jpg');
    //        $('#banner5M').attr('src', '/Content/Images/Common/banners/5_M.jpg');
    //        $('#addedextrasmobile').attr('src', '/Content/Images/Common/Home/addedextra_m.jpg');
    //        $('#R2MB1Img').attr('src', '/Content/Images/Common/Home/bigvilla_m.jpg');
    //        $('#R2MB2Img').attr('src', '/Content/Images/Common/Home/notimetowait_m.jpg');
    //        $('#R3MB1Img').attr('src', '/Content/Images/Common/Home/TVadvert_m.jpg');
    //        $('#R3MB2Img').attr('src', '/Content/Images/Common/Home/destination_m.jpg');
    //        $('#mediumbanner1').attr('src', '/Content/Images/Common/Home/seaviewvillas_m.jpg');
    //        $('#mediumbanner2').attr('src', '/Content/Images/Common/Home/rowpoolheating_m.jpg');
    //        $('#mediumbanner3').attr('src', '/Content/Images/Common/Home/veryvillaplus_m.jpg');
    //        $('#slide1').attr('src', '/Content/Images/Common/Home/1_pool-heating-FE_m.jpg');
    //        $('#slide2').attr('src', '/Content/Images/Common/Home/2_wifi-FE_m.jpg');
    //        $('#slide3').attr('src', '/Content/Images/Common/Home/3_air-con-FE_m.jpg');
    //        $('#slide4').attr('src', '/Content/Images/Common/Home/4_resort-staff-FE_m.jpg');
    //        $('#slide5').attr('src', '/Content/Images/Common/Home/5_private-pool-FE_m.jpg');
    //        $('#slide6').attr('src', '/Content/Images/Common/Home/6_table-tennis-FE_m.jpg');
    //        $('#slide7').attr('src', '/Content/Images/Common/Home/7_pool-table-FE_m.jpg');
    //        $('#slide8').attr('src', '/Content/Images/Common/Home/8_bbq-FE_m.jpg');
    //        $('#slide9').attr('src', '/Content/Images/Common/Home/12_Dishwasher-microwave-FE_m.jpg');
    //        $('#slide10').attr('src', '/Content/Images/Common/Home/13_starter-pack-FE_m.jpg');
    //        $('#slide11').attr('src', '/Content/Images/Common/Home/14_extras_towel_FE_m.jpg');
    //        $('#facebookm').attr('src', '/Content/Images/Common/Home/Facebook.jpg');
    //        $('#tweetm').attr('src', '/Content/Images/Common/Home/tweet.jpg');
    //        $('#instam').attr('src', '/Content/Images/Common/Home/insta.jpg');
    //        $('#blogm').attr('src', '/Content/Images/Common/Home/blog.jpg');
    //        $('#youtubem').attr('src', '/Content/Images/Common/Home/YouTube.jpg');
    //        $('#abboutvillaplusmobile').attr('src', '/Content/Images/Common/Home/aboutvillaplus_m.jpg');
    //        $('#britishimg').attr('src', '/Content/Images/Common/Home/brtish-1.png');
    //    }
    //    else {
    //        $('#banner1').attr('src', '/Content/Images/Common/banners/1.jpg');
    //        $('#banner2').attr('src', '/Content/Images/Common/banners/2.jpg');
    //        $('#banner3').attr('src', '/Content/Images/Common/banners/3.jpg');
    //        $('#banner4').attr('src', '/Content/Images/Common/banners/4.jpg');
    //        $('#banner5').attr('src', '/Content/Images/Common/banners/5.jpg');
    //    }
    //});



});
// End Mobile Landscape 