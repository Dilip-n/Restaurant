const express = require('express')
const Hotel = require('../models/hotel')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const router = new express.Router()
var nodemailer = require('nodemailer');
const path = require('path')
var generator = require('generate-password');




router.post('/hotelSigin', async (req, res)=>{ 
    // const hotel = new Hotel(req.body)


    try {
        var password = generator.generate({
            length: 10,
            numbers: true
        });
          console.log("password",password)
        const query = {
            hotelName: req.body.hotelName,
            userName: req.body.userName,
            email: req.body.email,
            password: password,
            phoneNumber: req.body.phoneNumber,
            // hoteltype_veg: req.body.hoteltype_veg,

        }
        console.log("query",query)
        const hotel = new Hotel(query)
        console.log("hotel",hotel)
        const emailpass = await hotel.save()  
    if (emailpass){
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: "dilipnntemp@gmail.com",
              pass: "Abc@123$",
            },
          
            tls: {
              rejectUnauthorized: false,
            },
          });

          console.log(transporter)  
          var mailOptions = {
            from: 'dilipnntemp@gmail.com',
            to: emailpass.email,
            subject: 'Sending APP password',
            text: `Your Password is ${password}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
        const token = await hotel.generateAuthToken()
        
        res.status(201).send({hotel, token})
    
    }catch(error){
    res.status(401).send(error)
    }
})

router.post('/hotelLogin', async (req, res) => {
    console.log(req.body)
    try {
        const hotel = await Hotel.findByCredentials(req.body.email, req.body.password)
        console.log(hotel)
        const token = await hotel.generateAuthToken()
        console.log(token)
        res.send({ hotel, token })
      
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: "dilipnntemp@gmail.com",
              pass: "Abc@123$",
            },
          
            tls: {
              rejectUnauthorized: false,
            },
          });

          console.log(transporter)  
          var mailOptions = {
            from: 'dilipnntemp@gmail.com',
            to: req.body.email,
            subject: 'You Have successfully logged in',
            text: 'Welcome to a cluster of Hotels'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
     } catch (e) {
         res.status(400).send()
     }
})






router.post('/hotelLogout', auth, async (req, res) => {
   
    try {
        req.hotel.tokens = req.hotel.tokens.filter((token) => {
            return token.token !== req.token
        })
        
        await req.hotel.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/hotelLogoutAll', auth, async (req, res) => {
    try {
        req.hotel.tokens = []
        await req.hotel.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
 
//GET /hotels?limit=10&skip=20
router.get('/hotel', auth , async (req,res)=>{
        try{
            const {page=1,limit=10} = req.query
            const hotel = await Hotel.find({}).limit(limit *1).skip((page-1)*limit)
             if(!hotel){
                 res.status(500).send()
             }                    
            res.send(hotel)
        }catch(error){
            res.send(error)
        }   
    })

router.get('/hotel/:id', auth , async (req, res)=>{
        const _id = req.params.id
       try{
        const hotel = await Hotel.findById({_id})
        res.send(hotel)
       }catch(e){
        res.status(404).send(e)
       }
       })
 
router.put('/hotel/:id',auth,async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['hotelName','userName','email','password','phoneNumber','hoteltype_veg']
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