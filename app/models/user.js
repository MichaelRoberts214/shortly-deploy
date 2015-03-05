/*************************/
// SQLite
/*************************/

// var db = require('../config');
// var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// module.exports = User;


/*************************/
// mongoose
/*************************/

var mongoose = require('mongoose');
var db = require('../config-mongo');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');


var userSchema = mongoose.Schema({
  username: {type: String, index: { unique: true}},
  password: String
});

userSchema.pre('save', function (next) {
  var cipher = bluebird.promisify(bcrypt.hash);
  return cipher(this.password, null, null)
    .then(function(hash) {
      this.password = hash;
      next();
    }.bind(this));
});

var User = mongoose.model('User', userSchema);

User.prototype.comparePassword = function (attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(err, isMatch);
  });
};

module.exports = User;
