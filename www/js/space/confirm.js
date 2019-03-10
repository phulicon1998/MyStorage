$(document).on("pageinit", "#confirmInfo", ready);
$(document).on("pageshow", "#confirmInfo", bindData);

function ready(){
    $("#agreeBtn").on("tap", storeData);
    $("#backEditBtn").on("tap", backToEdit);
}

// DATA FUNCTION
function storeData(){
    dbHandler.tempSpace.dateTime = new Date().toLocaleString('en-GB', {
	    day: 'numeric',
	    month: 'short',
	    year: 'numeric',
	    hour: '2-digit',
	    minute: '2-digit',
    }).toString();
    spaceDb.add();
    dbHandler.tempSpace = {};
    $.mobile.navigate("#spaces");
}

// RENDER FUNCTION
function backToEdit(){
    $.mobile.navigate("#addSp");
}

function bindData(){
    bindText();
    bindFeature();
    bindNote();
}

function bindText(){
    let listData = Object.keys(dbHandler.tempSpace);
    listData.forEach(key => {
        $(`.confirm #${key}`).text(`${dbHandler.tempSpace[key]}`);
    });
}

function bindFeature(){
    $(".listFeature").empty();
    let selectedFeat = dbHandler.tempSpace.feature.split(",");
    selectedFeat.forEach(feat => {
        let featView = $(`
            <div>
                <svg width="35" height="35">
                    <image xlink:href=${hashFeatures[feat].img}/>
                </svg>
                <div>
                    <p>${hashFeatures[feat].name}</p>
                    <small>${hashFeatures[feat].desc}</small>
                </div>
            </div>
        `)
        $(".listFeature").append(featView);
    })
    let genTime = $("<p>The time will be generated after confirming information</p>")
    $(".listFeature").append(genTime);
}

function bindNote(){
    $(".confirm .notePlot").empty();
    if(!dbHandler.tempSpace.note || dbHandler.tempSpace.note === ""){
        $(".confirm .notePlot").append($("<p class='empty'>There is no note here...</p>"));
    } else {
        $(".confirm .notePlot").append($(`<p>${dbHandler.tempSpace.note}</p>`));
    }
}
