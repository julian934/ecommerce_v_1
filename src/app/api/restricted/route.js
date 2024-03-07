import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";

export default async (req,res)=>{
    const session=await getServerSession(req,res,authOptions);

    if(session){
        res.send({
            content:
            "This is protected content. You can access this content because you are signed in."
        })
    }else{
        res.send({
            error:"You must be signed in to view the portected content on this page."
        })
    }
}