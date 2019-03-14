$(document).on("pageinit", "#addSpace", readyAddSpace);
$(document).on("pageshow", "#addSpace", prepareAddSpace);

// PREPARE & READY
function readyAddSpace() {
    $("#addSpace input").on("focusin", addFocusInput);
    $("#addSpace input").on("focusout", removeFocusInput);

    $("#addSpace select").on("focusin", addFocusSelect);
    $("#addSpace select").on("focusout", removeFocusSelect);
    $("#addSpace select").on("change", checkSelectValue);


    $("#addSpace .contBtn").on("tap", saveSpaceInfo);
    $("#addSpace .cancelBtn").on("tap", cancelForm);
}

function prepareAddSpace(){
    if(dbSpace) return refreshForm();
    return cancelForm();
}

// DATA FUNCTION
function saveSpaceInfo() {
    let empty = isEmpty("#addSpace input");
    if(!empty){
        dbSpace.checkDuplicateAdddress().then(result => {
            let textData = extractFormData("#addSpace input");
            let {storageType} = extractFormData("#addSpace select");
            let {note} = extractFormData("#addSpace textarea");
            if(storageType !== "0" && result.length == 0){
                dbSpace.temp = {storageType ,...textData, note};
                $.mobile.navigate("#selectFeature");
            } else {
                alert("Please enter all required information");
            }
        })
    } else {
        alert("Please enter all required information");
    }
}

function cancelForm(){
    $.mobile.navigate("#spaces");
}

// RENDER FUNCTION
function refreshForm(){
    $(`label`).removeClass("focusInput");
    $("#addSpace select[name='storageType']").empty();
    let typeList = new typeDb().viewAll().then(result => {
        $("select[name='storageType']").append($(`<option value="0">< Please select type ></option>`));
        result.forEach(type => {
            let typeRow = $(`<option value="${type.Id}">${type.Name}</option>`);
            $("select[name='storageType']").append(typeRow);
        });
        $("select[name='storageType']").val(dbSpace.temp.storageType || "0");
        checkSelectValue();
    });
}

function addFocusInput(e) {
    let tagName = $(e.target).prop("tagName").toLowerCase();
    if($(`#addSpace ${tagName}[name=${e.target.name}]`).val() === "")
    $(`label[for=${e.target.name}]`).addClass("focusInput");
}

function removeFocusInput(e) {
    let tagName = $(e.target).prop("tagName").toLowerCase();
    if($(`#addSpace ${tagName}[name=${e.target.name}]`).val() === "")
    $(`label[for=${e.target.name}]`).removeClass("focusInput");
}

function addFocusSelect(e){
    $(`label[for=${e.target.name}]`).addClass("focusInput");
}

function checkSelectValue(){
    if($(`select[name='storageType']`).val() && $(`select[name='storageType']`).val() !== "0"){
        $(`select[name='storageType']`).removeClass("unselect");
    } else {
        $(`select[name='storageType']`).addClass("unselect");
    }
}

function removeFocusSelect(e){
    if($(`select[name='storageType']`).val() === "0"){
        $(`label[for=${e.target.name}]`).removeClass("focusInput");
    }
}
