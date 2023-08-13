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

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;

  const products = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!products) {
    return res.status(400).send({ message: "Product not found!" });
  }

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
    data: products,
    message: "Create new product success",
  });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;
  await prisma.product.delete({
    where: {
      id: parseInt(productId),
    },
  });

  res.status(200).send({
    message: "product delete success",
  });
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.name &&
      productData.price &&
      productData.description &&
      productData.image
    )
  ) {
    res.send("some field missing");
    return;
  }

  const products = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.name,
    },
  });

  res.status(201).send({
    data: products,
    message: "update product success",
  });

  app.patch("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    const products = await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        name: productData.name,
        price: productData.price,
        description: productData.description,
        image: productData.name,
      },
    });

    res.status(201).send({
      data: products,
      message: "update product success",
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port: ` + PORT);
});
