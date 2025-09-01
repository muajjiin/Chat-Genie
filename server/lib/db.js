import mongoose from "mongoose";

// Gunction to connect to the database
export const connectDB = async()=>{
    try {
mongoose.connection.on('connected',()=> console.log('MongoDB connected '))
        
       await mongoose.connect(`${process.env.MONGODE_URI}/chat-genie`) 
    } catch (error) {
        console.log(error);
    }
}