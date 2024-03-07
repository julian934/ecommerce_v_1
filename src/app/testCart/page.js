"use client"
import CartItems from "../components/cartItems"
import {useState,useEffect,} from 'react'
import { useStoreContext } from "../context/storecontext"
import { createClient } from 'next-sanity'
import axios from "axios"
import Stripe from "stripe"
import Navbar from "../components/NavBar/navbar"
import Footer from "../components/footer/footer"

const Cart = () => {
    const ctx=useStoreContext()
     console.log(ctx.cartList)
     const [products,setProducts]=useState([]);
     const [prices,setPrices]=useState([]);
     const [prod,setProd]=useState([]);
     //const [cartData,setCartData]=useState([]);
     const [loading,setLoading]=useState();
     const [imageSet,setImageSet]=useState()
    // const {data:session, status}=useSession()
    const client=createClient({
     projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
     dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
     apiVersion:"2023-11-30",
     useCdn:false
    })
    //console.log('User Information:',props.currentUser)
     useEffect(()=>{
         fetchProducts()
         fetchPrices()
         fetchImages()
         grabProd()
     },[])
     
     /*const fetchData=()=>{
        const userData=JSON.parse(localStorage.getItem('cartid'))
    setPrices(userData)
     console.log(userData)
     //Update:
     //Cart logic works. Need to implement complete cart UI & removal functions.
     }*/
     //Redo Cart Logic
     //Cart functional, prepare testing & prep UI.
      const fetchProducts=async()=>{
         
         try{
             const stripe=new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
             const {data}=await stripe.products.list()
         setProducts(data)
         console.log(data)
  
         }catch(error){
             console.log(error)
         }
      }
      const fetchPrices=async()=>{
         try{
             const stripe =new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
         const {data}=await stripe.prices.list()
            
            setPrices(data)
            console.log(data)
         }catch(error){
             console.log(error)
         }
      }
      //Utilize api calls for data and cross-reference with state for mutations.
      const grabProd=async()=>{
        try{
            let cart=ctx.cartList
            cart.forEach(async(val)=>{
                const {data}=await axios.get(`/api/getProduct?id=${val.product}`)
                setProd([...prod,data])
            })
            
            
            console.log(data)
        }catch(error){
            console.log(error)
        }
      }
      const fetchImages= async()=>{
         const query=`*[_type=="products"]{
             image,name
         }`
         const images=await client.fetch(query)
         console.log(images)
         setImageSet(images)
      }
      const sendToCart=()=>{
         ctx.addToCart()
      }
      //Add a render cart method
  return (
   <div className="max-sm:relative md:flex md:flex-col md:gap-y-20 w-screen h-screen max-sm:max-w-sm border border-gray-600 bg-white px-4 py-8 sm:px-6 lg:px-8"
   aria-modal="true"
   role="dialog"
   tabIndex="-1">
      
      <Navbar/>
      <CartItems products={products} prices={prices} cartVals={prod}  />
      <Footer/>
   </div>

  )
}

export default Cart