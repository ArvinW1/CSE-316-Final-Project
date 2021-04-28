const { model, Schema, ObjectId } = require('mongoose');
const Landmark = require('./landmark-model').schema;
const Subregion = require('./subregion-model').schema;

const mapSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		owner: {
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
        landmarks: [Landmark],
        subregions: [Subregion]
	},
	{ timestamps: true }
);

const Map = model('map', mapSchema);
module.exports = Map;