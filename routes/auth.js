const express=require('express');
const router=express.Router();
const User=require('../models/user');
const passport=require('passport');
const multer=require('multer');


// router.get('/fakeUser',async(req,res)=>{
//   const user=new User({email:'pallavi@gmail.com',username:'pallavi'});
//   const newUser=await User.register(user,'pallavi12')
//   res.send(newUser);
// })
// get the signup form
router.get('/register',async(req,res)=>{
  res.render('auth/signup');
})
 router.post('/register',async(req,res)=>{
   try{
    const user =new User({username:req.body.username, email:req.body.email});
    const newUser= await User.register(user,req.body.password);
    req.flash('success','Registered Successfully');
    res.redirect('/products');
   }
   catch(e){
     req.flash('error',e.message);
     res.redirect('/register');
   }
   
 })
// get the login form
 router.get('/login',async(req,res)=>{
   res.render('auth/login');
 })
 router.post('/login',
    passport.authenticate('local',
    {
      
      failureRedirect:'/login',
      failureFlash:true 
    }
    
 ),(req,res)=>{
   req.flash(`success','Welcome Back!! ${req.user.username}`);
   console.log(req.user);
   res.redirect('/products');
 });

 //Logout the user from the current session
 router.get('/logout',(req,res)=>{
   req.logout();
   req.flash('success','Logged out Successfully');
   res.redirect('/login');
 })

module.exports=router;