import { HTTP_BAD_REQ } from './../constants/http_status';
import asynceHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { Router } from "express"
import { sample_users } from "../data"
import { User, UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs'
const router = Router()


router.get('/seed', asynceHandler(async (req, res) => {
    const usersCount = await UserModel.countDocuments()
    if (usersCount > 0) {
        res.send("Seed is already done! ")
        console.log(usersCount);

        return
    }
    await UserModel.create(sample_users)
    res.send("Seed is Done !")
})
)


router.post('/login', asynceHandler( async(req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (user) {
        res.send(generateTokenResponse(user))
    } else {
        res.status(400).send("user name or password is not valid")
    }
}))


router.post('/register', asynceHandler(async (req, res) => {
    const { name, email, password, address } = req.body
    const user = await UserModel.findOne({ email })
    if (user) {
        res.status(HTTP_BAD_REQ).send('User Already Exit PLZ LOGIN')
        return
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser: User = {
        id: '',
        name,
        email: email.toLowerCase(),
        password: hashPassword,
        address,
        isAdmin: false
    }
    const regUser = await UserModel.create(newUser)
    res.send(generateTokenResponse(regUser))

}))

const generateTokenResponse = (user: User) => {
    const token = jwt.sign({id:user.id ,  email: user.email, isAdmin: user.isAdmin },(process.env.JWT_TOKEN!) , { expiresIn: "7d" })
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
      };
}

export default router