
import { OrderStatusEnum } from './../constants/order_status';
import { OrderModel } from './../models/order.model';
import { HTTP_BAD_REQ } from './../constants/http_status';
import { Router } from "express"
import asynceHandler from 'express-async-handler';
import authMid from '../middleware/auth.mid';



const router = Router()

router.use(authMid)

router.post('/create', asynceHandler(async (req: any, res: any) => {
    const requestOrder = req.body

    if (requestOrder.items.length <= 0) {
        res.status(HTTP_BAD_REQ).send('Cart IS Empty')
        return
    }

    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatusEnum.NEW
    })

    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id })
    await newOrder.save()
    res.send(newOrder)

}))


router.get('/newOrderForCurrentUser', asynceHandler(async (req: any, res: any) => {
    const order = await OrderModel.findOne({ user: req.user.id, status: OrderStatusEnum.NEW })
    if (order) {
        res.send(order)
    } else {
        res.status(HTTP_BAD_REQ).send()
    }
}))


router.post('/pay', asynceHandler( async (req:any, res :any) => {
    const {paymentId} = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(HTTP_BAD_REQ).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatusEnum.PAYED;
    
    await order.save();

    res.send(order._id);
}))


router.get('/track/:id', asynceHandler( async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
}))

export default router;

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatusEnum.NEW });
}