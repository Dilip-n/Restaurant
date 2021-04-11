const mongoose =  require('mongoose')
const Order = mongoose.model('Order', {
    item_name:{
        type:String,
        default:true
    },
    item_qty:{
        type: Number,
        default: true
    }
    
})

module.exports = Order