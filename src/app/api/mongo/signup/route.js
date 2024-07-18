/*
import { MongoClient } from "mongodb"
//import bcrypt from 'bcrypt'
import { NextResponse } from "next/server"
//Got Response.status error. Fix immediately.
export async function POST(request){
    const formData= await request.formData();
    console.log(request.email)
    console.log(formData)
    const client=new MongoClient(process.env.NEXT_PUBLIC_MONGO_SECRET_KEY);
    await client.connect();
    const username=formData.get('email');
    const password=formData.get('password');
    console.log(username, password);
    
    //const hashedPassword=await bcrypt.hash(password,10)
    let collections=await client.db('users').collection('users')
    //collections.insertOne({username:username,hashedPassword:hashedPassword})
    collections.insertOne({username:username,password:password})
    let dbData=collections.findOne({username:username,password:password})
     console.log(dbData)
    await client.close()
    


    return NextResponse.json(dbData)
}
    */