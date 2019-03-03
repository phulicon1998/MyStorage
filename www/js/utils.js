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

// function capitalize(word){
//     let letters = word.split("");
//     let first = (letters.splice(0, 1)).toString();
//     return `${first.toUpperCase()}${letters.join("").toLowerCase()}`;
// }
//
// function addProduct(e){
//     e.preventDefault();
//     let user = extractFormData();
//     console.log(user);
//     //validation
//     let allEmpty = Object.keys(user).every(key => user[key] === "");
//         if(allEmpty) return alert("Please fill in before submit!");
//
//     let checkEachEmpty = Object.keys(user).forEach(key => {
//         if(user[key] === "") return alert(`${capitalize(key)} is required`);
//     })
//
//     let birthYear = Number(new Date(user.birthday).getFullYear());
//     let curYear = Number(new Date().getFullYear());
//     if(curYear - birthYear < 18) return alert("Grow up, man");
// }
