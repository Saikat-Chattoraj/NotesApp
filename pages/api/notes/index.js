import dbConnect from "../../../utils/dbConnect"
import Note from "../../../models/Note"

dbConnect();

export default async (req,res) => {
   const {method} = req;

   switch (method) {
       case 'GET':
           try {
               const notes = await Note.find({});
               res.status(200).json({ sucess:true , data:notes})

           } catch (error) {
               res.status(400).json({ sucess:false})
           }
           break;
           case 'POST':
               try {
                   const notes = await Note.create(req.body);
                   res.status(201).json({ sucess:true , data:notes})
    
               } catch (error) {
                   res.status(400).json({ sucess:false})
               }
   
       default: res.status(400).json({ sucess:false})
           break;
   }
}