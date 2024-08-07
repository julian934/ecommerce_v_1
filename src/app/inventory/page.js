'use client'
import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
//import CheckoutButton from '../components/CheckoutButton'
//import Link from 'next/link'
import PricingCard from '../components/pricingcard'
//import Stripe from "stripe";
//import StoreStateContext from '@/app/context/storecontext'
//import {useSession} from "next-auth/react"
import Navbar from '../components/NavBar/navbar'
//import NavTest from '../components/testNavBar/page'
import Footer from '../components/footer/footer'
import Loading from '../components/loading/page'
import { inventoryVals } from '../lib/metadata/metaValues'
const stripePromise=loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
)
//import { useStoreContext } from '@/app/context/storecontext'
//import { useQuery } from '@tanstack/react-query'
//Add loading state for this page if data is not loaded yet.
//Get Stock Images.
//Create dynamic item details pages for inventory items & add to cart options from details page. 
//Design Your OWn Inventory.
//Have the width take up 100% of vw, with each item taking up 25% of the height.
// Add padding from the top to make space for navigation and the title. 
//Finish with animations for nav bar and page interactions.
//Add quantity option for cart.
//Implement Footer
//Center image options & choose a logo.

const Index=(props)=>{
    
    const [products,setProducts]=useState([])
    const [prices,setPrices]=useState([])
    const [loading,setLoading]=useState();
    const [imageSet,setImageSet]=useState()

   // const {data:session, status}=useSession()
   /*const client=createClient({
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion:"2023-11-30",
    useCdn:false
   })
   */
  //TO accurately use loading spinner, update with useQuery and attach loading spinner to isLoading state
  console.log(products)
   console.log('User Information:',props.currentUser)
    useEffect(()=>{
        fetchProducts();
        fetchPrices();
        //fetchImages();
        getData();
    },[])
    let getData=()=>{
        //GET CART DATA FROM LOCALSTORAGE AND DISPENSE IT HERE
       }
       
     const fetchProducts=async()=>{
        
        try{
            const {data}=await axios.get('/api/getproducts')
        setProducts(data)
        console.log(data)
 
        }catch(error){
            console.log(error)
        }
     }
     const fetchPrices=async()=>{
        try{
            //const stripe =new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
        //const {data}=await stripe.prices.list()
           const {data}=await axios.get('/api/getprices') 
           setPrices(data)
           console.log(data)
        }catch(error){
            console.log(error)
        }
     }
     /*const fetchImages= async()=>{
        const query=`*[_type=="products"]{
            image,name
        }`
        const images=await client.fetch(query)
        console.log(images)
        setImageSet(images)
     }
     */
     const sendToCart=()=>{
        ctx.addToCart()
     }
     
      
    return(
    <div className="flex flex-wrap bg-white overflow-visible h-full md:pt-4 max-sm:space-y-2  " >
        
         <Navbar/>
            {/* <NavTest/>*/}
        <div className=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 h-full md:gap-y-6  " >
            <div className=" flex md:justify-center md:h-full md:w-full " >
            {/*<h1 className=" md:justify-self-center md:text-2xl text-amber-500 " >Welcome!</h1> */}
            </div>
            {!products || !prices && <Loading/>}
        <div className=" grid grid-cols-1 gap-x-4 gap-y-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 " >
        {products.map((product)=>(
          <PricingCard key={product.id} product={product}  prices={prices} prodImage={imageSet}  />
        ))}
        </div>
        </div>
        <Footer/>
    </div>)

}






export default Index