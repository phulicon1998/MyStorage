(function($, doc){

    let totalHiddenSpace;

    $(doc).on("pageshow", "#search", prepare);
    $(doc).on("pageshow", "#search", ready);

    function ready(){
        showMsg();
        $("#search .body > div").on("filterablefilter", showMsg);
    }

    function prepare(){
        $("#search .body > div").empty();
        new spaceDb().viewAll().then(result => {
            totalHiddenSpace = result.length;
            result.forEach(space => {
                let item = $(
                    `<div class="eachSpace">
                        <svg width="35" height="35">
                            <image xlink:href="img/spaces/space-icon2.svg"/>
                        </svg>
                        <div>
                            <div>
                                <p>${space.Address}</p>
                                <p>${space.TName} - <span>${space.Dimension} m2</span></p>
                            </div>
                            <p>${space.RentPrice}$</p>
                        </div>
                    </div>`
                );
                item.data("id", space.Id);
                $("#search .body > div").append(item);
            });
            $("#search .body > div").listview("refresh");
            $("#search .body > div").trigger("updatelayout");
        })
    }

    function showMsg(){
        let inpLength = $("#search .header input").val().length;
        let childLength = $("#search .ui-screen-hidden").length;
        if(inpLength === 0){
            $("#search .body > .msg").text("Enter address, type, rent price... to search");
        } else if(inpLength > 0 && childLength === totalHiddenSpace){
            $("#search .body > .msg").text("No space is found with entered information");
        } else {
            return $("#search .body > .msg").hide();
        }
        $("#search .body > .msg").show();
    }

}(jQuery, document))
