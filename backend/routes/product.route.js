import express from "express";

import { getProducts ,createProduct,updateProduct,deleteProdect} from "../controllers/product.controller.js";

const router=express.Router();

router.get("/", getProducts)


router.post("/",createProduct)

router.put("/:id",updateProduct)

router.delete("/:id",deleteProdect)

export default router;