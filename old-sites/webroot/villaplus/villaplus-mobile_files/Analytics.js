﻿function LoadAnalyticsScripts() { try { LoadScripts("//libs.coremetrics.com/eluminate.js", FnCMCode) } catch (e) { } } function LoadScripts(e, t) { try { var n = document.getElementsByTagName("head")[0], l = document.createElement("script"); l.type = "text/javascript", l.src = e, l.onreadystatechange ? l.onreadystatechange = "function" == typeof FnCMShopAction5Tag ? function () { t(), FnCMShopAction5Tag() } : t : l.readyState = "function" == typeof FnCMShopAction5Tag ? function () { t(), FnCMShopAction5Tag() } : t, l.onload = "function" == typeof FnCMShopAction5Tag ? function () { t(), FnCMShopAction5Tag() } : t, n.appendChild(l) } catch (a) { } } function CMBindElements(e) { try { for (var t = 0; t < getElementsID.length; t++) { var n = getElementsID[t][0]; if (null != document.getElementById(n) || "MainContent_pgSizeList_pgsize" == n || "_lnkVillaonlymsg_" == n || "largeImage1" == n) switch (1 == getElementsID[t][6] ? FuncToCall = CMProcessBinding : 2 == getElementsID[t][6] && (FuncToCall = GAProcessBinding), getElementsID[t][2].toLowerCase()) { case "dropdown": $("#" + n).live("change", FuncToCall); break; case "hoverbox": $("#" + n).live("mouseover", FuncToCall); break; case "checkbox": CMBindCheckBox(n); break; case "radio button": CMBindRadioButton(n); break; case "page size list": CMBindPageSizeList(n); break; case "link": CMReturnIndex(n, "_lnkVillaonlymsg_") ? $("[id*=lvVillaInfo_villaCtrl_0_lnkVillaonlymsg_]").live("click", FuncToCall) : CMReturnIndex(n, "lnkDownloads") && $("#" + n).live("click", FuncToCall); break; case "view tours": CMBindViewTours(n); break; case "tab": $("#" + n).live("tabsselect", FuncToCall); break; case "slider": $("#" + n).live("change", FuncToCall); break; default: "Image" == getElementsID[t][2] && "largeImage1" == getElementsID[t][0] ? CMBindVillaListImages(n) : $("#" + n).live("click", FuncToCall) } } } catch (l) { } } function CMProcessBinding(e) { CMCallElementTag(e.target) } function CMCallElementTag(e) { try { for (var t = 0; t < ReturnGAStartIndex() ; t++) if (1 == getElementsID[t][6]) { var n = e.id, l = getElementsID[t][0]; if (CMReturnIndexBoth(n, "_ChkListItems", l)) { count = t, $("#" + n).is(":checked") && cmCreateElementTag(getElementsID[count][1] + CMGetRenderedElementName(n), getElementsID[count][2]); break } if (CMReturnIndexBoth(n, "sortradiooption", l)) { count = t, cmCreateElementTag(getElementsID[count][1] + CMGetRenderedElementName(n), getElementsID[count][2]); break } if (CMReturnIndexBoth(n, "_lnkVillaonlymsg_", l)) { count = t, cmCreateElementTag(getElementsID[count][1], getElementsID[count][2]); break } if (CMReturnIndexBoth(n, "_pgsize", l)) { count = t, cmCreateElementTag(getElementsID[count][1] + $('a[id="' + n + '"]').html(), getElementsID[count][2]); break } if (CMReturnIndexBoth(n, "_SortBy", l)) { count = t, cmCreateElementTag(getElementsID[count][1] + $('select[id="' + n + '"]').find(":selected").text(), getElementsID[count][2]); break } if (CMReturnIndexAll(n, ProductPageElements, l)) { count = t; var a = ""; "View Tours" == getElementsID[count][2] || "View Map" == getElementsID[count][2] ? (a = CMGetAttributePattern(getElementsID[count][2]), cmCreateElementTag(getElementsID[count][1], getElementsID[count][2] + ":Property Details", a)) : CMReturnIndex(n, "imgStylisedFloorPlan") ? cmCreateElementTag(getElementsID[count][1], getElementsID[count][2] + ":Image:Property Details") : CMReturnIndex(n, "imgStylisedLocationMap") ? cmCreateElementTag(getElementsID[count][1], getElementsID[count][2] + ":Image:Property Details") : cmCreateElementTag(getElementsID[count][1], getElementsID[count][2] + ":Property Details"); break } if ("Tab" == getElementsID[t][2] && "VITabs" == n) { count = t, CMCallElementTagForTabs(n, getElementsID[count][1], getElementsID[count][2] + ":Property Details"); break } if ("largeImage1" == getElementsID[t][0]) { var i = 0; for (i = 0; i < getElementsVillaList.length; i++) { var r = getElementsID[t][0] + "_" + getElementsVillaList[i][0]; if (r == e.id) { count = t, cmCreateElementTag(getElementsVillaList[i][2] + ":" + getElementsVillaList[i][1], getElementsID[count][2] + ":Listings"); break } } } else if (getElementsID[t][0] == n) { count = t, CMReturnIndex(getElementsID[count][2], "CheckBox") ? $("#" + n).is(":checked") && cmCreateElementTag(getElementsID[count][1], getElementsID[count][2]) : cmCreateElementTag(getElementsID[count][1], getElementsID[count][2]); break } } } catch (s) { } } function CMCallElementTagForTabs(e, t, n) { try { var l = 0; $("#" + e).tabs({ show: function (a, i) { l = i.index; var r = $("#" + e + " ul li a").eq(l).text(); cmCreateElementTag(t + r, n) } }) } catch (a) { } } function CMGetAttributePattern(e) { var t = ""; try { for (var n = 0; n < getElementsAttrib.length; n++) if (getElementsAttrib[n][1] == e) { jsElementCat = getElementsAttrib[n][1], JSAttribute = getElementsAttrib[n][0], t = CMUpdateAttributePattern(JSAttribute); break } } catch (l) { } return t } function CMUpdateAttributePattern(e) { try { var t = "", n = new Array(15); n = e.split("-_-"); for (var l = 0; 15 > l; l++) if ("~" != n[l].charAt(0)) switch (l + 1) { case 1: break; case 2: break; case 3: "View Map" == jsElementCat && (n[l] = "Google"); break; case 4: "View Tours" == jsElementCat && (n[l] = $("#MainContent_TourPanel_ddTours").find(":selected").text()); break; case 5: "View Tours" == jsElementCat && (n[l] = $("#MainContent_TourPanel_ddTours option").size()) } else n[l] = ""; for (var a = 0; 14 > a; a++) t = t + n[a] + "-_-"; t += n[14] } catch (i) { } return t } function GAProcessBinding(e) { GACallEventTag(e.target) } function GACallEventTag(e) { var t, n, l, a = 0, i = !1, r = ""; try { for (var s = ReturnGAStartIndex() ; s < getElementsID.length; s++) if (2 == getElementsID[s][6]) { var o = e.id, c = getElementsID[s][0]; if (CMReturnIndexBoth(o, "_ChkListItems", c)) i = !0, a = s, $("#" + o).is(":checked") && (t = getElementsID[a][1] + CMGetRenderedElementName(o) + " - " + getElementsID[a][3]); else { if (CMReturnIndexBoth(o, "_radSearchType", c)) { i = !0, a = s, t = getElementsID[a][1] + CMGetRenderedElementName(o) + " - " + getElementsID[a][3]; break } if (CMReturnIndexBoth(o, "_lnkVillaonlymsg_", c)) { i = !0, a = s, t = getElementsID[a][1] + " - " + getElementsID[a][3]; break } if (CMReturnIndexBoth(o, "_pgsize", c)) { i = !0, a = s, t = getElementsID[a][1] + $('a[id="' + o + '"]').html() + " - " + getElementsID[a][3]; break } if (CMReturnIndexBoth(o, "_SortBy", c)) { i = !0, a = s, t = getElementsID[a][1] + $('select[id="' + o + '"]').find(":selected").text() + " - " + getElementsID[a][3]; break } if (CMReturnIndexAll(o, ProductPageElements, c)) { i = !0, a = s, "View Tours" == getElementsID[a][2] || "View Map" == getElementsID[a][2] ? (r = getElementsID[a][2] + ":Property Details", t = getElementsID[a][3]) : CMReturnIndex(o, "imgStylisedFloorPlan") ? (r = getElementsID[a][2] + ":Image:Property Details", t = getElementsID[a][3]) : CMReturnIndex(o, "imgStylisedLocationMap") ? (r = getElementsID[a][2] + ":Image:Property Details", t = getElementsID[a][3]) : (r = getElementsID[a][2] + ":Property Details", t = getElementsID[a][3]); break } if ("Tab" == getElementsID[s][2] && "VITabs" == o) { a = s; var g = getElementsID[a][1]; r = getElementsID[a][2] + ":Property Details", t = getElementsID[a][3], n = getElementsID[a][4], l = getElementsID[a][5], GACallElementTagForTabs(o, g, t, r, n, l); break } if ("largeImage1" == getElementsID[s][0]) { var m = 0; for (i = !0, m = 0; m < getElementsVillaList.length; m++) { var u = getElementsID[s][0] + "_" + getElementsVillaList[m][0]; if (u == e.id) { a = s, r = getElementsID[a][2] + ":Listings", t = getElementsVillaList[m][2] + ":" + getElementsVillaList[m][1] + " - " + getElementsID[a][3]; break } } } else if (getElementsID[s][0] == o) { i = !0, a = s, CMReturnIndex(getElementsID[a][2], "CheckBox") ? $("#" + o).is(":checked") && (t = getElementsID[a][1] + " - " + getElementsID[a][3]) : t = getElementsID[a][1] + " - " + getElementsID[a][3]; break } } if (i) { "" == r && (r = getElementsID[a][2]), n = getElementsID[a][4], l = getElementsID[a][5], "" == n ? ga("send", "event", r, t) : "0" == l ? ga("send", "event", r, t, n) : ga("send", "event", r, t, n, l); break } } } catch (d) { } } function GACallElementTagForTabs(e, t, n, l, a, i) { try { var r = 0; $("#" + e).tabs({ show: function (s, o) { r = o.index; var c = $("#" + e + " ul li a").eq(r).text(); ga("send", "event", l, t + c + " - " + n, a, i) } }) } catch (s) { } } function CMBindCheckBox(e) { try { CMReturnIndex(e, "rightContent_villaDest_ChkListItems") ? $("[id*=rightContent_villaDest_ChkListItems_]").live("click", FuncToCall) : CMReturnIndex(e, "rightContent_villaType_ChkListItems") ? $("[id*=rightContent_villaType_ChkListItems_]").live("click", FuncToCall) : CMReturnIndex(e, "rightContent_VillaDetail_ChkListItems") ? $("[id*=rightContent_VillaDetail_ChkListItems_]").live("click", FuncToCall) : CMReturnIndex(e, "rightContent_villaResort_ChkListItems") ? $("[id*=rightContent_villaResort_ChkListItems_]").live("click", FuncToCall) : $("#" + e).live("click", FuncToCall) } catch (t) { } } function CMBindRadioButton(e) { try { CMReturnIndex(e, "rightContent_radSearchType") ? $("[id*=rightContent_radSearchType_]").live("click", FuncToCall) : $("#" + e).live("check", FuncToCall) } catch (t) { } } function CMBindPageSizeList(e) { try { CMReturnIndex(e, "MainContent_pgSizeList_pgsize") ? $("[id*=MainContent_pgSizeList_pgsize_]").live("click", FuncToCall) : $("#" + e).live("click", FuncToCall) } catch (t) { } } function CMBindViewTours(e) { try { CMReturnIndex(e, "TourPanel_ddTours") ? $("#" + e).live("change", FuncToCall) : $("#" + e).live("click", FuncToCall) } catch (t) { } } function CMBindVillaListImages(e) { var t = 0; try { for (t = 0; t < getElementsVillaList.length; t++) { var n = e + "_" + getElementsVillaList[t][0]; null != document.getElementById(n) && $("#" + n).live("click", FuncToCall) } } catch (l) { } } function CMGetRenderedElementName(e) { var t, n; try { n = $('label[for="' + e + '"]').html(), t = n.indexOf("(") > -1 ? n.substr(0, n.indexOf("(")) : n } catch (l) { t = "" } return t } function CMReturnIndex(e, t) { var n = !1; try { e.indexOf(t) > -1 && (n = !0) } catch (l) { } return n } function CMReturnIndexBoth(e, t, n) { var l = !1; try { e.indexOf(t) > -1 && e.indexOf(n) > -1 && (l = !0) } catch (a) { } return l } function CMReturnIndexAll(e, t, n) { var l = !1; try { if (e.indexOf(n) > -1) for (var a = 0; a < t.length; a++) if (e.indexOf(t[a]) > -1) { l = !0; break } } catch (i) { } return l } function ReturnGAStartIndex() { var e = 0; try { for (var t = 0; t < getElementsID.length; t++) if (2 == getElementsID[t][6]) { e = t; break } } catch (n) { } return e } var ProductPageElements = new Array; ProductPageElements = ["_ddTours", "_lnkFloorPlan", "_btnAvailPrice", "_lnkViewOnMap", "aAvailTab", "_lnkLocationMap", "imgStylisedFloorPlan", "_imgStylisedLocationMap"]; var FuncToCall; try { window.attachEvent ? window.attachEvent("onload", LoadAnalyticsScripts) : window.addEventListener("load", LoadAnalyticsScripts, !1) } catch (e) { }