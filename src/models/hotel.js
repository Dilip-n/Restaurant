const mongoose =  require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const hotelSchema = new mongoose.Schema({
    hotelName:{
        type:String,
        required: true,
        
    },
    userName:{
        type:String,
        required: true,
       trim:true,
       validate(value) {
           if(!value) {
               throw new Error('Please provide the name')
           }
       }
    },
    email:{
        type:String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is Invalid')
      }
        }
        
    },
    password:{
        type:String,
        required: true,
        trim: true,
        // minlength: 7
        
        // validate(value){
        //     if(value.toLowerCase().includes('password')){
        //         throw new Error('password is invalid')
        //     }
        // }
    },
    phoneNumber:{
        type:String,
        required: true
        
    },

    hoteltype_veg:{
        type: Boolean,
        default: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
    
})




hotelSchema.methods.generateAuthToken = async  function () {
    const user = this
      console.log(process.env.JWT_SECRET)
       const token = jwt.sign({_id: user._id.toString(), hotel_name: user.hotel_name, userName: user.userName, email: user.email, phoneNumber: user.phoneNumber}, process.env.JWT_SECRET) 
      console.log(token)
       user.tokens = user.tokens.concat({token})

       await user.save()
       return token
}

hotelSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.phoneNumber
    delete userObject.userName

    return userObject
}


hotelSchema.pre('save', async function (next) {
    const user = this   
      if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)        
      }
      next()
 })

 hotelSchema.statics.findByCredentials = async (email, password) => {
    const hotel = await Hotel.findOne({ email })
console.log(hotel)
    if (!hotel) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, hotel.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return hotel
}

const Hotel =   mongoose.model('Hotel', hotelSchema)
    
   module.exports = Hotel