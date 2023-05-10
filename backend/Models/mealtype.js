const mongoose = require ('mongoose');

const Schema = mongoose.Schema; // Copying or importing the mongoose Schemas

const mealtypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('sample', mealtypeSchema, 'mealtype');