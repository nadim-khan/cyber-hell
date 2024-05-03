//Rest api 
const express = require('express');
const bcrypt = require('bcrypt');
const helpers = require('../middleware/helper');
const userController = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/auth.controller');
const multer = require('multer');

const router = express.Router();

//localhost:4050/api/auth/register call
router.post('/register', asyncHandler(insert), login);
router.post('/login', asyncHandler(getUserByEmailIdAndPassword), login);
router.get('/getAllUsers', asyncHandler(getAllUsers));
router.post('/updateUser', asyncHandler(updateUserDetails));


async function insert(req, res, next) {
    debugger
    console.log('Registering the User', user);
    const user = req.body;
    console.log('Registering the User', user);
    req.user = await userController.insert(user);
     next();
}


async function getUserByEmailIdAndPassword(req, res, next) {
    const user = req.body;
    const savedUser = await userController.getUserByEmailIdAndPassword(
        user.email,
        user.password
    );
    req.user = savedUser;
    next();
}

async function updateUserDetails(req, res, next) {
    const user = req.body;
    console.log('User to be updated'+user);
    updateUser= await userController.updateUserData(user);
    res.json(updateUser);
    next();
}

async function getAllUsers(req, res, next) {
    console.log('getAllUsers')
    const usersList = await userController.getAllUsers();
    res.json(usersList);
    next();
}

function login(req, res) {
    const user = req.user;
    const token = authController.generateToken(user);
    res.json({
        user,
        token
    });
}



module.exports = router;