class stypeDb extends generalDb {
    add(){
        let query = "INSERT INTO stype(Name, Desc, IsDefault) VALUES (?, ?, ?)";
        return super.add(query);
    }

    viewAll(){
        let query = "SELECT * FROM stype";
        return super.viewAll(query);
    }

    delete(id){
        let query = "DELETE FROM stype WHERE Id = ?";
        return super.delete(query, id);
    }
}
