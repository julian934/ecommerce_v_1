"use client"
import { useRouter } from "next/router"
import Link from "next/link";
import axios from 'axios'

//Add this page to the page lineup
// Make this the default page.
//useRouter to redirect to Inventory.
//OnSubmit redirect to inventory page. 
//May need to received an OK response from back-end or some
//sort of confirmation before redirecting.
export default function SignUp(){

    const redirection=async()=>{
        const forms=new FormData();
        const response=await axios.post('/api/signup',forms)
       

        //const router=useRouter();
        //router.push('/inventory')
        console.log(response)
        return response
    }

    return(
    <div className=""  >
    <form  method="post" onSubmit={redirection} encType="multipart/form-data"  >
        <div>
          <label htmlFor="username">Enter username:</label>
          <input type="text" name="email" id="username" required />
        </div>
        <div>
            <label htmlFor="password">Enter password:</label>
            <input type="text" name="password" id="password"  required />
        </div>
        <div>
        <button type='submit'  >Submit</button>
            {/*<Link href="/integration_test/auth-form" ><button type='submit'  >Submit</button> </Link> */ }
        </div>

    </form>
    </div>
    )
}