(function($, doc){
    $(doc).on("pageinit", "#spaces", ready);
    $(doc).on("pageshow", "#spaces", load);


    function ready(){
        $("#spaces .spaces > div").on("click", ".eachSpace", access);
    }

    function access(e) {
        let spaceId = $(e.target).closest(".eachSpace").data("id");
        dbSpace.viewOne(spaceId);
        $.mobile.navigate("#detail");
    }

    function load() {
        $("#spaces .spaces > div").empty();
        dbSpace = new spaceDb();
        dbSpace.viewAll().then(result => {
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
                $("#spaces .spaces > div").append(item);
            })
        });
    }

}(jQuery, document));
