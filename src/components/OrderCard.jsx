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



const OrderCard = () => {

  const onChange = (e) => {
    const { name, value } = event.target;
    setDimensions((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleChange = (e) => {
    if (e.target.name == "complaint") {
      setComplaint(e.target.value)
    }
  }

  const [dimensions, setDimensions] = useState({ length: 0, breadth: 0, height: 0 })
  const [complaint, setComplaint] = useState("")

  const [formType, setFormType] = useState("")



  return (
    <div className='bg-white flex flex-row p-4 mt-12 w-[40%] rounded-sm text-lg'>
      <div className='h-36 p-2 border border-r-black'>
        <img className='h-36' src="https://www.flomattress.com/cdn/shop/products/2_Ergo-sw_1_530x530.jpg?v=1638010457" alt="mattress_alt" />
      </div>
      <div className='p-2 w-full'>
        <p>Product:</p>
        <p>Shipping Name:</p>
        <p>Shipping Address:</p>
        <p>Phone:</p>
        <p>Order Status:</p>
        <div className='p-2 float-end bg-blue-600 hover:bg-blue-800 text-white rounded-md '>
          <Dialog className="text-lg">
            <DropdownMenu className="bg-blue-800" >
              <DropdownMenuTrigger>Manage Your Order v</DropdownMenuTrigger>
              <DropdownMenuContent className="w-52  text-lg">
                <DialogTrigger onClick={() => { setFormType("modify") }} className="w-full" >
                  <DropdownMenuItem>Modify Your Order</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger onClick={() => { setFormType("cancel") }} className="w-full" >
                  <DropdownMenuItem>Cancel Your Order</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger onClick={() => { setFormType("return") }} className="w-full" >
                  <DropdownMenuItem>Return Your Order</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger onClick={() => { setFormType("complaint") }} className="w-full" >
                  <DropdownMenuItem>File a Complaint</DropdownMenuItem>
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
                  <form action="">
                    <div>
                      <Label htmlFor="length" className="text-right">
                        Length
                      </Label>
                      <Input onChange={onChange} name="length" id="length" value={dimensions.l} className="col-span-3" />
                    </div>
                    <div>
                      <Label htmlFor="breadth" className="text-right">
                        Breadth
                      </Label>
                      <Input onChange={onChange} name="breadth" id="breadth" value={dimensions.b} className="col-span-3" />
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-right">
                        Height
                      </Label>
                      <Input onChange={onChange} name="height" id="height" value={dimensions.h} className="col-span-3" />
                    </div>
                    <Button>
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
                  <DialogFooter>
                    <Button className="bg-red-700 hover:bg-red-800 text-white">
                      Cancel the Order
                    </Button>
                  </DialogFooter>
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
                  <textarea className='p-2' placeholder='Write here...' rows={10} cols={20} name="complaint" value={complaint} onChange={handleChange} id="complaint"></textarea>
                  <DialogFooter>
                    <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                      Submit
                    </Button>
                  </DialogFooter>
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