const supabase = require("../config/supabase");

exports.addVehicle = async(req.res) 
 {
    try{
        const{owner_id,name,registration_number,allowed_passengers,rate_per_km}=requestAnimationFrame.body;

        const{data:owner,error:ownerError}=await
        supabase
        .from("users")
        .select("*")
        .eq("id",owner_id)
        .single();

        if(ownerError || !owner || owner.role !== "owner" ){
            return res.status(403).json({message:"Only owners can create vehicles"});
        }

        const{data,error}=await supabase
        .from("vehicles")
        .insert([{
            name,
            registration_number,
            allowed_passengers,
            rate_per_km,
            owner_id
        }])
        .select();

        if (error)return res.status(400).json({error:error.message});

        res.status(201).json(data);
    } catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.assignDriver=async(req,res)=>{
    try{
        const{vehicleId}=req.params;
        const{driver_id}=req.body;

        const {data:driver}=await supabase
        .from("users")
        .select("*")
        .eq("id",driver_id)
        .single();

        if(!driver || driver.role !== "driver"){
            return res.status(400).json({message:"Invalid driver"});
        }
        const{error}=await supabase
        .from("vehicle")
        .update({driver_id})
        .eq("id",vehicleId);

        if (error) return res.status(400).json({error:error.message});
        res.json({message:"Driver assigned"}

        );
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

exports.getVehicle=async(req,res)=>{
    const{vehicle}=req.params;

    const{data,error}=await supabase
    .from("vehicle")
    .select("*")
    .eq("id",vehicleId)
    .single();

    if (error)return res.status(400).json({error:error.message});

    res.json(data);
};