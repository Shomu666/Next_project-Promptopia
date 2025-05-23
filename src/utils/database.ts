import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
   mongoose.set("strictQuery", true);

   if(isConnected){
    console.log('MongoDb is already connected')
    return
   }

   try {
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "share_prompt",
       
    })
    isConnected = true;
    console.log("MongoDb connected successfully")
   } catch (error) {
    console.log(error)
   }
}