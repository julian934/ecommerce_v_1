"use client"
import React from 'react'
import axios from 'axios';
import Stripe from 'stripe';
import Link from 'next/link';
import {useState,useEffect,useContext} from 'react'
import {StoreStateContext, useStoreContext} from '../context/storecontext'
import Image from 'next/image';
import { urlForImage } from '../../../sanity/lib/image';
//import products from '../../../sanity/schemas/products';

//revise the context and make sure it can take context.
const PricingCard = ({product,prices,prodImage}) => {
    const [pricing,setPricing]=useState([])
    const [currData,setCurrData]=useState([]);
    const [priceFormat,setPriceFormat]=useState()
    const prodId=product.default_price
    let ID=prodId.toString().trim()
    const item=prices.find(price=>price.id==prodId)
   // console.log(prodImage[0].image)
    //const finalImage=prodImage.filter(item=>item.name==product.name)
    console.log(product.id)
    
    //let realImage=finalImage.image
    //console.log(finalImage.image)
    //console.log(realImage)
    //console.log(finalImage)
    //console.log(item.id)
    console.log(product)
    console.log(prodId)
    console.log(prices)
    console.log(prices.id)
    const ctx=useStoreContext()
    
    console.log(ctx.cartList)
    console.log(ctx.wishList)
    useEffect(()=>{
        getData()
       // setImageData()
        findPrice()
        check()
    },[])
    /*const setImageData=async ()=>{
        const currData=prodImage.find(item=>item.name==product.name)
        setCurrImage(currData)
        //console.log(currData.image)
        console.log(currImage)
    }*/
    //console.log(currImage)
    //fix image connection.
    const getData=async()=>{
        try{
            
            setPricing(prices)
            console.log(pricing)
         }catch(error){
             console.log(error)
         }
     
        
    }
    
     const findPrice=()=>{
         let prodPrice=product.default_price;
         let price=prices.find(it=>it.id==prodPrice)
         
         setPricing(price)
         ctx?.priceData(price?.unit_amount)
         console.log(pricing)
     }
     let check=async()=>{
        let checkData=await product.default_price
        let setData=await axios.get(`api/getprice/?id=${checkData}`)
        setCurrData(setData.data)
     }
     console.log(currData)
     console.log(product)
     console.log(prices)
     console.log(pricing)
     
     //ctx.formatter(pricing.unit_amount)
     //console.log(ctx.priceFormat)
    //Add colors in the config file.
    //Reconfigure with divs around each element for flexbox optimization.
    //Note: The full viewport width is accessible but grid must be modified to access past individual grids.
    //Container fill for the images.
    //Test for images first
    //Modify to make the design work. Simple product list from tailwindui.com
    //let data=pricing.unit_amount
    //let priceInfo
    //PriceInfo comes out to differen than unit amount. explore why.
    //pricing?priceInfo=ctx.priceFormat:''
    const currPricing=pricing?.unit_amount
    const formattedPrice=(currPricing/100).toFixed(2)
    ctx.priceMap(formattedPrice)
    localStorage.setItem('pricemap',JSON.stringify(formattedPrice))
    console.log(ctx.prices)
    //send accepted price data to context state and order via index.
    
  return (<Link className=" group h-full  " href={`/integration_test/${product.id}`} >
            <Image 
               src={product.images[0]} 
                alt={`${product.name}`} width={12} height={6} quality={100} sizes="(max-width:20vw)"
                className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-2xl "  
                 />
                 <h1 className=" mt-4 text-md text-gray-700 "  >{product.name}</h1>
                 {pricing && (
                    <>
                
                      <h3 className=" mt-1 text-lg font-medium md:w-full text-gray-900 " >$ {formattedPrice}</h3>
                      {/*<h3 className=" mt-1 text-lg font-medium text-gray-900 " >$ {priceInfo}</h3> */} 
                    </>
                 )}
                 
           </Link>
  )
}

export default PricingCard