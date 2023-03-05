import { verify } from 'jsonwebtoken';
import { HTTP_UNAUTH } from './../constants/http_status';


export default (req :any , res :any , next :any )=>{
    const token = req.headers.access_token as string

    if(!token){
        return res.status(HTTP_UNAUTH).send()
    }

    try {
        const decodedUser = verify(token ,process.env.JWT_TOKEN!)
        req.user = decodedUser
    } catch (error) {
        res.status(HTTP_UNAUTH).send(error)
    }

    return next()
}