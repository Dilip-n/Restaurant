const mongoose =  require('mongoose')
const Hotel = mongoose.model('Hotel', {
    hotel_name:{
        type:String
    },
    hoteltype_veg:{
        type: Boolean,
        default: true
    }
    
})

module.exports = Hotel