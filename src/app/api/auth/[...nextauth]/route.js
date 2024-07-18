import NextAuth from "next-auth/next";
//import bcrypt from 'bcrypt'
//import { MongoClient } from "mongodb";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { verifyPassword } from "@/app/lib/auth/page";
import clientPromise from "../../mongo/adapter/route";
//import { MongoDBAdapter } from "@auth/mongodb-adapter";
/*
const client=new MongoClient(process.env.NEXT_PUBLIC_MONGO_SECRET_KEY);
await client.connect();
export const authOptions={
        adapter:MongoDBAdapter(clientPromise),
        
        providers:[
            CredentialsProvider({
                name:'Credentials',
    
                credentials:{
                    username:{label:"Username",type:"text",placeholder:"Insert User"},
                    password:{label:"Password",type:"password"}
                },
                async authorize(credentials,req){
                    //Add MongoDB Logic Here....
                 console.log(credentials)
                    try{
                       const {username,password}=credentials
                       console.log('user is:',username + ''+password)
                        let collections=await client.db('users').collection('users')
                        console.log("Collections are:",collections)
                        
                        const currentUser= await collections.findOne({
                            username:{$eq:`${username}`}
                        })
                        //currentUser is the problem. returns a null value.Problem isolated.
                        console.log('Found user:',currentUser)
                        console.log('Current User is:',currentUser)
                        console.log(currentUser.password)
                        let pass=await collections.find({hashedPassword:`${password}`})
                        //console.log("Password is:",await collections.findOne({password:{$eq:`${currentUser.hashedPassword}`}}))
                        
                        const newHash=bcrypt.hash(password,12)
                        console.log('Secondary Hash:',newHash)
                        console.log(currentUser.hashedPassword)
                      
                        //const isValid=await bcrypt.compare(password,currentUser.hashedPassword)
                        const isValid=await currentUser.hashedPassword
                        console.log(isValid)
                        
                        if(!isValid){
                            setTimeout(()=>{client.close()},1500)
                            throw new Error('Could not log you in!')
                        }
                        if(!currentUser){
                            setTimeout(()=>{client.close()},1500)
                            throw new Error('No user found!')
                        }
                        const user= {
                            name:currentUser.username,
                            
                        }

                         if(isValid){
                            console.log('Yes')
                         }
                        if(isValid){
                            return user
                        }else{
                            return null
                        }


                       
                       
                      
                      
                     
                    }catch(error){
                        console.log(error)
                    }
    
                    
                }
            })
        ],
        
        session:{
            strategy:"jwt"
        },
        secret:process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
        //The Error lies in how callbacks are configured. Error message reads id.
        /*callbacks:{
            async jwt({token,account,profile}){
                if(account){
                    token.accessToken=account.access_token
                    token.id=profile.id
                }
                return token

            },
            async session({session, token, user}){
                const newUser=await client.connect();

                session.accessToken=token.accessToken
                session.user.id=token.id

                return session

            }
        }
   

}
*/
//const handler=NextAuth(authOptions)

//export {handler as GET, handler as POST}

