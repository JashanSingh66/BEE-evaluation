import mongoose from 'mongoose';
const connectDb = async ()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected");
    }
    catch(error){
        console.log("Error , Not connected db");
        process.exit(1);
    }
}

export default connectDb;