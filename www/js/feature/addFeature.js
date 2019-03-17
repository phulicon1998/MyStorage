(function($, doc){
    $(doc).on("pageinit", "#addFeature", ready);

    function ready(){
        $("#addFeature #create").on("tap", create);
    }

    function create(){
        let inputData = fu.extract("#addFeature input");
        let textData = fu.extract("#addFeature textarea");
        dbFeature.temp = {...inputData, ...textData};
        dbFeature.add();
        $.mobile.navigate("#features");
    }

}(jQuery, document));
