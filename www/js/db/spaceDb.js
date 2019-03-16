class spaceDb extends generalDb {
    add(){
        let {address, storageType, dimension, dateTime, feature, rentPrice, reporter, note} = this.temp;
        let values = [address, storageType, dimension, dateTime, feature, rentPrice, reporter, note];
        let query = "INSERT INTO space(Address, StorageType, Dimension, DateTime, Feature, RentPrice, Reporter, Note) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        return callTrans(query, values);
    }

    viewAll(){
        let query = "SELECT * FROM space";
        return super.viewAll(query);
    }

    checkDuplicateAdddress(address){
        let query = `SELECT * FROM space WHERE Address = ?`;
        return db.callReadTrans(query, [address]);
    }

    viewOne(){
        let query = "SELECT * FROM space WHERE Id = ?";
        db.callReadTrans(query, [id]).then(result => {
            dbHandler.viewData = result[0];
        });
    }
}
