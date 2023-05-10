const mongoose = require ('mongoose');

const Schema = mongoose.Schema; // Copying or importing the mongoose Schemas

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('sample1', userSchema, 'user');