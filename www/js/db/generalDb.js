class generalDb {
    constructor(){
        this.temp = {}
    }

    add(query){
        let {name, desc} = this.temp;
        let values = [name, desc];
        return callTrans(query, values);
    }

    viewAll(query){
        return callReadTrans(query);
    }
}
