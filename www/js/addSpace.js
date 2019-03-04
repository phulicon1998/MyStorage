$(document).on("pageinit", "#addSp", ready);

function ready() {
    $("#addSp input").on("tap", addFocusInput);
    $("#addSp input").on("focusout", removeFocusInput);

    $(".contBtn").on("tap", saveSpaceInfo);
    $(".cancelBtn").on("tap", cancelForm);
}

// DATA FUNCTION
function saveSpaceInfo() {
    let textInfo = extractFormData("#addSp input");
    let note = extractFormData("#addSp textarea");
    createdSpace = {...textInfo, ...note};
    $.mobile.navigate("#addFe");
}

function cancelForm(){
    $.mobile.navigate("#spaces");
}

// RENDER FUNCTION
function addFocusInput(e) {
    if($(`#addSp input[name=${e.target.name}]`).val() === "")
    $(`label[for=${e.target.name}]`).addClass("focusInput");
}

function removeFocusInput(e) {
    if($(`#addSp input[name=${e.target.name}]`).val() === "")
    $(`label[for=${e.target.name}]`).removeClass("focusInput");
}
