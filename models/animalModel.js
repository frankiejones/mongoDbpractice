// const mongoose = require('mongoose');
const {Schema, model} = require("mongoose");

const animal = new Schema({
    petName: {type: String, required: true},
    typeOf: {type: String, required: true},
    breed: {type: String, required: true},
    dob: {type: Date, required: true}
})
module.exports = model('animals', animal);