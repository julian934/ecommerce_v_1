"use client"
import {useState,useEffect,useRef} from 'react'
import { useSession,signIn,signOut } from 'next-auth/react';

export default function SignIn(){
    const [username,setUserName]=useState();
    const [password,setPassWord]=useState();
    const userRef=useRef();
    const passRef=useRef();
    const {data:session}=useSession()
   //Send login information as a single state to be easily read. 
   //Double check backend to make sure body info is being sent to request body.
   //On click, redirect to inventory screen with user object information being sent from the back-end.
    const signUser=async()=>{
        setUserName(userRef)
        setPassWord(passRef)
        try{
            await fetch('/api/auth/signin',{
                method:"POST",
                body:JSON.stringify({username,password})
                ,headers:{
                    "Content-Type":"application/json",
                }
            })

        }catch(error){
            console.log(error)
        }

    }
    if(session){
        console.log(session)
    }
    return(<div>
        
        <input type='text' ref={userRef} placeholder='Username' />
        <input type='text' ref={passRef} placeholder='Password' />
        <button onClick={signUser} >Submit</button>
        <button  onClick={()=>signIn('credentials',{username:userRef,password:passRef})} >Sign In</button>
        
        </div>)
}

