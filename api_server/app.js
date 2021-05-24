const express = require("express");

const tournamentRoutes = require("./api/routes/tournaments");
const userRoutes = require("./api/routes/users");
const divisionRoutes = require("./api/routes/divisions");
const gameRoutes = require("./api/routes/games");
const locationRoutes = require("./api/routes/locations");
const playerRoutes = require("./api/routes/players");
const teamRoutes = require("./api/routes/teams");
const predictRoutes = require("./api/routes/predict");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/tournaments", tournamentRoutes);
app.use("/users", userRoutes);
app.use("/divisions", divisionRoutes);
app.use("/games", gameRoutes);
app.use("/locations", locationRoutes);
app.use("/players", playerRoutes);
app.use("/teams", teamRoutes);
app.use("/predict", predictRoutes);

app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.state = error.status || 500;
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
