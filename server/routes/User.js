const express = require('express')
const router = express.Router();


router.get('/', (req, res)=>{
    res.send('here are the users')
})

router.get('/:id', (req, res)=>{
    res.send(`this is user ${req.params.id}`)
})

module.exports = router