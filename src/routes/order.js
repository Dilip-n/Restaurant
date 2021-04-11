const express = require('express')
const Order = require('../models/order')
const router = new express.Router()



router.post('/order', async (req, res)=>{ 
    const order = new Order(req.body)
    try {
        await order.save()
    res.send(order)
    }catch(error){
    res.status(401).send(error)
    }
})

router.get('/order', async (req,res)=>{
        try{
            const order = await Order.find({})
             res.send(order)
        }catch(error){
            res.send(error)
        }
    })

router.get('/order/:id', (req, res)=>{
        const _id = req.params.id
        Order.findById({_id}).then((order)=>{
      res.send(order)
        }).catch((error)=>{
         res.send(error)
        })
    })
 
router.patch('/order/:id',async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['item_name', 'item_qty']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
    
        try {
            const order = await Order.findOne({_id: req.params.id})
       
        if (!order) {
            return res.status(404).send()
        }   
        
        updates.forEach((update) => order[update]=req.body[update] )
           await order.save()
    
           
    
            res.send(order)
        } catch (e) {
            res.status(400).send(e)
        }
    })


router.delete('/order/:id', async (req, res) => {
        try{
        const order = await Order.findByIdAndDelete(req.params.id)  
       if(!order){
        return res.status(401).send()  
       }
       
        res.send(order)
        }catch (e){
            res.status(500).send()
        }
 })
    module.exports = router