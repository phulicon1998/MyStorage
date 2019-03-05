$(document).on("pageinit", "#spaces", ready);

function ready(){
    dbHandler.createdDatabase();
    // loadSpaces();
}

function loadSpaces() {
    hashData.forEach(space => {
        let item = $(
            `<div class="eachSpace">
                <svg width="35" height="35">
                    <image xlink:href="img/spaces/space-icon2.svg"/>
                </svg>
                <div>
                    <div>
                        <p>${space.storageType}</p>
                        <p>Dimension: <span>${space.dimension} m2</span></p>
                    </div>
                    <p>${space.rentPrice}$</p>
                </div>
            </div>`
        );
        $(".spaces > div").append(item);
    })
}
