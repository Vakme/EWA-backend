'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MeasureSchema = new Schema({
    name: {
        type: String,
        required: 'Measurement needs to have name!'
    },
    value: {
        type: Number,
        default: 0
    }
});

var SensorSchema = new Schema({
    timestamp: {
        type: String
    },
    sensor: {
        type: Number
    },
    measures: {
        type: [MeasureSchema],
        default: []
    }
});

module.exports = mongoose.model('Sensors', SensorSchema);