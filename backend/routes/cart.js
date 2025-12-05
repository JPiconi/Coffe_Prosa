import express from "express";
import { db } from "../db.js";

const router = express.Router();

// POST /cart
router.post("/", async (req, res) => {
  try {
    const { users_id, products_id, qtde_produto, price_product } = req.body;

    if (
      users_id === undefined ||
      products_id === undefined ||
      qtde_produto === undefined ||
      price_product === undefined
    ) {
      return res.status(400).json({ error: "Campos obrigatórios faltando." });
    }

    const final_price_product = qtde_produto * price_product;

    await db.query(
      `INSERT INTO cart (users_id, products_id, data_venda, qtde_produto, final_price_product, price_product)
       VALUES (?, ?, NOW(), ?, ?, ?)`,
      [users_id, products_id, qtde_produto, final_price_product, price_product]
    );

    res.json({ message: "Produto adicionado ao carrinho!" });
  } catch (err) {
    console.log("❌ ERRO NO POST /cart:");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /cart/:userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await db.query(
      `SELECT
          c.id,
          c.qtde_produto,
          c.final_price_product,
          c.price_product,
          p.name AS product_name   -- <--- CORREÇÃO AQUI!
       FROM cart c
       JOIN products p ON p.id = c.products_id
       WHERE c.users_id = ?`,
      [userId]
    );

    res.json({ items: rows });
  } catch (err) {
    console.log("❌ ERRO NO GET /cart/:userId:");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /cart/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM cart WHERE id = ?", [id]);

    res.json({ message: "Item removido do carrinho!" });
  } catch (err) {
    console.log("ERRO NO DELETE /cart/:id:");
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
