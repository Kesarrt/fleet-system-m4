const supabase = require("../config/supabase");

exports.createTrip = async (req, res) => {
  try {
    const { customer_id, vehicle_id, distance_km, passengers } = req.body;

    const { data: vehicle } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", vehicle_id)
      .single();

    if (!vehicle || vehicle.isavailable === false)
      return res.status(400).json({ message: "Vehicle not available" });

    if (passengers > vehicle.allowed_passengers)
      return res.status(400).json({ message: "Passenger limit exceeded" });

    const { data, error } = await supabase
      .from("trips")
      .insert([{ customer_id, vehicle_id, distance_km, passengers }])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    await supabase
      .from("vehicles")
      .update({ isavailable: false })
      .eq("id", vehicle_id);

    res.status(201).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.endTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const { data: trip } = await supabase
      .from("trips")
      .select("*")
      .eq("id", tripId)
      .single();

    const { data: vehicle } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", trip.vehicle_id)
      .single();

    const cost = trip.distance_km * vehicle.rate_per_km;

    await supabase
      .from("trips")
      .update({ iscompleted: true, tripcost: cost })
      .eq("id", tripId);

    await supabase
      .from("vehicles")
      .update({ isavailable: true })
      .eq("id", vehicle.id);

    res.json({ cost });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
