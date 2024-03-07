import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
//modify post request
export async function POST (request) {
    const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);
    let data = await request.json();
    let priceId = data.priceId
    let pricingInfo=data.body
    let newPrices=JSON.parse(pricingInfo)
    let consoleCheck=newPrices.map((item)=>{
        return{price:item.id,quantity:item.quantity}
    })
    console.log(newPrices)
    console.log(consoleCheck)
    //JSON.stringify(data)
    //console.log(data.body)
    
    //console.log(JSON.parse(data.body))
    //let newData=JSON.parse(data.body)
    /*newData.map((item)=>{
        return{price:item.id, quantity:1}
    })*/
    //const finalData=JSON.stringify(newData)
    //console.log(finalData)
    const session = await stripe.checkout.sessions.create({
        line_items:newPrices.map((item)=>{
            return{price:item.id,quantity:item.quantity}
        }) ,
      mode: 'payment',
      success_url: 'http://localhost:3000',
      cancel_url: 'http://localhost:3000'
    })

    //Payment takes an array, modify to include cart array data.

    return NextResponse.json(session.url)
}