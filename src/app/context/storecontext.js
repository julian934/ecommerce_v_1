// Put context functions and states here, but test first.
"use client"
import {createContext,React,useContext,useState} from 'react'




 const StoreStateContext=createContext({
    cartList:null,
    addToCart:function(id){},
    removeFromCart:function(id){},
    formatter:function(arr){},
     dataChecker:function(prod,price){},
     priceFormat:null,
     cartUI:null,
     pricevis:null,
     priceData:function(value){},
     prices:null,
     priceMap:function(){}
})

export const StoreStateContextProvider=({children})=>{
    const [cart, setCart]=useState([]);
    const [cartId,setCartId]=useState([]);
    const [quantity,setQuantity]=useState(0);
    const [totalPrice, setTotalPrice]=useState();
    const [activeCart, setActiveCart]=useState();
    const [user,setUser]=useState([]);
    const [wishList, setWishList]=useState([]);
    const [wishListPrice,setTotalWishListPrice]=useState()
    const [wishListQuantity, setWishListQuantity]=useState(0);
    const [sortedList, setSortedList]=useState();
    const [searchResults, setSearchResults]=useState([])
    const [searchQuery, setSearchQuery]=useState([])
    const [searcher,setSearcher]=useState([])
    const [pricevis,setPriceVis]=useState([])
    const [renderedCart,setRenderedCart]=useState([]);
    const [priceFormat,setPriceFormat]=useState('')
    const [cartUI,setCartUI]=useState([])
    const [prices,setPrices]=useState([]);
    const addUser=(user)=>{
        setUser(user)
    }
    const priceMap=()=>{
        let data=JSON.parse(localStorage.getItem('pricemap'))
        setPrices(data)
    }
    const addToCart=(priceObj,quantity)=>{
        //restructure addToCart
        const itemCheck=cart.find((item)=>item.id===priceObj.id)
        
        //setTotalPrice((prevTotalPrice)=>prevTotalPrice + priceObj.price * quantity)
        setQuantity((prevTotalQuantities)=> prevTotalQuantities+ quantity)
        if(itemCheck){
            const updatedCartItems=cart.map((cartProduct)=>{
                if(cartProduct.id===priceObj.id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCart(updatedCartItems)
             
        }else{
            setCart([...cart, {...priceObj,quantity:1}]);
           
        }
        /*let cartHelper=(obj)=>{
            

        }
        cart.forEach((item)=>{
            cartHelper(item)
        })*/
        const cartId=cart.map((items)=>{
            return{
                ...items,
                id:items.id
            }
        })
       
        setCartId(cartId)
        
        localStorage.clear()
        localStorage.setItem('cartid',JSON.stringify(cartId))
      
        /*cart.forEach((item)=>{
            setCartId((prevCartId)=>{
                return{...prevCartId, item}
            })
        })
        localStorage.setItem('cartid',cartId)*/
        //Extend to send cart IDs to other pages due to context limitations

        /*const newId=id.join('')
        console.log(newId)
        setCart([...newId,newId])
        return cart*/
        
    }
    const removeFromCart=(inv)=>{
        const product=cart.find((item)=>item._id===inv._id)
        const filterCart=cart.filter((item)=> item._id!=product._id)
        setCart(filterCart)
    }
   /* const addToWishList=(inv,quantity)=>{
        const wishlistCheck=wishList.find((item)=> item._id==inv._id)
        if(wishlistCheck){
            const updatedWishList=wishList.map((item)=>{
                if(item._id==inv._id) return{
                    ...item,
                    quantity:item.quantity+quantity
                }
            })
            setWishList(updatedWishList)
        }else{
            setWishList([...wishList,{...inv}])
        }

    }*/
    const toggleCartItemQuantity=(id, value)=>{
       
         const foundProduct=cart.find((item)=> item._id===id);
         const newCartItems=cart.filter((item)=> item._id !==id)
         if(value==='inc'){
            setCart([...newCartItems, {...foundProduct, quantity: foundProduct.quantity+1}]);
            setTotalPrice((prevTotalPrice)=>prevTotalPrice + foundProduct.price);
            setQuantity(prevTotalQuantities=> prevTotalQuantities+1)
         }else if(value==='dec'){
            if(foundProduct.quantity>1){
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity+1}]);
                setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price)
                setTotalQuantities(prevTotalQuantities=> prevTotalQuantities-1)
            }
         }
    }
    const increaseQuantity=()=>{
         setQuantity((prevQty)=>prevQty+1)
    }
    const decreaseQuantity=()=>{
         setQuantity((prevQty)=>{
            if(prevQty-1<1 ) return 1;
            return prevQty-1;
         });
    }
    const cartVisibility=()=>{
        if(activeCart=='true'){
            setActiveCart('false')
        }else{
            setActiveCart('true')
        }
    }
    const searchFilter=(inventory,searchRef)=>{
       const inv=inventory.filter(item=> item.categorySet[searchRef])
       if(inv){
        setSearchQuery(inv)
       }

    }
    const priceData=(val)=>{
         setPriceVis((vals)=>{
            return [...vals,val]
         })
    }
    const addToWishList=(priceObj,quantity)=>{
        const itemCheck=wishList.find((item)=>item.id===priceObj.id)
        console.log(itemCheck)
        setTotalWishListPrice((prevTotalPrice)=>prevTotalPrice + priceObj.price * quantity)
        setWishListQuantity((prevTotalQuantities)=> prevTotalQuantities + quantity)
        if(itemCheck){
            const updatedCartItems=wishList.map((cartProduct)=>{
                if(cartProduct.id===priceObj.id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setWishList(updatedCartItems)
             
        }else{
            setWishList([...wishList, {...priceObj}]);
           
        }
        
  
    }
    let formatter=async(arr)=>{
        const newArr=await arr
        let data=newArr.toString().split('')
        let check=Math.floor(data.length/2)
        let newData=[data[check],'.']
       data.splice(check,1,newData)
        let finalFormat=data.flat().join('')
        setPriceFormat(finalFormat)
      }

      let dataChecker=(prod)=>{
        
          const newData=prod.filter(item=> cartList.includes(item.default_price))
          setCartUI(newData)
          localStorage.setItem('cartUI',cartUI)
      }
   
   
    return (
        <StoreStateContext.Provider value={{
            cartVisibility:cartVisibility,
            addCart:addToCart, cartList:cart,remove:removeFromCart,increment:increaseQuantity,
            decrement:decreaseQuantity,
            toggleQuantity:toggleCartItemQuantity, quantity:quantity, searchFilter:searchFilter,
            addToWishList:addToWishList, activeCart:activeCart, wishListQuantity:wishListQuantity, wishList:wishList, cartId:cartId,
            removeFromCart:removeFromCart, addUser:addUser, user:user,  renderedCart:renderedCart,
            formatter:formatter,priceFormat:priceFormat,dataChecker:dataChecker,cartUI:cartUI,priceData:priceData,pricevis:pricevis,
            currPrice:prices, priceMap:priceMap
        }} >
            {children}
        </StoreStateContext.Provider>
    )
}

export const useStoreContext=()=>useContext(StoreStateContext) 
//Define state in index file and pass it down as props.

//export default StoreStateContext

//Error Log:
//1.) Context is not being shared throughout the application. 
//Sols:
//1 pootential sol: Check if there are redeclarations throughout the app.
//1a potential sol: Check if context can be used for child components.
//1b potential sol.) Test to see if inventory context values work due to Stripe object being passed in as parameter for reference. 
//1b-1 potential sol.) pricing card for original inventory is mapped over through the inventory page via the products list. Try the same via cart.
//