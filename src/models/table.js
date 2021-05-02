const mongoose =  require('mongoose')

tableSchema= new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true
         
    },
    pax:{
        type: Number,
       required: true
    }
    
})

const Table = mongoose.model('Table', tableSchema)

module.exports = Table