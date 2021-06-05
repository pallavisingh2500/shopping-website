const express=require('express');
const router=express.Router();
const Product=require('../models/product');
const Review=require('../models/review');
const {isLoggedIn}=require('../middleware');

router.get('/products',async(req,res)=>{
    try{
        const products =await Product.find({});
        res.render('products/index',{products});
    }
    catch(e){
       console.log("Something went wrong");
       req.flash('error','Cannot find products');
       res.render('error');
    }
  
})

// get the form for new product
router.get('/products/new',isLoggedIn,(req,res)=>{

    res.render('products/new');
})

// create new product
router.post('/products',isLoggedIn,async(req,res)=>{
    // console.log(req.body.product);
    try{
        

        await Product.create(req.body.product);
        req.flash('success','Product Created Successfully');
        res.redirect('/products');
    }catch(e){
        console.log(e.message);
       req.flash('error','Cannot create products, Something is wrong');
       res.render('error');
    }
   
});

//show particular product
router.get('/products/:id',async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id).populate('reviews');
        // console.log(product);
        res.render('products/show',{product});
    }catch(e){
        console.log(e.message);
    //    req.flash('error','Cannot find products, Something is wrong');
    //    res.render('error');
         req.flash('error','cannot find this product');
         res.redirect('/error');
    }
   
})

// get the edit form
router.get('/products/:id/edit',async(req,res)=>{
    const product=await Product.findById(req.params.id);
    res.render('products/edit',{product});
})

//update the particular product
router.patch('/products/:id',isLoggedIn,async(req,res)=>{
 await Product.findByIdAndUpdate(req.params.id, req.body.product);
 req.flash('success','Updated successfully');
 res.redirect( `/products/${req.params.id}`)
})

// delete a particular product
router.delete('/products/:id',isLoggedIn,async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
})


// creating a new comment on a Product

router.post('/products/:id/review',isLoggedIn, async(req,res)=>{
    // res.send("you hit the comment");
    // console.log(req.body);
    try{
        const product=await Product.findById(req.params.id);
        const review=new Review({
            user:req.user.username,
            ...req.body
        });
        product.reviews.push(review);
        await review.save();
        await product.save();
        req.flash('success','Successfully added your review!')
        res.redirect(`/products/${req.params.id}`);
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Cannot create products, Something is wrong');
        res.render('error');
    }
    
})

router.get('/error',(req,res)=>{
    res.status(500).render('error');
})
module.exports=router;