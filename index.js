var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./routes/BaseRouter');

var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io').listen(server);
var portNo = 3002;

//set view engine   
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname, 'client')));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//set routes
app.use('/', router);

server.listen(process.env.PORT || 3002, function () {
    console.log('Port : ' + portNo);
});

socket.sockets.on('connection', function(socket){
    console.log('connected socket: ' + socket);
});
