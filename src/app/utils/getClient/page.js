//import { createClient } from 'next-sanity'
import Stripe from "stripe"
export let getStripe=()=>{
    const stripe=new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)

  return stripe
}