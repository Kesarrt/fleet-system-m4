const supabase = require("../config/supabase");

exports.createTrip = async (req, res) => {
  try {
    const { customer_id, vehicle_id, distance_km, passengers, location, start_date, end_date } = req.body;

    // Check customer role
    const { data: customer } = await supabase
      .from("users")
      .select("*")
      .eq("id", customer_id)
      .single();

    if (!customer || customer.role !== "customer") {
      return res.status(403).json({ message: "Only customers can create trips" });
    }

    // Get vehicle
    const { data: vehicle } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", vehicle_id)
      .single();

    if (!vehicle || vehicle.isavailable === false) {
      return res.status(400).json({ message: "Vehicle not available" });
    }

    if (passengers > vehicle.allowed_passengers) {
      return res.status(400).json({ message: "Passenger limit exceeded" });
    }

    const { data, error } = await supabase
      .from("trips")
      .insert([{
        customer_id,
        vehicle_id,
        distance_km,
        passengers,
        location,
        start_date,
        end_date
      }])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    // Make vehicle unavailable
    await supabase
      .from("vehicles")
      .update({ isavailable: false })
      .eq("id", vehicle_id);

    res.status(201).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};