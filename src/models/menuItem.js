const mongoose = require('mongoose')

menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isVeg: {
        type: Boolean,
        default: true
    },
    needsKot: {
        type: Boolean,
        default: true
    },
    menuItemCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
         ref: 'MenuItemCategory'
    }
})



const MenuItem = mongoose.model('MenuItem', menuItemSchema)

    module.exports = MenuItem