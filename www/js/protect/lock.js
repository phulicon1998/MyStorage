(function($, doc){

    const loc = "#lock";
    const bd = `${loc} .body`;
    const numBtn = `${bd} .listBtn li`;
    const rounds = `${bd} > div > ul > li`;
    const img = `${bd} > div > img`;
    let input;

    $(doc).on("pageinit", loc, ready);
    $(doc).on("pagebeforeshow", loc, beforeShow);

    function ready() {
        $(numBtn).on("tap", pressBtn);
    }

    function beforeShow(){
        input = "";
    }

    function pressBtn(){
        $(this).toggleClass("press");
        input += $(this).text();
        fillRound($(this).hasClass("press"));
    }

    function fillRound(tap){
        let roundList = Array.from($(rounds)).filter(round => $(round).hasClass("fill") === !tap);
        $(roundList[tap ? 0 : roundList.length - 1]).toggleClass("fill");
        if(roundList.length - 1 === 0){
            new protectDb().viewOne().then(rs => {
                if(rs[0].Code === input){
                    $.mobile.navigate("#spaces");
                } else {
                    $(img).addClass("wrong");
                    setTimeout(() => {
                        $(`${bd} .fill`).removeClass("fill");
                        $(`${bd} .press`).removeClass("press");
                        $(img).removeClass("wrong");
                        beforeShow();
                    }, 500);
                }
            })
        }
    }

}(jQuery, document))
