import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0';
import{getObjectSignedUrl} from "../../../lib/s3"
import { useRouter } from 'next/router'
// pages/index.tsx
import {prisma} from "../../../lib/prisma"

type Data = {
    name: string
    propic:string
  }

export default async function getfeed(
    req: NextApiRequest,
    res: NextApiResponse<Data>){
        const session = getSession(req, res);
   //make sure only logged in user can see their own data
   /*
        if(session?.user.sub==req.query.user){
          console.log(session)
            const data=await prisma.user.findUnique(
                {
                    where: {
                      // ... provide filter here
                      id: session?.user.sub,
                    }
                  }
            )

            if(data){
                const imageurl = await getObjectSignedUrl(data.profilepic)
                console.log(imageurl)
                res.status(200).json({ name: JSON.stringify(data) , propic:JSON.stringify(imageurl)})
            }
            else{
               console.log(session)
                const user = await prisma.user.create({
                    data: {
                      id: session?.user.sub,
                      email: session?.user.email,
                      register: false,
                      idverify : false,
                      name: session?.user.name,
                      username: "",
                      profilepic:session?.user.picture,
                      preference:""

                    },
                  })

                  res.status(200).json({
                    name: JSON.stringify(data),
                    propic: ''
                  })

            }
            

        }
        else{
            res.status(404).json({
              name: 'unathorised',
              propic: ''
            })
        }
        
*/
}