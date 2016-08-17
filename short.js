var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var Url         = require('./public/models/urls.js'); //inside node_modules folder


    app.use(express.static('public'));
    mongoose.connect(process.env.MONGO_URI);


    app.get('/new/:query//:http', function (req, res) {


        var url         = req.params.query+'//'+req.params.http;      //  example > https: // www.youtube.com
        var hostname    = req.hostname + '/';                         //  example > shortener-url-jocarosa.c9users.io /
        var max         = 9;
        var min         = 0;
        var ramdom      = '';
    
        //5 number ramdom for making an id
        for(var i = 1;i < 6; i++){
    
            ramdom+=Math.round(Math.random() * (max - min) + min);
    
        }

        var m1 = new Url({id: ramdom, url: url});

        m1.save(function (err) {
            if (err) {console.log(err.stack);}    
            console.log('saving done...');
        });


        res.send({ original_url: url , short_url: hostname + ramdom});//sending json format with the urls
  
    });//end app get






    app.get('/:id',function(req, res){
   
  
        var id           = req.url.replace('/','');
        var redirectTo   ='/';
      
        Url.findOne({id:id},function(err,data){
            
            if(data!=null){
                redirectTo = data.url;
            }
            res.redirect(301, redirectTo);
          
    
        });

    });


    var port = process.env.PORT || 8080;
    app.listen(port,  function () {
	    console.log('Node.js listening on port ' + port + '...');
    });