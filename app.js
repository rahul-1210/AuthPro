require('dotenv').config();

const express=require('express')
const ejs=require('ejs');
const path=require('path');
const mongoose=require('mongoose');
const User=require('./user');




const app=express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/Auth0', 
{

    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(()=>{
    console.log("Db connected")
}).catch(err=>{
    console.log(err);
})



app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.get('/login',(req,res)=>{
    res.render('login')
})


app.post('/register',(req,res)=>{
    const newUser=new User({
        email:req.body.username,
        password:req.body.password
    }

    )

    newUser.save(function(err){
        if(err)
          console.log(err);
        else 
          res.render("secrets")
    })
})

app.post("/login",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
 User.findOne({email:username},function(err,data){
     if(err)
     {
         console.log(err);
     }else{
         if(data){
             if(data.password===password){
                 res.render("secrets");
             }
         }
     }
 }) 


})


app.listen(3000,(req,res)=>{
    console.log("server running at port 3000")
})
