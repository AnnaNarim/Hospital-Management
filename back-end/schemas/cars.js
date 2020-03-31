const mongoose = require('mongoose');

const car = new mongoose.Schema({
    name: {type: String, uppercase: true, trim: true, required: true},
    model: {type: String, uppercase: true, trim: true, required: true},
    year: {type: Number, min: 1900, max: 2100, required: true},
})

module.exports = mongoose.model('Car', car);