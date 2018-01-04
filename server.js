const mongoClient = require('mongodb').MongoClient;
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contact',{useMongoClient:true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){console.log('connected to mongodb database:contact')});
db.on('disconnected',function(){
   mongoose.connect('mongodb://localhost:27017/contact',{useMongoClient:true});
   db = mongoose.connection;
});
const express = require('express');
const contact= require('./api/contact.js');
var bodyParser = require('body-parser');
//console.log(contact);
var app = express();
app.use(express.static(path.join(__dirname, 'javascripts')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/signUp', function(req, res) {
    res.sendFile(path.join(__dirname + '/signuppage.html'));
});

app.use(bodyParser.json());
app.post('/contact',(req,res)=>{
     //console.log('body',req.body);
   
    var detail = new contact({
        email: req.body.email,
        name: req.body.name,
        number: req.body.number
    });


    contact.findOne({email:detail.email}).then((doc)=>{
        if(!doc){
            detail.save().then((doc) =>{
                res.send({status: true, message:"Data Saved"});
            },(e)=>{
                res.send({status: false, message:"Data not Saved"});
        //        res.status(404).send();
            })         
        }
        else{
            res.send({status: false, message:"Data exists"});
        }
    });
   
   

});


app.get('/contact',(req,res)=>{
    contact.find().then((contact)=>{
    res.status(200).send({contact});

    },(e)=>{
   res.status(404).send(e);
    });
       
   });


   app.post('/update',(req,res)=>{

  
   var detail = {
       email: req.body.email,
       name: req.body.name,
       number: req.body.number
   };
var oldemail=req.body.oldemail;
console.log('oldemail',oldemail,detail);
contact.findOneAndUpdate({email:oldemail},detail)
.then((resp)=>{
console.log('resp',resp);
    if(resp)
    {

            res.send({status: true, message:"Contact Updated"});
           }      
    
    else{
        res.send({status: false, message:"Contact not Found"});
    }
} ,(e)=>{
    res.send({status: false, message:"Contact not Updated"});

})
   });


   app.post('/delete',(req,res)=>{
    contact.findOneAndRemove({email:req.body.email})
    .then((response)=>{
        if(response)
        {
            res.send({status:true, message:"contact deleted"});        
        }
        else{
            res.send({status: false, message:"Contact not Deleted"});
        }
    },(e)=>{
        res.send({status: false, message:"Contact not found"});
    });
});
app.listen(3000);