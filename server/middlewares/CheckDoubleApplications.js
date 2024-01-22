const Applications = require("../models/Applications")

const CheckDoubleApplications = async(req, res, next)=>{
    const requester_id = req.userId
    const driver_id = req.body.driver_id
    const TripId = req.body.TripId
    try{
        const check = await Applications.findOne({where: {requester_id, TripId}})
        if(check){
            return res.status(409).json({error:"You have already applied for this"})
        }
        else{
            next()
        }

    }
    catch(err){
        console.log('Error in check double applications middleware: ', err)
    }
}

module.exports = CheckDoubleApplications