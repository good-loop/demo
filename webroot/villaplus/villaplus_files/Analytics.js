function AnalyticsPageTag() {
    this.PageID = null;
    this.PageCat = null;
    this.PageSTerm = null;
    this.PageSResult = null;
    this.Attribute = null;
}
var AnalyticsPageTagsParam = new AnalyticsPageTag();

var ProductPageElements = new Array();
ProductPageElements = ["_ddTours", "_lnkFloorPlan", "_btnAvailPrice", "_lnkViewOnMap", "aAvailTab", "_lnkLocationMap", "imgStylisedFloorPlan", "_imgStylisedLocationMap"];

var FuncToCall;

//Will Bind All the Elements on Page
function CMBindElements(Optional) {
    try {
        for (var i = 0; i < getElementsID.length; i++) {

            var CMTempElementID = getElementsID[i][0];

            //Check if the element exists on Page
            if (document.getElementById(CMTempElementID) != null || CMTempElementID == "MainContent_pgSizeList_pgsize" || CMTempElementID == "_lnkVillaonlymsg_" || CMTempElementID == "largeImage1") {

                //Function to bind depending upon Analytics Type
                if (getElementsID[i][6] == 1) FuncToCall = CMProcessBinding;
                else if (getElementsID[i][6] == 2) FuncToCall = GAProcessBinding;

                //Bind event based on element
                switch (getElementsID[i][2].toLowerCase()) {

                    //For DropDowns
                    case "dropdown":
                        $('#' + CMTempElementID).live("change", FuncToCall);
                        break;

                    //For HoverBox
                    case "hoverbox":
                        $('#' + CMTempElementID).live("mouseover", FuncToCall);
                        break;

                    //For CheckBox
                    case "checkbox":
                        CMBindCheckBox(CMTempElementID);
                        break;

                    //For Radio Buttons
                    case "radio button":
                        CMBindRadioButton(CMTempElementID);
                        break;

                    //For Pagination
                    case "page size list":
                        CMBindPageSizeList(CMTempElementID);
                        break;

                    //For Price Overlay on Search Result
                    case "link":
                        if (CMReturnIndex(CMTempElementID, "_lnkVillaonlymsg_")) {
                            $('[id*=lvVillaInfo_villaCtrl_0_lnkVillaonlymsg_]').live("click", FuncToCall);
                        }
                        //For PDF download
                        else if (CMReturnIndex(CMTempElementID, "lnkDownloads")) {
                            $('#' + CMTempElementID).live("click", FuncToCall);
                        }
                        break;

                    //For View Tours on Product Page
                    case "view tours":
                        CMBindViewTours(CMTempElementID);
                        break;

                    //For Tabs on Product Page
                    case "tab":
                        $('#' + CMTempElementID).live("tabsselect", FuncToCall);
                        break;

                    //For Image Slider
                    case "slider":
                        $('#' + CMTempElementID).live("change", FuncToCall);
                        break;

                    //For Others
                    default:
                        //For Images on Villa List Page
                        if (getElementsID[i][2] == "Image" && getElementsID[i][0] == "largeImage1") {
                            CMBindVillaListImages(CMTempElementID);
                        }
                        else {
                            $('#' + CMTempElementID).live("click", FuncToCall);
                        }
                        break; 
                }
            }
        }

        //For Pagination
        if (Optional == 1) {
            CMBindPager();
        }
    }
    catch (e) {
        //alert(e.Message);
    }
}

//CoreMetrics - Bind Function for Pagination
function CMBindPager() {
    try
    {
        var TempCatID = AnalyticsPageTagsParam.PageCat.toLowerCase();
        if (TempCatID == "sr")
            $('#MainContent_villaListPager a').live("click", CMCallPageViewForPagination);
        else if(TempCatID.indexOf("vl-") > -1)
            $('[id*=_MainContent_VillaPager_]').live("click", CMCallPageViewForPagination);
    }
    catch (e) { }
}

