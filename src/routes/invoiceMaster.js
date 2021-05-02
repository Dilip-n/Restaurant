const express = require('express')
const InvoiceMaster = require('../models/invoiceMaster')
const router = new express.Router()


router.post('/invoiceMaster', async (req,res)=>{
        const invoiceMaster = new InvoiceMaster({
           ...req.body,       
          orderMasterId: req.body.orderMasterId,
          menuItemID:req.body.menuItemID
    })

    try {
        await invoiceMaster.save()
        res.status(201).send(invoiceMaster)
    } catch (e) {
        res.status(400).send(e)
    }
})

    
router.get('/invoiceMaster', async (req,res)=>{
    
    try {
         const invoiceMaster = await InvoiceMaster.find().populate("orderMasterId").populate("menuItemId").exec() 
         if (!invoiceMaster) {
            return res.status(404).send()
        }


        res.send(invoiceMaster)
    } catch (e) {
        res.status(500).send()
    }

})  

router.get('/menuitem/:id', async(req, res)=>{
    try {
        const menuItem = await MenuItem.findOne({_id: req.params.id}).populate("MenuItemCategoryId").exec() 
        if (!menuItem) {
           return res.status(404).send()
       }

       res.send(menuItem)
   } catch (e) {
       res.status(500).send()
   }

})

router.patch('/menuitem/:id', async (req, res) => {
   
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ['name', 'price', 'isVeg','needsKot']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
   console.log(isValidOperation)
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    const query= {_id:req.params.id}
    console.log(query)
    
    try {
      
       const menuitem = await MenuItem.findById(query)
    console.log(menuitem)   
    if (!menuitem) {
        return res.status(404).send()
    }   
    
    updates.forEach((update) => menuitem[update]=req.body[update] )
       await menuitem.save()

       

        res.send(menuitem)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/menuitem/:id', async (req, res) => {
    try{
    const menu = await MenuItem.findByIdAndDelete(req.params.id)  
   if(!menu){
    return res.status(401).send()  
   }
   
    res.send(menu)
    }catch (e){
        res.status(500).send()
    }
})


module.exports = router
