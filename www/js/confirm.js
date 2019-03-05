$(document).on("pageinit", "#confirmInfo", ready);
$(document).on("pageshow", "#confirmInfo", bindData);

function ready(){
    $("#agreeBtn").on("tap", storeData);
    $("#backEditBtn").on("tap", backToEdit);
}

// DATA FUNCTION
function storeData(){
    dbHandler.tempData.dateTime = new Date().toString();
    $.mobile.navigate("#spaces");
}

// RENDER FUNCTION
function backToEdit(){
    $.mobile.navigate("#addSp");
}

function bindData(){
    let listData = Object.keys(dbHandler.tempData);
    listData.forEach(key => {
        $(`.confirm #${key}`).text(`${dbHandler.tempData[key]}`);
    });
    let selectedFeat = dbHandler.tempData.feature.split(",");
    selectedFeat.forEach(feat => {
        let featView = $(`
            <div>
                <svg width="35" height="35">
                    <image xlink:href="img/confirm/space-icon.svg"/>
                </svg>
                <div>
                    <p>Private space</p>
                    <small>Space only for one type of product</small>
                </div>
            </div>
        `)
    })
    $(".confirm .notePlot").empty();
    if(!dbHandler.tempData.note || dbHandler.tempData.note === ""){
        $(".confirm .notePlot").append($("<p class='empty'>There is no note here...</p>"));
    } else {
        $(".confirm .notePlot").append($(`<p>${dbHandler.tempData.note}</p>`));
    }
}
