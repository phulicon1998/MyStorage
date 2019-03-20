class space_featureDb{

    add(spaceId, featureIds){
        for(let id of featureIds){
            let query = "INSERT INTO spaceFeature (FeatureId, SpaceId) VALUES (?, ?)";
            db.callTrans(query, [id, spaceId]);
        }
    }

    update(spaceId, featureIds){
        let query = "DELETE FROM spaceFeature WHERE SpaceId = ?";
        db.callTrans(query, [spaceId]).then(() => {
            this.add(spaceId, featureIds);
        });
    }
}