//CoreMetrics - Will call Pageview for pagination
function CMCallPageViewForPagination() {
    try {
        //Set Variables

        if(!$(this).hasClass("aspNetDisabled"))
        {
            var TempText = $(this).text();
        
            var TempPageID = AnalyticsPageTagsParam.PageID;
            var TempCatID = AnalyticsPageTagsParam.PageCat;
            var TempSTerm = AnalyticsPageTagsParam.PageSTerm;
            var TempSResult = AnalyticsPageTagsParam.PageSResult;
            var TempAttributePattern = AnalyticsPageTagsParam.Attribute;

            //For Search Result Page
            if (TempCatID == "SR") {
                if (TempText.indexOf("|") > -1) {
                    TempText = TempText.substring(0, TempText.length - 1);
                    TempPageID = TempPageID + " Page";
                }
                else if (TempText == "") {
                    if ($(this).hasClass("firstPage")) {
                        TempText = "First Page";
                    }
                    else if ($(this).hasClass("lastPage")) {
                        TempText = "Last Page";
                    }
                }
                else if (!(TempText.toLowerCase().indexOf("previous") > -1) && !(TempText.toLowerCase().indexOf("next") > -1)) {
                    TempPageID = TempPageID + " Page";
                }
            }
            //For other Landing pages
            else {
                if (TempText == "") {
                    TempText = $(this).attr("alt");
                }
                else if (!(TempText.toLowerCase().indexOf("previous") > -1) && !(TempText.toLowerCase().indexOf("next") > -1)) {
                    TempPageID = TempPageID + " Page";
                }
            }

            //Call Pageview tag
            cmCreatePageviewTag(TempPageID + "{" + TempText + "}", TempCatID, TempSTerm, TempSResult, TempAttributePattern);
        }
    }
    catch (e) { }
}

//CM functions - START
//Bind Function for CM
function CMProcessBinding(evt) {
    CMCallElementTag(evt.target);
}

