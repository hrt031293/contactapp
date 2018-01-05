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
const {contact}= require('./api/contact.js');
const {user}=require('./api/contact.js');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(path.join(__dirname, 'javascripts')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/contac', function(req, res) {
    res.sendFile(path.join(__dirname + '/front.html'));
});



app.get('/signUp', function(req, res) {
    res.sendFile(path.join(__dirname + '/signuppage.html'));
});


app.get('/profile', function(req, res) {
    res.sendFile(path.join(__dirname + '/profile.html'));
});

app.use(bodyParser.json());
app.post('/contact',(req,res)=>{
   
    var detail = new contact({
        email: req.body.email,
        name: req.body.name,
        number: req.body.number,
        admin:req.body.admin
    });


    contact.findOne({email:detail.email}).then((doc)=>{
        if(!doc){
            detail.save().then((doc) =>{
                res.send({status: true, message:"Data Saved"});
            },(e)=>{
                res.send({status: false, message:"Data not Saved"});

            })         
        }
        else{
            res.send({status: false, message:"Data exists"});
        }
    });
   
   

});


app.post('/contactFetch',(req,res)=>{
    console.log(req.body);
    contact.find({admin:req.body.another}).then((contact)=>{
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
//console.log('oldemail',oldemail,detail);
contact.findOneAndUpdate({email:oldemail},detail)
.then((resp)=>{
//console.log('resp',resp);
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


app.post('/user',(req,res)=>{
    //console.log("req.body",req.body);

    var log=new user({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        repassword:req.body.repassword
    });
    user.findOne({email:req.body.email})
.then((doc)=>{
    //console.log("doc",doc);
    if(doc!=null){
        return res.send({status :false,message:"mail exists",user:true});
    }
if(doc==null){
    log.save().then((response)=>{
        return res.send({status: true,message:"successfully saved"});
        
    // console.log("response",response);   
    }).catch((e)=>{
     //console.log(e);
     return res.send({status:false,message:"user not saved"});
    })
}
});
});






app.post('/signin',(req,res)=>{
var log=new user({
    email:req.body.email,
    password:req.body.password
});
// console.log("email is",log.email);
// console.log("password is",log.password);
 user.findOne({email:log.email})
.then((doc)=>{
    //console.log(doc);
    if(doc!=null){
       // console.log('password',doc.password);
        //console.log('logpassword',log.password);
        if(doc.password==log.password){
            res.send({status:true,message:"login successful", data:{name:doc.name,email:doc.email}});
        }
        else{
            res.send({status:false,message:"Incorrect password"})
        }
    }
    else{
        res.send({status:false,message:"please signup first"});
    }
},(e)=>{
console.log('err',e);
res.send({status:false,message:"Error loging in"});
});
});

app.get('/logoff',(req,res)=>{
   
     return res.send({status:true,message:"successfully logout"})
});
   

app.listen(3000);