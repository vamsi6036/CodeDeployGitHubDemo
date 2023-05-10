const mongoose = require ('mongoose');

const Schema = mongoose.Schema; // Copying or importing the mongoose Schemas

const restaurantSchema = new Schema({
    city: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    locality: {
        type: String
    },
    id : Number
    
})

module.exports = mongoose.model('example', restaurantSchema, 'resturant');