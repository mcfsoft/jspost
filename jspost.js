/*!
* 
* http://www.mfksoft.com/
* Copyright 2017 mfksoft.com
*
* Includes jquery.js
*/

function IsJosn(obj) {
    return typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
}
function IsStringJosn(obj) {
    return obj.length > 0 && obj.slice(0, 1) == '{' && obj.substring(obj.length - 1) == '}';
}
function parseQuery(query) {
    var Params = new Object();
    if (!query) return Params; // return empty object
    var Pairs = query.split(/[;&]/);
    for (var i = 0; i < Pairs.length; i++) {
        var KeyVal = Pairs[i].split('=');
        if (!KeyVal || KeyVal.length != 2) continue;
        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
    }
    return Params;
}
function jsPostEnCode(v) {
    if (v)
        return v.replace(/\+/g, "%2B").replace(/\&/g, "%26");
    else
        return "";
}
function jsPostOn(callBack) {
    return _jsPost(window.location.href, callBack, true);
}
function jsPost(postUrl, callBack) {
    return _jsPost(postUrl, callBack, true);
}
function _jsPost(postUrl, callBack, isAlert) {
    return _jsPostBase(postUrl, callBack, isAlert, true);
}
function _jsPostBase(postUrl, callBack, isAlert, isGourl) {
    var pd = "";
    var type = "";
    $("input").each(function () {
        var item = $(this);
        if (item.attr("name")) {
            type = item.attr("type");
            if (type == "text" || type == "hidden" || type == "password") {
                pd += "&" + item.attr("name") + "=" + jsPostEnCode(item.val());
            }
            else if (type == "checkbox" || type == "radio") {
                type = item.attr("checked");
                if (type) {
                    pd += "&" + item.attr("name") + "=" + jsPostEnCode(item.val());
                }
            }
        }
    });
    $("select").each(function () {
        var item = $(this);
        if (item.attr("name")) {
            pd += "&" + item.attr("name") + "=" + jsPostEnCode(item.val());
        }
    });
    $("textarea").each(function () {
        var item = $(this);
        if (item.attr("name")) {
            pd += "&" + item.attr("name") + "=" + jsPostEnCode(item.val());
        }
    });
    pd += "&m_f_k_r_n_d=" + Math.random();
    $.ajax({
        type: "Post",
        url: postUrl,
        data: pd,
        success: function (data) {
            if (IsJosn(data)) {
                var result = data.Result;
                var msg = data.Msg;
                var gourl = data.Gourl;
                if (msg && isAlert) {
                    alert(msg);
                }
                if (gourl && isGourl) {
                    window.location.href = gourl;
                }
                if (callBack) {
                    callBack(data);
                }
                return false;
            }
            return false;
        }
    });
    return false;
}