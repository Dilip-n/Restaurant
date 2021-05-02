const express = require('express')
const OrderDetail = require('../models/orderDetail')
const router = new express.Router()

router.post('/orderDetail', async (req, res)=>{
    
        const orderDetail = new OrderDetail({
            ...req.body,
            orderMasterId: req.body.orderMasterId,
            menuItemId: req.body.menuItemId
        })
    
    try {
        await orderDetail.save()  
    
          
        res.status(201).send(orderDetail)
    
    }catch(error){
    res.status(401).send(error)
    }
})

router.get('/orderDetail',  async (req, res) => {
     
      try {
        
        const orderDetail = await OrderDetail.find().populate("orderMasterId").populate("menuItemId").exec() 
         if (!orderDetail) {
            return res.status(404).send()
                
        }

        res.send(orderDetail)
    } catch (e) {
        res.status(500).send()
    }
})



router.get('/orderDetaill',  async (req, res) => {
     
    try {
      
      const orderDetail = await OrderDetail.find().populate("orderMasterId").populate("menuItemId").exec() 
      console.log(orderDetail[0].menuItemId.price*orderDetail[0].orderQuantity) 
      if (!orderDetail) {
          return res.status(404).send()
              
      }

      res.send(orderDetail)
  } catch (e) {
      res.status(500).send()
  }
})



router.get('/orderDetail/:id',  async (req, res) => {
    const _id = req.params.id
   
    try {
        
        const orderDetail = await OrderDetail.findOne({_id: req.params.id}).populate("orderMasterId").populate("menuItemId").exec() 
         if (!orderDetail) {
            return res.status(404).send()
                
            }

        res.send(orderDetail)
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/orderDetail/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['orderMasterId','menuItemId','orderQuantity']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const orderDetail = await OrderDetail.findOne({_id: req.params.id})
   
    if (!orderDetail) {
        return res.status(404).send()
    }   
    
    updates.forEach((update) => orderDetail[update]=req.body[update] )
       await orderDetail.save()

       

        res.send(orderDetail)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/orderDetail/:id', async (req, res) => {
    try{
    const orderDetail = await OrderDetail.findOneAndDelete({_id: req.params.id})  
   if(!orderDetail){
    return res.status(401).send()  
   }
   
    res.send(orderDetail)
    }catch (e){
        res.status(500).send()
    }
})




module.exports = router