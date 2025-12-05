import express from "express";
import cors from "cors";

import usersRoute from "./routes/users.js";
import productsRoute from "./routes/products.js";
import cartRoute from "./routes/cart.js";
import salesRoute from "./routes/sales.js";
import paymentRoute from "./routes/payment.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/cart", cartRoute);
app.use("/sales", salesRoute);
app.use("/payment", paymentRoute);

app.listen(8000, () => console.log("API rodando na porta 8000"));
