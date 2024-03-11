'use client'
import axios from "axios"
import {useState,useEffect, useCallback,useMemo,useContext} from 'react'
import { useStoreContext } from "@/app/context/storecontext"
import Navbar from "@/app/components/NavBar/navbar"
import Footer from "@/app/components/footer/footer"
import Image from "next/image"
//create a separate get request from the API backend that will give you access to the individual Stripe product data.

const ProductDetails = ({params}) => {
  const [itemData,setItemData]=useState()
  const [products,setProducts]=useState();
  const [prices,setPrices]=useState();
  const [loading,setLoading]=useState(false);
   console.log(params.slug)
   let slug=params.slug
   console.log(slug)
   console.log(itemData)
   const ctx=useStoreContext()
   
   
   useEffect(()=>{
    
    info()
    fetchProducts()
    fetchPrices()
    fetchItem()
    getData()
   },[])
   let info=async()=>{
    const item=await axios.get(`/api/getProduct?id=${slug}`)
    console.log(item.data);
    await setItemData(item.data)
    

   }
   let getData=()=>{
    //GET CART DATA FROM LOCALSTORAGE AND DISPENSE IT HERE
   }
   /*let prices=async()=>{
    if(itemData){
      let price=await axios.get(`/api/getprices?id=${itemData.default_price}`)
      setPriceData(price)
      console.log(price)
    }
        
   }*/
   console.log(itemData)

   //FIX the query. chck nextjs documentation for querying.
   //UPDATE QUERY WORKS.
   //Update: Fix data fetching error, wont stop revalidating.
   //Potential restructure page to incorporate generateStaticPaths
   /*let info=useMemo(async (slug)=>{
      const item=await axios.get(`/api/getProduct?id=${slug}`)
  
    console.log(item.data)
     setItemData(item.data)
    return item
   },[itemData])*/
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
        const {data}=await axios.get('/api/getprices')
       setPrices(data)
       console.log(data)
    }catch(error){
        console.log(error)
    }
  }
  const fetchItem=async()=>{
    try{
        
    }catch(error){
      console.log(error)
    }
  }
  console.log(products)
  console.log(prices)
   const handlePurchase=async(e)=>{
    console.log(item.id)
    console.log(product.id)
    const price=prices.filter(it=> it.id==item.id)
    console.log(price)
    //Backend accepts object, so just filter for exact object and access purchase screen for single-purchase products.
   e.preventDefault();
   const {data}=await axios.post('/api/payment',{
      priceId:item.id,
      //body:JSON.stringify(ctx.cartList)
      body:JSON.stringify(price)
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
   let product=products.find(item=> item.id==params.slug);
   if(product){
    let price=prices.find(item=>item.id==product.default_price);
    let newPrice=price
    console.log(product)
    console.log(prices)
    console.log(newPrice)

    ctx.addCart(price,1);
    //localStorage.setItem('cart',ctx.cartList)
    //let check=localStorage.getItem('cart')
    //console.log(check)
   console.log(price.id);
   }
   
  
  console.log(ctx.cartList)
//Add Cart Functionality
}

const handleWishList=()=>{
   ctx.addToWishList(item,1)
   console.log(ctx.wishList)
}
const removeItem=()=>{
   console.log(item)
   ctx.removeFromCart(item)
   //Empties out the entire cart.Bug must be fixed.
}
   

   
   //Customize with item images & data.
   //Item page covers entire page. 
   //Add loading spinner for loading state.
   //Add center Logo & Cart Icon that gives notifications when item is added to cart.
  return (
    <div className="group max-sm:block overflow-hidden h-full space-y-2 bg-white md:grid md:grid-cols-2 md:grid-rows-4 md:content-around  md:space-x-4  flex md:flex-col max-sm:flex-col h-screen ">
        <Navbar/>
        {/* NavBar pushes everything out the way, modify.*/}
        {/* Figure out medium sizes and up.*/}
        <div className=" md:w-full md:col-start-1 md:col-span-2 md:row-start-1  md:pb-20 md:flex md:flex-col md:self-center " >
        <hr className=" w-full md:w-5/6  md:border-2 md:border-gray-200 justify-center self-center " />
        </div>
        {itemData && <h1 className=" md:col-start-2 md:row-start-1 md:z-10 w-5/6 md:pl-4  md:pt-24 self-center text-2xl" >{itemData.name}</h1>}
        {/* Add PRICE!*/}
    
  <div className="max-sm:relative md:gap-x-4
   md:col-start-1  md:row-start-1 md:row-span-3 md:self-start  md:row-span-2 md:col-span-2 md:justify-start md:self-end md:z-10 md:flex md:flex-col
    md:mt-2 md:max-w-1/2  md:w-1/2 md:h-4/5  max-sm:h-[450px]  md:mt-4
      z-10 flex max-sm:w-5/6 items-center md:flex-col max-lg:h-full grid justify-center place-items-center flex self-center  ">
    
    {itemData &&
    <Image
      src={itemData.images[0]}
      alt={itemData.name}
      width={2} height={2} quality={100} sizes="max-width:20vw"
      className="max-sm:absolute inset-0 h-full max-sm:w-full md:h-full  md:w-2/3 object-cover opacity-100 md:justify-center justify-center rounded-lg self-center "
    /> }
    
  </div>
  <div className=" group flex  md:self-end  max-sm:flex-col md:flex md:self-start 
   md:flex-col md:z-20  md:flex md:col-start-2  md:row-start-1 md:row-span-2 space-y-2 max-sm:h-1/4 md:h-3/5 md:pl-4 md:w-5/6 md:space-y-12  " >
    <div className="  max-sm:w-5/6 self-center md:self-start md:w-full md:max-h-96 md:h-3/4 md:space-x-4  md:flex md:self-start md:flex-col " >
      <h3 className=" md:text-md md:pl-4 " >Color</h3>
      <div className="flex flex-row space-x-4 md:h-3/4 md:w-1/2 md:justify-around " >
      <div className="bg-black rounded-lg w-1/4 md:w-1/4 md:h-5/6 " >
        <button className=" " ></button>
      </div>
      <div className="bg-gray-200 rounded-lg w-1/4 md:w-1/4 md:h-5/6 " >
        <button className=" " ></button>
      </div>
      </div>
      </div>
      <div className="  max-sm:w-5/6 max-sm:self-center flex max-sm:flex-col md:h-5/6  md:w-full md:flex md:flex-col " >
       <h3 className=" max-sm:text-md md:pl-4 " >Size</h3>
       <div className=" flex max-sm:flex-row max-sm:space-x-2 md:space-x-4 md:px-2 md:w-full md:h-full  " >
        <button className=" border-2 border-grey-200 hover:bg-yellow-300 w-full rounded-md hover:text-white " >SM</button>
        <button className=" border-2 border-grey-200 hover:bg-yellow-300 w-full rounded-md hover:text-white " >MD</button>
        <button className=" border-2 border-grey-200 hover:bg-yellow-300 w-full rounded-md hover:text-white " >LG</button>
        <button className=" border-2 border-grey-200 hover:bg-yellow-300 w-full rounded-md hover:text-white " >XL</button>
        <button className=" border-2 border-grey-200 hover:bg-yellow-300 w-full rounded-md hover:text-white " >2X</button>
       </div>
       
      </div>
       <div className="  max-sm:w-5/6 max-sm:self-center rounded-lg bg-amber-400 max-sm:h-full md:flex md:w-full md:h-1/2 md:self-center  " >
        <button className=" text-center w-full h-full text-white text-lg "  onClick={handleAddToCart} >Add to Cart</button>
       </div>
       <div className="  max-sm:w-5/6 self-center max-sm:h-5/6 md:h-full md:flex md:flex-col md:self-start " >
        <h3 className=" md:text-2xl flex" >Description</h3>
        {/* Description from Product Description */}
         <p className=" md:text-lg " > {/*itemData.description && itemData.description*/} </p> 
        
       </div>
    </div>
    
    <Footer/>
   {/*Factor below into code above. */}
  
</div>
)
}

export default ProductDetails