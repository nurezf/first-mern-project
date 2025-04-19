import Product from "../models/product.model.js";
import mongoose from "mongoose";



export const getProducts= async (req,res)=>{
    try{
     const products=await Product.find();
     res.status(200).json({success:true,data:products})
    }catch(error){
     res.status(500).json({success:false,message:"error creating product"});
     console.error("error in creating product",error.message)
    }
 };


 export const createProduct=async (req,res)=>{
    const product=req.body;
    
    if(!product.name || !product.price || !product.image ){
        return res.status(400).json({success:false,message:"please provide all fields"});
    }
    
    const newProduct= new Product(product);
    
    try{
        await newProduct.save();
        res.status(201).json({success:true,message:"product created successfully"});
    }catch (error){
        res.status(500).json({success:false,message:"error creating product"});
        console.error("error in creating product",error.message)
    }
    
    }

    export const updateProduct=async (req,res)=>{
        const {id}=req.params;
    
        const product=req.body;
    
        if(!mongoose.Types.ObjectId.isValid(id)){
          return  res.status(404).json({sucess:false,message:"invalid product id"});
        }
    
        try{
           const updateProduct= await Product.findByIdAndUpdate(id,product,{new:true});
           res.status(200).json({success:true,data:updateProduct})
        }catch(error){
            res.status(500).json({success:false,message:"error updating product"});
        }
    }

         export const deleteProdect=async (req,res)=>{
            const {id}=req.params;
        
            try{
                await Product.findByIdAndDelete(id);
                  res.status(200).json({success:true,message:'product deleted'})
            }catch(error){
                 res.status(500).json({success:false,message:'server erroer'})
            }
        }