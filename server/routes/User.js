const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const router = express.Router();


router.get('/', (req, res)=>{
    res.send('here are the users')
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

router.post('/login', async(req, res) =>{
    let {email, password}= req.body;

    try{
        const findUser = await User.findOne({where: {email: email}})
        if(findUser){
            
            // compare passwords
            const validPassword =  bcrypt.compareSync(password, findUser.dataValues.password);
            console.log(findUser)
            if(validPassword){
                res.status(200).json({message:'success'});
            }
            else{
                res.status(403).send('Invalid Password');
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