class space_featureDb{

    add(spaceId, featureIds){
        for(let id of featureIds){
            let query = "INSERT INTO spaceFeature (FeatureId, SpaceId) VALUES (?, ?)";
            db.callTrans(query, [id, spaceId]);
        }
    }
}
