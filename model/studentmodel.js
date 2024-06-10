const mongoose = require('mongoose');
var studentschema=new mongoose.Schema({
    name:{
        type:String
        
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    staffid:{
        type:String
    },
    schoolid:{
        type:String

    },
    mobileno:{
        type:String

    },
})

module.exports  = mongoose.model('student1', studentschema);