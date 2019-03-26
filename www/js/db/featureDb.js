class featureDb extends generalDb {
    add(tbName){
        let query = "INSERT INTO feature(FName, FDesc, IsDefault) VALUES (?, ?, ?)";
        return super.add(query);
    }

    viewAll(){
        let query = "SELECT * FROM feature";
        return super.viewAll(query);
    }

    viewByListId(listId){
        let promises = [];
        for(let id of listId){
            let query = `SELECT * FROM feature WHERE Id = ?`
            promises.push(db.callReadTrans(query, [id]));
        }
        return Promise.all(promises);
    }

    delete(id){
        let query = "DELETE FROM spaceFeature WHERE FeatureId = ?";
        return db.callTrans(query, [id]).then(() => {
            let query = "DELETE FROM feature WHERE Id = ?";
            return super.delete(query, id);
        })
    }
}
