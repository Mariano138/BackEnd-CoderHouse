import { Server } from "socket.io";
import ProductManager from "./services/product.service.js";
import MessageManager from "./services/chat.service.js";

// Creo la instancia ProductManager y ChatManager
const productManager = new ProductManager();
const messageManager = new MessageManager();


export function initSocket(server) {
  const io = new Server(server);

  // Eventos de socket.io
  io.on("connection", async (socket) => {
    console.log("Cliente conectado");
    socket.emit("products", await productManager.getProducts());
    socket.emit("messages", await messageManager.allMessage());

    socket.on("new-product", async (element) => {
      await productManager.addProduct(element);
      io.emit("products", await productManager.getProducts());
    });

    socket.on("message", async (message) => {
      await messageManager.addMessage(message);
      io.emit("messages", await messageManager.allMessage());
    });

    socket.on("sayhello", (data) => {
      socket.broadcast.emit("connected", data);
    });

    socket.on("del-product", async (element) => {
      await productManager.deleteProduct(element.id);
      io.emit("products", await productManager.getProducts());
    });
  });

  return io;
}