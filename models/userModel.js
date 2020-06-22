// const mongoose = require('mongoose');
const {Schema, model} = require("mongoose");

const user = new Schema({
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
module.exports = model('users', user);