
import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";



const handler=NextAuth({
    providers:[
        CredentialsProvider({
            name:'Credentials',

            credentials:{
                username:{label:"Username",type:"text",placeholder:"Insert User"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials,req){
                //Add MongoDB Logic Here....
                let user=credentials.username
                let pass=credentials.password
                try{
                    const client=new MongoClient(process.env.NEXT_PUBLIC_MONGO_SECRET_KEY);
                    await client.connect();
                    let info=client.db('user').collection('user')
                    
                    const currentUser=info.find(item=> item.username==user && item.password==pass)
                    if(currentUser){
                        
                        const res=await fetch("/",{
                    method:'POST',
                    body:JSON.stringify(currentUser),
                    headers:{"Content-Type":"application/json"}
                })
                const user=await res.json();

                if(res.ok && user){
                    console.log(user)
                    return user
                }
                return null
                    }else{
                        console.log("No user found")
                    }
                

                }catch(error){
                    console.log(error)
                }

                
            }
        })
    ]
})

export {handler as GET, handler as POST}

