import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { DbConnect } from './config/DB'
dotenv.config()




import foodRouter from './router/food.route'
import userRouter from './router/user.route'
import orderRouter from './router/order.route'




let app = express()
app.use(express.json())

app.use(
    cors({
      origin: 'http://localhost:4200',
      credentials: true,
    })
  )
app.use('/api/foods' , foodRouter)
app.use('/api/users' , userRouter)
app.use('/api/orders' , orderRouter)




DbConnect()

let port = 3000

app.listen(port, () => {
    console.log("our app is work");

})