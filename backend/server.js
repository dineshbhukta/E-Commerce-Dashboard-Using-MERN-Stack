const express = require('express');
const cors = require("cors")
require('./db/config')
const User = require('./db/UserModel')
const Product = require('./db/Product')
const app = express();

const Jwt = require('jsonwebtoken');
const jwtKey = "e-comm";

//middleware
app.use(express.json());
//for cross-origin path block issue
app.use(cors());

//signup ApI
app.post("/register",async (req,res) => {
    //insert data in to mongodb by accessing the User model and the collection of database is in Usermodel
    let user = new User(req.body);
    let result = await user.save();
    //toObject will convert the result to object format
    result = result.toObject();
    delete result.password
    Jwt.sign({result},jwtKey,{expiresIn:"1d"},(err,token) => {
        if(err) {
            res.send({result:"Something Went Wrong...."})
        }
        res.send({result,auth:token});
    })
})

//login API
app.post('/login',async (req,res) => {
    console.log(req.body);
    if(req.body.password && req.body.email)
   {
    let user = await User.findOne(req.body).select("-password");
    if(user) {
        Jwt.sign({user},jwtKey,{expiresIn:"1d"},(err,token) => {
            if(err) {
                res.send({result:"Something Went Wrong , please try after sometime"});
            }
            res.send({user,auth:token});
        })
       
    }else {
        res.send({result:"no user found"});
    }
   }else {
       res.send({result:"No user found"});
   }
})

//Add product API
app.post('/add-product',async (req,res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

//products list API
app.get('/products',async (req,res) => {
    let products = await Product.find();            //it willfind all products from data base
    if(products.length > 0) {
        res.send(products)
    }else {
        res.send({result:"No result found"})
    }
})

//delete product API
app.delete('/product/:id', async (req,res) => {
    const result =await Product.deleteOne({_id:req.params.id})
    res.send(result)
})

//get single product API
app.get('/product/:id',async (req,res) => {
    let result = await Product.findOne({_id:req.params.id})
    if(result) {
        res.send(result)
    }else {
        res.send({result:"No Record Found"});
    }
})

//update product API
app.put('/product/:id', async(req,res) => {
    let result = await Product.updateOne({
        _id:req.params.id
    },{
        $set : req.body
    })
    res.send(result);
})

//search product API
app.get('/search/:key', async(req,res) =>{
    let result = await Product.find({
        "$or" : [
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    })
    res.send(result);
})

app.listen(5000);