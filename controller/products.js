const fs = require('fs');
const model = require('../model/product');
const Product = model.Product;
const ejs = require('ejs');
const path = require('path');


//views
exports.readAllProductsSSR = async (req,res)=>{
    const products = await Product.find()
    ejs.renderFile(path.resolve(__dirname,'../pages/index.ejs'), {products:products}, function(err, str){
        res.send(str)
    })
    
}
exports.getAddForm = async (req,res)=>{
    ejs.renderFile(path.resolve(__dirname,'../pages/add.ejs'), function(err, str){
        res.send(str)
    })
    
}

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