//Will call Element Tag
function CMCallElementTag(EventSender) {
    try {
        for (var i = 0; i < ReturnGAStartIndex('CM') ; i++) {
            if (getElementsID[i][6] == 1) {
                var EventSenderTemp = EventSender.id;
                var CMGetElementsIDTemp = getElementsID[i][0];

                //For Filters(CheckBox)
                if (CMReturnIndexBoth(EventSenderTemp, "_ChkListItems", CMGetElementsIDTemp)) {
                    count = i;
                    if ($('#' + EventSenderTemp).is(':checked')) {
                        var ElementId = CMTruncated(getElementsID[count][1] + CMGetRenderedElementName(EventSenderTemp));
                        cmCreateElementTag(ElementId, getElementsID[count][2]);

                        //GTMdataLayer.push
                                                
                        var fdetail = CMGetRenderedElementName(EventSenderTemp);
                        // alert("filter detail:" + fdetail)

                        var t = CMGetElementsIDTemp.replace("_ChkListItems", "_PortletTitle");
                        var fcategory = $('#' + t).text();
                        
                        if (GTMdataLayer !== null && GTMdataLayer !== undefined) {
                            //alert('filter category:'+ fcategory +' filter detail:'+ fdetail + 'event:searchRefined');
                            GTMdataLayer.push({ 'filter category': fcategory, 'filter detail': fdetail, 'event': 'searchRefined' });
                        }
                    }
                    break;
                }

                //For RadioButton
                else if (CMReturnIndexBoth(EventSenderTemp, "_radSearchType", CMGetElementsIDTemp)) {
                    count = i;
                    var ElementId = CMTruncated(getElementsID[count][1] + CMGetRenderedElementName(EventSenderTemp));
                    cmCreateElementTag(ElementId, getElementsID[count][2]);
                    break;
                }

                //For Price Overlay
                else if (CMReturnIndexBoth(EventSenderTemp, "_lnkVillaonlymsg_", CMGetElementsIDTemp)) {
                    count = i;
                    var ElementId = CMTruncated(getElementsID[count][1]);
                    cmCreateElementTag(ElementId, getElementsID[count][2]);
                    break;
                }

                //For Pagination
                else if (CMReturnIndexBoth(EventSenderTemp, "_pgsize", CMGetElementsIDTemp)) {
                    count = i;
                    var ElementId = CMTruncated(getElementsID[count][1] + $('a[id="' + EventSenderTemp + '"]').html());
                    cmCreateElementTag(ElementId, getElementsID[count][2]);
                    break;
                }

                //For Dropdown(Sort By)
                else if (CMReturnIndexBoth(EventSenderTemp, "_SortBy", CMGetElementsIDTemp)) {
                    count = i;
                    var ElementId = CMTruncated(getElementsID[count][1] + $('select[id="' + EventSenderTemp + '"]').find(":selected").text());
                    cmCreateElementTag(ElementId, getElementsID[count][2]);
                    break;
                }

                //For elements on Product Page
                else if (CMReturnIndexAll(EventSenderTemp, ProductPageElements, CMGetElementsIDTemp)) {
                    count = i;
                    var CMGetAttributePatternString = "";
                    if (getElementsID[count][2] == "View Tours" || getElementsID[count][2] == "View Map") {
                        CMGetAttributePatternString = CMGetAttributePattern(getElementsID[count][2]);
                        cmCreateElementTag(CMTruncated(getElementsID[count][1]), getElementsID[count][2] + ":Property Details", CMGetAttributePatternString);
                    }
                    else if (CMReturnIndex(EventSenderTemp, "imgStylisedFloorPlan")) {
                        cmCreateElementTag(CMTruncated(getElementsID[count][1]), getElementsID[count][2] + ":Image" + ":Property Details");
                    }
                    else if (CMReturnIndex(EventSenderTemp, "imgStylisedLocationMap")) {
                        cmCreateElementTag(CMTruncated(getElementsID[count][1]), getElementsID[count][2] + ":Image" + ":Property Details");
                    }
                    else {
                        cmCreateElementTag(CMTruncated(getElementsID[count][1]), getElementsID[count][2] + ":Property Details");
                    }
                    break;
                }

                //For Tabs
                else if (getElementsID[i][2] == "Tab" && EventSenderTemp == "VITabs") {
                    count = i;
                    CMCallElementTagForTabs(EventSenderTemp, getElementsID[count][1], getElementsID[count][2] + ":Property Details");
                    break;
                }

                //For Villa List Page
                else if (getElementsID[i][0] == "largeImage1") {
                    var iCount = 0;
                    for (iCount = 0; iCount < getElementsVillaList.length; iCount++) {
                        var strTemp = getElementsID[i][0] + "_" + getElementsVillaList[iCount][0];
                        if (strTemp == EventSender.id) {
                            count = i;
                            var ElementId = CMTruncated(getElementsVillaList[iCount][2] + ":" + getElementsVillaList[iCount][1]);
                            cmCreateElementTag(ElementId, getElementsID[count][2] + ":Listings");
                            break;
                        }
                    }
                }

                //For Other Elements
                else if (getElementsID[i][0] == EventSenderTemp) {
                    count = i;
                    if (CMReturnIndex(getElementsID[count][2], "CheckBox")) {
                        if ($('#' + EventSenderTemp).is(':checked')) {
                            cmCreateElementTag(CMTruncated(getElementsID[count][1]), getElementsID[count][2]);
                        }
                    }
                    else {
                        cmCreateElementTag(CMTruncated(getElementsID[count][1]), getElementsID[count][2]);
                    }
                    break;
                }
            }
        }
    }
    catch (e) {
        //alert(e.Message);
    }
}

//Will Call Element Tag for Tabs
function CMCallElementTagForTabs(CMPassElementID, CMElementName, CMElementCategory) {
    try {
        var CMCurrentTab = 0;
        $('#' + CMPassElementID).tabs({
            show: function (event, ui) {
                CMCurrentTab = ui.index;
                var CMTabElementName = $('#' + CMPassElementID + ' ul li a').eq(CMCurrentTab).text();
                cmCreateElementTag(CMTruncated(CMElementName + CMTabElementName), CMElementCategory);
            }
        });
    }
    catch (e) {
    }
}

