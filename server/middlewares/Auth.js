
const jwt = require('jsonwebtoken')

const Auth = async (req, res, next) => {
      try {

        const testUser = jwt.verify(req.cookies.token, process.env.SECRETKEY)
        next()
      } catch (error) {
      
        res.status(204).json({ error: 'No content' });
      }
        }
      
  
  module.exports = Auth;