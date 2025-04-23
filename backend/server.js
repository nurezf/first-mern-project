import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT;

app.use("/api/products", productRoutes);

app.listen(port, () => {
  connectDB();
  console.log("server statrte at port " + port);
});

//