//Will Get the Element attribute Pattern
function CMGetAttributePattern(CMElementCatID) {
    var finalupdate = "";
    try {
        for (var j = 0; j < getElementsAttrib.length; j++) {
            if (getElementsAttrib[j][1] == CMElementCatID) {
                jsElementCat = getElementsAttrib[j][1];
                JSAttribute = getElementsAttrib[j][0];
                finalupdate = CMUpdateAttributePattern(JSAttribute);
                break;
            }
        }
    }
    catch (e) {
        //alert(e.message);
    }
    return finalupdate;
}

//Will create Attribute Pattern String and return
function CMUpdateAttributePattern(JSAttribute) {
    try{
        var updateattr = "";
        var splitElementsAttrib = new Array(15);
        splitElementsAttrib = JSAttribute.split("-_-")
        for (var k = 0; k < 15; k++) {
            if (splitElementsAttrib[k].charAt(0) != "~") {
                switch (k + 1) {
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        if (jsElementCat == "View Map") {
                            splitElementsAttrib[k] = "Google";
                        }
                        break;
                    case 4:
                        if (jsElementCat == "View Tours") {
                            splitElementsAttrib[k] = $('#MainContent_TourPanel_ddTours').find(':selected').text();
                        }
                        break;
                    case 5:
                        if (jsElementCat == "View Tours") {
                            splitElementsAttrib[k] = $('#MainContent_TourPanel_ddTours option').size();
                        }
                        break;
                }
            }
            else {
                splitElementsAttrib[k] = "";
            }
        }
        for (var k1 = 0; k1 < 14; k1++) {
            updateattr = updateattr + splitElementsAttrib[k1] + "-_-";
        }
        updateattr = updateattr + splitElementsAttrib[14];
    }
    catch (e) {
     //alert(e.message);
    }
  return updateattr;
}

//Will truncate the elementid if length > 50
function CMTruncated(ElementId) {
    if (ElementId.length >= 50) {
        if (ElementId.indexOf("lifestyle:") > -1 || ElementId.indexOf("Lifestyle:") > -1) {
            ElementId = ElementId.replace("lifestyle:", "").replace("Lifestyle:", "");

            if (ElementId.length >= 50 && ElementId.indexOf("Villa Plus") > -1) {
                ElementId = ElementId.replace("Villa Plus", "");
            }

            if (ElementId.length >= 50 && (ElementId.indexOf("holidays") > -1 || ElementId.indexOf("Holidays") > -1)) {
                ElementId = ElementId.replace("holidays", "").replace("Holidays", "");
            }
        }
        else if (ElementId.indexOf("resort:") > -1 || ElementId.indexOf("Resort:") > -1) {
            ElementId = ElementId.replace("resort:", "").replace("Resort:", "");
        }
    }

    return (ElementId.length >= 50 ? substring(ElementId, 0, 49) : ElementId);
}
//CM functions - END

//GA functions - START
//Bind function for GA
function GAProcessBinding(evt) {
    GACallEventTag(evt.target);
}

