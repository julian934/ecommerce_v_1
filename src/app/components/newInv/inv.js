"use client"
import React from 'react'
import axios from 'axios';
import Stripe from 'stripe';
import Link from 'next/link';
import {useState,useEffect,useContext} from 'react'
import {StoreStateContext, useStoreContext} from '../context/storecontext'
import Image from 'next/image';
import { urlForImage } from '../../../sanity/lib/image';

const Inventory = ({product,prices,prodImage}) => {
    const [pricing,setPricing]=useState()
    const [currImage,setCurrImage]=useState();
    const prodId=product.default_price
    let ID=prodId.toString().trim()
    const item=prices.find(price=>price.id==prodId)
    
    const finalImage=prodImage.filter(item=>item.name==product.name)
    console.log(finalImage)
    console.log(item)
    console.log(product)
    console.log(prodId)
    console.log(prices)
    console.log(prices.id)
    const ctx=useStoreContext()
    console.log(ctx.cartList)
    console.log(ctx.wishList)
    useEffect(()=>{
        getData()
        setImageData()
    },[])
    const setImageData=async ()=>{
        const currData=prodImage.find(item=>item.name==product.name)
        setCurrImage(currData)
        //console.log(currData.image)
        console.log(currImage)
    }
    const getData=async()=>{
        try{
            
            setPricing(prices)
            console.log(pricing)
         }catch(error){
             console.log(error)
         }
     
        
    }
    
   
    const handlePurchase=async(e)=>{
         

        e.preventDefault();
        const {data}=await axios.post('/api/payment',{
            priceId:item.id,
            body:JSON.stringify(ctx.cartList)
        },
        {
            headers:{
                "Content-Type":"application/json",
            }
        }
        );
        window.location.assign(data)
    }
    
    const handleAddToCart=()=>{
        ctx.addCart(item,1)
        console.log(item.id)
       
       console.log(ctx.cartList)
//Add Cart Functionality
    }
    
    const handleWishList=()=>{
        ctx.addToWishList(item,1)
        console.log(ctx.wishList)
    }
    
    //Add colors in the config file.
    //Reconfigure with divs around each element for flexbox optimization.
    //Note: The full viewport width is accessible but grid must be modified to access past individual grids.
    //Container fill for the images.
    //Test for images first
    //Turn images into links.
  return (
    <div className="bg-white">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {prices.map((product) => (
          <a key={product.id} href={product.href} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <Image
                src={urlForImage(finalImage)}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
          </a>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Inventory