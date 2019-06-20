(function($, doc){
    $(doc).on("pageinit", "#addType", ready);
    $(doc).on("pagebeforeshow", "#addType", beforeShow);

    function beforeShow(){
        $(`#addType label`).removeClass("focusInput");
        fu.clear("#addType input", "#addType textarea");
    }

    function ready(){
        $("#addType #create").on("tap", create);
        $(`#addType input`)
            .on("focusin", focusInput)
            .on("focusout", unfocusInput);
        $(`#addType textarea`)
            .on("focusin", focusInput)
            .on("focusout", unfocusInput);
    }

    function focusInput(e) {
        let tagName = $(e.target).prop("tagName").toLowerCase();
        if($(`#addType ${tagName}[name=${e.target.name}]`).val() === "")
        $(`#addType label[for=${e.target.name}]`).addClass("focusInput");
    }

    function unfocusInput(e) {
        let tagName = $(e.target).prop("tagName").toLowerCase();
        if($(`#addType ${tagName}[name=${e.target.name}]`).val() === "")
        $(`#addType label[for=${e.target.name}]`).removeClass("focusInput");
    }

    function create(){
        let inputData = fu.extract("#addType input");
        let textData = fu.extract("#addType textarea");
        dbType.temp = {...inputData, ...textData};
        dbType.add();
        $.mobile.navigate("#types");
    }
}(jQuery, document))
