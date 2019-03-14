class typeDb extends generalDb {
    add(){
        let query = "INSERT INTO type(Name, Desc, IsDefault) VALUES (?, ?, ?)";
        return super.add(query);
    }

    viewAll(){
        let query = "SELECT * FROM type";
        return super.viewAll(query);
    }

    delete(id){
        let query = "DELETE FROM type WHERE Id = ?";
        return super.delete(query, id);
    }
}
