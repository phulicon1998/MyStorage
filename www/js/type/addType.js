(function($, doc){
    $(doc).on("pageinit", "#addType", ready);

    function ready(){
        $("#addType #create").on("tap", create);
    }

    function create(){
        let inputData = fu.extract("#addType input");
        let textData = fu.extract("#addType textarea");
        dbType.temp = {...inputData, ...textData};
        dbType.add();
        $.mobile.navigate("#types");
    }
}(jQuery, document))
