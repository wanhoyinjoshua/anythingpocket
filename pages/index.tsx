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
import Preview from "../components/Preview"
interface post{
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
var initialpsot={

  frontview:"",
  rearview:"",
  sideview:"",
  title:"",
  description:"",
  frontviewcaption:"",
  rearviewcaption:"",
  sideviewcaption:"",
  hour:false,
  Day:false,
  Month:false,
  hourlyprice:10,
  dailyprice:30,
  monthlyprice:60,
  category:"",


}

const Home: NextPage = () => {
  const theme = useTheme();let reference:  any
  const swiper = useSwiper();
  let reactSwipeEl: ReactSwipe | null;
  const [activeStep, setActiveStep] = React.useState<number|undefined>(0);
  const [Initialdata,setinitialData]= useState<post>(initialpsot)
  const [first,setFirst]=useState<Boolean>(true)
  const[second,setSecond]=useState<Boolean>(false)
  const [preview,setPreview]=useState<Boolean>(false)
function handlePreview(){
  //submit the form here.
  //go to a preivew mode
  // from there I submit the form..
  setFirst(false);setSecond(false)
  setPreview(true)
}



  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
    <Link href="/api/auth/login">Login</Link>
    <br></br>
    

   
   






{first==true&& 
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
        
   
        <label>Front view</label>
        <input type="text"  value ={Initialdata.frontviewcaption}onChange={(e)=>{
    
    setinitialData({
            ...Initialdata,
            frontviewcaption:e.target.value
            
        })}}/>
        <br>
        </br>
        {Initialdata.frontview==""?
        <div>no picture yet 

<input type="file" accept="image/*" capture="environment" 
      onChange={(e)=>{
    if (!e.target.files) return;
    setinitialData({
            ...Initialdata,
            frontview:URL.createObjectURL(e.target.files[0])
            
        })}}/>
          
          
           </div>:  <><Image src={`${Initialdata.frontview}`}
        width={200}
        height={400}
        />

<input type="file" accept="image/*" capture="environment" 
      onChange={(e)=>{
    if (!e.target.files) return;
    setinitialData({
            ...Initialdata,
            frontview:URL.createObjectURL(e.target.files[0])
            
        })}}/>

        </>

        
        
        }
      
          
          </div></SwiperSlide>
      <SwiperSlide><div>
      <input type="file" accept="image/*" capture="environment"
      onChange={(e)=>{
        if (!e.target.files) return;
        setinitialData({
                ...Initialdata,
                rearview:URL.createObjectURL(e.target.files[0])
                
            })}}/>
             <Image src={`${Initialdata.rearview}`}
        width={200}
        height={400}
        />
          <label>Rear view</label>
        <input type="text"  value ={Initialdata.rearviewcaption}onChange={(e)=>{
    
    setinitialData({
            ...Initialdata,
            rearviewcaption:e.target.value
            
        })}}/>
          </div></SwiperSlide>
   
      <SwiperSlide><div>
      <input type="file" accept="image/*" capture="environment"
      onChange={(e)=>{
        if (!e.target.files) return;
        setinitialData({
                ...Initialdata,
                sideview:URL.createObjectURL(e.target.files[0])
                
            })}}/>
          <Image src={`${Initialdata.sideview}`}
        width={200}
        height={400}
        />
          <label>Side view</label>
        <input type="text"  value ={Initialdata.sideviewcaption}onChange={(e)=>{
    
    setinitialData({
            ...Initialdata,
            sideviewcaption:e.target.value
            
        })}}/>
          </div></SwiperSlide>

          <SwiperSlide><div>
      <input type="file" accept="image/*" capture="environment"/>
            <img src="http://placekitten.com/g/400/200" />
          </div></SwiperSlide>

      
      
      <MobileStepper
        steps={4}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Slidenext status={activeStep}></Slidenext>
        }
        backButton={
          <Slideback status={activeStep}></Slideback>
        }
      />

<button onClick={()=>{setFirst(false);setSecond(true)}}>SHow second form</button>

    </Swiper>}
   

    
{second==true && 
<>
    <div>
      <button onClick={()=>{setFirst(true);setSecond(false);setPreview(false)}}>SHow first form</button>
      

     
      
<br></br>


    
 
       






<br></br>

      
      </div>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
  <form>
    <div className="form-group mb-6">
      <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700">Title of the post</label>
      <input  className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2"
        aria-describedby="emailHelp" placeholder="An Awesome title!!!"
        value={Initialdata.title} type="text" onChange={(e)=>{setinitialData({
          ...Initialdata,
          title:e.target.value
          
      })}}
        />
    </div>
    <div className="form-group mb-6">
    <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700">Description of the post</label>
      <textarea
      className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="exampleFormControlTextarea13"
      rows={3}
      placeholder="Message"
      value={Initialdata.description}  onChange={(e)=>{setinitialData({
        ...Initialdata,
        description:e.target.value
        
    })}}
    ></textarea>
    </div>

    <div className="flex justify-center">
  <div className="mb-3 xl:w-96">
    <select className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
      onChange={(e)=>{setinitialData({
        ...Initialdata,
        category:e.target.value
        
    })}} 
      >
  <option selected value="null">Please select a category</option>
  <option selected={Initialdata.category=="Car"}value="Car">Car</option>
  <option selected={Initialdata.category=="Toys"} value="Toys">Toys</option>
  <option selected={Initialdata.category=="Kitchen"}value="Kitchen">Kitchen</option>
  <option selected={Initialdata.category=="Makeup"}value="Makeup">Makeup</option>
    </select>
  </div>
  
</div>

    <div className="flex justify-between items-center mb-6">
     

      <div className="flex justify-center">
  <div className="form-check form-check-inline">
    <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox1" value="option1"checked={Initialdata.hour}
             onClick={(e)=>{setinitialData({
            ...Initialdata,
            hour:!Initialdata.hour
            
        })}}/>
    <label className="form-check-label inline-block text-gray-800" htmlFor="inlineCheckbox1">Hourly</label>
  </div>
  <div className="form-check form-check-inline">
    <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox2" value="option2"  checked={Initialdata.Day}
           onClick={(e)=>{setinitialData({
            ...Initialdata,
            Day:!Initialdata.Day
            
        })}}/>
    <label className="form-check-label inline-block text-gray-800" htmlFor="inlineCheckbox2">Daily</label>
  </div>
  <div className="form-check form-check-inline">
    <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2" type="checkbox" id="inlineCheckbox3" value="option3"  checked={Initialdata.Month}
      onClick={(e)=>{setinitialData({
       ...Initialdata,
       Month:!Initialdata.Month
       
   })}}/>
    <label className="form-check-label inline-block text-gray-800 " htmlFor="inlineCheckbox3">Monthly </label>
  </div>
</div>
     
    </div>
    <div className='flex flex-col'>
    {Initialdata.hour==true?<><label>Hourly Price</label> 
<input value={Initialdata.hourlyprice} 
 onChange={(e)=>{setinitialData({
            ...Initialdata,
            hourlyprice:parseInt(e.target.value)
            
        })}} type="number"/></>:null}
        
{Initialdata.Day==true?<><label>Daily Price</label> 
<input value={Initialdata.dailyprice} 
 onChange={(e)=>{setinitialData({
            ...Initialdata,
            dailyprice:parseInt(e.target.value)
            
        })}} type="number"/></>:null}

{Initialdata.Month==true?<><label>Monthly Price</label> 
<input value={Initialdata.monthlyprice} 
 onChange={(e)=>{setinitialData({
            ...Initialdata,
            monthlyprice:parseInt(e.target.value)
            
        })}} type="number"/></>:null}
        </div>
    <button type="submit" className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
      onClick={handlePreview}>See Preview</button>

  </form>
</div>
      </>
      
      
      }

    
{preview==true&&<><button type="button" className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"onClick={()=>{setPreview(false);setSecond(true);setFirst(false)}}>Go back and edit</button><Preview {...Initialdata}></Preview><button>Submit the form</button><div>Preview</div></>}
   
      
    
    </>
   
  )
}

export default Home
