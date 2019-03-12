$(document).on("pageshow", "#sfeatures", prepareFeature);
$(document).on("pageinit", "#sfeatures", readyFeature);

var dbFeature;

function prepareFeature(){
    dbFeature = new sFeatureDb();
    $("#sfeatures .sfeatures > div").empty();
    dbFeature.viewAll().then(result => {
        let features = Array.from(result.rows);
        features.forEach(feat => {
            let row = $(`
                <div class="eachFeature">
                    <p>${JSON.stringify(feat)}</p>
                    <button>del</button>
                </div>`
            );
            row.data("id", feat.Id);
            $("#sfeatures .sfeatures > div").prepend(row);
        })
    })
}

function readyFeature(){
    $("#sfeatures .sfeatures > div").on("tap", ".eachFeature", removeFeature);
}

function removeFeature(e){
    if(confirm("Do you want to remove this data?")){
        let id = $(e.target).parent().data("id");
        dbFeature.delete(id);
        prepare();
    }
}
