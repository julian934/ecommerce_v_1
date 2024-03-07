import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(request){
    
   
    const stripe =new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
        const products=await stripe.products.list()
    return NextResponse.json(products.data)
}