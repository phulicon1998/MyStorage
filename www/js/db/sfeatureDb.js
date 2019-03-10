class sfeatureDb extends generalDb {
    add(tbName){
        let query = "INSERT INTO sfeature(Name, Desc) VALUES (?, ?)";
        return super.add(query);
    }

    viewAll(){
        let query = "SELECT * FROM sfeature";
        return super.viewAll(query);
    }
}
