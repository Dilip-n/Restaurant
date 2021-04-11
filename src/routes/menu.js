const express = require('express')
const Menu = require('../models/menu')
const router = new express.Router()


router.post('/menu', (req,res)=>{
    const menu = new Menu(req.body)
    menu.save().then(()=>{
    res.send(menu)
    }).catch((error)=>{
        res.status(400).send(error)
        
    })
})

router.get('/menu',(req,res)=>{
    Menu.find({}).then((menu)=>{
  res.send(menu)
    }).catch(()=>{

    })
})  

router.get('/menu/:id', (req, res)=>{
    const _id = req.params.id
    Menu.findById({_id}).then((menu)=>{
  res.send(menu)
    }).catch((error)=>{
     res.send(error)
    })
})

router.patch('/menu/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['item_name', 'item_price']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const menu = await Menu.findOne({_id: req.params.id})
   
    if (!menu) {
        return res.status(404).send()
    }   
    
    updates.forEach((update) => menu[update]=req.body[update] )
       await menu.save()

       

        res.send(menu)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/menu/:id', async (req, res) => {
    try{
    const menu = await Menu.findByIdAndDelete(req.params.id)  
   if(!menu){
    return res.status(401).send()  
   }
   
    res.send(menu)
    }catch (e){
        res.status(500).send()
    }
})


module.exports = router
