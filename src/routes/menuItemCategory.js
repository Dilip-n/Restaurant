const express = require('express')
const MenuItemCategory = require('../models/menuItemCategory')
const router = new express.Router()

router.post('/menuItemCategory', async (req, res)=>{ 
    const menuItemCategory = new MenuItemCategory(req.body)

    try {
        await menuItemCategory.save()  
    
          
        res.status(201).send(menuItemCategory)
    
    }catch(error){
    res.status(401).send(error)
    }
})

router.get('/menuItemCategory',  async (req, res) => {
  
      try {
        
        const menuItemCategory = await MenuItemCategory.find({})
             
        if (!menuItemCategory) {
            return res.status(404).send()
        }

        res.send(menuItemCategory)
    } catch (e) {
        res.status(500).send()
    }
})



router.get('/menuItemCategory/:id',  async (req, res) => {
    const _id = req.params.id
   
    try {
        
        const menuItemCategory = await MenuItemCategory.findOne( {_id})
             
        if (!menuItemCategory) {
            return res.status(404).send()
        }

        res.send(menuItemCategory)
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/menuItemCategory/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const menuItemCategory = await MenuItemCategory.findOne({_id: req.params.id})
   
    if (!menuItemCategory) {
        return res.status(404).send()
    }   
    
    updates.forEach((update) => menuItemCategory[update]=req.body[update] )
       await menuItemCategory.save()

       

        res.send(menuItemCategory)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/menuItemCategory/:id', async (req, res) => {
    try{
    const menuItemCategory = await MenuItemCategory.findByIdAndDelete(req.params.id)  
   if(!menuItemCategory){
    return res.status(401).send()  
   }
   
    res.send(menuItemCategory)
    }catch (e){
        res.status(500).send()
    }
})




module.exports = router