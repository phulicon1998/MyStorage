$(document).on("pageinit", "#spaces", ready);
$(document).on("pageshow", "#spaces", loadSpaces);

function ready(){
    $('#menu').enhanceWithin().panel();
    $("#spaces .spaces > div").on("click", ".eachSpace", accessDetail);
}

function accessDetail(e) {
    let spaceId = $(e.target).closest(".eachSpace").data("id");
    spaceDb.detail(spaceId);
    $.mobile.navigate("#detail");
}

function loadSpaces() {
    $("#spaces .spaces > div").empty();
    let dbSpace = new spaceDb();
    dbSpace.viewAll().then(result => {
        let listSpaces = Array.from(result.rows);
        listSpaces.forEach(space => {
            let item = $(
                `<div class="eachSpace">
                    <svg width="35" height="35">
                        <image xlink:href="img/spaces/space-icon2.svg"/>
                    </svg>
                    <div>
                        <div>
                            <p>${space.StorageType}</p>
                            <p>Dimension: <span>${space.Dimension} m2</span></p>
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
