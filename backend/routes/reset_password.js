router.put("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password)
      return res.status(400).json({ error: "Token e nova senha são obrigatórios." });

    // verifica token
    const [rows] = await db.query(
      "SELECT * FROM password_resets WHERE token = ?",
      [token]
    );

    if (rows.length === 0)
      return res.status(400).json({ error: "Token inválido." });

    const reset = rows[0];

    if (new Date(reset.expires_at) < new Date())
      return res.status(400).json({ error: "Token expirado. Solicite novamente." });

    // criptografar senha
    const hashed = bcrypt.hashSync(password, 10);

    // atualizar senha
    await db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashed, reset.user_id]
    );

    // apagar token
    await db.query("DELETE FROM password_resets WHERE token = ?", [token]);

    return res.json({ message: "Senha alterada com sucesso!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});
