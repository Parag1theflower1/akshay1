var jwt = require('jsonwebtoken');

exports.token=async(req,res,next)=>{
    jwt.verify(req.headers.authorization,"cdmi",next);
}