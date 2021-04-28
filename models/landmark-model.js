const { model, Schema, ObjectId } = require('mongoose');

const landmarkSchema = new Schema(
    {
    _id: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
}
);

const Landmark = model('landmark', landmarkSchema);
module.exports = Landmark;