const mongoose =  require('mongoose')

orderDetailSchema = new mongoose.Schema({
    orderMasterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
         ref: 'OrderMaster'
        
    },
    menuItemId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
         ref: 'MenuItem'
    },
    orderQuantity: {
        type: Number,
        required:true
        
    }
})

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema)

module.exports = OrderDetail