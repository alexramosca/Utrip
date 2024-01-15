
const jwt = require('jsonwebtoken')

const Auth = async (req, res, next) => {
      try {
        console.log(req.cookies.token)
        const testUser = jwt.verify(req.cookies.token, process.env.SECRETKEY)
        req.userId = testUser.user
        next()
      } catch (error) {
      
        res.status(401).json("unauthorized");
      }
        }
      
  
  module.exports = Auth;