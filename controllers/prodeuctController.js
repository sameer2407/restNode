const Product = require("../models/productModel");

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(products));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(Number(id));
    if (!product) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ message: "Product not found" }));
      res.end();
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(product));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}
async function createProduct(req, res) {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const parsedBody = JSON.parse(body);

      const newProduct = await Product.create(parsedBody);

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(newProduct));
      res.end();
    });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ message: "Server Error" }));
    res.end();
  }
}

async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(Number(id));
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        try {
          const parsedBody = JSON.parse(body);
          const updatedProduct = await Product.update(parsedBody, Number(id));
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.write(JSON.stringify(updatedProduct));
          res.end();
        } catch (error) {
          if (error.name === "SyntaxError") {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({ message: "Invalid JSON" }));
            res.end();
          } else {
            console.error(error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({ message: "Server error" }));
            res.end();
          }
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(Number(id));
    if (!product) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ message: "Product not found" }));
      res.end();
    } else {
      await Product.deletee(Number(id));
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ message: "Product deleted successfully" }));
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ message: "Server error" }));
    res.end();
  }
}
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
