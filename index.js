var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./routes/BaseRouter');

var app = express();
var server = require('http').createServer(app);
var ioSoc = require('socket.io').listen(server);
var portNo = 3002;
var activeUsers = [];

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

server.listen(process.env.PORT || portNo, function () {
    console.log('Port : ' + portNo);
});

ioSoc.sockets.on('connection', function(socket){

    console.log('socket connected: ' + socket.id);
    //new user
    socket.on('addUser', function(data){
        activeUsers.push(data);
        console.log("User count : " + activeUsers.length);
        console.log('New user : ' + activeUsers);
        ioSoc.sockets.emit('updateUsers', {user:data});
    });

    //message transfer
    socket.on('send', function(data){
        console.log('send :' + data.user);
        ioSoc.sockets.emit('new msg', {msg: data.message, user: data.user});
    });

    socket.on('receive', function(socket){
        console.log('receive : ' + socket);
    });
    
    //socket disconnect
    socket.on('disconnect', function(socket){
        /*socket.emit('deleteUser', {user: 'User'});*/
        activeUsers.pop(socket);
        console.log('socket disconnected: ' + socket.id);
        //new user
        console.log("User count : " + activeUsers.length);
        ioSoc.sockets.emit('deleteUser', {userCount: activeUsers.length});
        });


});


