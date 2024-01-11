const express = require('express')
const User = require('../models/User')
const User_trip = require('../models/User_trip.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router();
const Auth = require('../middlewares/Auth.js')
require('dotenv').config();


router.get('/', async (req, res)=>{
    try{
        const findUsers = await User.findAll()
        if(findUsers){
            res.status(200).json(findUsers)
        }
        else {
            res.status(400).json({error: "Could not retrieve users"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "Internal error"})
    }
})
router.post('/register', async(req, res) =>{
    const user = req.body
   
        try{
            const addUser = await User.create(user)
            res.status(200).json({addUser})
        }
        catch(err){
            console.log(err)
            res.status(401).send("Error adding user. Please try again")

        }
    
    
})
router.post('/checkEmail', async (req, res)=>{
    const email = req.body.email;
    try{
        const user = await User.findOne({where: {email}})
        if(user){
        res.status(200).json({isAvailable: "false"})
    }
    else {
        res.status(200).json({isAvailable: "true"})
    }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal error"})
    }
    

})

router.post('/login', async(req, res) =>{
    let {email, password}= req.body;
    const key = process.env.SECRETKEY
    

    try{
        const findUser = await User.findOne({where: {email: email}})
        if(findUser){
            
            // compare passwords
            const validPassword =  bcrypt.compareSync(password, findUser.dataValues.password);
            if(validPassword){
                const token = jwt.sign({user: findUser}, key, {expiresIn: '2h'})
                res.cookie('token', token, { httpOnly: true, maxAge: 7200000 });
                res.status(200).json(findUser);
            }
            else{
                res.status(401).send('Invalid Password');
            }
        }
        else{
            res.status(404).send('User not found');
        }

    }
    catch(err){
        console.log(err)
    }

})
//change to post in production
router.get('/checkAuth', Auth , async(req, res)=>{

    const authToken = req.cookies['token']
    console.log(authToken)
    if(authToken!= null){
        res.status(200).json({isAuthorized: true})
    }
    else {
        res.status(401).json({isAuthorized: false})
    }
})
//change to post in production
router.get('/logout', async (req, res) => {
    try {
      res.status(200).clearCookie('token', { path: '/' }).json({msg: 'Logged out successfully'});
    } catch (error) {
      console.error('Error clearing cookie:', error);
      res.status(500).json('Error clearing cookie');
    }
  });
  
  router.post('/apply', async (req, res)=>{
    let userId= req.body.userId;
    let tripId = req.body.tripId;
    console.log(req.body)
    try {
        let createApplication = await User_trip.create({
            isDriver: 0,
            UserId: userId,
            TripId: tripId
        })
        if(createApplication){
            res.status(201).json({data: createApplication , msg: "Successful Application"})
        }
        else {
            res.status(401).json("bad request")
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json("Server Internal Error")
    }
    

  })


module.exports = router