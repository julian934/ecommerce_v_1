


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