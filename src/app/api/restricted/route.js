import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export default async (req,res)=>{
    const session=await getServerSession(req,res,authOptions);

    if(session){
        res.send({
            content:
            "This is protected content. You can access this content because you are signed in."
        })
        return session
    }else{
        res.send({
            error:"You must be signed in to view the portected content on this page."
        })
    }
}