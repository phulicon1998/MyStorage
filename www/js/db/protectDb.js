class protectDb {

    viewOne(){
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM protect WHERE Id = ?";
            return db.callReadTrans(query, [1]).then(resolve);
        });
    }

    updateCode(value){
        return new Promise((resolve, reject) => {
            let query = `UPDATE protect SET Code = ? WHERE Id = ?`;
            return db.callTrans(query, [value, 1]).then(resolve);
        });
    }

    updateState(state){
        return new Promise((resolve, reject) => {
            let query = `UPDATE protect SET Activate = ? WHERE Id = ?`;
            return db.callTrans(query, [state, 1]).then(resolve);
        });
    }

}
