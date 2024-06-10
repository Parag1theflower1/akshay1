const storage = require('node-persist');
storage.init()
var studentmodel = require("../model/studentmodel")


exports.login = async (req, res) => {
    var data = await studentmodel.find({ "email": req.body.email });
    var user_id2 = await storage.getItem('user_id2');

    console.log(data)
    
    if (user_id2 == undefined) {
            if (data.length == 1) {
                    if (data[0].password == req.body.password) {
                        await storage.setItem('user_id2', data[0].id)
                        res.status(200).json({
                            status: "login student success",
                            data
                        })
                    } else {
                        res.status(200).json({
                            status: "check password of student"
                        })
                    }
            } else {
                res.status(200).json({
                    status: "password ,email incorrect of ataff"
                })
            }
    } else {
        res.status(200).json({
            status: "already student login"
        })
    }
}