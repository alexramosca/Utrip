const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router();
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

router.get('/:id', (req, res)=>{
    res.send(`this is user ${req.params.id}`)
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


module.exports = router