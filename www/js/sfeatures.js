$(document).on("pageshow", "#sfeatures", ready);

function ready(){
    $("#sfeatures .sfeatures > div").empty();
    sFeatureDb.view().then(result => {
        let features = Array.from(result.rows);
        features.forEach(feat => {
            $("#sfeatures .sfeatures > div").prepend(JSON.stringify(feat));
        })
    })
}
