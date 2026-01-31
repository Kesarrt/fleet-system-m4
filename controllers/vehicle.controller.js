const supabase = require("../config/supabase");

exports.addVehicle = async (req, res) => {
  const { owner_id, name, registration_number, allowed_passengers, rate_per_km } = req.body;

  const { data: owner } = await supabase
    .from("users")
    .select("*")
    .eq("id", owner_id)
    .single();

  if (!owner || owner.role !== "owner")
    return res.status(403).json({ message: "Only owners can create vehicles" });

  const { data, error } = await supabase
    .from("vehicles")
    .insert([{ name, registration_number, allowed_passengers, rate_per_km, owner_id }])
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data);
};

exports.assignDriver = async (req, res) => {
  const { vehicleId } = req.params;
  const { driver_id } = req.body;

  const { error } = await supabase
    .from("vehicles")
    .update({ driver_id })
    .eq("id", vehicleId);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Driver assigned" });
};

exports.getVehicle = async (req, res) => {
  const { vehicleId } = req.params;

  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicleId)
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
};
