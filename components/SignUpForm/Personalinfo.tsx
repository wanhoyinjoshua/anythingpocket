import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import axios from 'axios'
import {prisma} from "../../lib/prisma"
import { useUser } from '@auth0/nextjs-auth0';
import {getObjectSignedUrl} from "../../lib/s3"
interface Personalinfo{
    submitRef: any;
   
   }
interface infostate{
   
        username:any;
        profilepicture: String ;
        picturefile: any;
        filename:String;

    
       
    
}
const Personalinfo = (props:Personalinfo) => {
    const [username,setUsername]= useState("")
    const [Initialdata,setinitialData]= useState<infostate>({username:"", profilepicture:"",picturefile:null, filename: ""})
    const { user } = useUser();
    
    useEffect(()=>{
        console.log("uisereffect")
        if(user){
            fetch(`/api/getuser/${user.sub}`)
            .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
        .then(data1 => setinitialData({
            ...Initialdata,
            username:JSON.parse(data1.name).username,
            profilepicture:JSON.parse(data1.propic),
            filename:JSON.parse(data1.name).profilepic

            
          })
        )
       

        }
       

       


    },[])
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        // 👇️ prevent page refresh
        event.preventDefault()
        if(Initialdata.profilepicture.includes("https://anythinpocketimage.s3.ap-southeast-2.amazonaws.com")){
            if(user){
                await fetch(`/api/userupdate/${user.sub}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username:Initialdata["username"], profilepicture: undefined}),
                  })

            }
           
        
        }
        else{

            const formData = new FormData();
            formData.append("image", Initialdata["picturefile"])
            formData.append("username", Initialdata["username"])
            console.log(formData.values)
            const filenames3 = await axios.post("/api/s3imageupload", formData, { headers: {'Content-Type': 'multipart/form-data'}})
            console.log(filenames3.data.filename)
            console.log(filenames3.data.status)
            
            console.log("s3 bucket upload completed, pending database user")
            if(user && filenames3.data.status==200){
                 await fetch(`/api/userupdate/${user.sub}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username:Initialdata["username"], profilepicture: filenames3.data.filename}),
                  })
                  console.log("success update both ends")
    
            }
            
        
            

        }
        
        //connect to external image store first
        //and wait for the result of the image--> and then put the image into userupate
       
        
    
        
      };
    
  return (
    <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
<>            Personal info
            {JSON.stringify(Initialdata["filename"])}
            {Initialdata&& <input value= {Initialdata.username} name="username" onChange={(e)=>{setinitialData({
            ...Initialdata,
            username:e.currentTarget.value,
            

            
          })}}>
            </input>}
            {Initialdata["profilepicture"]}
            {}
            
<input name="profilepicture"type="file" accept="image/*" onChange={(e)=>{
    if (!e.target.files) return;
    setinitialData({
            ...Initialdata,
            profilepicture:URL.createObjectURL(e.target.files[0]),
            picturefile:e.target.files[0]
        })
            
            
}}
            

             ></input> 
            
            <button ref={props.submitRef} type="submit" style={{ display: 'none' }} />
       </>
        </form>
        {Initialdata.profilepicture &&
        <div>
            
        
        
        <Image
        src={`${Initialdata.profilepicture}`}
        width={100}
        height={100}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />
        </div>
}
        
    </div>
  )
}

export default Personalinfo

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
    <stop offset="5%" stop-color="#2000" />
    <stop offset="95%" stop-color="#500" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#1000" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

