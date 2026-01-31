const express = require("express");
const router = express.Router();
const { createTrip, endTrip } = require("../controllers/trip.controller");

router.post("/create", createTrip);
router.patch("/end/:tripId", endTrip);

module.exports = router;
