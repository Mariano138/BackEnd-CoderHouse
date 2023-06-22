import { Router } from "express";

import CartManager from "../cartManager.js";

const cartManager = new CartManager();

const cartsRouter = Router();

// POST para crear un nuevo carrito
cartsRouter.post("/", async (req, res) => {
  const newCart = req.body;
  try {
    const newCartadd = await cartManager.addCart(newCart);
    res.status(201).send(newCartadd);
  } catch (err) {
    res.status(500).send({ err });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const idFilter = await cartManager.getCartById(req.params.cid);
    res.status(201).send(idFilter);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//POST para agregar un nuevo producto a un carrito
cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  try {
    const addProd = await cartManager.addToCart(req.params.cid, req.params.pid);
    res.status(201).redirect("/products");
  } catch (err) {
    res.status(500).send({ err });
  }
});

//DELETE para borrar un producto
cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const delProd = await cartManager.delProductToCart(
      req.params.cid,
      req.params.pid
    );
    res.status(201).send(delProd);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// PUT para agregar un array
cartsRouter.put("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const data = req.body;
    const massiveAdd = await cartManager.massiveAddToCart(cid, data);
    res.status(201).send(massiveAdd);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// PUT para actualizar la cantidad
cartsRouter.put("/:cid/products/:pid", async (req, res) => {
  try {
    const update = await cartManager.updateProductToCart(
      req.params.cid,
      req.params.pid,
      req.body
    );
    res.status(201).send(update);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// DELETE para vaciar el carrito
cartsRouter.delete("/:cid", async (req, res) => {
  try {
    const empty = await cartManager.emptyCart(req.params.cid);
    res.status(201).send(empty);
  } catch (err) {
    res.status(500).send({ err });
  }
});


export { cartsRouter };