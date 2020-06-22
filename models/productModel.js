// const mongoose = require('mongoose');
const {Schema, model} = require("mongoose");

const product = new Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true, unique: true},
    inStock: {type: Boolean, required: true}
})
module.exports = model('products', product);