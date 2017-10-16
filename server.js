var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Sensor = require('./api/models/ewaListModel'), //created model loading here
    bodyParser = require('body-parser');


var cors = require('cors');

var whitelist = ['http://localhost:8080', 'http://localhost:8000', 'http://192.168.1.12:8080', 'http://localhost:3000', 'http://127.0.0.1:8000', 'undefined']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS: ' + origin));
            console.log('Not allowed by CORS: ' + origin)
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testowa');



var routes = require('./api/routes/ewaListRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
