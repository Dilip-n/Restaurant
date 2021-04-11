const express = require('express')
const Hotel = require('../models/hotel')
const router = new express.Router()



router.post('/hotel', async (req, res)=>{ 
    const hotel = new Hotel(req.body)
    try {
        await hotel.save()
    res.send(hotel)
    }catch(error){
    res.status(401).send(error)
    }
})

router.get('/hotel', async (req,res)=>{
        try{
            const hotel = await Hotel.find({})
             res.send(hotel)
        }catch(error){
            res.send(error)
        }
    })

router.get('/hotel/:id', (req, res)=>{
        const _id = req.params.id
        Hotel.findById({_id}).then((hotel)=>{
      res.send(hotel)
        }).catch((error)=>{
         res.send(error)
        })
    })
 
router.patch('/hotel/:id',async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['hoteltype_veg', 'hotel_name']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
    
        try {
            const hotel = await Hotel.findOne({_id: req.params.id})
       
        if (!hotel) {
            return res.status(404).send()
        }   
        
        updates.forEach((update) => hotel[update]=req.body[update] )
           await hotel.save()
    
           
    
            res.send(hotel)
        } catch (e) {
            res.status(400).send(e)
        }
    })


router.delete('/hotel/:id', async (req, res) => {
        try{
        const hotel = await Hotel.findByIdAndDelete(req.params.id)  
       if(!hotel){
        return res.status(401).send()  
       }
       
        res.send(hotel)
        }catch (e){
            res.status(500).send()
        }
 })
    module.exports = router