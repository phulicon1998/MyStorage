(function($, doc){

    const loc = "#types";
    const hd = loc + " .header";
    const bd = loc + " .body";

    $(doc).on("pagebeforeshow", loc, beforeShow);
    $(doc).on("pageinit", loc, ready);

    function ready(){
        $(bd).on("tap", ".removeState", removeType);
        $(bd).on("tap", ".each", focusType);
        $(bd + " .addTypeBtn").on("tap", navigateAddType);
    }

    function beforeShow(){
        dbType = new typeDb();
        $(bd + " > .default").empty();
        $(bd + " > .custom").empty();
        dbType.viewAll().then(result => {
            result.forEach(type => {
                if(!!type.IsDefault) showDefault(type);
                else showCustom(type);
            })
        })
    }

    function navigateAddType(){
        $.mobile.navigate("#addType");
    }

    function showDefault(type){
        let row = $(`
            <div class="each">
                <svg width="35" height="35">
                    <image xlink:href="img/type/type-icon.svg"/>
                </svg>
                <div>
                    <div>
                        <p>${type.TName}</p>
                        <p>${type.TDesc}</p>
                    </div>
                </div>
            </div>`
        );
        $(bd + " > .default").prepend(row);
    }

    function showCustom(type){
        let row = $(`
            <div class="each">
                <svg width="35" height="35">
                    <image xlink:href="img/type/type-icon.svg"/>
                </svg>
                <div>
                    <div>
                        <p>${type.TName}</p>
                        <p>${type.TDesc}</p>
                    </div>
                    <svg width="25" height="25">
                        <image xlink:href="img/remove-icon4-blur.svg" class="removeState"/>
                    </svg>
                </div>
            </div>`
        );
        row.data("id", type.Id);
        $(bd + " > .custom").prepend(row);
    }

    function focusType({target}){
        let each = $(target).closest(".each");
        let state = each.hasClass("eachTap");
        clearFocusType();
        if(state) return;
        each.toggleClass("eachTap");
        each.find("p:nth-of-type(1)").toggleClass("textTap");
        each.find(".removeState").attr("xlink:href", rm_ico[!state]);
    }

    function clearFocusType(){
        $(".eachTap").removeClass("eachTap");
        $(".textTap").removeClass("textTap");
        $(".removeState").attr("xlink:href", rm_ico[false]);
    }

    function removeType(e){
        e.stopPropagation();
        let each = $(e.target).parents(".each").hasClass("eachTap");
        if(each && confirm("Do you want to remove this data?")){
            let id = $(e.target).closest(".each").data("id");
            dbType.delete(id).then(() => beforeShow());
        }
    }

}(jQuery, document));
