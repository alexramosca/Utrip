const express = require('express')
const User = require('../models/User')
const User_trip = require('../models/User_trip.js')
const Applications = require('../models/Applications.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router();
const Auth = require('../middlewares/Auth.js')
const CheckDoubleApplications = require('../middlewares/CheckDoubleApplications.js')
const Trip = require('../models/Trip.js')
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
                const token = jwt.sign({user: findUser.dataValues.UserId}, key, {expiresIn: '2h'})
                res.cookie('token', token, { httpOnly: true, sameSite: "None", secure: true, maxAge: 7200000});
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
  router.get('/applicationsbyuser', Auth, async(req, res)=>{
    const userId = req.userId
    console.log(userId)
    try{
        const applications = await Applications.findAll({
            include: [
              {
                model: User,
                as: 'RequestUser',
                attributes: { exclude: ['password'] },
              },
              {
                model: User,
                as: 'Driver',
                attributes: { exclude: ['password'] },
              },
              {
                model: Trip, 
              },
            ],
        
            where:{driver_id: userId}
          });
          if(applications){
            res.status(200).json(applications)
          }
          else{
            res.status(404).json("No applications found")
          }
          
    }
    catch(err){
        res.status(500).json("Internal error")
    }

  })
  
  router.post('/apply', Auth, CheckDoubleApplications, async(req, res)=>{
    const requester_id = req.userId
    const driver_id = req.body.driver_id
    const TripId = req.body.TripId
    if(requester_id === driver_id){
        return res.status(400).json({error: "You cannot apply for a trip you created!"})
    }
    try{
        const apply = await Applications.create({
            requester_id,
            driver_id,
            TripId
        })
        if(apply){
            res.status(201).json("Your application has been made successfully")
        }
        else{
            res.status(400).json({error: "Something went wrong."})
        }
    }
    catch(err){
        res.status(500).json({error: "Internal error"})
    }
    
    
  })

  router.post('/applications/confirm', Auth, async(req, res)=>{
        console.log(req.body)
        const driver_id = req.userId
        const requester_id = req.body.requester_id
        const applicationId = req.body.application_id
        try{
            const application = await Applications.findOne({
                where: {
                  driver_id,
                  requester_id,
                  application_id: applicationId,
                },
              });
              
            if(application){
                await application.update({is_active: true})
                res.status(200).json('Application confirmed')
            }
            else {
                res.status(404).json("No application found")
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json("Internal error")
        }
        
  })

  /*router.post('/confirmapplication', async (req, res)=>{
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
    

  })*/


module.exports = router