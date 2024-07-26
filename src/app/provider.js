'use client'
import React,{useEffect, useState} from 'react';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StoreStateContextProvider } from './context/storecontext';
//import { SessionProvider } from 'next-auth/react';
//import { session } from './queryFunc/queryData';
//import { useQuery } from '@tanstack/react-query';

const Provider = ({children}) => {
    const [client]=useState(new QueryClient());
    const [currSession,setSession]=useState()
   /* const {data,error}=useQuery({
      queryKey:['data'],
      queryFn:session
    })
    */
    //const session=await getServerSession(authOptions);
    //Configure import to accept session
    /*useEffect(()=>{
       setSession(session)
    },[session])
    */
  return (
    <>
    {/* <SessionProvider session={data} >*/}
    
    <StoreStateContextProvider>
    <QueryClientProvider client={client} >
     <ReactQueryStreamedHydration>
        {children}
     </ReactQueryStreamedHydration>
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </StoreStateContextProvider>
    {/*  </SessionProvider>*/}
   
    </>
  )
}

export {Provider}