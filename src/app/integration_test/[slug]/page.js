'use client'
import axios from "axios"
import {useState,useEffect, useCallback,useMemo,useContext} from 'react'
import { useStoreContext } from "@/app/context/storecontext"
//import Link from "next/link"
//import Navbar from "@/app/components/revisedNav/navbar"
//import Navbar from "@/app/components/revisedNav/page"
import Footer from "@/app/components/footer/footer"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { getPrice } from "@/app/queryFunc/queryData"
//create a separate get request from the API backend that will give you access to the individual Stripe product data.

const ProductDetails = ({params}) => {
  const [itemData,setItemData]=useState()
  const [products,setProducts]=useState();
  const [prices,setPrices]=useState();
  const [loading,setLoading]=useState(false);
  const [added,setAdded]=useState(false);
  const [quantity,setQuantity]=useState(0);
  const [currCart,setCurrCart]=useState([])
  const [checktest,setCheckTest]=useState([])
  const [currPrice,setCurrPrice]=useState()
   console.log(params.slug)
   let slug=params.slug
   console.log(slug)
   console.log(itemData)
   console.log(itemData?.default_price)
   const ctx=useStoreContext()
   const {data,isLoading,isError}=useQuery({
    queryKey:['prices'],
    queryFn:getPrice,
    staleTime:2000
   })
   
   useEffect(()=>{
    
    info();
    fetchProducts();
    fetchItem();
    fetchPrices();
    fetchIndividualPrice();
    getData();
    handleData()
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
        console.log("Prices response", data);
    setProducts(data)
    console.log(data)
  
    }catch(error){
        console.log(error)
    }
  }
  const fetchPrices=async()=>{
    try{
     
        const response=await axios.get(`/api/getprices`)
       setPrices(response.data)
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
const fetchIndividualPrice=async()=>{
  const testPrices=await prices
  console.log("testPrices", testPrices);
    const finalTestData=await testPrices?.find(val=> val.id==itemData.default_price)
    console.log("finalTestData", finalTestData);
    let sl=await params?.slug;
    
    if(finalTestData && finalTestData.length >0){
      let formatted=await finalTestData
    console.log("formatted", formatted);
    let form=await formatted
    const formattedPrice=(form/100).toFixed(2)
    console.log("formattedPrice", formattedPrice);
  setCurrPrice(sl)
}else{
  console.log("No matching price found")
}
    }
    

const handleAddToCart=async()=>{
   let product= await products?.find(item=> item.id==params.slug); //products no load.
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
   let currItem=JSON.parse(localStorage.getItem('cartid'));
   setCurrCart(currItem)
   setQuantity(currItem.quantity)
   console.log(quantity)
   setAdded(true)
  
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
const handleData=async()=>{
    if(params.slug){
      let comparator=await params.slug
       let val=products?.indexOf(comparator)
    let check=await data?.find(val=>val.id==comparator)
    setCheckTest(val)
    }
    
  
}
   if(added){
    console.log(itemData)
    console.log(currCart)
    console.log(currCart.filter(val=>val.id==itemData.default_price))

   }
   let half=products?.slice(products.length/2)
   let half2=ctx?.pricevis?.slice(ctx.pricevis.length/2)
   console.log(half2)
   console.log(half)
   let product=products?.find(val=>val.id==slug)
   let priceData=products?.indexOf(product)
   console.log(priceData)
   console.log(products)
   console.log(data)
   console.log(currPrice)
   console.log(ctx.pricevis)
   console.log(half2[priceData])
   console.log(checktest)
   let formatted=(half2[priceData]/100).toFixed(2)
   let closeData=()=>{
    setAdded(false)
   }
   useEffect(()=>{
    setTimeout(()=>{
      setAdded(false)
     },2000)
   },[added])
   //Customize with item images & data.
   //Item page covers entire page. 
   //Add loading spinner for loading state.
   //Add center Logo & Cart Icon that gives notifications when item is added to cart.
  return (
    <div className="group max-sm:block overflow-hidden h-full space-y-2 bg-white md:grid md:grid-cols-2 md:grid-rows-4 md:content-around  md:space-x-4  flex md:flex-col max-sm:flex-col h-screen ">
         <nav className="bg-white border-gray-200 dark:bg-gray-900 z-auto flex  md:col-start-2 md:row-start-1  md:pb-40 justify-center w-full">
            <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4 z-60">
                <a href="/" className="flex items-center space-x-3 z-60 ">
                    <span className="text-5xl max-sm:text-2xl font-semibold whitespace-nowrap dark:text-white">NuThread By Julian</span>
                </a>
                <div className="w-full md:block md:w-auto z-60" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/inventory" className="block py-2 z-60 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href='/testCart' className="block py-2 px-3 text-gray-900 z-60 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        {/* NavBar pushes everything out the way, modify.*/}
        {/* Figure out medium sizes and up.*/}
        <div className=" md:w-full md:col-start-1 md:col-span-2 md:row-start-1  md:pb-20 md:flex md:flex-col md:self-center " >
        <hr className=" w-full md:w-5/6  md:border-2 md:border-gray-200 justify-center self-center " />
        </div>
        {itemData && <h1 className=" max-sm:flex text-amber-400 max-sm:pl-10 md:col-start-2 md:row-start-1 md:z-10 w-5/6 md:w-1/2 md:w-self-center md:pl-4  md:pt-24 self-center text-2xl" >{itemData.name}</h1>}
        {prices && (<h2 className=" flex max-sm:pl-10 md:col-start-2 md:row-start-1 md:h-4 md:w-4 md:flex  -z-0  md:md:pt-60 pl-4 md:text-lg " >  ${formatted}</h2>)}
        {/* Add PRICE!*/}
        
  <div className="max-sm:relative md:gap-x-4 
   md:col-start-1  md:row-start-1 md:row-span-3 md:self-start  md:row-span-2 md:col-span-2 md:justify-start md:self-end md:z-10 md:flex md:flex-col
    md:mt-2 md:max-w-1/2  md:w-1/2 md:h-4/5  max-sm:h-[450px]  md:mt-4
      z-0 flex max-sm:w-5/6 items-center md:flex-col max-lg:h-full grid justify-center place-items-center flex self-center  ">
    
    {itemData &&
    <Image
      src={itemData.images[0]}
      alt={itemData.name}
      width={2} height={2} quality={100} sizes="max-width:20vw"
      className="max-sm:absolute max-sm:left-8 max-sm:inset-0 h-full max-sm:w-full md:h-full  md:w-2/3 object-cover opacity-100 md:justify-center justify-center rounded-lg self-center "
    /> }
    
  </div>
  <div className=" group flex  md:self-end  max-sm:flex-col md:flex md:self-start 
   md:flex-col md:z-60  md:flex md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-2 space-y-2 max-sm:h-1/4 md:h-3/5 md:pl-4 md:w-5/6 md:space-y-20  " >
    <div className="  max-sm:w-5/6 self-center md:self-start md:w-full md:max-h-96 md:h-full md:space-x-4  md:flex md:self-start md:flex-col md:space-y-4 " >
      <h3 className=" md:text-md md:pl-4 md:text-center " >Color</h3>
      <div className="flex flex-row space-x-4 md:h-3/4 md:w-1/2  md:self-center md:pl-32  " >
      <div className="bg-black rounded-lg w-1/4 md:w-1/4 md:h-5/6 " >
        <button className=" " ></button>
      </div>
      <div className="bg-gray-200 rounded-lg w-1/4 md:w-1/4 md:h-5/6 " >
        <button className=" " ></button>
      </div>
      </div>
      </div>
      
      <div className="  max-sm:w-5/6 max-sm:self-center flex max-sm:flex-col md:h-5/6  md:w-full md:flex md:flex-col  md:space-y-4" >
      {added && <div className="fixed  top-18  -mt-20 mr-48 right-72 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg p-4 shadow-md">
      <p className="text-sm">{itemData?.name} Added to cart!</p>
      <button className="mt-2 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300" onClick={closeData}>
        Close
      </button>
    </div>}
       <h3 className=" max-sm:text-md md:pl-4 md:text-center " >Size</h3>
       
       <div className=" flex max-sm:flex-row max-sm:space-x-2 md:space-x-4 md:px-2 md:w-4/5 md:h-full md:self-center  " >
        <button className=" border-2 border-grey-200 hover:bg-yellow-300 w-full rounded-md hover:text-white " >SM</button>
        <button className=" border-2 border-grey-200 hover:bg-yellow-300 w-full rounded-md hover:text-white " >MD</button>
        <button className=" border-2 border-grey-200 hover:bg-yellow-300 w-full rounded-md hover:text-white " >LG</button>
        <button className=" border-2 border-grey-200 hover:bg-yellow-300 w-full rounded-md hover:text-white " >XL</button>
        <button className=" border-2 border-grey-200 hover:bg-yellow-300 w-full rounded-md hover:text-white " >2X</button>
       </div>
       
      </div>
      
       <div className="  max-sm:w-5/6 max-sm:self-center rounded-lg bg-amber-400 max-sm:h-full md:flex md:w-3/4 md:h-1/2 md:self-center  " >
        <button className=" text-center w-full h-full text-white text-lg hover:bg-amber-500  hover:rounded-lg"  onClick={handleAddToCart} >Add to Cart</button>
       </div>
       <div className="  max-sm:w-5/6 self-center max-sm:h-5/6 md:h-full md:flex md:flex-col md:self-start md:space-y-4" >
        <h3 className=" md:text-2xl flex text-amber-400" >Description</h3>
        {/* Description from Product Description */}
         <p className=" md:text-lg " > {itemData?.description && itemData.description}</p> 
        
       </div>
       <Footer/>
    </div>
   
   
   {/*Factor below into code above. */}
  
</div>
)
}

export default ProductDetails