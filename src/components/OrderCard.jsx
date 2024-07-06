import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "/src/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "/src/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "/src/components/ui/input"
import { Label } from "/src/components/ui/label"

import { IoIosArrowDropdown } from "react-icons/io";




const OrderCard = ({ orderData }) => {


  console.log(orderData);

  const onChange = (e) => {
    const { name, value } = e.target;
    setDimensions((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleChange = (e) => {
    if (e.target.name == "complaint") {
      setComplaint(e.target.value)
    }
    else if (e.target.name == "cancelReason") {
      setCancelReason(e.target.value)
    }
  }

  const modifyOrder = async () => {
    const size = `${dimensions.length}*${dimensions.breadth}*${dimensions.height}`
    const response = await fetch("http://localhost:5000/api/orders/modifyorder", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderID: orderData.orderID, size: size })
    });
    const json = await response.json();
    console.log(json);
  }

  const cancelOrder = async () => {
    const response = await fetch("http://localhost:5000/api/orders/cancelorder", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderID: orderData.orderID, cancelReason: cancelReason })
    });
    const json = await response.json();
    console.log(json);
  }

  const returnOrder = async () => {
    const response = await fetch("http://localhost:5000/api/orders/returnorder", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderID: orderData.orderID })
    });
    const json = await response.json();
    console.log(json);
  }

  const fileCompalint = async () => {
    const response = await fetch("http://localhost:5000/api/orders/complaint", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderID: orderData.orderID, complaint: complaint })
    });
    const json = await response.json();
    console.log(json);
  }



  const [dimensions, setDimensions] = useState({ length: 0, breadth: 0, height: 0 })
  const [cancelReason, setCancelReason] = useState("")
  const [complaint, setComplaint] = useState("")

  const [formType, setFormType] = useState("")



  return (
    <div className='bg-white flex flex-row p-4 mt-12 w-[40%] rounded-sm text-lg h-fit'>
      <div className='p-2 border border-r-black'>
        <img className='h-60 w-60' src="https://www.flomattress.com/cdn/shop/products/2_Ergo-sw_1_530x530.jpg?v=1638010457" alt="mattress_alt" />
      </div>
      <div className='p-2 w-full'>
        <p><span className='font-semibold'>Product: </span>{orderData?.product}</p>
        <p><span className='font-semibold'>Size: </span>{orderData?.size}</p>
        <p><span className='font-semibold'>Shipping Name: </span>{orderData?.customerName}</p>
        <p><span className='font-semibold'>Shipping Address: </span>{orderData?.shippingAddress}</p>
        <p><span className='font-semibold'>Phone: </span>{orderData?.phoneNumber}</p>
        <p><span className='font-semibold'>Order Status: </span>{orderData?.orderStatus}</p>
        {orderData.cancelReason ? <p><span className='font-semibold'>Cancellation Reason: </span>{orderData.cancelReason}</p> : null}
        {orderData.complaint ? <p><span className='font-semibold'>Complain: </span>{orderData.complaint}</p> : null}
        <div className='p-2 float-end hover:bg-white font-semibold hover:text-blue-600 outline hover:outline-blue-600 bg-blue-600 text-white transition-colors h-fit rounded-md '>
          <Dialog className="text-lg">
            <DropdownMenu className="" >
              <DropdownMenuTrigger className="flex flex-row items-center space-x-2 "> <p> Manage Your Order </p> <IoIosArrowDropdown size={25} /> </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52">
                <DialogTrigger onClick={() => { setFormType("modify") }} className="w-full" >
                  <DropdownMenuItem className="text-lg hover:!text-blue-600"> Modify Your Order</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger onClick={() => { setFormType("cancel") }} className="w-full" >
                  <DropdownMenuItem className="text-lg hover:!text-blue-600">Cancel Your Order</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger onClick={() => { setFormType("return") }} className="w-full" >
                  <DropdownMenuItem className="text-lg hover:!text-blue-600">Return Your Order</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger onClick={() => { setFormType("complaint") }} className="w-full" >
                  <DropdownMenuItem className="text-lg hover:!text-blue-600">File a Complaint</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-[425px] text-lg">

              {formType == "modify" ?
                <>
                  <DialogHeader>
                    <DialogTitle>Modify Your Order</DialogTitle>
                    <DialogDescription>
                      Make Changes to the dimensions of your order.
                    </DialogDescription>
                  </DialogHeader>
                  <form action="" onSubmit={modifyOrder}>
                    <div>
                      <Label htmlFor="length" className="text-right">
                        Length
                      </Label>
                      <Input onChange={onChange} name="length" id="length" value={dimensions.l} className="col-span-3 border-2 focus:border-none" />
                    </div>
                    <div>
                      <Label htmlFor="breadth" className="text-right">
                        Breadth
                      </Label>
                      <Input onChange={onChange} name="breadth" id="breadth" value={dimensions.b} className="col-span-3 border-2 focus:border-none" />
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-right">
                        Height
                      </Label>
                      <Input onChange={onChange} name="height" id="height" value={dimensions.h} className="col-span-3 border-2 focus:border-none" />
                    </div>
                    <Button type="submit" className='font-semibold transition-colors hover:text-blue-700 hover:bg-white hover:outline hover:outline-blue-700 bg-blue-700 text-white mt-4'>
                      Submit
                    </Button>
                  </form>
                </>
                : null}

              {formType == "cancel" ?
                <>
                  <DialogHeader>
                    <DialogTitle>Cancel Your Order</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to cancel?
                    </DialogDescription>
                  </DialogHeader>
                  <form action='' onSubmit={cancelOrder}>
                    <Label htmlFor="cancelReason" className="text-right">
                      Reason For Cancellation:
                    </Label>
                    <Input onChange={handleChange} name="cancelReason" id="cancelReason" value={cancelReason} className="col-span-3 border-2 focus:border-none" required />
                    <DialogFooter>
                      <Button type="submit" className="font-semibold transition-colors hover:text-red-700 hover:bg-white hover:outline hover:outline-red-700 bg-red-700 text-white mt-4">
                        Cancel the Order
                      </Button>
                    </DialogFooter>
                  </form>
                </>
                : null}

              {formType == "return" ?
                <>
                  <DialogHeader>
                    <DialogTitle>Return Your Order</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to return?
                    </DialogDescription>
                  </DialogHeader>
                  <form action="" onSubmit={returnOrder}>
                    <DialogFooter>
                      <Button type="submit" className="font-semibold transition-colors hover:text-red-700 hover:bg-white hover:outline hover:outline-red-700 bg-red-700 text-white mt-4">
                        Yes, Return
                      </Button>
                    </DialogFooter>
                  </form>
                </>
                : null}

              {formType == "complaint" ?
                <>
                  <DialogHeader>
                    <DialogTitle>File A Complaint</DialogTitle>
                    <DialogDescription>
                      Please write your complaint regarding the product.
                    </DialogDescription>
                  </DialogHeader>
                  <form action="" onSubmit={fileCompalint}>
                    <textarea className='p-2 w-full border-2 focus:border-none' placeholder='Write here...' rows={10} cols={20} name="complaint" value={complaint} onChange={handleChange} required id="complaint"></textarea>
                    <DialogFooter>
                      <Button type='submit' className="font-semibold transition-colors hover:text-blue-700 hover:bg-white hover:outline hover:outline-blue-700 bg-blue-700 text-white mt-4">
                        Submit
                      </Button>
                    </DialogFooter>
                  </form>
                </>
                : null}

            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>

  )
}

export default OrderCard