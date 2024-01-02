const express = require('express')
const router = express.Router();
const Trip = require('../models/Trip.js')
const User_trip = require('../models/User_trip.js')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const Auth = require('../middlewares/Auth.js')



router.get('/', Auth, async (req, res) => {
    try {
      const userTrips = await Trip.findAll({
        include: [
          {
            model: User,
            through: User_trip,
            attributes: {
              exclude: ['password']
            }
          },
        ],
      });
  
      res.json(userTrips);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/:id', Auth, async (req, res)=>{
  
  try {
    const userTrips = await Trip.findOne({
      where: {
        TripId: req.params.id
      },
      include: [
        {
          model: User,
          through: User_trip,
          attributes: {
            exclude: ['password']
          }
        },
      ],
    });

    res.json(userTrips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/test', Auth, async (req, res)=>{
  console.log(req.cookies.token)
  res.status(201).json("hi")
})

router.post('/create', Auth, async (req, res)=>{
 
    const trip = req.body
    const {userId} = req.body
    
    try{
        const createTrip = await Trip.create(trip)
        if(createTrip){
            const insertJoinTable = await User_trip.create({
                isDriver: true,
                UserId: userId,
                TripId: createTrip.TripId
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