$(document).on("pageinit", "#addType", ready);

function ready(){
    $("#addType #create").on("tap", createType);
}

function createType(){
    let inputData = extractFormData("#addType input");
    let textData = extractFormData("#addType textarea");
    dbStype.temp = {...inputData, ...textData};
    dbStype.add();
    $.mobile.navigate("#stypes");
}
