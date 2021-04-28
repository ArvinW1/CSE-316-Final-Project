const { model, Schema, ObjectId } = require('mongoose');
const Landmark = require('./landmark-model').schema;

const subregionSchema = new Schema(
    {
    _id: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    capital: {
        type: String,
        required: true
    },
    leader: {
        type: String,
        required: true
    },
    parent: {
        type: String,
        required: true
    },
    landmarks: [Landmark],
    subregions: [Subregion]
}
);

const Subregion = model('subregion', subregionSchema);
module.exports = Subregion;