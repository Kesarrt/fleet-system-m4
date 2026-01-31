const supabase = require("../config/supabase");

exports.signup = async(requestAnimationFrame,res)=>{
    try{
        const{name,email,password,role}=requestAnimationFrame.body;

        if(!["customer","owner","driver"].includes(role)){
            return res.status(400).json({message:"Invalid role"});
        }

        const{data,error}= await supabase
        .from("users")
        .insert([{name,email,password,role}])
        .select();

        if (error){
            return res.status(400).json({error:error.message});
        }
        res.status(201).json({
            message:"User created sucessfully",
            data
        });
    } catch (err){
        res.status(500).json({error:err.message});
    }
};