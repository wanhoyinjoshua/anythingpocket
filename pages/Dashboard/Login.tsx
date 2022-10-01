import React, { useState ,useEffect} from 'react'
import PersonalisedFeed from '../../components/PersonalisedFeed';
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { json } from 'stream/consumers';
import SignUpParent from '../../components/SignUpForm/SignUpParent';
import Link from "next/link"
import Router from 'next/router'
interface Signup{
  username: any;
  profilepicture: any;
  preference:any;
  profilepic:any;
}

const Login = () => {
  const { user } = useUser();
  const [data, setData] = useState<Signup>()
  const[profilepic,setProfilepic]=useState("")
  const[username,setUsername]=useState("")
  const[preference,setPreference]=useState("")
  useEffect(() => {

    if(user){
      if(user.email_verified==true){
        fetch(`/api/getuser/${user.sub}`)
        .then(response => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
    .then(data1 => setData(JSON.parse(data1.name)))

      }
      else{
        //redirect to please verify email page 
        Router.push('/email-verficiation-required')

      }
        
        
  
    }else{

    }
        
},[])
if (data &&(JSON.stringify(data.preference)==`""` || JSON.stringify(data.username)==`""`)){
  return(
    <>
    {JSON.stringify(data)}
    
    
      <div>
       
        <div>registration flow begins</div>
        
        <SignUpParent username={data.username} profilepicture={data.profilepic} preferences={data.preference}></SignUpParent>
      </div>
    
    <Link href="/api/auth/logout">Logout</Link>
    
    </>
  )
}
  else{
    return(
      <>
      <Link href={"/user/createpost"}>Create listing</Link>
      <Link href={"/user/preference"}>Edit Preference</Link>
      <Link href={"/user/info"}>Edit user info</Link>
      <Link href={"/user/authenticate"}>authenticate</Link>

      <PersonalisedFeed></PersonalisedFeed>
      </>
    )
  }
}

export default withPageAuthRequired(Login)