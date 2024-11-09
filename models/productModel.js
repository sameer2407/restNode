let products = require("../data/product.json");

const { writeDataToFile } = require("../utils");
const uuid = require("uuid");

async function findAll() {
  return products;
}

async function findById(id) {
  return products.find((product) => product.id === id);
}

async function create(product) {
  product = { id: uuid.v4(), ...product };
  products.push(product);
  writeDataToFile("./data/product.json", products);
  return product;
}

async function update(product, id) {
  const index = products.findIndex((p) => p.id === id);
  products[index] = { id, ...product };
  writeDataToFile("./data/product.json", products);
  return products[index];
}

async function deletee(id) {
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    writeDataToFile("./data/product.json", products);
  }
}
module.exports = {
  findAll,
  findById,
  create,
  update,
  deletee,
};
