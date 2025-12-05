import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { users_id, products_id, qtde_produto, price_product } = req.body;

    if (!users_id || !products_id || !qtde_produto || !price_product)
      return res.status(400).json({ error: "Campos obrigatórios faltando." });

    const final_price_product = qtde_produto * price_product;

    await db.query(
      `INSERT INTO cart (users_id, products_id, data_venda, qtde_produto, final_price_product, price_product)
       VALUES (?, ?, NOW(), ?, ?, ?)`,
      [users_id, products_id, qtde_produto, final_price_product, price_product]
    );

    res.json({ message: "Produto adicionado ao carrinho!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
