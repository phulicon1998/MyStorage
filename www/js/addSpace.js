$(document).on("pageinit", "#addSp", () => {
    $("#addSp input").on("tap", (e) => {
        if($(`#addSp input[name=${e.target.name}]`).val() === "")
            $(`label[for=${e.target.name}]`).addClass("focusInput");
    })

    $("#addSp input").on("focusout", (e) => {
        if($(`#addSp input[name=${e.target.name}]`).val() === "")
            $(`label[for=${e.target.name}]`).removeClass("focusInput");
    })

    $(".cancelBtn").on("tap", function(){
        $.mobile.navigate("#spaces");
    })

})
