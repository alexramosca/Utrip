const express = require('express')
const router = express.Router();
const Trip = require('../models/Trip.js')
const User_trip = require('../models/User_trip.js')

router.get('/', (req, res)=>{
    res.send('here are the trips')
})

router.get('/:id', (req, res)=>{
    res.send(`this is trip ${req.params.id}`)
})

router.post('/create', async (req, res)=>{
    const trip = req.body
    const {userId} = req.body
    try{
        const createTrip = await Trip.create(trip)
        if(createTrip){
            const insertJoinTable = await User_trip.create({
                isDriver: true,
                UserId: userId,
                TripId: createTrip.id
            })
            if(insertJoinTable){
                res.status(200).json({...createTrip.dataValues, ...insertJoinTable.dataValues})
            }
        }
        else {
            res.status(401).json({error: "Error in creating the trip"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "internal error"})
    }
})
module.exports = router