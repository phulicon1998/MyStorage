class Database {
    constructor(){
        this.process = null;
        this.connect();
        this.loadType();
        this.loadFeature();
    }

    connect(){
        this.process = window.openDatabase("spaces.db", "1.0", "Storage Space Database", 1000000);
        this.createTable();
    }

    createTable(){
        let query = "CREATE TABLE IF NOT EXISTS space (Id integer primary key, StorageType text, Dimension integer, DateTime text, Feature text, RentPrice integer, Note text, Reporter text)";
        this.callTrans(query);
        query = "CREATE TABLE IF NOT EXISTS stype (Id integer primary key, Name text, Desc text, IsDefault integer)";
        this.callTrans(query);
        query = "CREATE TABLE IF NOT EXISTS sfeature (Id integer primary key, Name text, Desc text, IsDefault integer)";
        this.callTrans(query);
    }

    loadType(){
        let query = "SELECT count(*) FROM stype";
        this.callReadTrans(query).then(result => {
            let count = (Array.from(result.rows)[0])["count(*)"];
            if(count === 0){
                let query = "INSERT INTO stype(Name, Desc, IsDefault) VALUES (?, ?, ?)";
                this.callTrans(query, ["Home", "Suitable for small scale home business", 1]);
                this.callTrans(query, ["Business", "Ideal for all sizes of business", 1]);
            }
        });
    }

    loadFeature(){
        let query = "SELECT count(*) FROM sfeature";
        this.callReadTrans(query).then(result => {
            let count = (Array.from(result.rows)[0])["count(*)"];
            if(count === 0){
                let query = "INSERT INTO sfeature(Name, Desc, IsDefault) VALUES (?, ?, ?)";
                this.callTrans(query, ["Share space", "Sharing space with other products", 1]);
                this.callTrans(query, ["Private space", "Space only for one type of product", 1]);
                this.callTrans(query, ["CCTV", "The storage space is surveilled", 1]);
            }
        })
    }

    callReadTrans(query, values = []){
        return new Promise((resolve, reject) => this.process.readTransaction(trans => this.execSql(trans, query, values).then(resolve)));
    }

    callTrans(query, values = []){
        return new Promise((resolve, reject) => this.process.transaction(trans => this.execSql(trans, query, values).then(resolve)));
    }

    execSql(tx, query, values){
        return new Promise((resolve, reject) => {
            tx.executeSql(query, values,
                (tx, result) => resolve(result),
                (tx, error) => console.log(error.message)
            );
        });
    }
}

const db = new Database();
