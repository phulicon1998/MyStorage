(function($, doc){

    $(doc).on("pageinit", "#addSpace", ready);
    $(doc).on("pageshow", "#addSpace", prepare);

    // PREPARE & READY
    function ready() {
        $("#addSpace input").on("focusin", focusInput);
        $("#addSpace input").on("focusout", unfocusInput);

        $("#addSpace select").on("focusin", focusSelect);
        $("#addSpace select").on("focusout", unfocusSelect);
        $("#addSpace select").on("change", updateSelectChange);

        $("#addSpace .contBtn").on("tap", save);
        $("#addSpace .cancelBtn").on("tap", cancelForm);

        $("#addSpace .clear").on("tap", (e) => clearForm());
    }

    function prepare(){
        if(dbSpace) return clearForm(bindData);
        return cancelForm();
    }

    // HANDLER FUNCTION
    function save() {
        let empty = fu.isEmpty("#addSpace input");
        if(!empty){
            dbSpace.checkDuplicateAdddress().then(result => {
                let textData = fu.extract("#addSpace input");
                let {storageType} = fu.extract("#addSpace select");
                let {note} = fu.extract("#addSpace textarea");
                if(storageType !== "0" && result.length == 0){
                    let {temp} = dbSpace;
                    dbSpace.temp = {...temp, storageType ,...textData, note};
                    $.mobile.navigate("#selectFeature");
                } else {
                    alert("Please enter all required information");
                }
            })
        } else {
            alert("Please enter all required information");
        }
    }

    function cancelForm(){
        $.mobile.navigate("#spaces");
        clearForm();
    }

    // RENDER FUNCTION
    function clearForm(next = false){
        $(`label`).removeClass("focusInput");
        $("#addSpace select[name='storageType']").empty();
        let typeList = new typeDb().viewAll().then(result => {
            $("select[name='storageType']").append($(`<option value="0">< Please select type ></option>`));
            result.forEach(type => {
                let typeRow = $(`<option value="${type.Id}">${type.Name}</option>`);
                $("select[name='storageType']").append(typeRow);
            });
            updateSelectChange();
            fu.clear("#addSpace input", "#addSpace textarea");
            if(next) next();
        });
    }

    function bindData(){
        if(Object.keys(dbSpace.temp).length > 0){
            fu.bind("#addSpace select", dbSpace.temp);
            fu.bind("#addSpace input", dbSpace.temp);
            fu.bind("#addSpace textarea", dbSpace.temp);
            $("label").addClass("focusInput");
            updateSelectChange();
        }
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
        if($(`select[name='storageType']`).val() === "0"){
            $(`label[for=${e.target.name}]`).removeClass("focusInput");
        }
    }

    function updateSelectChange(){
        if($(`select[name='storageType']`).val() && $(`select[name='storageType']`).val() !== "0"){
            $(`select[name='storageType']`).removeClass("unselect");
        } else {
            $(`select[name='storageType']`).addClass("unselect");
        }
    }

}(jQuery, document));
