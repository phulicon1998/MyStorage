class spaceDb extends generalDb {
    add(){
        let {address, type, dimension, dateTime, rentPrice, reporter, note} = this.temp;
        let values = [address, type, dimension, dateTime, rentPrice, reporter, note];
        let query = "INSERT INTO space(Address, Type, Dimension, DateTime, RentPrice, Reporter, Note) VALUES (?, ?, ?, ?, ?, ?, ?)";
        return db.callTrans(query, values, db.execSqlReturnId);
    }

    viewAll(){
        let query = `
        SELECT S.Id, S.Address, S.Dimension, S.RentPrice, T.TName, T.TDesc FROM space S
        JOIN type T ON S.Type = T.Id`;
        return super.viewAll(query);
    }

    checkDuplicateAdddress(address){
        if(dbSpace.temp.id){
            let query = `SELECT * FROM space WHERE Address = ? AND Id != ?`;
            return db.callReadTrans(query, [address, dbSpace.temp.id]);
        } else {
            let query = `SELECT * FROM space WHERE Address = ?`;
            return db.callReadTrans(query, [address]);
        }
    }

    viewOne(id){
        return new Promise((resolve, reject) => {
            let query = "SELECT S.*, T.TName FROM space S JOIN type T ON S.Type = T.Id WHERE S.Id = ?";
            db.callReadTrans(query, [id]).then(result => {
                this.temp = result[0];
                let query = "SELECT * FROM spaceFeature SF JOIN feature F ON SF.FeatureId = F.Id WHERE spaceId = ?";
                db.callReadTrans(query, [id]).then(result => {
                    let listFeature = result.map(feature => ({
                        id: feature.Id,
                        name: feature.FName,
                        desc: feature.FDesc
                    }));
                    this.temp.feature = listFeature;
                    resolve();
                });
            });
        });
    }

    delete(id){
        let query = "DELETE FROM space WHERE Id = ?";
        return super.delete(query, id);
    }

    update(){
        let query = `UPDATE space SET Address = ?, Type = ?, Dimension = ?, DateTime = ?, RentPrice = ?, Reporter = ?, Note = ? WHERE Id = ?`;
        let {address, type, dimension, dateTime, rentPrice, reporter, note, id} = this.temp;
        let values = [address, Number(type), dimension, dateTime, rentPrice, reporter, note, id];
        return db.callTrans(query, values);
    }
}
