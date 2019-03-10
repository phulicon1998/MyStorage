// const hashFeatures = {
//     shareType: {
//         name: "Share space",
//         desc: "Sharing space with other products",
//         img: "img/confirm/space-icon.svg"
//     },
//     privateType: {
//         name: "Private space",
//         desc: "Space only for one type of product",
//         img: "img/confirm/space-icon.svg"
//     },
//     cctv: {
//         name: "CCTV",
//         desc: "The storage space is surveilled",
//         img: "img/confirm/cctv-icon.svg"
//     },
// }

// const dbHandler = {
//     tempSpace: {},
//     tempType: {},
//     tempFeature: {},
//     viewData: {},
//     db: null,
//     createDb: function(){
//         this.db = window.openDatabase("spaces.db", "1.0", "Storage Space Database", 1000000);
//         let query = "CREATE TABLE IF NOT EXISTS space (Id integer primary key, StorageType text, Dimension integer, DateTime text, Feature text, RentPrice integer, Note text, Reporter text)";
//         callTrans(query);
//         query = "CREATE TABLE IF NOT EXISTS stype (Id integer primary key, Name text, Desc text, IsDefault integer)";
//         callTrans(query);
//         query = "CREATE TABLE IF NOT EXISTS sfeature (Id integer primary key, Name text, Desc text, IsDefault integer)";
//         callTrans(query);
//     },
//     createAvailType: function(){
//         let query = "SELECT count(*) FROM stype";
//         callReadTrans(query).then(result => {
//             let count = (Array.from(result.rows)[0])["count(*)"];
//             if(count === 0){
//                 let query = "INSERT INTO stype(Name, Desc, IsDefault) VALUES (?, ?, ?)";
//                 callTrans(query, ["Home", "Suitable for small scale home business", 1]);
//                 callTrans(query, ["Business", "Ideal for all sizes of business", 1]);
//             }
//         });
//     },
//     createAvailFeature: function(){
//         let query = "SELECT count(*) FROM sfeature";
//         callReadTrans(query).then(result => {
//             let count = (Array.from(result.rows)[0])["count(*)"];
//             if(count === 0){
//                 let query = "INSERT INTO sfeature(Name, Desc, IsDefault) VALUES (?, ?, ?)";
//                 callTrans(query, ["Share space", "Sharing space with other products", 1]);
//                 callTrans(query, ["Private space", "Space only for one type of product", 1]);
//                 callTrans(query, ["CCTV", "The storage space is surveilled", 1]);
//             }
//         })
//     }
// }

// const spaceDb = {
//     add: function(){
//         let {storageType, dimension, dateTime, feature, rentPrice, reporter, note} = dbHandler.tempSpace;
//         let values = [storageType, dimension, dateTime, feature, rentPrice, reporter, note];
//         let query = "INSERT INTO space(StorageType, Dimension, DateTime, Feature, RentPrice, Reporter, Note) VALUES (?, ?, ?, ?, ?, ?, ?)";
//         return callTrans(query, values);
//     },
//     view: function(){
//         let query = "SELECT * FROM space";
//         return callReadTrans(query);
//     },
//     detail: function(id){
//         let query = "SELECT * FROM space WHERE Id = ?";
//         callReadTrans(query, [id]).then(result => {
//             dbHandler.viewData = (Array.from(result.rows))[0];
//         });
//     }
// }

// const sTypeDb = {
//     view: function(){
//         let query = "SELECT * FROM stype";
//         return callReadTrans(query);
//     },
//     add: function(){
//         let {name, desc} = dbHandler.tempType;
//         let values = [name, desc];
//         let query = "INSERT INTO stypes(Name, Desc) VALUES (?, ?)";
//         return callTrans(query, values);
//     }
// }

// const sFeatureDb = {
//     view: function(){
//         let query = "SELECT * FROM sfeature";
//         return callReadTrans(query);
//     }
// }

// function callReadTrans(query, values = []){
//     return new Promise((resolve, reject) => dbHandler.db.readTransaction(trans => execSql(trans, query, values).then(resolve)));
// }
//
// function callTrans(query, values = []){
//     return new Promise((resolve, reject) => dbHandler.db.transaction(trans => execSql(trans, query, values).then(resolve)));
// }
//
// function execSql(tx, query, values){
//     return new Promise((resolve, reject) => {
//         tx.executeSql(query, values,
//             (tx, result) => resolve(result),
//             (tx, error) => console.log(error.message)
//         );
//     });
// }
