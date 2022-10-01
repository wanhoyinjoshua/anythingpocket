
import multer from "multer"
import  bodyParser from'body-parser'
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import crypto from "crypto"

import {uploadFile} from "../../lib/s3"

const randomimagename=(bytes=32)=>{return(crypto.randomBytes(bytes).toString('hex'))}
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})



  .get((req, res) => {
    res.send("Hello world");
  })
  .post(upload.single('image'),async (req, res) => {
    console.log(req)
    const file = req.file?.buffer
    //then now i need to upload to s3 
    const filename = randomimagename()
    //add delete code funtionality then wrap it in try catch if fail then upload 
    const uploadresult= await uploadFile(file, filename, req.file?.mimetype)
    if(uploadresult.$metadata.httpStatusCode==200){
        
        res.json({ filename: filename, status: uploadresult.$metadata.httpStatusCode });

    }
    
  })    
  export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  }

export default handler;