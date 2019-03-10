const db = {
    connect, loadType, loadFeature,
    process: null,
    // tempSpace: {},
    // tempType: {},
    // tempFeature: {},
    viewData: {}
}

function connect(){
    db.process = window.openDatabase("spaces.db", "1.0", "Storage Space Database", 1000000);
    createTable();
}

function createTable(){
    let query = "CREATE TABLE IF NOT EXISTS space (Id integer primary key, StorageType text, Dimension integer, DateTime text, Feature text, RentPrice integer, Note text, Reporter text)";
    callTrans(query);
    query = "CREATE TABLE IF NOT EXISTS stype (Id integer primary key, Name text, Desc text, IsDefault integer)";
    callTrans(query);
    query = "CREATE TABLE IF NOT EXISTS sfeature (Id integer primary key, Name text, Desc text, IsDefault integer)";
    callTrans(query);
}

function loadType(){
    let query = "SELECT count(*) FROM stype";
    callReadTrans(query).then(result => {
        let count = (Array.from(result.rows)[0])["count(*)"];
        if(count === 0){
            let query = "INSERT INTO stype(Name, Desc, IsDefault) VALUES (?, ?, ?)";
            callTrans(query, ["Home", "Suitable for small scale home business", 1]);
            callTrans(query, ["Business", "Ideal for all sizes of business", 1]);
        }
    });
}

function loadFeature(){
    let query = "SELECT count(*) FROM sfeature";
    callReadTrans(query).then(result => {
        let count = (Array.from(result.rows)[0])["count(*)"];
        if(count === 0){
            let query = "INSERT INTO sfeature(Name, Desc, IsDefault) VALUES (?, ?, ?)";
            callTrans(query, ["Share space", "Sharing space with other products", 1]);
            callTrans(query, ["Private space", "Space only for one type of product", 1]);
            callTrans(query, ["CCTV", "The storage space is surveilled", 1]);
        }
    })
}

function callReadTrans(query, values = []){
    return new Promise((resolve, reject) => db.process.readTransaction(trans => execSql(trans, query, values).then(resolve)));
}

function callTrans(query, values = []){
    return new Promise((resolve, reject) => db.process.transaction(trans => execSql(trans, query, values).then(resolve)));
}

function execSql(tx, query, values){
    return new Promise((resolve, reject) => {
        tx.executeSql(query, values,
            (tx, result) => resolve(result),
            (tx, error) => console.log(error.message)
        );
    });
}
