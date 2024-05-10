'use client'
import React,{useState} from 'react';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StoreStateContextProvider } from './context/storecontext';

const Provider = ({children}) => {
    const [client]=useState(new QueryClient());
    
  return (
    <>
    <StoreStateContextProvider>
    <QueryClientProvider client={client} >
     <ReactQueryStreamedHydration>
        {children}
     </ReactQueryStreamedHydration>
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </StoreStateContextProvider>
    </>
  )
}

export {Provider}