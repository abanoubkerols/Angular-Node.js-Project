import mongoose from 'mongoose'

export const DbConnect = async() => {
   return await mongoose.connect(process.env.dBlink!).then(()=>{
    console.log("dataBase Work");
    
   }).catch((err)=>{
    console.log("Error with DB " , err);
    
   })
}