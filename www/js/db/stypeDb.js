class stypeDb extends generalDb {
    add(tbName){
        let query = "INSERT INTO stype(Name, Desc) VALUES (?, ?)";
        return super.add(query);
    }

    viewAll(){
        let query = "SELECT * FROM stype";
        return super.viewAll(query);
    }
}
