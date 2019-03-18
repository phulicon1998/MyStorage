(function($, doc){
    $(doc).on("pageshow", "#types", prepare);
    $(doc).on("pageinit", "#types", ready);

    function ready(){
        $("#types .types").on("tap", ".removeState", removeType);
        $("#types .types").on("tap", ".eachType", focusType);
        $("#types .types .addTypeBtn").on("tap", navigateAddType);
    }

    function prepare(){
        dbType = new typeDb();
        $("#types .types > .defaultType").empty();
        $("#types .types > .customType").empty();
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
            <div class="eachType">
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
        $("#types .types > .defaultType").prepend(row);
    }

    function showCustom(type){
        let row = $(`
            <div class="eachType">
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
        $("#types .types > .customType").prepend(row);
    }

    function focusType({target}){
        let each = $(target).closest(".eachType");
        let state = each.hasClass("eachTypeTap");
        clearFocusType();
        if(state) return;
        each.toggleClass("eachTypeTap");
        each.find("p:nth-of-type(1)").toggleClass("textTap");
        each.find(".removeState").attr("xlink:href", rm_ico[!state]);
    }

    function clearFocusType(){
        $(".eachTypeTap").removeClass("eachTypeTap");
        $(".textTap").removeClass("textTap");
        $(".removeState").attr("xlink:href", rm_ico[false]);
    }

    function removeType(e){
        e.stopPropagation();
        let each = $(e.target).parents(".eachType").hasClass("eachTypeTap");
        if(each && confirm("Do you want to remove this data?")){
            let id = $(e.target).closest(".eachType").data("id");
            dbType.delete(id);
            prepare();
        }
    }

}(jQuery, document));
