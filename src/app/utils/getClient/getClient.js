import Stripe from "stripe";
//redo stripe connection or get it out of recycle bin

export const getStripe=()=>{
   const stripe =new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
   return stripe
}