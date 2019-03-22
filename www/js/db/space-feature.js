class space_featureDb{

    add(spaceId, featureIds){
        let promises = [];
        for(let id of featureIds){
            let query = "INSERT INTO spaceFeature (FeatureId, SpaceId) VALUES (?, ?)";
            promises.push(db.callTrans(query, [id, spaceId]));
        }
        return Promise.all(promises);
    }

    update(spaceId, featureIds){
        return new Promise((resolve, reject) => {
            let query = "DELETE FROM spaceFeature WHERE SpaceId = ?";
            db.callTrans(query, [spaceId]).then(() => {
                this.add(spaceId, featureIds).then(resolve);
            });
        })
    }
}
