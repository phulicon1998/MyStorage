(function($, doc){

    const loc = "#selectFeature";

    $(doc).on("pageinit", loc, ready);
    $(doc).on("pagebeforeshow", loc, beforeShow);

    function beforeShow(){
        if(dbSpace) load(bind);
        else $.mobile.navigate("#spaces");
    }

    function gatherFeatures(){
        let features = Array.from($(`${loc} select`));
        let selectedFeat = features.filter(feature => $(feature).val() !== "0" && $(feature).val() !== null).map(feat => $(feat).val());
        if(selectedFeat.length > 0){
            dbSpace.temp.feature = selectedFeat;
            if(dbSpace.temp.id){
                console.log(dbSpace.temp);
            } else {
                $.mobile.navigate("#confirm");
            }
        } else {
            alert("Please select feature for the space");
        }
    }

    function load(next) {
        let dbFeature = new featureDb();
        $(`${loc} form`).empty();
        dbFeature.viewAll().then(result => {
            result.forEach(feature => {
                let state = "";
                if(feature.FName === "Share space" || feature.FName === "Private space"){
                    state = (feature.FName.split(" ")[0]).toLowerCase();
                }
                let featureRow = $(`
                    <div>
                        <div class="feature">
                            <label for="${state}">${feature.FName}</label>
                            <small>${feature.FDesc}</small>
                        </div>
                        <select name="${state}" id="${state}" data-role="flipswitch" data-mini="true">
                            <option value="0"></option>
                            <option value=${feature.Id}></option>
                        </select>
                    </div>`
                );
                featureRow.data("Id", feature.Id);
                $(`${loc} form`).append(featureRow).enhanceWithin();
            })
            if(next) next();
        });
    }

    function bind(){
        if(dbSpace.temp.feature){
            const {temp} = dbSpace;
            let features = temp.Id ? temp.feature.map(feat => feat.id) : temp.feature;
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
