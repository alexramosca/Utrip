const express = require('express')
const router = express.Router();
const Trip = require('../models/Trip.js')
const User_trip = require('../models/User_trip.js')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const Auth = require('../middlewares/Auth.js');
const { Op } = require('sequelize');


router.get('/', Auth, async (req, res) => {
  const LIMIT_ITEMS = 5;
  const page = req.query.page || 1;
  const offset = (page - 1) * LIMIT_ITEMS;

  // Retrieve query parameters from the request
  const queryParams = req.query;

  const totalTrips = await Trip.count();
  const totalPages = Math.ceil(totalTrips / LIMIT_ITEMS);

  try {
    let queryOptions = {
      include: [
        {
          model: User,
          through: User_trip,
          attributes: {
            exclude: ['password']
          }
        },
      ],
      limit: LIMIT_ITEMS,
      offset: offset
    };

    // Dynamically construct the where clause based on query parameters
    if (Object.keys(queryParams).length > 0) {
      queryOptions.where = {};

      Object.keys(queryParams).forEach(param => {
        if (param !== 'page') { // Exclude 'page' parameter from the where clause
          // Use Op.iLike for case-insensitive comparisons with PostgreSQL
          queryOptions.where[param] = {
            [Op.iLike]: `%${queryParams[param]}%`
          };
        }
      });
    }

    const userTrips = await Trip.findAll(queryOptions);

    res.json({ trips: userTrips, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



  //Need change for better performace in future
router.get('/mytrips', Auth, async (req, res)=>{
  console.log(req.userId)
  const userId = req.userId
  try {
    const trips = await Trip.findAll({
      include: {
        model: User,
        through: User_trip
      }
    })
    
    const filteredTrip = trips.filter((trip)=>{
        return trip.Users.some((user)=> user.UserId === userId)
    })

    if(filteredTrip){
      res.status(200).json(filteredTrip)
    }
    else{
      res.status(404).json("no trips found to the user")
    }
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/test', Auth, async (req, res)=>{
  console.log(req.cookies.token)
  res.status(201).json("hi")
})

router.post('/create', Auth, async (req, res)=>{
 
    const trip = req.body.upData
    console.log(trip)
    const userId = req.userId
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