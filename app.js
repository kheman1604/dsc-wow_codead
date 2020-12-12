var express=require('express');
var app=express();
var path=require('path');
var bodyparser=require('body-parser');
var mongoose=require('mongoose');
var passport=require('passport');
var LocalStrategy=require('passport-local');
var User=require('./models/user');
var Job=require('./models/job.js');
var Applicant=require('./models/applicant.js');
var nodemailer = require('nodemailer');
var sms=require('fast-two-sms');
const { Console } = require('console');
require('dotenv').config();
var zipcodes = require('zipcodes-nearby');
var npass=process.env.NODEMAILER_PASS;
var uri=process.env.MONGODB_URI;
var ss=process.env.EXPRESS_KEY;


var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'rozgaar833@gmail.com',
	  pass: npass
	}
  });
  mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => 
  console.log("Database is connected!"))
  
  .catch((err) => console.error(err))
  
  app.use(express.static(path.join(__dirname, '/public')));
  //passport config
  app.use(require("express-session")({
      secret:ss,
      resave:false,
      saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()) );
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  
  app.use(bodyparser.urlencoded({extended:true}));
  var port=process.env.PORT || 3500;
  app.listen(port,process.env.IP,function(){
      console.log("server started.");
  });
  
  app.get("/",function(req,res){
      res.render("index.ejs",{currentUser:req.user});
  });
  app.get("/search",function(req,res){
      Job.find({},function(err,alljobs){
          if(err)
              console.log(err);
          else
              res.render("search.ejs",{jobs:alljobs,currentUser:req.user});
      });
     
  });
  app.get('/register',function(req,res){
      res.render("register.ejs",{currentUser:req.user});
  });
  app.get('/dash',function(req,res){
      Job.find({userid:req.user._id},function(err,jobs){
          if(err)
          console.log(err)
          else
          {
              res.render("dash.ejs",{currentUser:req.user,jobs:jobs});
          }
          
  
      })
      
  });
  
  app.get('/delete',function(req,res){
      Job.find({userid:req.user._id},function(err,jobs){
          if(err)
          console.log(err)
          else
          {
              res.render("delete.ejs",{currentUser:req.user,jobs:jobs});
          }
          
  
      })
  });
  
  app.get('/dash/:id/deleted',function(req,res){
          Job.remove({_id:req.params.id},function(err,result){
              res.render('deleted.ejs',{currentUser:req.user});
          });
          
      });
  
  