import { MongoClient } from "mongodb";
import { hashPassword } from "@/app/lib/auth/page";
import { NextResponse } from "next/server";
import { hash,hashSync } from "bcrypt";
import bodyParser from "body-parser";

//No response returned from handler error
export async function POST(request){
    const formData=await request.formData()
    const email=formData.get('email');
    const password=formData.get('password');
    console.log(request.email)
    console.log(email)
    console.log(password)
    if(!email || !email.includes('@') || !password || password.trim().length<7){
        Response.json({
            message:
            'Invalid input - password should also be at least 7 characters long.',
        });
        return
    }
    let client=new MongoClient(process.env.NEXT_PUBLIC_MONGO_SECRET_KEY);
    const db=client.db('users')
    const existingUser=await db.collection('users').findOne({username:email})
    if(existingUser){
        Response.json({message:'User exists already!'});
        client.close();
        return;
    }

    const hashedPassword=hash(password,10)
    //client.close()

    const result=await db.collection('users').insertOne({
        username:email,
        hashedPassword:hashedPassword
    })

    console.log(result)

    result.json({message:'Created User!'})
    client.close()
    
    return NextResponse.json(result)
}

