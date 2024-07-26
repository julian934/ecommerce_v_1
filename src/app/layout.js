import './globals.css'
import { Inter } from 'next/font/google'
import {StoreStateContextProvider} from '../app/context/storecontext'
import { SessionProvider } from 'next-auth/react'
//import Provider from './context/client-provider'
import { getServerSession } from 'next-auth/next';
//import { authOptions } from './api/auth/[...nextauth]/route'
import { Provider } from './provider'
//import { getServerSession } from 'next-auth'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nuthread By Julian',
  description: 'A full-stack e-commerce webshop designed and developed by Julian Borner.',
}

export default async function RootLayout({ children}) {

  //const session=await getServerSession(authOptions)
  return (
    <html lang="en">
      
      <StoreStateContextProvider>
      <body className={inter.className}>
        <Provider  >
        
         {children}
       
      </Provider>
      </body>
      </StoreStateContextProvider>
      
    </html>
  )
}
