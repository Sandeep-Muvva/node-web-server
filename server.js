const express=require('express');
const hbs=require('hbs');//
const fs=require('fs');

const port=process.env.PORT || 3000;
var app=express();
//partial is a piece of website that we build
hbs.registerPartials(__dirname+'/views/partials');
//where we take partials from
app.set('view engine','hbs');

app.use((req,res,next)=>{//middleware
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log("unable to append to server.log");
    }
  });
  next();
});


// app.use((req,res,next)=>{
//   res.render('maintanence.hbs');
// });
app.use(express.static(__dirname+'/public'));
// __dirname gives the path to the root of my project


//helper is a function that helps in rendering our page
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{ //handlers
  //  res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to my website'
  })
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{// data to send to template
    pageTitle:'About Page'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to handle request'
  })
});

app.listen(port,()=>{
  console.log(`server is up on port ${port}`);
});
