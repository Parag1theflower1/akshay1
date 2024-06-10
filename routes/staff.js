var express = require('express');
var router = express.Router();
var staff=require("../controller/staffcontroller");


router.post('/login',staff.login);
router.get('/login',staff.viewloginstaff);
router.post('/addstudent',staff.addstudent);
router.get('/logout',staff.logout);
router.post('/addstudent',staff.addstudent);
router.get('/viewstudent',staff.viewstudent);











module.exports = router;
