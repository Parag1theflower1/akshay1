const usermodel = require('../model/usermodel')
const storage = require('node-persist');


exports.get_data=async (req,res)=>{
    var data=await usermodel.find(req.body);
    res.status(200).json({
        status:"watch",
        data

    })
}

exports.post_data=async (req,res)=>{
    var data=await usermodel.create(req.body);
    res.status(200).json({
        status:"watch",
        data

    })
}