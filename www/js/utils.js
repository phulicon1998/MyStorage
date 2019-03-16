class FU {

    extract = selector => {
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

    isEmpty = selector => Array.from($(selector)).some(tag => $(tag).val() === "");

    bind = (selector, data) => {
        let keys = Object.keys(data);
        if(keys.length > 0){
            keys.forEach(key => {
                let field = $(`${selector}[name=${key}]`);
                if(field.val() || field.val() === "") {
                    field.val(data[key]);
                }
            })
        }
    }

    clear = (...selectors) => {
        selectors.forEach(selector => {
            let inputList = Array.from($(selector));
            inputList.forEach(val => {
                if($(selector).val()) $(selector).val("");
            })
        })
    }

}
