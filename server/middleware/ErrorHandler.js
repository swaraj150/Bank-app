const User=require("../models/Customer");

const ErrorHandler=async (req,res,next)=>{
    console.log("Middleware Error handling")
    const {amount}=req.body;
    let sender1=await User.findById(req.user.id);
    let amount2=parseInt(amount);
    try {
        if(amount2>sender1.balance){
            throw Error("Not enough balance in account")
        }
        else{
            next();
        }
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message,
            stack:process.env.NODE_Env === "development"?err.stack:{}
        })
    }   
}
module.exports=ErrorHandler;