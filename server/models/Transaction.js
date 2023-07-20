const mongoose=require("mongoose");

const TransactionSchema=new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"customers"
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"customers"
    },
   
    amount:{
        type: String,
        required: true
    },
    account:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model("transactions",TransactionSchema);