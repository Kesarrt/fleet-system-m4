const express = require("express");
const router = express.Router();
const { addVehicle, assignDriver, getVehicle } = require("../controllers/vehicle.controller");

router.post("/add", addVehicle);
router.patch("/assign-driver/:vehicleId", assignDriver);
router.get("/:vehicleId", getVehicle);

module.exports = router;
