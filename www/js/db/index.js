class Database {
    constructor(){
        this.process = null;
        this.connect();
        this.loadType();
        this.loadFeature();
        this.loadProtect();
    }

    connect(){
        this.process = window.openDatabase("spaces.db", "1.0", "Storage Space Database", 1000000);
        this.createTable();
    }

    createTable(){
        this.tableType();
        this.tableFeature();
        this.tableSpace();
        this.tableSpaceFeature();
        this.tableProtect();
    }

    tableType(){
        let query = "CREATE TABLE IF NOT EXISTS type (Id integer primary key, TName text, TDesc text, IsDefault integer)";
        this.callTrans(query);
    }

    tableFeature(){
        let query = "CREATE TABLE IF NOT EXISTS feature (Id integer primary key, FName text, FDesc text, IsDefault integer)";
        this.callTrans(query);
    }

    tableSpace(){
        let query = `CREATE TABLE IF NOT EXISTS space (
            Id INTEGER PRIMARY KEY,
            Address TEXT,
            Type INTEGER,
            Dimension INTEGER,
            DateTime TEXT,
            RentPrice INTEGER,
            Note TEXT,
            Reporter TEXT,
            FOREIGN KEY(Type) REFERENCES type(Id)
        )`;
        this.callTrans(query);
    }

    tableSpaceFeature(){
        let query = `CREATE TABLE IF NOT EXISTS spaceFeature (
            Id INTEGER PRIMARY KEY,
            FeatureId INTEGER,
            SpaceId INTEGER,
            FOREIGN KEY(FeatureId) REFERENCES feature(Id),
            FOREIGN KEY(SpaceId) REFERENCES space(Id)
        )`;
        this.callTrans(query);
    }

    tableProtect(){
        let query = "CREATE TABLE IF NOT EXISTS protect (Id integer primary key, Code text, Activate integer)";
        this.callTrans(query);
    }

    loadType(){
        let query = "SELECT count(*) FROM type";
        this.callReadTrans(query).then(result => {
            let count = (result[0])["count(*)"];
            if(count === 0){
                let query = "INSERT INTO type(TName, TDesc, IsDefault) VALUES (?, ?, ?)";
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
                let query = "INSERT INTO feature(FName, FDesc, IsDefault) VALUES (?, ?, ?)";
                this.callTrans(query, ["Share space", "Sharing space with other products", 1]);
                this.callTrans(query, ["Private space", "Space only for one type of product", 1]);
                this.callTrans(query, ["CCTV", "The storage space is surveilled", 1]);
            }
        })
    }

    loadProtect(){
        let query = "SELECT count(*) FROM protect";
        this.callReadTrans(query).then(result => {
            let count = (result[0])["count(*)"];
            if(count === 0){
                let query = "INSERT INTO protect(Code, Activate) VALUES (?, ?)";
                this.callTrans(query, ["1234", 0]);
            }
        })
    }

    callReadTrans(query, values = [], exec = this.execSql){
        return new Promise((resolve, reject) => this.process.readTransaction(trans => exec(trans, query, values).then(resolve)));
    }

    callTrans(query, values = [], exec = this.execSql){
        return new Promise((resolve, reject) => this.process.transaction(trans => exec(trans, query, values).then(resolve)));
    }

    execSql(tx, query, values){
        return new Promise((resolve, reject) => {
            tx.executeSql(query, values,
                (tx, result) => {
                    resolve(Array.from(result.rows));
                },
                (tx, error) => console.log(error.message)
            );
        });
    }

    execSqlReturnId(tx, query, values){
        return new Promise((resolve, reject) => {
            tx.executeSql(query, values,
                (tx, {insertId}) => {
                    resolve(insertId);
                },
                (tx, error) => console.log(error.message)
            );
        });
    }
}
