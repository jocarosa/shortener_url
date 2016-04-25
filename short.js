
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/');
var Model1 = require('model1.js');






app.get('/new/:query//:http', function (req, res) {

//http from url
var url=            req.params.query+'//'+req.params.http;      //  example > https: // www.youtube.com
var hostname=       req.hostname + '/';                         //  example > shortener-url-jocarosa.c9users.io /
var max=9;
var min=0;
var ramdom='';
var json='';



//5 number ramdom for making an id
for(var i=1;i<6;i++){
    
    ramdom+=Math.round(Math.random() * (max - min) + min);
    
}



var m1 = new Model1({id: ramdom, url: url});

m1.save(function (err) {
    if (err) {console.log(err.stack);}    
    console.log('saving done...');
});




json=JSON.stringify({ original_url: url , short_url: hostname + ramdom})//preparing json format
res.send(json);//sending json format with the urls
  
 });//end app use





app.get('/:id',function(req, res){
   
 //console.log();
 //consulting id



Model1.findOne({id:req.params.id},function(err,data){
      if(err)console.log('data error');  
 
  res.redirect(301, data.url);

      console.log(data.url);
     

 
});

});






var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});