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
