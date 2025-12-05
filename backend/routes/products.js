import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Criar produto
router.post("/", async (req, res) => {
  try {
    const { name, category, qtde_stock, price_purchase, price_sale } = req.body;

    if (!name || !category || !qtde_stock || !price_purchase || !price_sale)
      return res.status(400).json({ error: "Campos obrigatórios faltando." });

    await db.query(
      `INSERT INTO products (name, category, qtde_stock, price_purchase, price_sale)
       VALUES (?, ?, ?, ?, ?)`,
      [name, category, qtde_stock, price_purchase, price_sale]
    );

    res.json({ message: "Produto cadastrado!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar produtos
router.get("/", async (_, res) => {
  const [rows] = await db.query("SELECT * FROM products");
  res.json(rows);
});

export default router;
