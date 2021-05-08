const ObjectId = require('mongoose').Types.ObjectId;
const Map = require('../models/map-model');
const Sorting = require('../utils/sorting');
const Landmark = require('../models/landmark-model');

module.exports = {
    Query: {
        /**
         * @param {object} req - the request object contain a user id 
         * @returns {array} an array of the maps on success of an empty array on failure
         */
        getAllMaps: async (_, __, { req }) => {
            const _id = new ObjectId(req.userId);
            if (!_id) { return ([]) };
            const maps = await Map.find({ owner: _id });
            if (maps) {
                return maps;
            }
        },
    },
    Mutation: {
        addSubregion: async (_, args) => {
            const { _id, subregion, index } = args;
            const mapId = new ObjectId(_id);
            const objectId = new ObjectId();
            const found = await Map.findOne({ _id: mapId });
            if (!found) return ('Map not found');
            if (subregion._id === '') subregion._id = objectId;
            const newMap = new Map({
                _id: subregion._id,
                name: subregion.name,
                parent: subregion.parent,
                capital: subregion.capital,
                leader: subregion.leader,
                owner: subregion.owner,
                landmarks: subregion.landmarks,
                subregions: subregion.subregions,
                sortRule: subregion.sortRule,
                sortDirection: subregion.sortDirection
            })
            console.log(newMap)
            let mapSubregions = found.subregions;
            if (index < 0) mapSubregions.push(subregion._id);
            else mapSubregions.splice(index, 0, subregion._id);

            const updated = await Map.updateOne({ _id: mapId }, { subregions: mapSubregions })
            const saved = await newMap.save();

            if (updated) return (subregion._id)
            else return ('Could not add item');
        },
        addMaplist: async (_, args) => {
            const { map } = args;
            const objectId = new ObjectId();
            const { name, owner, parent, capital, leader, landmarks, subregions, sortRule, sortDirection } = map;
            const newMap = new Map({
                _id: objectId,
                name: name,
                parent: parent,
                capital: capital,
                leader: leader,
                owner: owner,
                landmarks: landmarks,
                subregions: subregions,
                sortRule: sortRule,
                sortDirection: sortDirection
            });
            const updated = await newMap.save();
            if (updated) {
                console.log(newMap)
                return newMap;
            }
        },
        /**
         * @param {*} args a Map ObjectID
         * @returns {boolean} true on successful delete, false on failure
         */
        deleteMap: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const deleted = await Map.deleteOne({ _id: objectId });
            if (deleted) return true;
            else return false;
        },
        deleteSubregion: async (_, args) => {
            const { _id, subID } = args;
            const objectId = new ObjectId(_id);
            const subregionID = new ObjectId(subID)
            const found = await Map.findOne({ _id: objectId });
            const deleted = await Map.deleteOne({ _id: subregionID });
            let subregions = found.subregions;
            let index = subregions.indexOf(subID)
            subregions.splice(index, 1)

            const updated = await Map.updateOne({ _id: objectId }, { subregions: subregions })

            if (deleted) return true;
            else return false;
        },
        /**
         * @param {*} args contain the field that is going to be updated and the values that it is going to be updated to. And the map's id to update
         * @returns {String} the values that it was updated to 
         */
        updateMapField: async (_, args) => {
            const { field, value, _id } = args;
            const objectId = new ObjectId(_id);
            const updated = await Map.updateOne({ _id: objectId }, { [field]: value });
            console.log(value)
            console.log(field)
            if (updated) return value;
            else return "";
        },

        /**
         * 
         * @param {*} args Contain Parent ID, which category to sort, to sort or to replace, the subregion IDs, how to sort
         */
        sortMaps: async (_, args) => {
            const { _id, criteria, opcode, regionIDs, direction } = args;
            const mapID = new ObjectId(_id)
            const regions = await Map.find({ parent: mapID })
            let newDirection = direction === 1 ? -1 : 1;
            console.log(newDirection, regions)
            let sortedMaps;
            let sortedIDs = [];

            if (opcode === 1) {
                switch (criteria) {
                    case 'name':
                        sortedMaps = Sorting.byName(regions, newDirection);
                        break;
                    case 'capital':
                        sortedMaps = Sorting.byCapital(regions, newDirection);
                        break;
                    case 'leader':
                        sortedMaps = Sorting.byLeader(regions, newDirection);
                        break;
                    default:
                        return regionIDs
                }
                for (let region of sortedMaps) {
                    sortedIDs.push(region._id)
                }
                const updated = await Map.updateOne({ _id: mapID }, { subregions: sortedIDs, sortRule: criteria, sortDirection: newDirection })
                if (updated) return (sortedIDs)
            }
            else {
                const updated = await Map.updateOne({ _id: mapID }, { subregions: regionIDs, sortRule: criteria, sortDirection: direction })
                if (updated) return (regionIDs)
            }
        },
        changeParent: async (_, args) => {
            const { parentId, regionId, newParentId } = args
            const parent = new ObjectId(parentId);
            const region = new ObjectId(regionId);
            const newParent = new ObjectId(newParentId);
            const foundParent = await Map.findOne({ _id: parent });
            const foundNewParent = await Map.findOne({ _id: newParent });
            let parentSubregions = foundParent.subregions;
            let newParentSubregions = foundNewParent.subregions;
            let index = parentSubregions.indexOf(regionId)
            parentSubregions.splice(index, 1)
            newParentSubregions.push(regionId)

            const update_one = await Map.updateOne({ _id: parent }, { subregions: parentSubregions });
            const update_two = await Map.updateOne({ _id: region }, { parent: newParentId });
            const update_three = await Map.updateOne({ _id: newParent }, { subregions: newParentSubregions })
            if (update_two) return newParentId
        },
        addLandmark: async (_, args) =>{
            const {_id, landmark, index} = args;
            const regionId = new ObjectId(_id);
            const objectId = new ObjectId();
            const found = await Map.findOne({_id: regionId})
            if(!found) return('Map not found')
            if(landmark._id === '') landmark._id = objectId;
            const newLandmark = new Landmark({
                _id: landmark._id,
                name: landmark.name, 
                location: landmark.location
            })
            console.log(newLandmark)
            let mapLandmarks = found.landmarks;
            if(index < 0) mapLandmarks.push(newLandmark);
            else mapLandmarks.splice(index, 0, newLandmark);

            const updated = await Map.updateOne({_id: regionId}, {landmarks: mapLandmarks})

            if(updated) return (landmark._id)
            else return('Could not add landmark')
        }, 
        deleteLandmark: async (_, args) =>{
            const {_id, landmarkId} = args;
            const regionId = new ObjectId(_id);
            //const landmark = new ObjectId(landmarkId);
            const found = await Map.findOne({_id: regionId});
            const landmarks = found.landmarks;
            const toDelete = landmarks.find(landmark => landmark._id === landmarkId);
            const index = landmarks.indexOf(toDelete);
            landmarks.splice(index, 1)

            const deleted = await Map.updateOne({_id: regionId}, {landmarks: landmarks})
            if(deleted) return true
            else return false
        },
        updateLandmark: async(_, args) =>{
            const {_id, landmarkId, value} = args;
            const regionId = new ObjectId(_id);
            //const landmark = new ObjectId(landmarkId);
            const found = await Map.findOne({_id: regionId});
            const landmarks = found.landmarks;
            const toUpdate = landmarks.find(landmark => landmark._id === landmarkId);
            const index = landmarks.indexOf(toUpdate);

            landmarks.splice(index, 1)
            toUpdate.name = value;
            landmarks.splice(index, 0, toUpdate)

            const updated = await Map.updateOne({_id: regionId}, {landmarks: landmarks})
            if(updated) return landmarks
            else return found.landmarks
        }
    }
}