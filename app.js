'use strict';

var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').server;

app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){

});

app.listen(4000);
console.log("server is running on http://localhost:4000");
