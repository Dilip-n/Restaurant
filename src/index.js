const express = require('express')
require('./DB/mongoose')

const hotelRouter = require('./routes/hotel') 
const menuRouter = require('./routes/menu')
const orderRouter = require('./routes/order')
const app = express()

app.use(express.json())
app.use(hotelRouter)
app.use(menuRouter)
app.use(orderRouter)




   

const port = process.env.PORT || 3000




app.listen(port,()=>{
console.log('Server is up and runing on port'+ port)
})

