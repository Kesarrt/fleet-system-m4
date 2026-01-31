const supabase=require("../config/supabase");

exports.analytics=async(req,res)=>{

    const{count:customers}=await supabase.from("users").select("*",{count:"exact",head:true}).eq("role","customer");
    const{count:owner}=await supabase.from("users").select("*",{count:"exact",head:true}).eq("role","owner");

const{count:driver}=await supabase.from("users").select("*",{count:"exact",head:true}).eq("role","driver");

const{count:vehicle}=await supabase.from("vehicles").select("*",{count:"exact",head:true});

const{count:trips}=await supabase.from("trips").select("*",{count:"exact",head:true});

res.json({customers,owners,drivers,vehicles,trips});
};