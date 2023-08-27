const dotenv = require("dotenv");
const express = require("express");
const router = require("../product/product.controller");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/products", router);

app.listen(PORT, () => {
  console.log(`Server started on port: ` + PORT);
});
