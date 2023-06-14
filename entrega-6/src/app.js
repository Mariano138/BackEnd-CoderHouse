
import express from "express";
import handlerbars from "express-handlebars";
import mongoose from "mongoose";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { realTimeProducts } from "./routes/realtimeproducts.router.js";
import { chatRouter } from "./routes/chat.router.js";
import { initSocket } from "./socket.js";


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

app.use("/chat", chatRouter);

//mongosee

mongoose.connect(
  
);

// Arranco mi webServer en el port 8080
const webServer = app.listen(8080, () => {
  console.log("Listen on 8080");
});

// Inicialización de socket.io
const io = initSocket(webServer);

export { io };