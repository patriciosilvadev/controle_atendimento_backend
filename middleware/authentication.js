const express = require('express');
const router = express.Router();
const config = require('../config'); 
const jwt    = require('jsonwebtoken'); 

router.use('/api', function(req, res, next) {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  // decode token
  /**
   * if developement
   */
  if( process.env.NODE_ENV === 'development' ){

    next();
  
  }else{

    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {      
        if (err) {
            console.error(err);
          return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      }); 
    }

  }

});

module.exports = router;
