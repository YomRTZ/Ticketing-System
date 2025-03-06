const express = require('express');
const router=express.Router();
const {getUsers,getUserById,getUserByUid,updateUserDetails,updateUser,deleteUser}=require('../controllers/user.controller.js')

router.get('/get',getUsers);
router.get('/get/:id', (req, res, next) => {
    console.log(`GET request received with ID: ${req.params.id}`);
    next();
}, getUserById);
router.get('/getUserByUid',getUserByUid);
router.put('/update',updateUser);
router.put('/update/:id',(req, res, next) => {
    console.log(`GET request received with ID: ${req.params.id}`);
    next();  
},updateUserDetails);
router.delete('/delete:id',deleteUser);
module.exports=router;