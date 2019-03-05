function extractFormData(selector){
    let inputList = $(selector);
    return (Array.from(inputList)).reduce((user, input) => {
        let name = $(input).attr("name");
        if($(input).attr("type") === "radio") {
            user[name] = $(`input[name=${name}]:checked`).val() || "";
        } else {
            user[name] = $(input).val();
        }
        return user;
    }, {});
}

function isEmpty(selector){
    return Array.from($(selector)).some(tag => $(tag).val() === "");
}
