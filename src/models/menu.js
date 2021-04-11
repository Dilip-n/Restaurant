const mongoose = require('mongoose')

const Menu = mongoose.model('Menu',{
    item_name:{
        type: String
    },
    item_price:{
        type:Number,
        required: true
       
    }
    })

    module.exports = Menu