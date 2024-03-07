
import * as bcrypt from 'bcrypt'
import { hash,compare } from 'bcrypt';

export async function hashPassword(password){
    const saltRounds=12
    const hashedPassword=await bcrypt.hash(password,saltRounds,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })
    return hashedPassword
}

export async function verifyPassword(password, hashedPassword){
    const isValid=await bcrypt.compare(password, hashedPassword,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })
    return isValid
}