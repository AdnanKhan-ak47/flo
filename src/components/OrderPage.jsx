import React, { useState } from 'react'
import OrderCard from './OrderCard'

const OrderPage = () => {
  const onChange = (e) => {
    if (e.target.name == "orderID") {
      setOrderID(e.target.value)
    }
  }
  const [orderID, setOrderID] = useState("")

  return (
    <div className='flex flex-col items-center h-screen bg-gray-300 text-xl'>
      <div className='bg-white h-fit py-4 px-8 w-[80%] mt-20 rounded-md'>
        <div className='flex flex-row m-2'>
          <input name='orderID' type="text" placeholder='Enter your Order ID' onChange={onChange} value={orderID} className='p-2 w-[40%] focus:outline-none focus:outline-blue-500 rounded-md ' />
          <button className='bg-blue-800 text-white p-2 h-fit rounded-md'>Track Your Order</button>
        </div>
        <p>Check the current status of your shipment.</p>
      </div>

      <OrderCard />
    </div>
  )
}

export default OrderPage;