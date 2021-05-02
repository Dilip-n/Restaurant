const mongoose =  require('mongoose')

invoiceMasterSchema = new mongoose.Schema({

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
        
    },
    invoiceTotal:{
        type: Number,
        default: 0
    }
})

const InvoiceMaster = mongoose.model('InvoiceMaster', invoiceMasterSchema)

module.exports = InvoiceMaster 