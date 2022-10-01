import React, { useState ,useEffect} from 'react'
import { GetServerSideProps } from 'next'
import { useUser, getSession } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next';
const Login = () => {
  const { user } = useUser();
  const router = useRouter()
  useEffect(() => {

    if(user){
        router.push(`https://localhost:3000/Dashboard/Login`)

    }else{

    }
        
})
  return (
    <>
    
    <div>Dashboard generic view</div>
    
    </>
  )
}

export default Login

