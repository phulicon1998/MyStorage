(function($, doc){

    const loc = "#setting";

    $(doc).on("pageinit", loc, ready);
    $(doc).on("pagebeforeshow", loc, beforeShow);

    function beforeShow(){
        new protectDb().viewOne().then(rs => {
            $(`${loc} input`).val(rs[0].Code);
            $(`${loc} #protectSw`).val(rs[0].Activate).flipswitch("refresh");
        });
    }

    function ready(){
        $(`${loc} .body form .editBtn`).on("tap", edit);
        $(`${loc} #protectSw`).on("change", toggleProtect);
    }

    function toggleProtect(){
        let status = $(`${loc} .editBtn`).prop("disabled");
        $(`${loc} .editBtn`).prop("disabled", !status);
        new protectDb().updateState(Number($(this).val()));
    }

    function edit(e){
        e.preventDefault();
        let status = $(`${loc} input`).prop("disabled");
        if(status){
            $(this).addClass("save");
            $(`${loc} input`).prop("disabled", !status);
            $(this).text("SAVE");
        } else {
            $(this).removeClass("save");
            let modCode = $(`${loc} input`).val();
            let isDuplicate = modCode.split("").filter((val, i) => modCode.split("").indexOf(val) !== i).length;
            if(modCode.length !== 4 || isDuplicate > 0) {
                return alert("The code is a four-different-digit number. Please try again");
            }
            new protectDb().updateCode(modCode).then(rs => {
                $(`${loc} input`).prop("disabled", !status);
                $(this).text("EDIT");
            });
        }
    }
}(jQuery, document))
