const express = require("express");
const cors = require("cors");
const products = require("./data/products.json");
const PORT = process.env.PORT || 10000;

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});