(function($, doc){

    $(doc).on("pageinit", "#confirm", ready);
    $(doc).on("pageshow", "#confirm", bindData);

    function ready(){
        $("#agreeBtn").on("tap", storeData);
        $("#backEditBtn").on("tap", backToEdit);
    }

    // DATA FUNCTION
    function storeData(){
        dbSpace.temp.dateTime = new Date().toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).toString();
        let {feature} = dbSpace.temp;
        delete dbSpace.temp["feature"];
        dbSpace.add().then(id => {
            new space_featureDb().add(id, feature);
            $.mobile.navigate("#spaces");
        });
    }

    // RENDER FUNCTION
    function backToEdit(){
        $.mobile.navigate("#addSp");
    }

    function bindData(){
        if(dbSpace){
            bindText();
            bindFeature();
            bindNote();
        } else {
            $.mobile.navigate("#spaces");
        }
    }

    function bindText(){
        let confirmView = {...dbSpace.temp};
        let listData = Object.keys(confirmView);
        new typeDb().viewOne(dbSpace.temp.type).then(result => {
            confirmView.type = result[0].TName;
            listData.forEach(key => {
                $(`#confirm .body #${key}`).text(`${confirmView[key]}`);
            });
        })
    }

    function bindFeature(){
        $(".listFeature").empty();
        new featureDb().viewByListId(dbSpace.temp.feature).then(result => {
            let selected = result.map(arr => arr[0]);
            selected.forEach(feat => {
                let featView = $(`
                    <div>
                        <svg width="35" height="35">
                            <image xlink:href="../img/feature/feature-icon.svg"/>
                        </svg>
                        <div>
                            <p>${feat.FName}</p>
                            <small>${feat.FDesc}</small>
                        </div>
                    </div>
                    `)
                $(".listFeature").append(featView);
            })
            let genTime = $("<p>The time will be generated after confirming information</p>");
            $(".listFeature").append(genTime);
        });
    }

    function bindNote(){
        $("#confirm .body .notePlot").empty();
        if(!dbSpace.temp.note || dbSpace.temp.note === ""){
            $("#confirm .body .notePlot").append($("<p class='empty'>There is no note here...</p>"));
        } else {
            $("#confirm .body .notePlot").append($(`<p>${dbSpace.temp.note}</p>`));
        }
    }

}(jQuery, document))
