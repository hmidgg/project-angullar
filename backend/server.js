const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let products = [
  {
    id: 1,
    name: "Laptop Pro",
    price: 1200,
    description: "A powerful laptop for professionals",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 25,
    description: "Ergonomic wireless mouse",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 75,
    description: "RGB mechanical keyboard",
  },
];

let currentId = 4;

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product)
    return res.status(404).json({
      message: "Product not found",
    });
  res.json(product);
});

app.post("/api/products", (req, res) => {
  const { name, price, description } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({
      message: "Name and price are required",
    });
  }
  const newProduct = {
    id: currentId++,
    name,
    price,
    description: description || "",
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  const { name, price, description } = req.body;
  product.name = name ?? product.name;
  product.price = price ?? product.price;
  product.description = description ?? product.description;
  res.json(product);
});

app.delete("/api/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "Product not found" });
  products.splice(index, 1);
  res.status(204).send(); // No content
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
