$(document).on("pageshow", "#detail", loadData);

function loadData(){
    $("#detail .detail > div").empty();
    $("#detail .detail > div").prepend(JSON.stringify(dbHandler.viewData));
}
