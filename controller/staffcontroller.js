var staffmodel = require("../model/staffmodel")
var studentmodel = require("../model/studentmodel")
const storage = require('node-persist');
storage.init()

exports.login = async (req, res) => {
    var data = await staffmodel.find({ "email": req.body.email });
    var user_id1 = await storage.getItem('user_id1');

    console.log(data)
    
    if (user_id1 == undefined) {
            if (data.length == 1) {
                    if (data[0].password == req.body.password) {
                        await storage.setItem('user_id1', data[0].id)
                        res.status(200).json({
                            status: "login staff success",
                            data
                        })
                    } else {
                        res.status(200).json({
                            status: "check password of staff"
                        })
                    }
            } else {
                res.status(200).json({
                    status: "password ,email incorrect of ataff"
                })
            }
    } else {
        res.status(200).json({
            status: "already staff login"
        })
    }
}


// je staff login thyo a jova
exports.viewloginstaff = async (req, res) => {
    var user_id1 = await storage.getItem('user_id1');
    var data = await staffmodel.findById(user_id1).populate("schoolid");
    res.status(200).json({
        status: "this staff is login",
        data
    })
}

// logout staff
exports.logout = async (req, res) => {
    await storage.removeItem('user_id1');
    res.status(200).json({
        status: "logout staff success"
    })
}


// login je staff thy a potano student add kre
exports.addstudent=async(req,res)=>{
    var id = await storage.getItem('user_id1');
    req.body.staffid = id;
    if(id==undefined){
        res.status(200).json({
            status: "plz login staff",
            

    })
}
    else
    {
        var data = await studentmodel.create(req.body);
        res.status(200).json({
            status: "add student success",
            data
        })

    }
   
}

// login staff a je student add kryo te view thay
exports.viewstudent = async (req, res) => {
    var id = await storage.getItem('user_id1');

    var data = await studentmodel.find({ "staffid": id });
    res.status(200).json({
        status: "add selected",
        data
    })
}




