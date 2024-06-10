var express = require('express');
var router = express.Router();


var school=require("../controller/schoolcontroller")

// for token..
var jwt=require('../middlware/auth');



// output ma localhost:3000/school lakhvanu.........
router.get('/',school.get_data_school);
router.post('/',school.add_school);
router.post('/update/:id',school.update_school);
router.post('/deleat/:id',school.deleat_school);
router.post('/login',school.login);
router.get('/logout',school.logout);
router.get('/login',school.login_user_data);


router.post('/login/addstaff',school.addstaff);
router.get('/login/viewstaff',school.viewstaff);
router.post('/login/updatestaff/:id1',school.update_staff);
router.get('/login/deleatstaff/:id1',school.deleat_staff);








module.exports = router;
