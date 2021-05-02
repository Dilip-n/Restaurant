const mongoose =  require('mongoose')

orderMasterSchema = new mongoose.Schema({
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
         ref: 'Table'
    },
    type:{
        type: String,
        default: "Dine IN"
    }
    
})

const OrderMaster = mongoose.model('OrderMaster', orderMasterSchema)

module.exports = OrderMaster