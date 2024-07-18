import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'


export const getPrice=async()=>{
  
    try{
     
        const response=await axios.get(`/api/getprices`)
       return response.data
    }catch(error){
        console.log(error)
    }
  }

  const fetchProducts=async()=>{
        
    try{
        const {data}=await axios.get('/api/getproducts')
    setProducts(data)
    console.log(data)

    }catch(error){
        console.log(error)
    }
 }

 /*export const session=async()=>{
    //const newSession=await getServerSession(authOptions);
    const data=await fetch('/api/restricted')
    return data
 }
 */