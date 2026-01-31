const supabase=require("../config/supabase");

exports.createTrip=async (req,res)=>{
    const {"customer_id", "vehicle_id","distance_km","passengers" }=req.body;
     
}