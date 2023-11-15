const express = require('express')
const router = express.Router();


router.get('/', (req, res)=>{
    res.send('here are the trips')
})

router.get('/:id', (req, res)=>{
    res.send(`this is trip ${req.params.id}`)
})

module.exports = router