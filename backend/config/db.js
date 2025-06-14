import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URL);
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

///
// {
//     useUnifiedTopology:true,
//     useNewUrlParser:true,
//     useCreateIndex:true
//   }
