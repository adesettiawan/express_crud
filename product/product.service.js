const prisma = require("../database/index.database");

const getAllDataProduct = async () => {
  const products = await prisma.product.findMany();

  return products;
};

module.exports = {
  getAllDataProduct,
};
