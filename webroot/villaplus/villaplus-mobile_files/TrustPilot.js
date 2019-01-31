function GetTrustPilotData() {
    if (navigator.appName) {
        $(".box_white").removeClass("home_TrustPilot");
    }

    var date;
    var Heading;
    var Desc;
    var RatingCandidateName;
    var RatingUrl;
    var ReviewCount;
    $.ajax({
        //url: '//widget.trustpilot.com/bootstrap/v5/tp.widget.sync.bootstrap.min.js',
        url: '/Scripts/trustpilot/tp.widget.sync.bootstrap.min.js',
        dataType: 'jsonp',
        jsonp: false,
        jsonpCallback: 'trustpilot_jsonp_callback',
        success: function (data, status) {
            var html = '';
            ReviewCount = data.ReviewCount.Total;
            for (var i in data.Reviews) {
                var j = data.Reviews[i].TrustScore.Stars;
                if (j === 5) {
                    date = data.Reviews[i].Created.Human;
                    date = date.substring(0, 6);
                    Heading = data.Reviews[i].Title;
                    Desc = data.Reviews[i].Content;
                    RatingCandidateName = data.Reviews[i].User.Name;
                    RatingUrl = data.Reviews[i].Url;

                    if (Heading && (Heading = $.trim(Heading)) && Desc && (Desc = $.trim(Desc))) {
                        BindControls();
                        break;
                    }

                }
            }

        },
        error: function (XHR, txtStatus, errThrown) {
            var pageURL = window.location.protocol + "//" + window.location.host + "/webmethod.aspx/GetTrustPilotFeedback";
            $.ajax({
                type: "POST",
                async: false,
                url: pageURL,
                data: '',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    var data = JSON.parse(response.d);
                    date = data.date;
                    date = date.substring(0, 6);
                    Heading = data.heading;
                    Desc = data.desc;
                    RatingCandidateName = data.candidateName;
                    RatingUrl = data.readMore;

                    BindControls();

                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    //alert('status: ' + textStatus + '\n' + xmlHttpRequest.responseText);
                }
            });

        }
    });

    function BindControls() {

        $('#MainContent_TrustPilot_lblDatePilot').text(date);
        $('#MainContent_TrustPilot_lblRatingCandidateNamePilot').text(RatingCandidateName);
        if (Heading != '' && Heading.length > 32) {
            Heading = Heading.substring(0, 32) + '...';
            $('#MainContent_TrustPilot_lblHeadingPilot').text(Heading);
        }
        else if (Heading != '' && Heading.length <= 32) {
            $('#MainContent_TrustPilot_lblHeadingPilot').text(Heading);
        }
        if (Desc != '' && Desc.length > 128) {
            Desc = Desc.substring(0, 128) + '...';
            $('#MainContent_TrustPilot_lblDescPilot').text(Desc);
        }
        else if (Desc != '' && Desc.length <= 128) {
            $('#MainContent_TrustPilot_lblDescPilot').text(Desc);
        }
        $('#MainContent_TrustPilot_ReadMoreTP').attr("href", RatingUrl);

        $('#MainContent_TrustPilot_lblReviewCount').text(ReviewCount);

    }


}