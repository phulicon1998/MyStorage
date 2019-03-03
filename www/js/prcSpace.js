$(document).on("pageinit", "#addSp", () => {
    $(".contBtn").on("tap", getSpaceInfo);

})

function getSpaceInfo() {
    createdSpace = extractFormData("#addSp input");
    $.mobile.navigate("#addFe");
}
