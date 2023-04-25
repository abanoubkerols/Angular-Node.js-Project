import dotenv from 'dotenv'
dotenv.config({ path: "./../.env" })
import express from 'express'
import cors from 'cors'
import  path  from 'path'
import DbConnect from './config/DB'
DbConnect()




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
app.use('/api/foods', foodRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)




app.use(express.static('public'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

let port = process.env.Port|| 8000

app.listen(port, () => {
  console.log("our app is work");

})