//Will call Event Tag
function GACallEventTag(EventSender) {
    var count = 0;
    var GACount = 0;
    var Found = false;

    var GACategory = "";
    var GAEventAction;
    var GAEventLabel;
    var GAEventValue;

    try{
        for (var i = ReturnGAStartIndex('GA'); i < getElementsID.length; i++) {
            if (getElementsID[i][6] == 2) {

                var EventSenderTemp = EventSender.id;
                var CMGetElementsIDTemp = getElementsID[i][0];

                //For Filters(CheckBox)
                if (CMReturnIndexBoth(EventSenderTemp, "_ChkListItems", CMGetElementsIDTemp)) {
                    count = i;
                    if ($('#' + EventSenderTemp).is(':checked')) {
                        Found = true;
                        GAEventAction = getElementsID[count][1] + CMGetRenderedElementName(EventSenderTemp) + " - " + getElementsID[count][3];
                    }
                }

                //For RadioButton
                else if (CMReturnIndexBoth(EventSenderTemp, "_radSearchType", CMGetElementsIDTemp)) {
                    Found = true;
                    count = i;
                    GAEventAction = getElementsID[count][1] + CMGetRenderedElementName(EventSenderTemp) + " - " + getElementsID[count][3];
                }

                //For Price Overlay
                else if (CMReturnIndexBoth(EventSenderTemp, "_lnkVillaonlymsg_", CMGetElementsIDTemp)) {
                    Found = true;
                    count = i;
                    GAEventAction = getElementsID[count][1] + " - " + getElementsID[count][3];
                }

                //For Pagination
                else if (CMReturnIndexBoth(EventSenderTemp, "_pgsize", CMGetElementsIDTemp)) {
                    Found = true;
                    count = i;
                    GAEventAction = getElementsID[count][1] + $('a[id="' + EventSenderTemp + '"]').html() + " - " + getElementsID[count][3];
                }

                //For Dropdown(Sort By)
                else if (CMReturnIndexBoth(EventSenderTemp, "_SortBy", CMGetElementsIDTemp)) {
                    Found = true;
                    count = i;
                    GAEventAction = getElementsID[count][1] + $('select[id="' + EventSenderTemp + '"]').find(":selected").text() + " - " + getElementsID[count][3];
                }

                //For elements on Product Page
                else if (CMReturnIndexAll(EventSenderTemp, ProductPageElements, CMGetElementsIDTemp)) {
                    Found = true;
                    count = i;
                    if (getElementsID[count][2] == "View Tours" || getElementsID[count][2] == "View Map") {
                        GACategory = getElementsID[count][2] + ":Property Details";
                        GAEventAction = getElementsID[count][3];
                    }
                    else if (CMReturnIndex(EventSenderTemp, "imgStylisedFloorPlan")) {
                        GACategory = getElementsID[count][2] + ":Image" + ":Property Details";
                        GAEventAction = getElementsID[count][3];
                    }
                    else if (CMReturnIndex(EventSenderTemp, "imgStylisedLocationMap")) {
                        GACategory = getElementsID[count][2] + ":Image" + ":Property Details";
                        GAEventAction = getElementsID[count][3];
                    }
                    else {
                        GACategory = getElementsID[count][2] + ":Property Details";
                        GAEventAction = getElementsID[count][3];
                    }
                }

                //For Tabs
                else if (getElementsID[i][2] == "Tab" && EventSenderTemp == "VITabs") {
                    count = i;
                    var GAEventName = getElementsID[count][1];
                    GACategory = getElementsID[count][2] + ":Property Details";
                    GAEventAction = getElementsID[count][3];
                    GAEventLabel = getElementsID[count][4];
                    GAEventValue = getElementsID[count][5];
                    GACallElementTagForTabs(EventSenderTemp, GAEventName, GAEventAction, GACategory, GAEventLabel, GAEventValue);
                }

                //For Villa List Page
                else if (getElementsID[i][0] == "largeImage1") {
                    var iCount = 0;
                    Found = true;
                    for (iCount = 0; iCount < getElementsVillaList.length; iCount++) {
                        var strTemp = getElementsID[i][0] + "_" + getElementsVillaList[iCount][0];
                        if (strTemp == EventSender.id) {
                            count = i;
                            GACategory = getElementsID[count][2] + ":Listings";
                            GAEventAction = getElementsVillaList[iCount][2] + ":" + getElementsVillaList[iCount][1] + " - " +getElementsID[count][3];
                            break;
                        }
                    }
                }

                //For Other Elements
                else if (getElementsID[i][0] == EventSenderTemp) {
                    count = i;
                    if (CMReturnIndex(getElementsID[count][2], "CheckBox")) {
                        if ($('#' + EventSenderTemp).is(':checked')) {
                            Found = true;
                            GAEventAction = getElementsID[count][1] + " - " + getElementsID[count][3]
                        }
                    }
                    else {
                        Found = true;
                        GAEventAction = getElementsID[count][1] + " - " + getElementsID[count][3]
                    }
                }

                //Call Event Tag for Google Analytics
                if (Found) {
                    if (GACategory == "") GACategory = getElementsID[count][2];
                    GAEventLabel = getElementsID[count][4];
                    GAEventValue = getElementsID[count][5];
                    if (GAEventLabel == "") ga('send', 'event', GACategory, GAEventAction, { 'nonInteraction': 1 });
                    else if (GAEventValue == "0") ga('send', 'event', GACategory, GAEventAction, GAEventLabel, { 'nonInteraction': 1 });
                    else ga('send', 'event', GACategory, GAEventAction, GAEventLabel, GAEventValue, { 'nonInteraction': 1 });
                    break;
                }

            }
        }
    }
    catch (e) {
        
    }
}

