/**
 * Created by Administrator on 2015/5/11.
 */

var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');

var User = mongoose.model('users',UserSchema);

module.exports = User;