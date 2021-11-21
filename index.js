const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("morgan");
const routes = require("./src/routes");
const port = process.env.PORT || 7000;

dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Transtura Assessment");
});

app.use("/api/", routes);

app.use((err, req, res, next) => {
  const status = err.status;

  console.log(err);

  if (status === 500) {
    return res.status(status).json({
      error: true,
      message: "Internal Server Error",
    });
  }
  return res.status(status).json({
    error: true,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});