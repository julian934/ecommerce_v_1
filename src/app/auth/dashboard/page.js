'use client'
import { useSession } from "next-auth/react"
import { useState,useEffect } from "react"

export default function DashboardPage(props){

    //Have a fetch send the user object from MongoDB to the Dashboard.
    //Also, make sure to include the inventory items & sign-in data/sessions. 
    //Verify useSession is usable. 
    const {data:session,status}=useSession()
    console.log(session)
    console.log(status)
    let [userData,setUserData]=useState([]);
      

    let getData=()=>{
      let getUser=fetch('/api/authcheck');
      setUserData(getUser);
      console.log(userData)
    }
    useEffect(()=>{
        getData();
    },[])
    return(
    <div>
    <h1>Retrieve Data</h1>
    </div>)
}