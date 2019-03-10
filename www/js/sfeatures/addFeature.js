$(document).on("pageinit", "#addFeature", ready);
function ready(){
    $("#addFeature #create").on("tap", createFeature);
}

function createFeature(){
    let inputData = extractFormData("#addFeature input");
    let textData = extractFormData("#addFeature textarea");
    dbSFeature.temp = {...inputData, ...textData};
    dbSFeature.add();
    $.mobile.navigate("#sfeatures");
}
