import { getStripe } from "../getClient/getClient";


//explore offloading state and data here instead of Cart
export let getProducts=async()=>{
    let data=await getStripe();
    return data.products.list();
}