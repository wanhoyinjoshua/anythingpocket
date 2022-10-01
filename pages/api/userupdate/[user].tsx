import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
// pages/index.tsx
import {prisma} from "../../../lib/prisma"

type Data = {
    name: string
  }

export default async function getuser(
    req: NextApiRequest,
    res: NextApiResponse<Data>){
        const session = getSession(req, res);
   //make sure only logged in user can see their own data
        if(session?.user.sub==req.query.user){
          console.log(JSON.stringify(req.body))
            const updateUser=await prisma.user.update(
                {
                    where: {
                      // ... provide filter here
                      id: session?.user.sub,
                    },
                    data:{
                        username: req.body.username || undefined,
                        profilepic : req.body.profilepicture || undefined,
                        preference: JSON.stringify(req.body.preference) || undefined

                    }
                  }
            )

            if(updateUser){

                res.status(200).json({name:'success'})
            }

           
            

        }
        else{
            res.status(404).json({name:'unathorised'})
        }
        

}