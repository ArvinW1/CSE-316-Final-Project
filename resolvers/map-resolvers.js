const ObjectId = require('mongoose').Types.ObjectId;
const Map = require('../models/map-model');

module.exports = {
    Query: {
        /**
         * @param {object} req - the request object contain a user id 
         * @returns {array} an array of the maps on success of an empty array on failure
         */
        getAllMaps: async (_, __, { req }) => {
            const _id = new ObjectId(req.userId);
            if(!_id) { return([])};
            const maps = await Map.find({owner: _id});
            if(maps){
                return maps;
            }
        },
    },
    Mutation: {
        addSubregion: async(_, args) => {
            const { _id, subregion , index } = args;
            const mapId = new ObjectId(_id);
            const objectId = new ObjectId();
            const found = await Todolist.findOne({_id: mapId});
            if(!found) return ('Todolist not found');
            if(subregion._id === '') subregion._id = objectId;
            let mapSubregions = found.subregions;
			if(index < 0) mapSubregions.push(item);
			else mapSubregions.splice(index, 0, item);

            const updated = await Map.updateOne({_id: mapId}, {subregions: mapSubregions})
            const saved = await subregion.save();

            if(updated) return (subregion._id)
			else return ('Could not add item');
        },
        addMaplist: async (_, args) => {
            const { map } = args;
            const objectId = new ObjectId();
            const { name, owner, subregions} = map;
            const newMap = new Map({
                _id: objectId,
				name: name,
				owner: owner,
				subregions: subregions,
            });
            const updated = await newMap.save();
            if(updated) {
				console.log(newMap)
				return newMap;
			}
        }
    }
}