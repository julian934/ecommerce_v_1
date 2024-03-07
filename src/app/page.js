import Image from 'next/image'
import Index from './inventory/page'
import SignUp from './auth/signup/page'
import Link from 'next/link'
import Navbar from './components/NavBar/navbar'
import Footer from './components/footer/footer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24   ">
      
      <h1 className="justify-start text-2xl w-10/12 self-center" >Welcome to NuThread</h1>
      <p className="  w-10/12 text-base " >Check out our new gallery, featuring clothing and accessories for every occasion.</p>
      <SignUp/>
      <h2  > <Link href="/auth/auth-form" > <button className=" justify-center w-10/12 " >Have an account? Sign In!</button> </Link> </h2>
      <Footer/>
    </main>
  )
}
