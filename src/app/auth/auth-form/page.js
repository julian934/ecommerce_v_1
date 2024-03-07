'use client'
import React from 'react'
import { useState,useEffect } from 'react'
//import { signIn } from 'next-auth/client';
import { useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useStoreContext } from '@/app/context/storecontext';

 //Send login information as a single state to be easily read. 
   //Double check backend to make sure body info is being sent to request body.
   //This WILL BE the home page. Accessing this will give the user access to the product page and checkout.
   
   //Get stock images.

async function createUser(username,password){
   const response=await fetch('/api/auth/signup',{
        method:'POST',
        body:JSON.stringify({username,password}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const data=await response.json();
    if(!response.ok){
        throw new Error(data.message || 'Something went wrong!');
    }
    return data;
}
//Import bright background stock images. 



const AuthForm = () => {
    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    const [isLogin,setIsLogin]=useState(true)
   const {data:session}=useSession();
   
    const [data,setData]=useState({
        username:'',
        password:''
    })
    
    function switchAuthModeHandler(){
        setIsLogin((prevState)=>!prevState);
    }
    async function submitHandler(event){
        event.preventDefault()

        const enteredEmail=emailInputRef.current.value
        const enteredPassword=passwordInputRef.current.value
        if(isLogin){
       const result=await signIn('credentials',{
        redirect:false,
        email:enteredEmail,
        password:enteredPassword,
        callbackUrl:'/pricing'
    });
    console.log(result)
        if(!result.error){
         //set some auth state   
      
        }
        }else{
            try{
                const result=await createUser(enteredEmail,enteredPassword)
                console.log(result)
            }catch(error){
                console.log(error)
            }
          
        }
    }
    const usernameCheck=()=>{
        console.log(emailInputRef.current.value)
    }
    const passwordCheck=()=>{
        console.log(emailInputRef.current.value)
    }
    const signInHandler=(e)=>{
        e.preventDefault()
        setData({
            username:emailInputRef.current.value,
        password:passwordInputRef.current.value})
        signIn('credentials',{username:emailInputRef.current.value,password:passwordInputRef.current.value, callbackUrl:'http://localhost:3000/auth/dashboard'})
        ctx
    }
    
   
        return (
            <div className=" flex grid justify-between grid-cols-4 md:grid-cols-6 grid-rows-4 md:grid-cols-6  " >
                <h1 className="row-start-1 row-end-1 col-start-1 col-end-3  px-2  top-10 relative " >Welcome to NuThread By Julian. 
               Sign in to browse our latest clothes!</h1>
               {session && <h1>Welcome {session.user.name}</h1>}
            <form  className="justify-center row-start-3 row-end-3 col-start-2 col-end-2   " onSubmit={signInHandler} >
                <div>
                        <input  onChange={usernameCheck} type='email' id='email' required ref={emailInputRef}  placeholder='email' />
                    </div>
                    <div>
                        <input onChange={passwordCheck} type='password' id='password' required ref={passwordInputRef} placeholder='password' />
                    </div>
                    <div>
                        <input  type='submit' placeholder='submit' />
                    </div>
            </form>
            
            </div>
          )
    
  
}

export default AuthForm