'use client'
import Image from 'next/image'
import Index from './inventory/page'
import SignUp from './auth/signup/page'
import Link from 'next/link'
import Navbar from './components/NavBar/navbar'
import Footer from './components/footer/footer'
import { useEffect } from 'react'
//import { useRouter } from 'next/router'


export default function Home() {
  //const router=useRouter()
  /*useEffect(()=>{
    if(router.pathname==='/inventory'){
      router.push('/')
    }
  },[router.pathname])
  */
  return (
    <Index/>
  )
}
