import { useSession,signIn,signOut } from "next-auth/react";

export default Login=()=>{
    const {data:session}=useSession()
    return(<div>

    </div>)
}