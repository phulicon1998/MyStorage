(function($, doc){
    $(doc).on("pageshow", "#features", prepare);
    $(doc).on("pageinit", "#features", ready);

    function ready(){
        $("#features .features > div").on("tap", ".removeFeature", remove);
        $("#features .features").on("tap", ".eachFeature", focus);
        $("#features .features .addFeatureBtn").on("tap", navigateAddFeature);
    }

    function prepare(){
        dbFeature = new featureDb();
        $("#features .features > .defaultFeature").empty();
        $("#features .features > .customFeature").empty();
        dbFeature.viewAll().then(result => {
            result.forEach(feature => {
                if(!!feature.IsDefault) appendDefault(feature);
                else appendCustom(feature);
            })
        })
    }

    function appendDefault(feature){
        let row = $(`
            <div class="eachFeature">
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
        $("#features .features > .defaultFeature").prepend(row);
    }

    function appendCustom(feature){
        let row = $(`
            <div class="eachFeature">
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
        $("#features .features > .customFeature").prepend(row);
    }

    function unFocus(){
        $(".eachFeatureTap").removeClass("eachFeatureTap");
        $(".textTap").removeClass("textTap");
        $(".removeFeature").attr("xlink:href", rm_ico[false]);
    }

    function focus({target}){
        let each = $(target).closest(".eachFeature");
        let state = each.hasClass("eachFeatureTap");
        unFocus();
        if(state) return;
        each.toggleClass("eachFeatureTap");
        each.find("p:nth-of-type(1)").toggleClass("textTap");
        each.find(".removeFeature").attr("xlink:href", rm_ico[!state]);
    }

    function navigateAddFeature(){
        $.mobile.navigate("#addFeature");
    }

    function remove(e){
        e.stopPropagation();
        let each = $(e.target).parents(".eachFeature").hasClass("eachFeatureTap");
        if(each && confirm("Do you want to remove this data?")){
            let id = $(e.target).parents(".eachFeature").data("id");
            dbFeature.delete(id);
            prepare();
        }
    }
}(jQuery, document));
