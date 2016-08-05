var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

    
var urlSchema = mongoose.Schema({
    id: String,  
    url: String
    
});



module.exports = mongoose.model('Model1',urlSchema);