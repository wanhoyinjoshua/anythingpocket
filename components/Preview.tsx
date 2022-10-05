import React,{useState,useEffect} from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import { useSwiper } from 'swiper/react';
import ReactSwipe from 'react-swipe';
import { useTheme } from '@mui/material/styles';

import MobileStepper from '@mui/material/MobileStepper';

import {Slidenext,Slideback} from '../components/Slideimages';
interface preview{
    frontview:string,
    rearview:string,
    sideview:string,
    frontviewcaption?:string,
    rearviewcaption?:string,
    sideviewcaption?:string,
  
    title:string,
    description:string,
    hour:boolean,
    Day:boolean,
    Month:boolean,
    hourlyprice:number,
    dailyprice:number,
    monthlyprice:number,
    category:string,
}
const Preview = (props:preview) => {
    const theme = useTheme();let reference:  any
    const swiper = useSwiper();
    let reactSwipeEl: ReactSwipe | null;
    const [activeStep, setActiveStep] = React.useState<number|undefined>(0);
    const[rental,setRental]= useState<string>("Day")
   
    useEffect(()=>{
       
       

        if(props.hour){
            setRental("Hours")
            return
        }
        else if (props.Day){
            setRental("Day")
            return
        }
        else{
            setRental("Month")
            return
        }
       

       


    },[])
    
  return (
    <>
 
  
  

    <div className="flex justify-center ">
  <div className="rounded-lg shadow-lg bg-white max-w-full">
    <a href="#!">
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
      <SwiperSlide>
      <img className="w-full" src={props.frontview}alt="Mountain"/>
      <div>{props.frontviewcaption}</div>
        
    </SwiperSlide>
    <SwiperSlide>
      <img className="w-full" src={props.sideview}alt="Mountain"/>
      <div>{props.sideviewcaption}</div>
        
    </SwiperSlide>
    <SwiperSlide>
      <img className="w-full" src={props.rearview}alt="Mountain"/>
      <div>{props.rearviewcaption}</div>
        
    </SwiperSlide>
   
   
      

          

      
      
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
    </a>
    <div className="p-6">
  
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{props.category}</span>
       
      
        <div className="flex flex-row justify-between">
        <h5 className="text-gray-900 text-xl font-medium mb-2">{props.title}</h5>
        <div className='text-gray-900 text-xl font-medium mb-2'>
            
        <span>
            
            {rental=="Hours"&&<div>${props.hourlyprice}/ hour</div> }
            {rental=="Day"&&<div>${props.dailyprice}/ day</div>}
            {rental=="Month"&&<div>${props.monthlyprice}/ month</div>}
            {rental=="Year"&&props.dailyprice}
        </span>
        
        </div>

        </div>
     
      <p className="text-gray-700 text-base mb-4">
        {props.description}
      </p>
      
      <div className='flex items-center justify-center'>Rental Options Available:</div><br></br>
      <div className="flex items-center justify-center">
      
  <div className="inline-flex" role="group">
    
            {props.Day==true?<button className={rental=="Day"?" mx-0.5  rounded-r bg-green-300 ":"bg-inherit mx-0.5"} onClick={()=>{setRental("Day")}}>day</button>:null}
            {props.hour==true?<button className={rental=="Hours"?"mx-0.5  rounded-r bg-green-300":"bg-inherit mx-0.5"} onClick={()=>{setRental("Hours")}}>Hours</button>:null}
            {props.Month==true? <button className={rental=="Month"?"mx-0.5  rounded-r bg-green-300":"bg-inherit mx-0.5"} onClick={()=>{setRental("Month")}}>Month</button>:null}
            {props.Month==false?<button className={rental=="Year"?"mx-0.5  rounded-r bg-green-300":"bg-inherit mx-0.5"} onClick={()=>{setRental("Year")}}>Year</button>:null}
           
            
            </div>
</div>
      <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Rent</button>
    </div>
  </div>
</div>

    </>
  )
}

export default Preview