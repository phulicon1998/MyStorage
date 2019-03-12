class featureDb extends generalDb {
    add(tbName){
        let query = "INSERT INTO sfeature(Name, Desc, IsDefault) VALUES (?, ?, ?)";
        return super.add(query);
    }

    viewAll(){
        let query = "SELECT * FROM sfeature";
        return super.viewAll(query);
    }

    delete(id){
        let query = "DELETE FROM sfeature WHERE Id = ?";
        return super.delete(query, id);
    }
}
