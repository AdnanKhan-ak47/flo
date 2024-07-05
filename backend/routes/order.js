import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

router.get('/getallorders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
})

router.post('/getorder', async (req, res) => {
  try {
    const order = await Order.find({ orderID: req.body.orderID })
    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!")
  }
})

router.put('/modifyOrder', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate({ orderID: req.body.orderID }, {size: req.body.size})
    res.json(order);
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error!")
  }
})

router.put('/returnorder', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate({ orderID: req.body.orderID }, {orderStatus: "Returned"})
    res.json(order);
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error!")
  }
})

router.put('/cancelorder', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate({ orderID: req.body.orderID }, {orderStatus: "Cancelled", cancelReason: req.body.cancelReason})
    res.json(order);
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error!")
  }
})

router.put('/complaint', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate({ orderID: req.body.orderID }, {complaint: req.body.complaint})
    res.json(order);
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error!")
  }
})





export default router;