var path = require('path');
var express = require('express');

var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(4000);
console.log("server is running on http://localhost:4000");
