'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MeasureSchema = new Schema({
    measure_id: {
        type: String,
        required: 'Measurement needs to have unique ID!'
    },
    value: {
        type: Number,
        default: 0
    }
});

var DataSchema = new Schema({
    timestamp: {
        type: String
    },
    measures: {
        type: [MeasureSchema],
        default: []
    }

});

var MeasureConfigSchema = new Schema({
    measure_id: {
        type: String,
        required: 'Measurement needs to have unique ID!'
    },
    name: {
        type: String,
        required: 'Measurement needs to have human-readable name!'
    },
    critical_value: {
        type: Number
    },
    unit: {
        type: String
    }

});

var ConfigSchema = new Schema({
    measure_no: {
        type: Number,
        default: 0
    },
    measure_config: {
        type: [MeasureConfigSchema],
        default: []
    }
});

var SensorSchema = new Schema({
    id: {
        type: String,
        required: 'Sensor needs to have unique ID!'
    },
    config: {
        type: ConfigSchema
    },
    data: {
        type: [DataSchema],
        default: []
    }


}, { collection: 'sensors' });

module.exports = mongoose.model('sensors', SensorSchema);