const mongodb = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');

// var userSchema = new mongoose.Schema({
//     email:{
//         type: String,
//         trim: true,
//         required: true,
//         minlength: 1
//         // validate:{
//         //     validator: validate.isEmail,
//         //     message: 'not a valid email'
//         // }
//         },

//     password:{
//         type: String,
//         required: true,
//         minlength: 1
//     },
// });
// var user = mongoose.model('user',UserSchema);

var contactList = new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        required: true,
        minlength: 1,
    
    },
    
    name:{
        type: String,
        required: true,
        minlength: 1
        },
    
    number:{
        type: Number,
        minlength: 1
    }
    
});

var contact = mongoose.model('contact',contactList);
//console.log(contact);
module.exports={contact};