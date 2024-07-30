import { getStripe } from "../getClient/getClient";

//explore offloading state and data here for cart
export let getPrices=async()=>{
    let data=await getStripe()
    return data.prices.list()
}