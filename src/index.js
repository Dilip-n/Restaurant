const express = require('express')
require('./DB/mongoose')

const hotelRouter = require('./routes/hotel') 
const menuItemRouter = require('./routes/menuItem')
// const orderRouter = require('./routes/order')
const menuItemCategoryRouter = require ('./routes/menuItemCategory')
const tableRouter = require('./routes/table')
const orderMasterRouter = require('./routes/orderMaster')
const orderDetailRouter =require('./routes/orderDetail')
const invoiceMasterRouter = require('./routes/invoiceMaster')
const app = express()

app.use(express.json())
app.use(hotelRouter)
app.use(menuItemCategoryRouter)
app.use(menuItemRouter)
// app.use(orderRouter)
app.use(tableRouter)
app.use(orderMasterRouter)
app.use(orderDetailRouter)
app.use(invoiceMasterRouter)    


   

const port = process.env.PORT 




app.listen(port,()=>{
console.log(`Server is up and runing on port ${port}`)
})

