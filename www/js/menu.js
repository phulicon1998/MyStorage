(function($, doc){

    $(doc).on("pageinit", ready);

    function ready(){
        $("#menu .navigate").on("tap", changePage);
    }

    function changePage(e){
        $(".navigate").removeClass("navigateSelect");
        $(e.target).closest(".navigate").addClass("navigateSelect");
    }

}(jQuery, document));
