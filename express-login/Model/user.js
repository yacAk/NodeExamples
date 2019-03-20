var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.connection;
var bcrypt = require('bcryptjs');
// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	image:{
		type: String
	}
});
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    console.log(username);
  //  var query = {'username': username};toString(username)
    User.findOne( {username: username }, callback);
    
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	callback(null, isMatch);
	});
}
module.exports.createUser = (newUser,callback)=>{
   var salt =bcrypt.genSaltSync(10);
   newUser.password = bcrypt.hashSync(newUser.password,salt);
   newUser.save(callback);


}