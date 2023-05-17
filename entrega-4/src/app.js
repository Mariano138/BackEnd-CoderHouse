// Importo express
import express from "express";
import { productsRouter } from "./routers/products.router.js";
import { cartsRouter } from "./routers/carts.router.js";

// Creo una app de tipo express
const app = express();

// Creo un server estatico en la carpeta public
app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// marco la ruta de products
app.use("/api/products", productsRouter);

// marco mi ruta de carts
app.use("/api/carts", cartsRouter);

// 8080
app.listen(8080, () => {
  console.log("Listen on 8080");
});