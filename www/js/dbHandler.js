const hashFeatures = {
    shareType: {
        name: "Share space",
        desc: "Sharing space with other products",
        img: "img/confirm/space-icon.svg"
    },
    privateType: {
        name: "Private space",
        desc: "Space only for one type of product",
        img: "img/confirm/space-icon.svg"
    },
    cctv: {
        name: "CCTV",
        desc: "The storage space is surveilled",
        img: "img/confirm/cctv-icon.svg"
    },
}

const dbHandler = {
    tempData: {},
    db: null,
    createdDatabase: function(){
        this.db = window.openDatabase("spaces.db", "1.0", "Storage Space Database", 1000000);
        let query = "CREATE TABLE IF NOT EXISTS space (Id integer primary key, StorageType text, Dimension integer, DateTime text, Feature text, RentPrice integer, Note text, Reporter text)";
        return new Promise((resolve, reject) => {
            this.db.transaction(trans => {
                execSql(trans, query).then(rs => resolve(rs));
            });
        })
    },
    addSpace: function(){
        let {storageType, dimension, dateTime, feature, rentPrice, reporter, note} = this.tempData;
        let values = [storageType, dimension, dateTime, feature, rentPrice, reporter, note];
        let query = "INSERT INTO space(StorageType, Dimension, DateTime, Feature, RentPrice, Reporter, Note) VALUES (?, ?, ?, ?, ?, ?, ?)";
        return new Promise((resolve, reject) => this.db.transaction(trans => execSql(trans, query, values).then(resolve)));
    },
    viewSpace: function(){
        let query = "SELECT * FROM space";
        return callReadTrans(query);
    }
}

function callReadTrans(query, values = []){
    return new Promise((resolve, reject) => dbHandler.db.readTransaction(trans => execSql(trans, query, values).then(resolve)));
}

function execSql(tx, query, values){
    return new Promise((resolve, reject) => {
        tx.executeSql(query, values,
            (tx, result) => resolve(result),
            (tx, error) => console.log(error.message)
        );
    });
}
