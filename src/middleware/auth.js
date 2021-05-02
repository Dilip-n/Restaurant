const jwt = require('jsonwebtoken')
const Hotel= require('../models/hotel')

const auth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       const hotel = await Hotel.findOne({_id: decoded._id})
       
       if(!hotel){
           throw new Error()
       }
       req.token=token     
       req.hotel=hotel
       next()
    }catch(e){
        res.status(401).send({error:'Please authenticate.'})
    }

}

module.exports = auth