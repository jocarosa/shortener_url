var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

    
var urlSchema = mongoose.Schema({id: String,  url: String});
var Model1 = mongoose.model('Model1',urlSchema) ;
 



module.exports = Model1;