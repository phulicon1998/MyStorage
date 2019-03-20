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

    lowerFirstLetter = word => /^[A-Z]/.test(word[0]) ? word[0].toLowerCase() + word.substring(1) : word;

    upperFirstLetter = word => word[0].toUpperCase() + word.substring(1);

    lowerKey = obj => {
        return Object.keys(obj).reduce((acc, next) => {
            acc[this.lowerFirstLetter(next)] = obj[next];
            return acc;
        }, {});
    }

}
