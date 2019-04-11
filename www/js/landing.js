(function(doc, $){

    const loc = "#landing";

    $(doc).on("pageinit", loc, ready);

    function ready(){
        $(`${loc} .access`).on("tap", accessWay);
    }

    function accessWay(){
        new protectDb().viewOne().then(rs => {
            if(!!rs[0].Activate){
                $.mobile.navigate("#lock");
            } else {
                $.mobile.navigate("#spaces");
            }
        })
    }

}(document, jQuery))
