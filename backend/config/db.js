import mongoose from "mongoose"

export const connectDB = async ()=>{
    try {

      const conn= await mongoose.connect(ProcessingInstruction.env.MONGO_URL );
      console.log(`mongoDB Connected: ${conn.connection.host}`);

    }catch(error){
console.error(`Error: ${error.message}`)
process.exit(1);
    }
}

///
// {
//     useUnifiedTopology:true,
//     useNewUrlParser:true,
//     useCreateIndex:true
//   }