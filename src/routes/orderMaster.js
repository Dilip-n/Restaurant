const express = require('express')
const OrderMaster = require('../models/orderMaster')
const router = new express.Router()


router.post('/orderMaster', async (req,res)=>{
    
    const orderMaster = new OrderMaster({
        ...req.body,
        tableId:req.body.tableId
    })

    try {
        await orderMaster.save()
        res.status(201).send(orderMaster)
    } catch (e) {
        res.status(400).send(e)
    }
})

    
router.get('/orderMaster', async (req,res)=>{
    
    try {
         const orderMaster = await OrderMaster.find({})
         if (!orderMaster) {
            return res.status(404).send('All Tables are available')
        }

        res.send(orderMaster)
    } catch (e) {
        res.status(500).send()
    }

})  

router.get('/orderMaster/:id', async(req, res)=>{
    try {
        const orderMaster = await OrderMaster.findOne({_id: req.params.id}) 
        if (!orderMaster) {
           return res.status(404).send()
       }

       res.send(orderMaster)
   } catch (e) {
       res.status(500).send()
   }

})

router.patch('/orderMaster/:id', async (req, res) => {
   
    const updates = Object.keys(req.body)
    const allowedUpdates = ['tableNumber','type']  
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
     if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
  
    try {
      
       const orderMaster = await OrderMaster.findById({_id:req.params.id})
     
    if (!orderMaster) {
        return res.status(404).send()
    }   
    
    updates.forEach((update) => orderMaster[update]=req.body[update] )
       await orderMaster.save()

        res.send(orderMaster)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/orderMaster/:id', async (req, res) => {
    try{
    const orderMaster= await OrderMaster.findByIdAndDelete(req.params.id)  
   if(!orderMaster){
    return res.status(401).send()  
   }
   
    res.send(orderMaster)
    }catch (e){
        res.status(500).send()
    }
})


module.exports = router
