$(document).on("pageshow", "#sfeatures", prepare);
$(document).on("pageinit", "#sfeatures", ready);

function prepare(){
    dbSFeature = new sFeatureDb();
    $("#sfeatures .sfeatures > div").empty();
    dbSFeature.viewAll().then(result => {
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

function ready(){
    $("#sfeatures .sfeatures > div").on("tap", ".eachFeature", removeFeature);
}

function removeFeature(e){
    if(confirm("Do you want to remove this data?")){
        let id = $(e.target).parent().data("id");
        dbSFeature.delete(id);
        prepare();
    }
}
