const dotenv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello world");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();

  res.send(products);
});

app.post("/products", async (req, res) => {
  const product = req.body;

  const products = await prisma.product.create({
    data: {
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    },
  });

  res.status(201).send({
    data: product,
    message: "Create new product success",
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port: ` + PORT);
});
