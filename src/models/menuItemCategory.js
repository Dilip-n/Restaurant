const mongoose = require('mongoose')

MenuItemCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})



const MenuItemCategory = mongoose.model('MenuItemCategory', MenuItemCategorySchema )

module.exports = MenuItemCategory