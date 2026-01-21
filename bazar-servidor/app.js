const express = require("express");
const cors = require("cors");
const products = require("./data/products.json");

const app = express();
app.use(cors());


app.get("/api/items", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";

  const items = products.filter(p =>
    p.title.toLowerCase().includes(q)
  );

  res.json({  
    total: items.length,
    items
  });
});

app.get("/api/items/:id", (req, res) => {
  const item = products.find(p => p.id === req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  res.json(item);
});

app.listen(3001, () => {
  console.log("prueba del backend respodiendo");
});