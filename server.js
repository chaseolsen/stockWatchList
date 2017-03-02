var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var config = require('./config.js');
var axios = require('axios');
var path = require('path');

// db connect here

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

// app.get('/*', function (req, res){
//   res.sendFile(path.join(__dirname + '/index.html'));
// });


app.listen(3000, function(){
  console.log('Listening on Port 3000');
});
