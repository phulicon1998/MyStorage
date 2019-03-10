$(document).on("pageshow", "#stypes", prepare);
$(document).on("pageinit", "#stypes", ready);

var dbStype;

function ready(){
    $("#stypes .stypes > div").on("tap", ".eachStype", removeType);
}

function prepare(){
    dbStype = new stypeDb();
    $("#stypes .stypes > div").empty();
    dbStype.viewAll().then(result => {
        let types = Array.from(result.rows);
        types.forEach(type => {
            let row = $(`
                <div class="eachStype">
                    <p>${JSON.stringify(type)}</p>
                    <button>del</button>
                </div>`
            );
            row.data("id", type.Id);
            $("#stypes .stypes > div").prepend(row);
        })
    })
}

function removeType(e){
    if(confirm("Do you want to remove this data?")){
        let id = $(e.target).parent().data("id");
        dbStype.delete(id);
        prepare();
    }
}
