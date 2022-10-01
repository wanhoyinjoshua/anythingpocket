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
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {Slidenext,Slideback} from '../components/Slideimages';
const Home: NextPage = () => {
  const theme = useTheme();let reference:  any
  const swiper = useSwiper();
  let reactSwipeEl: ReactSwipe | null;
  const [activeStep, setActiveStep] = React.useState<number|undefined>(0);
 
  function next(swiper:any){
    console.log(swiper)
  var currentposition= swiper?.getPos()
  console.log(currentposition)

  if(swiper&&currentposition!=null){
    setActiveStep(currentposition+1)
    swiper.slide(currentposition+1,500)}

 }
 function previous (swiper:ReactSwipe | null){
  var currentposition= swiper?.getPos()
  
  if(swiper&&currentposition!=null){
    setActiveStep(currentposition-1)
    swiper.slide(currentposition-1,500)
  }
  

 }


  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
    <Link href="/api/auth/login">Login</Link>
    <input type="file" accept="image/*" capture="environment"/>
  
   
   







   <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      
      onSlideChange={(e) => setActiveStep(e.activeIndex)}
    >
      <SwiperSlide><div>
            <img src="http://placekitten.com/g/400/200" />
          </div></SwiperSlide>
      <SwiperSlide><div>
            <img src="http://placekitten.com/g/400/200" />
          </div></SwiperSlide>
      <SwiperSlide><div>
            <img src="http://placekitten.com/g/400/200" />
          </div></SwiperSlide>
      <SwiperSlide><div>
            <img src="http://placekitten.com/g/400/200" />
          </div></SwiperSlide>

      
      
      <MobileStepper
        steps={3}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Slidenext status={activeStep}></Slidenext>
        }
        backButton={
          <Slideback status={activeStep}></Slideback>
        }
      />
    </Swiper>

   
      
    
    </>
   
  )
}

export default Home
