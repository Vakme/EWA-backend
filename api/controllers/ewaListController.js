'use strict';


var mongoose = require('mongoose'),
    Sensor = mongoose.model('Sensors');

exports.list_all_tasks = function(req, res, next) {
    Sensor.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};



exports.create_a_task = function(req, res, next) {
    var new_task = new Sensor(req.body);
    console.log(req.body);
    new_task.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_task = function(req, res) {
    Sensor.find({'id' : req.params.sensorId}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_task = function(req, res) {
    Sensor.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_task = function(req, res) {


    Sensor.remove({
        _id: req.params.taskId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Sensor successfully deleted' });
    });
};

exports.login = function(req, res) {
    console.log(req);
    res.json({login: true});
};


