const mongoose = require('mongoose');
var staffschema=new mongoose.Schema({
    name:{
        type:String
        
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    schoolid:{
         type: mongoose.Schema.Types.ObjectId,
        ref: "school1"
    },
})

module.exports  = mongoose.model('staff1', staffschema);