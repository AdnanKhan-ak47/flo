import React, { useState } from 'react'
import OrderCard from './OrderCard'

const OrderPage = () => {
  const onChange = (e) => {
    if (e.target.name == "orderID") {
      setOrderID(e.target.value)
    }
  }


  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/orders/getorder", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderID: orderID })
    });
    const json = await response.json();
    setOrderData(json[0]);
    console.log(json[0]);
  }

  const [orderID, setOrderID] = useState("")
  const [orderData, setOrderData] = useState(null)


  return (
    <div className='flex flex-col items-center h-screen bg-gray-300 text-xl'>
      <div className='bg-white h-fit py-4 px-8 w-[80%] mt-20 rounded-md'>
        <div className='flex flex-row m-2'>
          <input name='orderID' type="text" placeholder='Enter your Order ID' onChange={onChange} value={orderID} className='p-2 w-[40%] focus:outline-none focus:outline-blue-500 rounded-md ' />
          <button onClick={fetchData} className='bg-blue-800 text-white p-2 h-fit rounded-md'>Track Your Order</button>
        </div>
        <p>Check the current status of your shipment.</p>
      </div>

      {orderData != null ? <OrderCard orderData={orderData} /> : null}
    </div>
  )
}

export default OrderPage;
