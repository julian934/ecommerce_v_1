import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(request){
    //In a get request, to access parameters, check for a QUERY! consult NextJS documentation. 
    const {searchParams}=new URL(request.url)
    const query=searchParams.get('id')
    const stripe =new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
    const products=await stripe.products.retrieve(query)
    return NextResponse.json(products)
}