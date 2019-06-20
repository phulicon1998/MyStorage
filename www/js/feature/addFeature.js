(function($, doc){
    $(doc).on("pageinit", "#addFeature", ready);
    $(doc).on("pagebeforeshow", "#addFeature", beforeShow);

    function beforeShow(){
        $(`#addFeature label`).removeClass("focusInput");
        fu.clear("#addFeature input", "#addFeature textarea");
    }

    function ready(){
        $("#addFeature #create").on("tap", create);
        $(`#addFeature input`)
            .on("focusin", focusInput)
            .on("focusout", unfocusInput);
        $(`#addFeature textarea`)
            .on("focusin", focusInput)
            .on("focusout", unfocusInput);
    }

    function focusInput(e) {
        let tagName = $(e.target).prop("tagName").toLowerCase();
        if($(`#addFeature ${tagName}[name=${e.target.name}]`).val() === "")
        $(`#addFeature label[for=${e.target.name}]`).addClass("focusInput");
    }

    function unfocusInput(e) {
        let tagName = $(e.target).prop("tagName").toLowerCase();
        if($(`#addFeature ${tagName}[name=${e.target.name}]`).val() === "")
        $(`#addFeature label[for=${e.target.name}]`).removeClass("focusInput");
    }


    function create(){
        let inputData = fu.extract("#addFeature input");
        let textData = fu.extract("#addFeature textarea");
        dbFeature.temp = {...inputData, ...textData};
        dbFeature.add();
        $.mobile.navigate("#features");
    }

}(jQuery, document));
