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
        let query = "CREATE TABLE IF NOT EXISTS type (Id integer primary key, Name text, Desc text, IsDefault integer)";
        this.callTrans(query);
        query = "CREATE TABLE IF NOT EXISTS feature (Id integer primary key, Name text, Desc text, IsDefault integer)";
        this.callTrans(query);
        query = `CREATE TABLE IF NOT EXISTS space (
            Id INTEGER PRIMARY KEY,
            Address TEXT,
            storageType_id INTEGER,
            Dimension INTEGER,
            DateTime TEXT,
            RentPrice INTEGER,
            Note TEXT,
            feature_id INTEGER,
            Reporter TEXT,
            FOREIGN KEY(storageType_id) REFERENCES type(Id),
            FOREIGN KEY(feature_id) REFERENCES feature(Id)
        )`;
        this.callTrans(query);
    }

    loadType(){
        let query = "SELECT count(*) FROM type";
        this.callReadTrans(query).then(result => {
            let count = (result[0])["count(*)"];
            if(count === 0){
                let query = "INSERT INTO type(Name, Desc, IsDefault) VALUES (?, ?, ?)";
                this.callTrans(query, ["Home", "Suitable for small scale home business", 1]);
                this.callTrans(query, ["Business", "Ideal for all sizes of business", 1]);
            }
        });
    }

    loadFeature(){
        let query = "SELECT count(*) FROM feature";
        this.callReadTrans(query).then(result => {
            let count = (result[0])["count(*)"];
            if(count === 0){
                let query = "INSERT INTO feature(Name, Desc, IsDefault) VALUES (?, ?, ?)";
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
                (tx, result) => resolve(Array.from(result.rows)),
                (tx, error) => console.log(error.message)
            );
        });
    }
}

const db = new Database();
const fu = new FU();
$('#menu').enhanceWithin().panel();
