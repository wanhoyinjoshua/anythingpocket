import React,{useState,useEffect} from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios'
interface Personalinfo{
    
    onChange:any;
   
   }
interface infostate{
   
    preference1?:Boolean |undefined;
    preference2?:Boolean |undefined;
    preference3?:Boolean |undefined;
    preference4?:Boolean |undefined;
    preference5?:Boolean |undefined;
    preference6?:Boolean |undefined;
    preference7?:Boolean |undefined;
    preference8?:Boolean |undefined;
    preference9?:Boolean |undefined;
    preference10?:Boolean |undefined;


   

}
const Preferences = (props:Personalinfo) => {
    const nn = {    
        preference1:false,
        preference2:false,
        preference3:false,
        preference4:false,
        preference5:false,
        preference6:false,
        preference7:false,
        preference8:false,
        preference9:false,
        preference10:false}
    const [preference,setPreference]= useState<infostate>(nn)
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        // 👇️ prevent page refresh
        event.preventDefault()
        console.log("preference")
        //check for the form to select at least three fields
        function checkform(state:any){
            var counter =0;
           const array= Object.values(state)
           for (let i = 0; i < array.length; i++) {
            if(counter>=5){
                return true 
            }
            else{
                if(array[i]==true){
                    counter+=1

                }
           

            }
            
          }

          return false

            
        }
        
     if(checkform(preference)!=true){
        console.log("please select more")
        props.onChange("false");
     }

   
            
            if(user && checkform(preference)){
                props.onChange("true");
               
                await fetch(`/api/userupdate/${user.sub}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                   
                    body: JSON.stringify({preference:preference})
                  })
                  
                  
            }

           
            
            
            
    
            
            
        
            

        
        
        //connect to external image store first
        //and wait for the result of the image--> and then put the image into userupate
       
        
    
        
      };
    const { user } = useUser();

    useEffect(()=>{
        console.log("uisereffect")
    
        if(user){
            fetch(`/api/getuser/${user.sub}`)
            .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
        .then(function(data1){
            console.log(JSON.stringify(JSON.parse(data1.name).preference))
            if(JSON.stringify(JSON.parse(data1.name).preference)==`""`){
                console.log("yaay")

            }
            else{
                setPreference(JSON.parse(JSON.parse(data1.name).preference))

            }
            
        } )
       

        }
       

       


    },[])
  return (
    <>
    {console.log(preference)}
    <form onSubmit={handleSubmit}>
    Preferences
    <input>
    </input>
    <div style={preference.preference1==true?{ backgroundColor:'green' } : {backgroundColor:'white' }}onClick={()=>{setPreference({...preference, preference1:!preference?.preference1 })}}>wood</div>
    <div style={preference.preference2==true?{ backgroundColor:'green' } : {backgroundColor:'white' }}onClick={()=>{setPreference({...preference, preference2:!preference?.preference2 })}}>furniture</div>
    <div style={preference.preference3==true?{ backgroundColor:'green' } : {backgroundColor:'white' }}onClick={()=>{setPreference({...preference, preference3:!preference?.preference3 })}}>wood</div>
    <div style={preference.preference4==true?{ backgroundColor:'green' } : {backgroundColor:'white' }}onClick={()=>{setPreference({...preference, preference4:!preference?.preference4 })}}>furniture</div>
    <div style={preference.preference5==true?{ backgroundColor:'green' } : {backgroundColor:'white' }}onClick={()=>{setPreference({...preference, preference5:!preference?.preference5 })}}>wood</div>
    <div style={preference.preference6==true?{ backgroundColor:'green' } : {backgroundColor:'white' }}onClick={()=>{setPreference({...preference, preference6:!preference?.preference6 })}}>furniture</div>
    <div style={preference.preference7==true?{ backgroundColor:'green' } : {backgroundColor:'white' }}onClick={()=>{setPreference({...preference, preference7:!preference?.preference7 })}}>wood</div>
    <div style={preference.preference8==true?{ backgroundColor:'green' } : {backgroundColor:'white' }}onClick={()=>{setPreference({...preference, preference8:!preference?.preference8 })}}>furniture</div>
    <div style={preference.preference9==true?{ backgroundColor:'green' } : {backgroundColor:'white' }}onClick={()=>{setPreference({...preference, preference9:!preference?.preference9 })}}>wood</div>
    <div style={preference.preference10==true?{ backgroundColor:'green' } : {backgroundColor:'white' }}onClick={()=>{setPreference({...preference, preference10:!preference?.preference10 })}}>furniture</div>
    
    <button  onClick={handleSubmit}  >Submit form </button>
</form>
</>
  )
}

export default Preferences