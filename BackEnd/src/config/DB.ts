

import mongoose from 'mongoose'

 const DbConnect = async() => {
   return await mongoose.connect(process.env.URIDB!).then(()=>{
    console.log("dataBase Work");
    
   }).catch((err)=>{
    console.log("Error with DB " , err);
    
   })
}


export default DbConnect
