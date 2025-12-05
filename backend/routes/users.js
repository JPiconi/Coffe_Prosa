import express from "express";
import bcrypt from "bcryptjs";
import { db } from "../db.js";

const router = express.Router();

// Criar usuário
router.post("/register", async (req, res) => {
  console.log("Chegou na rota de registro de usuário", req.body);
  try {
    const { name, email, password, cpf, birthday } = req.body;

    if (!name || !email || !password || !cpf || !birthday)
      return res.status(400).json({ error: "Campos obrigatórios faltando." });

    const [exists] = await db.query("SELECT id FROM users WHERE cpf = ?", [cpf]);
    if (exists.length > 0)
      return res.status(400).json({ error: "CPF já cadastrado." });

    const hashed = bcrypt.hashSync(password, 10);

    await db.query(
      `INSERT INTO users (name, email, password, cpf, birthday)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashed, cpf, birthday]
    );

    res.json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login com registro no histórico
router.post("/login", async (req, res) => {
  console.log("Chegou na rota de login de usuário", req.body);
  try {
    const { email, password } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Usuário não encontrado." });

    const user = rows[0];

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(403).json({ error: "Senha incorreta." });

    await db.query(
      "INSERT INTO login_history (login_date, id_users) VALUES (NOW(), ?)",
      [user.id]
    );

    res.json({ message: "Login bem-sucedido!", userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
