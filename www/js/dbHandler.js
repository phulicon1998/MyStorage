var dbHandler = {
    db: null,
    createdDatabase: function(){
        this.db = window.openDatabase("spaces.db", "1.0", "Storage Space Database", 1000000);
        let query = "CREATE TABLE IF NOT EXISTS space (Id integer primary key, StorageType text, Dimension integer, DateTime text, Feature text, RentPrice integer, Note text, Reporter text)";
        this.db.transaction(trans => execSql(trans, query));
    }
}

window.execSql = function(transaction, query){
    transaction.executeSql(query, [], function(tx, result) {
            console.log("success");
        },
        function(tx, error){
            console.log(error.message);
        }
    );
}
