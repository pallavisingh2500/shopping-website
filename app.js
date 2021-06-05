if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const seedDB=require('./seed');
const methodOverride=require('method-override');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const favicon = require('serve-favicon')
const LocalStrategy=require('passport-local');
const User=require('./models/user');

// routes
const productRoutes=require('./routes/product');
const authRoutes=require('./routes/auth');
const cartRoutes=require('./routes/cart');
const paymentRoutes=require('./routes/payment');
const userRoutes=require('./routes/user');
const { fstat } = require('fs');

// mongoose.connect('mongodb://localhost:27017/shoppingApp',
mongoose.connect(process.env.DB_URL,
 {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify:false
 })
  .then(()=>{
      console.log("DB Connected");
  })
  .catch((err)=>{
      console.log("Oh no error");
      console.log(err);
  })

//  seedDB();

  
  app.set('view engine', 'ejs');
  app.set('views',path.join(__dirname,'/views'));
  app.use(express.static(path.join(__dirname,'/public')));
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(express.urlencoded({extended:true}));
  app.use(methodOverride('_method'));

   const sessionConfig={
       secret:'weneedsomebettersecret',
       resave:false,
       saveUninitialized:true

   }
//    app.use('/upload-images',upload.array('image'),async(req,res)=>{
//        const uploader=async(path)=> await cloudinary.uploads(path,'Images')
//        if(req.method==='POST'){
//            const urls=[]
//            const files=req.files
//            for(const file of files){
//                const {path}=file
//                const newPath=await uploader(path)
//                urls.push(newPath)
//                fs.unlinkSync(path)
//            }
//            res.status(200).json({
//                message:'Images Uploaded Successfully',
//                data:urls
//            })
//         }else{
//                res.status(405).json({
//                    err:"Images not uploaded successfully"
//                })
//            }
//    })

  app.use(session(sessionConfig));
  app.use(flash());
  // intialising the passport and session for storing the user info
  app.use(passport.initialize());
  app.use(passport.session());
  // configuring the passport to use local strategy
  passport.use(new LocalStrategy(User.authenticate()))
  
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());





  app.use((req,res,next)=>{
      res.locals.success=req.flash('success');
      res.locals.error=req.flash('error');
      res.locals.currentUser=req.user;
      next();
  })
  app.get('/',(req,res)=>{
     res.render('landing'); 
  })
  app.use(productRoutes);
  app.use(authRoutes);
  app.use(cartRoutes);
  app.use(paymentRoutes);
  app.use(userRoutes);
//   app.use(cloudinaryRoutes);



app.listen(process.env.PORT || 3000,()=>{
    console.log("Server running on port 3000");
})