//Will call Event Tag for Tabs
function GACallElementTagForTabs(GAPassElementID, GAEventName, GAEventAction, GAElementCategory, GAEventLabel, GAEventValue) {
    try {
        var GACurrentTab = 0;
        $('#' + GAPassElementID).tabs({
            show: function (event, ui) {
                GACurrentTab = ui.index;
                var GATabElementName = $('#' + GAPassElementID + ' ul li a').eq(GACurrentTab).text();
                ga('send', 'event', GAElementCategory, GAEventName + GATabElementName + " - " + GAEventAction, GAEventLabel, GAEventValue, { 'nonInteraction': 1 });
                cmCreateElementTag(GAEventName + GATabElementName, GAElementCategory);
            }
        });
    }
    catch (e) {
    }
}
//GA functions - END

//Common Functions for CM and GA - START
//Will Bind all the CheckBox on Page
function CMBindCheckBox(CMTempElementID) {
    try {
        //Villa Destination Check List Items
        if (CMReturnIndex(CMTempElementID, "rightContent_villaDest_ChkListItems")) {
            $('[id*=rightContent_villaDest_ChkListItems_]').live("click", FuncToCall);
        }
            //Villa Type Check List Items
        else if (CMReturnIndex(CMTempElementID, "rightContent_villaType_ChkListItems")) {
            $('[id*=rightContent_villaType_ChkListItems_]').live("click", FuncToCall);
        }
            //Villa Detail Check List Items
        else if (CMReturnIndex(CMTempElementID, "rightContent_VillaDetail_ChkListItems")) {
            $('[id*=rightContent_VillaDetail_ChkListItems_]').live("click", FuncToCall);
        }
            //Villa Bedrooms Check List Items
        else if (CMReturnIndex(CMTempElementID, "rightContent_BedroomsFilter_ChkListItems")) {
            $('[id*=rightContent_BedroomsFilter_ChkListItems_]').live("click", FuncToCall);
        }
            //Villa Resort Check List Items
        else if (CMReturnIndex(CMTempElementID, "rightContent_villaResort_ChkListItems")) {
            $('[id*=rightContent_villaResort_ChkListItems_]').live("click", FuncToCall);
        }
            //For Others
        else {
            $('#' + CMTempElementID).live("click", FuncToCall);
        }
    }
    catch (e) {
    }
}

//Will Bind all the Radio Buttons on Page
function CMBindRadioButton(CMTempElementID) {
    try {
        if (CMReturnIndex(CMTempElementID, "rightContent_radSearchType")) {
            $('[id*=rightContent_radSearchType_]').live("click", FuncToCall);
        }
        else {
            $('#' + CMTempElementID).live("click", FuncToCall);
        }
    }
    catch (e) {
    }
}

//Will Bind Pagination
function CMBindPageSizeList(CMTempElementID) {
    try {
        if (CMReturnIndex(CMTempElementID, "MainContent_pgSizeList_pgsize")) {
            $('[id*=MainContent_pgSizeList_pgsize_]').live("click", FuncToCall);
        }
        else {
            $('#' + CMTempElementID).live("click", FuncToCall);
        }
    }
    catch (e) {
    }
}

