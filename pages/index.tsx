import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0';
import { getAccessToken } from '@auth0/nextjs-auth0';
import Link from "next/link"

const Home: NextPage = () => {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
    <Link href="/api/auth/login">Login</Link>
    <input type="file" accept="image/x-png,image/jpeg,image/gif"/>
    
  
    </>
   
  )
}

export default Home
