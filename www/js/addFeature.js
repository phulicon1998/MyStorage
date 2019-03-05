$(document).on("pageinit", "#addFe", ready);

var swPrivate, swShare;

function ready() {
    swPrivate = $("#privateType");
    swShare = $("#shareType");

    swShare.on("change", offPrivateType);
    swPrivate.on("change", offShareType);
    $("#confirmBtn").on("tap", gatherFeatures);
}

// RENDER function
function offPrivateType() {
    let status = swShare.val() === "true";
    swPrivate.val("false").flipswitch("refresh");
    swShare.val(status.toString()).flipswitch("refresh");
}

function offShareType() {
    let status = swPrivate.val() === "true";
    swShare.val("false").flipswitch("refresh");
    swPrivate.val(status.toString()).flipswitch("refresh");
}

function gatherFeatures(){
    let features = Array.from($("select"));
    let trueFeat = features.filter(feature => $(feature).val() === "true");
    let featVals = trueFeat.map(feature => $(feature).attr("id"));
    dbHandler.tempData.feature = featVals.toString();

    $.mobile.navigate("#confirmInfo");
}
