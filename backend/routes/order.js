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

export default router;