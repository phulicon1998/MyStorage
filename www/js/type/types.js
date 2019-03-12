$(document).on("pageshow", "#types", prepareType);
$(document).on("pageinit", "#types", readyType);

var dbType;
const rm = {
    true: "img/remove-icon4.svg",
    false: "img/remove-icon4-blur.svg"
};

function readyType(){
    $("#types .types").on("tap", ".removeState", removeType);
    $("#types .types").on("tap", ".eachType", focusType);
    $("#types .types .addTypeBtn").on("tap", navigateAddType);
}

function prepareType(){
    dbType = new typeDb();
    $("#types .types > .defaultType").empty();
    $("#types .types > .customType").empty();
    dbType.viewAll().then(result => {
        let types = Array.from(result.rows);
        types.forEach(type => {
            if(!!type.IsDefault) appendDefaultType(type);
            else appendCustomType(type);
        })
    })
}

function navigateAddType(){
    $.mobile.navigate("#addType");
}

function appendDefaultType(type){
    let row = $(`
        <div class="eachType">
            <svg width="35" height="35">
                <image xlink:href="img/type/type-icon.svg"/>
            </svg>
            <div>
                <div>
                    <p>${type.Name}</p>
                    <p>${type.Desc}</p>
                </div>
            </div>
        </div>`
    );
    $("#types .types > .defaultType").prepend(row);
}

function appendCustomType(type){
    let row = $(`
        <div class="eachType">
            <svg width="35" height="35">
                <image xlink:href="img/type/type-icon.svg"/>
            </svg>
            <div>
                <div>
                    <p>${type.Name}</p>
                    <p>${type.Desc}</p>
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
    each.find(".removeState").attr("xlink:href", rm[!state]);
}

function clearFocusType(){
    $(".eachTypeTap").removeClass("eachTypeTap");
    $(".textTap").removeClass("textTap");
    $(".removeState").attr("xlink:href", rm[false]);
}

function removeType(e){
    e.stopPropagation();
    if(confirm("Do you want to remove this data?")){
        let id = $(e.target).closest(".eachType").data("id");
        console.log(id);
        dbType.delete(id);
        prepareType();
    }
}
