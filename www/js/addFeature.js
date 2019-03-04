$(document).on("pageinit", "#addFe", ready);

var swPrivate, swShare;

function ready() {
    swPrivate = $("#privateType");
    swShare = $("#shareType");
    swShare.on("change", offPrivateType);
    swPrivate.on("change", offShareType);
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
