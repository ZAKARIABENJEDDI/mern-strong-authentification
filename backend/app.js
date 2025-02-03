const express = require("express");
const mongoose = require("mongoose");
const bodyPasrser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.mongoURI;

const app = express();

// Configuration CORS pour permettre au frontend d'accéder à l'API
const corsOptions = {
  origin: "http://localhost:5174", // or 5173 sa depend vite
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};
app.use(cors(corsOptions)); // Utilisation de CORS avec cette configuration

app.use(express.json());
app.use("", require("./routes/routes"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
