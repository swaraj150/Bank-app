const mongoose=require("mongoose");

const CustomerSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    phone:{
        type: Number,
        required: true,
        unique:true
    },
    account:{
        type: Number,
        required: true,
        unique:true
    },
    pin:{
        type: String,
        required: true,
        unique:true
    },
    balance:{
        type: Number,
        required: true
    }
});
module.exports=mongoose.model("customers",CustomerSchema);