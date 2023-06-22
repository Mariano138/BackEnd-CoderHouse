import { Router } from "express";
import { io } from "../../app.js";


import ProductManager from "../product.service.js";


const productManager = new ProductManager();



const productsRouter = Router();

//ruta para ver productos
productsRouter.get("/", async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    let query = req.query;
    let listProducts = await productManager.getProducts(limit, page, query);
    res.status(201).send(listProducts);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//ruta para ver productos por id
productsRouter.get("/:pid", async (req, res) => {
  try {
    let idFilter = await productManager.getProductById(req.params.pid);
    res.status(201).send(idFilter);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//ruta POST para agregar un nuevo producto
productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    io.sockets.emit("products", await productManager.getProducts());
    res.status(201).send(newProduct);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//ruta PUT para actualizar un producto
productsRouter.put("/:pid", async (req, res) => {
  try {
    const updateProduct = await productManager.updateProduct(
      req.params.pid,
      req.body
    );
    io.sockets.emit("products", await productManager.getProducts());
    res.status(201).send(updateProduct);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//ruta DELETE para eliminar un producto
productsRouter.delete("/:pid", async (req, res) => {
  try {
    const deleteProduct = await productManager.deleteProduct(req.params.pid);
    io.sockets.emit("products", await productManager.getProducts());
    res.status(204).send(deleteProduct);
  } catch (err) {
    res.status(500).send({ err });
  }
});


export { productsRouter };