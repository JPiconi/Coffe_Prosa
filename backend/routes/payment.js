import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { id_effective_product_sale, payment_value, payment_description } = req.body;

    if (!id_effective_product_sale || !payment_value)
      return res.status(400).json({ error: "Campos obrigatórios faltando." });

    await db.query(
      `INSERT INTO payment (payment_value, id_effective_product_sale, payment_description)
       VALUES (?, ?, ?)`,
      [payment_value, id_effective_product_sale, payment_description || null]
    );

    res.json({ message: "Pagamento registrado!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
