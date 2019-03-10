$(document).on("pageinit", "#landing", ready);

function ready(){
    db.connect();
    db.loadType();
    db.loadFeature();
}
