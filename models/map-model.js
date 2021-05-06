const { model, Schema, ObjectId } = require('mongoose');
const Landmark = require('./landmark-model').schema;

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
		owner: {
			type: String,
			required: true
		},
		landmarks: [Landmark],
        subregions: [String],
		sortRule: {
			type: String, 
			required: true
		},
		sortDirection: {
			type: Number, 
			required: true
		}
	},
	{ timestamps: true }
);

const Map = model('map', mapSchema);
module.exports = Map;