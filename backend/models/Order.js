import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema({
  orderID: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  }
})

const Order = mongoose.model('order', OrderSchema);
export default Order