//Will Bind View Tours
function CMBindViewTours(CMTempElementID) {
    try {
        if (CMReturnIndex(CMTempElementID, "TourPanel_ddTours")) {
            $('#' + CMTempElementID).live("change", FuncToCall);
        }
        else {
            $('#' + CMTempElementID).live("click", FuncToCall);
        }
    }
    catch (e) {
    }
}

//Will Bind Images on Villa List
function CMBindVillaListImages(CMTempElementID) {
    var iCount = 0;
    try {
        for (iCount = 0; iCount < getElementsVillaList.length; iCount++) {
            var strTemp = CMTempElementID + "_" + getElementsVillaList[iCount][0];
            if (document.getElementById(strTemp) != null) {
                $('#' + strTemp).live("click", FuncToCall);
            }
            else {
            }
        }
    }
    catch (e) {
    }
}

//Will return Element Name for the Filters
function CMGetRenderedElementName(CMPassElementID) {
    var CMGetElementName, CMGetElementNameTemp;
    try {
        CMGetElementNameTemp = $('label[for="' + CMPassElementID + '"]').html().replace("&amp;", "&").replace("<span></span>", "");
        CMGetElementName = (CMGetElementNameTemp.indexOf("(") > -1) ? CMGetElementNameTemp.substr(0, CMGetElementNameTemp.indexOf("(")) : CMGetElementNameTemp;
    }
    catch (e) {
        //alert(e.Message);
        CMGetElementName = "";
    }
    return CMGetElementName;
}

//Will check if substring matches
function CMReturnIndex(CMSearchIn, CMSearchFor) {
    var ReturnFlag = false;
    try {
        if (CMSearchIn.indexOf(CMSearchFor) > -1) {
            ReturnFlag = true;
        }
    }
    catch (e) {
    }
    return ReturnFlag;
}

//Will check if both substrings matches
function CMReturnIndexBoth(CMSearchIn, CMSearchFor1, CMSearchFor2) {
    var ReturnFlag = false;
    try {
        if (CMSearchIn.indexOf(CMSearchFor1) > -1 && CMSearchIn.indexOf(CMSearchFor2) > -1) {
            ReturnFlag = true;
        }
    }
    catch (e) {
    }
    return ReturnFlag;
}

//Will check if any of the element in Array matches
function CMReturnIndexAll(CMSearchIn, CMSearchFor1, CMSearchFor2) {
    var ReturnFlag = false;
    try {
        if (CMSearchIn.indexOf(CMSearchFor2) > -1) {
            for (var i = 0; i < CMSearchFor1.length; i++) {
                if (CMSearchIn.indexOf(CMSearchFor1[i]) > -1) {
                    ReturnFlag = true;
                    break;
                }
            }
        }
    }
    catch (e) {
    }
    return ReturnFlag;
}

//Will return the index for the first GA element
function ReturnGAStartIndex(AnalyticsType) {
    var GACount = 0;
    try {
        for (var i = 0; i < getElementsID.length; i++) {
            if (getElementsID[i][6] == 2) {
                GACount = i;
                break;
            }
        }
        if (AnalyticsType == 'CM' && GACount == 0) GACount = getElementsID.length;
        if (AnalyticsType == 'GA' && GACount == getElementsID.length) GACount = 0;
    }
    catch(e)
    {
    }
    return GACount;
}
//Common Functions for CM and GA - END


//To Load JS after Page Load

try {
    if (window.attachEvent) {
        window.attachEvent('onload', LoadAnalyticsScripts);
    }
    else {
        window.addEventListener('load', LoadAnalyticsScripts, false);
    }
    
}
catch (e) { }

function LoadAnalyticsScripts() {
    try {
         LoadScripts("//libs.coremetrics.com/eluminate.js", FnCMCode);
    }
    catch (e) { }
}

function LoadScripts(url, callback) {
    try {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        if (script.onreadystatechange) {
            script.onreadystatechange = callback;
        }
        else {
            script.readyState = callback;
        }
        script.onload = callback;
        head.appendChild(script);
    }
    catch (e) { }
}


