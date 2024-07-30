import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CopyRight from '../../images/icons8-copyright-30.png'
import Github from '../../images/icons8-github-90.png'
import Instagram from '../../images/icons8-instagram-100.png'
import LinkedIn from '../../images/icons8-linkedin-100.png'

const Footer = () => {
  return (
    <footer className=" flex max-sm:w-full  max-sm:flex-col md:flex-col md:w-full md:self-end md:justify-center md:h-full  " >
            <hr className=" border-gray-200 w-full  md:self-center flex md:pl-4 md:pr-4 md:justify-center md:w-2/3" />
            <div className=" flex md:self-center max-sm:flex-row max-sm:space-around max-sm:h-full border-black justify-around w-full md:w-3/4  " >
            
             <div className=" flex max-sm:space-around md:self-end hover:text-yellow " >
              <Link className=" rounded-lg hover:bg-yellow-400 "  href='https://github.com/julian934' ><Image className=' h-12 w-12' src={Github} alt='Github' /></Link>
             </div>
             <div className=" flex max-sm:space-around md:self-end " >
              <Link className='  rounded-lg hover:bg-yellow-400 ' href='https://www.instagram.com/jbthedev' ><Image className=' h-12 w-12 ' src={Instagram} alt='Instagram' /></Link>
             </div>
             <div className=" flex max-sm:space-around md:self-end  " >
              <Link className=' rounded-lg  hover:bg-yellow-400 ' href='https://www.linkedin.com/in/julian-borner-709b91b7/'  ><Image className='h-12 w-12 ' src={LinkedIn} alt='LinkedIn' /></Link>
             </div>
            </div>
            
            <hr className=" border-gray-200 w-full md:col-span-4 md:self-center flex md:pl-4 md:pr-4 md:w-2/3 md:justify-self-center " />
            <div className=" flex w-5/6 max-sm:pb-2 max-sm:pb-4 max-sm:flex-end max-sm:justify-around  md:col-span-4 md:self-center md:flex-row md:justify-center md:flex md:space-around md:self-end  " >
                <Image className=" flex space-between md:h-full max-sm:h-full " src={CopyRight} alt='copyright' /> <h3 className=" max-sm:self-center md:self-center md:justify-start md:h-full " > All Rights reserved by Julian Borner</h3>
            </div>
            {/* Social Media*/}
      </footer>
  )
}

export default Footer