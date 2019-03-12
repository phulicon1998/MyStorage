$(document).on("pageshow", "#features", prepareFeature);
$(document).on("pageinit", "#features", readyFeature);

var dbFeature;
const featureRm = {
    true: "img/remove-icon4.svg",
    false: "img/remove-icon4-blur.svg"
};

function readyFeature(){
    $("#features .features > div").on("tap", ".eachFeature", removeFeature);
}

function prepareFeature(){
    dbFeature = new featureDb();
    $("#features .features > .defaultFeature").empty();
    $("#features .features > .customFeature").empty();
    dbFeature.viewAll().then(result => {
        let features = Array.from(result.rows);
        features.forEach(feature => {
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
                    <image xlink:href="img/remove-icon4-blur.svg" class="removeState"/>
                </svg>
            </div>
        </div>`
    );
    row.data("id", feature.Id);
    $("#features .features > .customFeature").prepend(row);
}

function removeFeature(e){
    if(confirm("Do you want to remove this data?")){
        let id = $(e.target).parent().data("id");
        dbFeature.delete(id);
        prepare();
    }
}
