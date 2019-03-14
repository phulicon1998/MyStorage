$(document).on("pageinit", "#addType", readyAddType);

function readyAddType(){
    $("#addType #create").on("tap", createType);
}

function createType(){
    let inputData = extractFormData("#addType input");
    let textData = extractFormData("#addType textarea");
    dbType.temp = {...inputData, ...textData};
    dbType.add();
    $.mobile.navigate("#types");
}
