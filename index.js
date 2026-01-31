const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/users", require("./routes/user.routes"));
app.use("/vehicles", require("./routes/vehicle.routes"));
app.use("/trips", require("./routes/trip.routes"));
app.use("/analytics", require("./routes/analytics.routes"));

const notFound = require("./middlewares/notFound.middleware");
app.use(notFound);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
