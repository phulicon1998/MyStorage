class typeDb extends generalDb {
    add(){
        let query = "INSERT INTO type(TName, TDesc, IsDefault) VALUES (?, ?, ?)";
        return super.add(query);
    }

    viewAll(){
        let query = "SELECT * FROM type";
        return super.viewAll(query);
    }

    viewOne(id){
        let query = "SELECT * FROM type WHERE Id = ?";
        return db.callReadTrans(query, [id]);
    }

    delete(id){
        let query = "DELETE FROM type WHERE Id = ?";
        return super.delete(query, id);
    }
}
