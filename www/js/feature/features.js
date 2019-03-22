(function($, doc){
    $(doc).on("pagebeforeshow", "#features", beforeShow);
    $(doc).on("pageinit", "#features", ready);

    function ready(){
        $("#features .body > div").on("tap", ".removeFeature", remove);
        $("#features .body").on("tap", ".each", focus);
        $("#features .body .addBtn").on("tap", navigateAddFeature);
    }

    function beforeShow(){
        dbFeature = new featureDb();
        $("#features .body > .default").empty();
        $("#features .body > .custom").empty();
        dbFeature.viewAll().then(result => {
            result.forEach(feature => {
                if(!!feature.IsDefault) appendDefault(feature);
                else appendCustom(feature);
            })
        })
    }

    function appendDefault(feature){
        let row = $(`
            <div class="each">
                <svg width="35" height="35">
                    <image xlink:href="img/feature/feature-icon.svg"/>
                </svg>
                <div>
                    <div>
                        <p>${feature.FName}</p>
                        <p>${feature.FDesc}</p>
                    </div>
                </div>
            </div>`
        );
        $("#features .body > .default").prepend(row);
    }

    function appendCustom(feature){
        let row = $(`
            <div class="each">
                <svg width="35" height="35">
                    <image xlink:href="img/feature/feature-icon.svg"/>
                </svg>
                <div>
                    <div>
                        <p>${feature.FName}</p>
                        <p>${feature.FDesc}</p>
                    </div>
                    <svg width="25" height="25">
                        <image xlink:href="img/remove-icon4-blur.svg" class="removeFeature"/>
                    </svg>
                </div>
            </div>`
        );
        row.data("id", feature.Id);
        $("#features .body > .custom").prepend(row);
    }

    function unFocus(){
        $(".eachTap").removeClass("eachTap");
        $(".textTap").removeClass("textTap");
        $(".removeFeature").attr("xlink:href", rm_ico[false]);
    }

    function focus({target}){
        let each = $(target).closest(".each");
        let state = each.hasClass("eachTap");
        unFocus();
        if(state) return;
        each.toggleClass("eachTap");
        each.find("p:nth-of-type(1)").toggleClass("textTap");
        each.find(".removeFeature").attr("xlink:href", rm_ico[!state]);
    }

    function navigateAddFeature(){
        $.mobile.navigate("#addFeature");
    }

    function remove(e){
        e.stopPropagation();
        let each = $(e.target).parents(".each").hasClass("eachTap");
        if(each && confirm("Do you want to remove this data?")){
            let id = $(e.target).parents(".each").data("id");
            dbFeature.delete(id);
            beforeShow();
        }
    }

}(jQuery, document));
