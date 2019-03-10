$(document).on("pageshow", "#stypes", prepare);

var dbStype;

function prepare(){
    dbStype = new stypeDb();
    $("#stypes .stypes > div").empty();
    dbStype.viewAll().then(result => {
        let types = Array.from(result.rows);
        types.forEach(type => {
            $("#stypes .stypes > div").prepend(JSON.stringify(type));
        })
    })
}
