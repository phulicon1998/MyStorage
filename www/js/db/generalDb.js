class generalDb {
    constructor(){
        this.temp = {};
    }

    add(query){
        let {name, desc} = this.temp;
        let values = [name, desc, 0];
        return db.callTrans(query, values);
    }

    viewAll(query){
        return db.callReadTrans(query);
    }

    delete(query, id){
        return db.callTrans(query, [id]);
    }
}
