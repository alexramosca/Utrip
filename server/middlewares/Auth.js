
const jwt = require('jsonwebtoken')

const Auth = async (req, res, next) => {
      try {
  
        const testUser = jwt.verify(req.cookies.token, process.env.SECRETKEY)
        next()
      } catch (error) {
      
        res.status(401).json({ error: 'Unauthorized' });
      }
        }
      
  
  module.exports = Auth;