(function($, doc){
    $(doc).on("pageshow", "#detail", prepare);

    function prepare(){
        if(dbSpace){
            bindText();
            bindFeature();
            bindNote();
        } else {
            $.mobile.navigate("#spaces");
        }
    }

    function bindText(){
        let props = Object.keys(dbSpace.temp);
        let verifiedProps = props.map(fu.lowerFirstLetter);
        verifiedProps.forEach(key => {
            $(`#detail .body #${key}`).text(`${dbSpace.temp[fu.upperFirstLetter(key)]}`);
        });
    }

    function bindFeature(){
        $(".listFeature").empty();
            dbSpace.temp.feature.forEach(feat => {
                let featView = $(`
                    <div>
                        <svg width="35" height="35">
                            <image xlink:href="../img/feature/feature-icon.svg"/>
                        </svg>
                        <div>
                            <p>${feat.name}</p>
                            <small>${feat.desc}</small>
                        </div>
                    </div>
                    `)
                $(".listFeature").append(featView);
            })
            let genTime = $(`<p>Created at ${dbSpace.temp.DateTime}</p>`);
            $(".listFeature").append(genTime);
    }

    function bindNote(){
        $("#detail .body .notePlot").empty();
        if(!dbSpace.temp.note || dbSpace.temp.note === ""){
            $("#detail .body .notePlot").append($("<p class='empty'>There is no note here...</p>"));
        } else {
            $("#detail .body .notePlot").append($(`<p>${dbSpace.temp.note}</p>`));
        }
    }

}(jQuery, document))
