import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(request){
    const stripe =new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
    const {searchParams}=new URL(request.url);
    const id=searchParams.get('id');
    const price=stripe.prices.retrieve(id)
    
    console.log(request)
    console.log(price)
    return NextResponse.json(price)
}