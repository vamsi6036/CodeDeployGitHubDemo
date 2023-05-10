const mongoose = require('mongoose');

const Schema = mongoose.Schema; // Copying or importing the mongoose Schema's

const locationSchema = new Schema(
    {name:{
    type: String,
    required: true
}})

module.exports = mongoose.model('name', locationSchema, 'location');