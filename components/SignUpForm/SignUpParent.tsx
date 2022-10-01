import React, { useEffect,useState,useRef } from 'react'
import Personalinfo from "./Personalinfo"
import Preferences from "./Preferences"
import IdVerification from "./IdVerification"
interface Signup{
    username: any;
    profilepicture: any;
    preferences:any
  }
const SignUpParent = (props:Signup) => {
    //determine the state using username and preferences 
    const [step,setStep]= useState(0)
    const[ready,setReady]=useState<String>("false")
    const submitRef = useRef<HTMLDivElement>(null)
    function handleChange(newValue:String) {
        setReady(newValue);
      }
    useEffect(()=>{

        if(JSON.stringify(props.username)==`""`){
            setStep(1)

        }
        else if (JSON.stringify(props.username)!=`""`&& JSON.stringify(props.preferences)==`""`){
            setStep(2)
        }


    },[])
   
     
   return(
    <>
    <div>
        Progress bar 
        

    </div>
    {step==1&& <Personalinfo submitRef={submitRef}></Personalinfo>}
    {step==2&& <Preferences  onChange={handleChange}></Preferences>}
    {step==3&& <IdVerification></IdVerification>}
    {step==4&& <div>Submit</div>}
    <button onClick={()=>{if (submitRef.current !== null){submitRef.current.click()};{setStep(step+1)}}}>Next</button>
    <button onClick={()=>{setStep(step-1)}}>back</button>
    </>
   )
}

export default SignUpParent