//HUBBA DUBBA

// instead of bookshelf, require mongoose
var mongoose = require ('mongoose');
var bcrypt = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost/data');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error: '));  // it's open
db.once('open', function () {
  console.log('Mongo is open');
});

module.exports = db;
