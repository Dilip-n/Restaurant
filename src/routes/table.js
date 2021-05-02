const express = require('express')
const Table = require('../models/table')
const router = new express.Router()


router.post('/table', async (req,res)=>{
    
    const table = new Table(req.body)

    try {
        await table.save()
        res.status(201).send(table)
    } catch (e) {
        res.status(400).send(e)
    }
})

    
router.get('/tables', async (req,res)=>{
    
    try {
         const tables = await Table.find({})
         if (!tables) {
            return res.status(404).send('All Tables are available')
        }

        res.send(tables)
    } catch (e) {
        res.status(500).send()
    }

})  

router.get('/table/:id', async(req, res)=>{
    try {
        const table = await Table.findOne({_id: req.params.id}) 
        if (!table) {
           return res.status(404).send()
       }

       res.send(table)
   } catch (e) {
       res.status(500).send()
   }

})

router.patch('/table/:id', async (req, res) => {
   
    const updates = Object.keys(req.body)
    const allowedUpdates = ['tableNumber','pax']  
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
     if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
  
    try {
      
       const table = await Table.findById({_id:req.params.id})
     
    if (!table) {
        return res.status(404).send()
    }   
    
    updates.forEach((update) => table[update]=req.body[update] )
       await table.save()

        res.send(table)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/table/:id', async (req, res) => {
    try{
    const table= await Table.findByIdAndDelete(req.params.id)  
   if(!table){
    return res.status(401).send()  
   }
   
    res.send(table)
    }catch (e){
        res.status(500).send()
    }
})


module.exports = router
