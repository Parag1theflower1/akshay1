const mongoose = require('mongoose');
var userschema=new mongoose.Schema({
    name:{
        type:'string'
    },
})

module.exports  = mongoose.model('user1', userschema);