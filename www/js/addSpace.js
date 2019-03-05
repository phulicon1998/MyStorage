$(document).on("pageinit", "#addSp", ready);

function ready() {
    $("#addSp input").on("focusin", addFocusInput);
    $("#addSp input").on("focusout", removeFocusInput);
    $(".contBtn").on("tap", saveSpaceInfo);
    $(".cancelBtn").on("tap", cancelForm);
}

// DATA FUNCTION
function saveSpaceInfo() {
    let empty = isEmpty("#addSp input");
    if(!empty){
        let textInfo = extractFormData("#addSp input");
        let note = extractFormData("#addSp textarea");
        dbHandler.tempData = {...textInfo, ...note};
        $.mobile.navigate("#addFe");
    } else {
        alert("Please enter all required information");
    }
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
