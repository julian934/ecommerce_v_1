"use client"
import React from 'react'
import {useState,useEffect,useContext} from 'react'
import {StoreStateContext, useStoreContext} from '../context/storecontext'
import axios from 'axios'
import Link from 'next/link';
import Image from 'next/image'
import Stripe from 'stripe'
import { renderToReadableStream } from 'next/dist/server/app-render/entry-base'

//Don't forget error and exception handling!!!

const CartItems = ({prices, products,cartVals}) => {
   const [cartData,setCartData]=useState([]);
   const [viewCart,setViewCart]=useState(false);
   const [cartTest,setCartTest]=useState([]);
   const [prods,setProds]=useState([]);
   const [renderedCart,setRenderedCart]=useState([]);
   const ctx=useStoreContext()
  
     console.log(ctx.cartList)
    console.log(cartVals)
    console.log(products)
    console.log(prices)
   // console.log(singleProd)
   useEffect(()=>{
        fetchData();
       // getData();
   },[renderedCart])

   const fetchData=()=>{
    const userData=JSON.parse(localStorage.getItem('cartid'));
    const renderCart=JSON.parse(localStorage.getItem('renderCart'))
    
    setCartData(userData)
   
    //setCartData(userData)
 console.log(userData)
 //Update:
 //Cart logic works. Need to implement complete cart UI & removal functions.
 }
 let prodArray=[]
 cartData.forEach((item)=>{
   prodArray.push(item.product)
 })
 products.forEach((p)=>{
  if(cartData.includes(p.id)){
    setRenderedCart('yes')
  }
 })
 console.log(prodArray)

 /*let getData=async()=>{
  let prodArray=[]
 cartData.forEach((item)=>{
   prodArray.push(item.product)
 })
  
  prodArray.forEach((item)=>{
    prodCheck(item)
  })
  let prodCheck=(value)=>{
    const vals=products.find(item=>item.id==value)
    setRenderedCart([...renderedCart,vals])
  }

  
 }*/


 
 console.log(renderedCart)
 const handlePurchase=async(e)=>{
         

  e.preventDefault();
  const {data}=await axios.post('/api/payment',{
      //priceId:item.id,
      body:JSON.stringify(cartData)
  },
  {
      headers:{
          "Content-Type":"application/json",
      }
  }
  );
  window.location.assign(data)
}
/*const setTest=()=>{
  setCartTest(cartData[0])
  console.log(cartTest)
}*/
const handleRemove=(id)=>{
  let newCartData=cartData.filter(item=> item.id!==id)
  setCartData(newCartData)

}


   console.log()
   console.log(ctx.cartList)
   console.log(cartData)
   console.log(renderedCart)
   console.log(products)
   //Dynamically render cart Items & increase the quantity based on ID, then send it to the backend.
    {/* Convert product data to price data. */}
   if(cartData.length>0){
    return (
           
        <>
          
  

{/* Modify below. */}
<div
  className="max-sm:relative flex md:flex-col w-screen w-full md:self-center md:justify-center md:w-1/2 md:h-4/5 max-sm:max-w-sm border h-full md:rounded-lg border-gray-400 bg-white px-4 py-8 sm:px-6 lg:px-8"
  aria-modal="true"
  role="dialog"
  tabindex="-1"
>
<button className="absolute end-4 top-4 text-gray-600 transition hover:scale-110">
    <span className="sr-only">Close cart</span>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>


  <div className="mt-4 space-y-6">
    <ul className="space-y-4">
    {cartVals && cartVals.map((item)=>
      <li className="flex items-center gap-4  " key={item.id}  >
      <Image className=" h-16 w-16 rounded object-cover " src={item.images[0]} width={2} quality={75} height={2} alt={item.description}/>
      <div className="  " key={item.id} >
         <h3 className=" text-sm text-gray-900 " >{item.name}</h3>
         <dl className="mt-0.5 space-y-px text-[10px] text-gray-600" >
             <div>
              <dt className="inline" >Size:</dt>
              <dd className="inline" >XXS</dd>
             </div>
             <div>
              <dt className="inline" >Color:</dt>
              <dd className='inline'>White</dd>
             </div>
         </dl>
      </div>
      <div classname="flex flex-1 items-center justify-end gap-2">
          <form>
            <label for="Line1Qty" className="sr-only"> Quantity </label>

            <input
              type="number"
              min="1"
              value="1"
              id="Line1Qty"
              className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            />
          </form>

          <button className="text-gray-600 transition hover:text-red-600">
            <span className="sr-only">Remove item</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
           </li>)}
    </ul>

    <div className="space-y-4 text-center">
      <Link
        href="#"
        className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
      >
        View my cart ({cartData.length})
      </Link>

      <button
        onClick={handlePurchase}
        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
      >
        Checkout
      </button>

      <Link
        href="/inventory"
        className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
      >
        Continue shopping
      </Link>
    </div>
  </div>
</div>
        </>
        )
   }else{
    return(<div>
        
        <h1>No items in cart!</h1>
    </div>)
   }
 
}

export default CartItems