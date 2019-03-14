$(document).on("pageinit", "#addFeature", readyAddFeature);

function readyAddFeature(){
    $("#addFeature #create").on("tap", createFeature);
}

function createFeature(){
    let inputData = extractFormData("#addFeature input");
    let textData = extractFormData("#addFeature textarea");
    dbFeature.temp = {...inputData, ...textData};
    dbFeature.add();
    $.mobile.navigate("#features");
}
