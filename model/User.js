const mongoose=require('mongoose');
const {Schema}=mongoose;
const bcrypt=require("bcrypt");

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    telephone:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    type:{
        type:String,
        default: "User"
    },
    birthday:{
        type:String,
        required: true
    }
});

userSchema.pre("save", function(next){
    bcrypt.genSalt(10).then((salt)=>{
        bcrypt.hash(this.password, salt).then((encryptPassword)=>{
            this.password=encryptPassword;
            next();
        }).catch((err)=>console.log(`Error occurred when hashing ${err}`));
    }).catch((err)=>console.log(`Error occurred when salting ${err}`));
});

const userModel=mongoose.model("Users", userSchema);
module.exports=userModel;