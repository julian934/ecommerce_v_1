import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Protected(req){
    const session=await getServerSession(authOptions)
    console.log('Data',session)
    return(
        <div>
            <div>
                {
                    session !==null?<h1>Hi {session?.user.name}!</h1>:<a>Sign in</a>
                }
            </div>
        </div>
    )
}