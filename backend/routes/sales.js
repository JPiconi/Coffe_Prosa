import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { users_id, products_id, qtde_produto, price_product } = req.body;

    if (!users_id || !products_id || !qtde_produto || !price_product)
      return res.status(400).json({ error: "Campos obrigatórios faltando." });

    const final_price_product = qtde_produto * price_product;

    const [result] = await db.query(
      `INSERT INTO effective_product_sale
       (users_id, products_id, data_venda, qtde_produto, final_price_product, price_product)
       VALUES (?, ?, NOW(), ?, ?, ?)`,
      [users_id, products_id, qtde_produto, final_price_product, price_product]
    );

    res.json({ message: "Venda registrada!", saleId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
