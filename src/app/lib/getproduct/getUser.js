import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function getUser(id){
    const stripe=new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
    const response=await stripe.products.find(product=> product.id===id)

    return NextResponse.json(response)
}