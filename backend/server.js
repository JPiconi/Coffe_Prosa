const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Middleware para autenticação JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Token não fornecido.');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Token inválido.');
    req.user = user;
    next();
  });
}

// Rotas para a tabela `users`
// GET: Listar todos os usuários
app.get('/users', authenticateToken, (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// POST: Criar um novo usuário
app.post('/users', (req, res) => {
  const { name, email, password, cpf, birthday } = req.body;
  const query = 'INSERT INTO users (name, email, password, cpf, birthday) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, password, cpf, birthday], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('Usuário criado com sucesso!');
  });
});

// PUT: Atualizar um usuário
app.put('/users/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, email, password, cpf, birthday } = req.body;
  const query = 'UPDATE users SET name = ?, email = ?, password = ?, cpf = ?, birthday = ? WHERE id = ?';
  db.query(query, [name, email, password, cpf, birthday, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Usuário atualizado com sucesso!');
  });
});

// DELETE: Deletar um usuário
app.delete('/users/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Usuário deletado com sucesso!');
  });
});

// Rotas para a tabela `products`
// GET: Listar todos os produtos
app.get('/products', authenticateToken, (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// POST: Criar um novo produto
app.post('/products', authenticateToken, (req, res) => {
  const { name, category, qtde_stock, price_purchase, price_sale } = req.body;
  const query = 'INSERT INTO products (name, category, qtde_stock, price_purchase, price_sale) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, category, qtde_stock, price_purchase, price_sale], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('Produto criado com sucesso!');
  });
});

// PUT: Atualizar um produto
app.put('/products/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, category, qtde_stock, price_purchase, price_sale } = req.body;
  const query = 'UPDATE products SET name = ?, category = ?, qtde_stock = ?, price_purchase = ?, price_sale = ? WHERE id = ?';
  db.query(query, [name, category, qtde_stock, price_purchase, price_sale, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Produto atualizado com sucesso!');
  });
});

// DELETE: Deletar um produto
app.delete('/products/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Produto deletado com sucesso!');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
