const cors = require("cors")
module.exports = (app) => {
  app.use(cors());  // This makes sure app is passed from app.js
};