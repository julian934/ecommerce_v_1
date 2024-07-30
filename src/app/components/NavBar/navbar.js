'use client'
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import {useState,useEffect} from 'react'
import { useStoreContext } from '../../context/storecontext'

const Navbar = () => {
    //Put NavBar on every other page besides the Home Page
    //Replace cart with the code for the built-in Stripe JS cart.
    const [cartData,setCartData]=useState([]);
    useEffect(()=>{
      fetchData()
    },[]);

    const ctx=useStoreContext();
    const fetchData=()=>{
      const userData=JSON.parse(localStorage.getItem('cartid'));
      const renderCart=JSON.parse(localStorage.getItem('renderCart'))
      
      setCartData(userData)
     
      //setCartData(userData)
   console.log(userData)
   //Update:
   //Cart logic works. Need to implement complete cart UI & removal functions.
   }
   
    
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
    
  return (
    

    
    <nav className="bg-white border-gray-200 dark:bg-gray-900 z-60  flex max-sm:justify-center max-sm:w-full md:col-start-2 md:row-start-1 md:justify-around md:col-span-2 md:max-h-32  md:w-full ">
    <div className="max-w-screen-xl max-h-screen-xl flex flex-wrap justify-end items-center md:gap-x-6 justify-between mx-auto p-4">
      <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          
          <span className="self-center text-5xl max-sm:text-2xl font-semibold whitespace-nowrap dark:text-white z-60  ">NuThread By Julian</span>
      </Link>
      <button data-collapse-toggle="navbar-default"  type="button" className="inline-flex items-center z-60  p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>
      <div className="w-full md:block md:w-auto z-60  " id="navbar-default">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <Link href="/inventory" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
          </li>
          {/*<li>
            <Link href="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sign In</Link>
          </li>
          <li>
            <Link href="/integration_test/sign-up" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sign Up</Link>
          </li> */}
          
          
          <li>
            <Link href='/testCart' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
 
  
  )
}

export default Navbar