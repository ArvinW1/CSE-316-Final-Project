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
        subregions: [Subregion]
	},
	{ timestamps: true }
);

const Map = model('map', mapSchema);
module.exports = Map;