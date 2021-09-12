 require('dotenv').config();
const mongoose=require('mongoose');
const encrypt=require('mongoose-encryption');



const UserSchema=new mongoose.Schema(
  {  
     email:{
        type:String,
        required:true
       },
       password:{
           type:String,
           required:true
       }
       

     }
)
  const secret=process.env.SECRET;

UserSchema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});


const User=mongoose.model('User',UserSchema);
module.exports=User;