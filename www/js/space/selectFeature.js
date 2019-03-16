(function($, doc){

    $(doc).on("pageinit", "#selectFeature", ready);
    $(doc).on("pageshow", "#selectFeature", prepare);

    function prepare(){
        if(dbSpace) loadFeature(bindData);
        else $.mobile.navigate("#spaces");
    }

    function gatherFeatures(){
        let features = Array.from($("#selectFeature select"));
        let selectedFeat = features.filter(feature => $(feature).val() !== "0" && $(feature).val() !== null).map(feat => $(feat).val());
        if(selectedFeat.length > 0){
            dbSpace.temp.feature = selectedFeat;
            $.mobile.navigate("#confirm");
        } else {
            alert("Please select feature for the space");
        }
    }

    function loadFeature(next) {
        let dbFeature = new featureDb();
        $("#selectFeature form").empty();
        dbFeature.viewAll().then(result => {
            result.forEach(feature => {
                let state = "";
                if(feature.Name === "Share space" || feature.Name === "Private space"){
                    state = (feature.Name.split(" ")[0]).toLowerCase();
                }
                let featureRow = $(`
                    <div>
                        <div class="feature">
                            <label for="${state}">${feature.Name}</label>
                            <small>${feature.Desc}</small>
                        </div>
                        <select name="${state}" id="${state}" data-role="flipswitch" data-mini="true">
                            <option value="0"></option>
                            <option value=${feature.Id}></option>
                        </select>
                    </div>`
                );
                featureRow.data("Id", feature.Id);
                $("#selectFeature form").append(featureRow).enhanceWithin();
            })
            if(next) next();
        });
    }

    function bindData(){
        if(dbSpace.temp.feature){
            let features = dbSpace.temp.feature;
            features.forEach(val => {
                let otherSelects = Array.from($("#selectFeature select")).filter(select => $(select).val() === "0" || $(select).val() === null);
                $(otherSelects).val(val.toString()).flipswitch("refresh");
            })
        }
    }

    function ready() {
        $("#confirmBtn").on("tap", gatherFeatures);
        onState();
    }

    function offState(){
        $("form").off("change", "#share");
        $("form").off("change", "#private");
    }

    function onState(){
        $("form").on("change", "#share", offPrivate);
        $("form").on("change", "#private", offShare);
    }

    // RENDER function
    function offPrivate(e) {
        offState();
        let targetVal = $("#share").val();
        $("#share").val(targetVal).flipswitch("refresh");
        $("#private").val("0").flipswitch("refresh");
        onState();
    }

    function offShare() {
        offState();
        let targetVal = $("#private").val();
        $("#private").val(targetVal).flipswitch("refresh");
        $("#share").val("0").flipswitch("refresh");
        onState();
    }

}(jQuery, document));
