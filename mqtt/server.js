var mosca = require('mosca'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var settings = {
    port: 1883,
    persistence: {
        factory: mosca.persistence.Memory
    },
    http: {
        port: 3001,
        bundle: true,
        static: './'
    }
};

//here we start mosca
var server = new mosca.Server(settings, function() {
    console.log('Mosca server is up and running: ' + settings.http.port)
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/testowa');
});


var MeasureSchema = new Schema({
    measure_id: {
        type: String
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
var Data = mongoose.model('Data', DataSchema);

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

var Sensors = mongoose.model('sensors', SensorSchema);


server.published = function(packet, client, cb) {
    console.log(packet.payload);
    if (packet.topic.indexOf('echo') === 0 || packet.topic.indexOf('presence') != -1 ) {
        return cb();
    }
    if(packet.topic.indexOf('new/clients') === -1 && packet.payload.toString().indexOf('WebClient') === -1) {
        var jsonObj = JSON.parse(packet.payload.toString());
        var input = {
            timestamp: jsonObj.timestamp,
            measures: jsonObj.measures
        };

        Sensors.update({id: jsonObj.sensor.toString()}, { $addToSet: {data: input }  }, function (err, input) {
            if (err) return console.error('ERROR: ' + err);
            else return console.log(input);
        });

        var newPacket = {
            topic: 'echo/' + packet.topic,
            payload: packet.payload,
            retain: packet.retain,
            qos: packet.qos
        };

        console.log('newPacket', newPacket);

        server.publish(newPacket, function () {
            console.log('Sent: ' + newPacket.payload + " Clients: " + client);
        });
    }
};