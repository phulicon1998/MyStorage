$(document).on("pageinit", "#addType", ready);

function ready(){
    $("#addType #create").on("tap", createType);
}

function createType(){
    let enteredType = extractFormData("#addType input");
    console.log(enteredType);
}
