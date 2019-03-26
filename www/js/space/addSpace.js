(function($, doc){

    const loc = "#addSpace";
    const hd = loc + " .header";
    const bd = loc + " .body";

    $(doc).on("pageinit", loc, ready);
    $(doc).on("pagebeforeshow", loc, beforeShow);

    function beforeShow(){
        if(!dbSpace) return cancel();
        $(`${hd} > div > p:nth-of-type(1)`).text((dbSpace.temp.Id ? "Edit" : "Enter") + " Space Information");
        clear(bindData);
    }

    // PREPARE & READY
    function ready() {
        $(`${bd} input`)
            .on("focusin", focusInput)
            .on("focusout", unfocusInput);

        $(`${bd} select`)
            .on("focusin", focusSelect)
            .on("focusout", unfocusSelect)
            .on("change", updateSelectChange);

        $(`${hd} .contBtn`).on("tap", save);
        $(`${hd} > a`).on("tap", cancel);
    }

    // HANDLER FUNCTION
    function bindData(){
        if(dbSpace.temp.Id){
            dbSpace.temp.feature = dbSpace.temp.feature.map(feat => feat.id);
        }
        if(Object.keys(dbSpace.temp).length > 0){
            if(dbSpace.temp.Id){
                dbSpace.temp = fu.lowerKey(dbSpace.temp);
            }
            fu.bind(`${bd} select`, dbSpace.temp);
            fu.bind(`${bd} input`, dbSpace.temp);
            fu.bind(`${bd} textarea`, dbSpace.temp);
            $("label").addClass("focusInput");
            updateSelectChange();
        }
    }

    function save() {
        let empty = fu.isEmpty(`${bd} input`);
        let {type} = fu.extract(`${bd} select`);
        if(!empty && type !== "0"){
            let text = fu.extract(`${bd} input`);
            let {note} = fu.extract(`${bd} textarea`);
            dbSpace.checkDuplicateAdddress(text.address).then(result => {
                if(result.length === 0){
                    let {temp} = dbSpace;
                    dbSpace.temp = {...temp, type ,...text, note};
                    $.mobile.navigate("#selectFeature");
                } else {
                    alert("The address is available. Please try different address");
                }
            })
        } else {
            alert("Please enter all required information");
        }
    }

    function cancel(){
        clear();
        $.mobile.navigate("#spaces");
    }

    // RENDER FUNCTION
    function clear(next = false){
        $(`label`).removeClass("focusInput");
        $(`${bd} select[name='type']`).empty();
        let typeList = new typeDb().viewAll().then(result => {
            $(`${bd} select[name='type']`).append($(`<option value="0">< Please select type ></option>`));
            result.forEach(type => {
                let typeRow = $(`<option value="${type.Id}">${type.TName}</option>`);
                $(`${bd} select[name='type']`).append(typeRow);
            });
            updateSelectChange();
            fu.clear("#addSpace input", "#addSpace textarea");
            if(next) next();
        });
    }

    function focusInput(e) {
        let tagName = $(e.target).prop("tagName").toLowerCase();
        if($(`#addSpace ${tagName}[name=${e.target.name}]`).val() === "")
        $(`label[for=${e.target.name}]`).addClass("focusInput");
    }

    function unfocusInput(e) {
        let tagName = $(e.target).prop("tagName").toLowerCase();
        if($(`#addSpace ${tagName}[name=${e.target.name}]`).val() === "")
        $(`label[for=${e.target.name}]`).removeClass("focusInput");
    }

    function focusSelect(e){
        $(`label[for=${e.target.name}]`).addClass("focusInput");
    }

    function unfocusSelect(e){
        if($(`select[name='type']`).val() === "0"){
            $(`label[for=${e.target.name}]`).removeClass("focusInput");
        }
    }

    function updateSelectChange(){
        if($(`select[name='type']`).val() && $(`select[name='type']`).val() !== "0"){
            $(`select[name='type']`).removeClass("unselect");
        } else {
            $(`select[name='type']`).addClass("unselect");
        }
    }

}(jQuery, document));
