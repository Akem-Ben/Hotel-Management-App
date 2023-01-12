import mongoose from 'mongoose'
import { env } from 'process'
export const conncetDB = async()=>{
    try{
        const conn = await mongoose.connect("mongodb://localhost:27017/abn_hotels", async ()=>{
            console.log(`MongoDB connected`)
        })
    }catch(err){
        console.log(err)
    }
}