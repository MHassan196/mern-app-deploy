const fs = require('fs');
const model = require('../model/product');
const Product = model.Product;


exports.createProduct = (req,res)=>{
    const product = new Product(req.body);
    product.save()
    .then(savedProduct => {
        res.status(201).json(savedProduct);
    })
    .catch(err => {
        res.status(400).json(err);
    });
}

exports.readAllProducts = async (req,res)=>{
    const products = await Product.find()
    res.json(products)
}

exports.readProduct = async (req,res)=>{
    // console.log(req.params.id)
    const id = req.params.id
    const product = await Product.findById(id)
    res.json(product)
}

exports.replaceProduct = async (req,res)=>{
    // console.log(req.params.id)
    const id = req.params.id
    try{
        const doc = await Product.findOneAndReplace({_id:id}, req.body, {new:true})
        res.status(201).json(doc)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
    
   
}

exports.updateProduct =async (req,res)=>{
    // console.log(req.params.id)
    const id = req.params.id
    try{
        const doc = await Product.findOneAndUpdate({_id:id}, req.body, {new:true})
        res.status(201).json(doc)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

exports.deleteProduct = async (req,res)=>{
    // console.log(req.params.id)
    const id = req.params.id
    try{
        const doc = await Product.findOneAndDelete({_id:id})
        res.status(201).json(doc)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}