$(document).on("pageshow", "#features", prepareFeature);
$(document).on("pageinit", "#features", readyFeature);

var dbFeature;
const featureRm = {
    true: "img/remove-icon4.svg",
    false: "img/remove-icon4-blur.svg"
};

function readyFeature(){
    $("#features .features > div").on("tap", ".removeFeature", removeFeature);
    $("#features .features").on("tap", ".eachFeature", focusFeature);
    $("#features .features .addFeatureBtn").on("tap", navigateAddFeature);
}

function prepareFeature(){
    dbFeature = new featureDb();
    $("#features .features > .defaultFeature").empty();
    $("#features .features > .customFeature").empty();
    dbFeature.viewAll().then(result => {
        result.forEach(feature => {
            if(!!feature.IsDefault) appendDefaultFeature(feature);
            else appendCustomFeature(feature);
        })
    })
}

function appendDefaultFeature(feature){
    let row = $(`
        <div class="eachFeature">
            <svg width="35" height="35">
                <image xlink:href="img/feature/feature-icon.svg"/>
            </svg>
            <div>
                <div>
                    <p>${feature.Name}</p>
                    <p>${feature.Desc}</p>
                </div>
            </div>
        </div>`
    );
    $("#features .features > .defaultFeature").prepend(row);
}

function appendCustomFeature(feature){
    let row = $(`
        <div class="eachFeature">
            <svg width="35" height="35">
                <image xlink:href="img/feature/feature-icon.svg"/>
            </svg>
            <div>
                <div>
                    <p>${feature.Name}</p>
                    <p>${feature.Desc}</p>
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

function clearFocusFeature(){
    $(".eachFeatureTap").removeClass("eachFeatureTap");
    $(".textTap").removeClass("textTap");
    $(".removeFeature").attr("xlink:href", featureRm[false]);
}

function focusFeature({target}){
    let each = $(target).closest(".eachFeature");
    let state = each.hasClass("eachFeatureTap");
    clearFocusFeature();
    if(state) return;
    each.toggleClass("eachFeatureTap");
    each.find("p:nth-of-type(1)").toggleClass("textTap");
    each.find(".removeFeature").attr("xlink:href", featureRm[!state]);
}

function navigateAddFeature(){
    $.mobile.navigate("#addFeature");
}

function removeFeature(e){
    e.stopPropagation();
    let each = $(e.target).parents(".eachFeature").hasClass("eachFeatureTap");
    if(each && confirm("Do you want to remove this data?")){
        let id = $(e.target).parents(".eachFeature").data("id");
        dbFeature.delete(id);
        prepareFeature();
    }
}
