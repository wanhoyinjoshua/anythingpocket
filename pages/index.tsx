import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useRef, useState } from "react";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0';
import { getAccessToken } from '@auth0/nextjs-auth0';
import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import { useSwiper } from 'swiper/react';
import ReactSwipe from 'react-swipe';
const Home: NextPage = () => {
  let reactSwipeEl: ReactSwipe | null;
 
 


  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
    <Link href="/api/auth/login">Login</Link>
    <input type="file" accept="image/*" capture="environment"/>
    <ReactSwipe
        
        swipeOptions={{ continuous: false }}
        ref={el => (reactSwipeEl = el)}
      >
       <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
      </ReactSwipe>

      <button onClick={() => {if(reactSwipeEl){reactSwipeEl.next()}}}>Next</button>
      <button onClick={() => {if(reactSwipeEl){reactSwipeEl.prev()}}}>Previous</button>
  
    </>
   
  )
}

export default Home
