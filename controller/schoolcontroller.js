var schoolmodel = require("../model/schoolmodel")
var staffmodel = require("../model/staffmodel")
const storage = require('node-persist');
storage.init()

// for password sqcurity
const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');





// school login thay ani id=user_id
// staff login thay ani id=user_id1



// all school watch
exports.get_data_school = async (req, res) => {
    var data = await schoolmodel.find();

    res.status(200).json({
        status: "watch",
        data

    })
}


// add school
exports.add_school = async (req, res) => {

    // password..security------------------------------------------------
    var b_pass = await bcrypt.hash(req.body.password, 10)
    req.body.password = b_pass
    var data = await schoolmodel.create(req.body);
    res.status(200).json({
        status: "add success",
        data

    })
}


// update school
exports.update_school = async (req, res) => {
    var id = req.params.id
    var data = await schoolmodel.findByIdAndUpdate(id, req.body);
    res.status(200).json({
        status: "updated",
    })
}

// deleat school

exports.deleat_school = async (req, res) => {
    var id = req.params.id
    var data = await schoolmodel.findByIdAndDelete(id);
    res.status(200).json({
        status: "deleated successfully",
    })
}


// login school





exports.login = async (req, res) => {
    var data = await schoolmodel.find({ "email": req.body.email })
    var user_id = await storage.getItem('user_id');
    console.log(user_id)
    if (user_id == undefined) {

        if (data.length == 1) {


            bcrypt.compare(req.body.password, data[0].password, function (err, result) {
                if (result == true) {
                    var token=jwt.sign({id:data[0].id},"cdmi")

                    

                    storage.setItem('user_id', data[0].id)

                    res.status(200).json({
                        status: "login success",
                        token

                    })



                }
                else {
                    res.status(200).json({
                        status: "chek password"
                    })

                }
            });





        }
        else {

            res.status(200).json({
                status: "chek password and email"
            })


        }

    }
    else {
        res.status(200).json({
            status: "already login"
        })
    }

}


// je user  login thyo a jova
exports.login_user_data = async (req, res) => {
    var user_id = await storage.getItem('user_id');

    var data = await schoolmodel.findById(user_id);

    res.status(200).json({

        status: "watch login detail",
        data,
    })
}


// logout school
exports.logout = async (req, res) => {
    await storage.removeItem('user_id');
    res.status(200).json({
        status: "school logout"
    })

}


// login je school thy a potano staff add kre
exports.addstaff=async(req,res)=>{
    var id = await storage.getItem('user_id');
    req.body.schoolid = id;
    if(id==undefined){
        res.status(200).json({
            status: "plz login",
            

    })
}
    else
    {
        var data = await staffmodel.create(req.body);
        res.status(200).json({
            status: "add staff success",
            data
        })

    }
   
}
// login school a je staff add kryo te view thay
exports.viewstaff = async (req, res) => {
    var id = await storage.getItem('user_id');

    var data = await staffmodel.find({ "schoolid": id });
    res.status(200).json({
        status: "add selected",
        data
    })
}

// login school...tena staff ne update kri shake
exports.update_staff = async (req, res) => {
    var id = await storage.getItem('user_id');

    var id1 = req.params.id1
    var data = await staffmodel.findById( id1 );

    
    console.log(data) 
    if (data.schoolid==id) {

        var data = await staffmodel.findByIdAndUpdate(id1, req.body);
        res.status(200).json({
            status: "Data updated",
            data
        })
    }
    else
    {
    res.status(200).json({
        status: "not allow",
        

    })
}

}


// deleat staff

exports.deleat_staff = async (req, res) => {
    var id = await storage.getItem('user_id');

    var id1 = req.params.id1
    var data = await staffmodel.findById( id1 );

    
    console.log(data) 
    if (data.schoolid==id) {

        var data = await staffmodel.findByIdAndDelete(id1);
        res.status(200).json({
            status: "Data deleated",
            
        })
    }
    else
    {
    res.status(200).json({
        status: "not allow",
        

    })
}

}






