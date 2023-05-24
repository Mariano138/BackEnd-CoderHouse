
import express from "express";
import handlerbars from "express-handlebars";
import { Server } from "socket.io";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { realTimeProducts } from "./routes/realtimeproducts.router.js";
import ProductManager from "./items/productManager.js";

// app
const app = express();

// server estatico de prueba
app.use(express.static("public"));

// parseo de json
app.use(express.json());

// middleware para parsear los datos de la petición
app.use(express.urlencoded({ extended: true }));

// handlebars
app.engine("handlebars", handlerbars.engine());
app.set("views", "views/");
app.set("view engine", "handlebars");

// directorio publico para files statics
app.use(express.static("public"));

// defino mi router de products
app.use("/api/products", productsRouter);

// defino mi router de carts
app.use("/api/carts", cartsRouter);

// defino mi router de realTimeProducts
app.use("/realtimeproducts", realTimeProducts);

// creo la instancia ProductManager
const productManager = new ProductManager();

// webServer
const webServer = app.listen(8080, () => {
  console.log("Listen on 8080");
});

// socket.io
const io = new Server(webServer);

// eventos
io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");
  socket.emit("products", await productManager.getProducts());

  socket.on("new-product", async (eLement) => {
    await productManager.addProduct(eLement);
    io.emit("products", await productManager.getProducts());
  });

  socket.on("del-product", async (eLement) => {
    await productManager.deleteProduct(eLement);
    io.emit("products", await productManager.getProducts());
  });
});