const express = require("express");
const { getAllDataProduct } = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllDataProduct();

  res.send(products);
});

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

  router.patch("/:id", async (req, res) => {
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

module.exports = router;
