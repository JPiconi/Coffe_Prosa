import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, category, qtde_stock, price_purchase, price_sale } = req.body;

    // Validação simples
    if (!name || !category || !qtde_stock || !price_purchase || !price_sale) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Inserção no banco
    await db.query(
      `INSERT INTO products (name, category, qtde_stock, price_purchase, price_sale)
       VALUES (?, ?, ?, ?, ?)`,
      [name, category, qtde_stock, price_purchase, price_sale]
    );

    res.json({ message: "Produto cadastrado com sucesso!" });
  } catch (err) {
    console.error("❌ ERRO AO CADASTRAR PRODUTO:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (_, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    console.error("❌ ERRO AO LISTAR PRODUTOS:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
