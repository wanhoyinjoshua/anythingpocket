
import React,{useState,useEffect} from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import Link from "next/link"
const PersonalisedFeed = () => {
  const { user } = useUser();
  useEffect(()=>{
    console.log("uisereffect")
    
   

   


},[])
  return (
    <>
    
    <div>PersonalisedFeed</div>
    <Link href="/api/auth/logout">Logout</Link>
    </>
  )
}

export default PersonalisedFeed