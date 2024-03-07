import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CopyRight from '../../images/icons8-copyright-30.png'

const Footer = () => {
  return (
    <div className=" flex max-sm:w-5/6 md:grid md:grid-cols-4 md:flex md:row-start-4 md:col-start-1 md:col-span-2 md:w-full md:self-end md:justify-center md:h-1/2 " >
            <hr className=" border-gray-200 w-full md:col-span-4 md:self-end md:flex md:pl-4 md:pr-4 md:justify-self-center md:w-2/3" />
            <div className=" md:self-end md:flex  " >
              <Image className=" w-12 h-10 " src="https://flowbite.com/docs/images/logo.svg"  width={2} height={2} quality={100} sizes="max-width:20vw" alt='Logo' />
            </div>
            <div className=" md:self-end  " >
              <Link className=" md:text-xl "  href='' >GitHub</Link>
            </div>
            <div className=" md:self-end " >
              <Link className=' md:text-xl   ' href='' >Instagram</Link>
            </div>
            <div className=" md:self-end  " >
              <Link className=' md:text-xl  ' href=''  >LinkedIn</Link>
            </div>
            <hr className=" border-gray-200 w-full md:col-span-4 md:self-end md:flex md:pl-4 md:pr-4 md:w-2/3 md:justify-self-center " />
            <div className=" flex   md:col-span-4 md:self-center md:flex-row md:justify-center md:flex md:space-around md:self-end  " >
                <Image className=" flex space-between md:h-full " src={CopyRight} alt='copyright' /> <h3 className=" md:self-center md:justify-start md:h-full " > All Rights reserved by Julian Borner</h3>
            </div>
            {/* Social Media*/}
      </div>
  )
}

export default Footer