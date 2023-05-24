import { Router } from "express";

import CartManager from "../items/cartManager.js";

const cartManager = new CartManager();

const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.addCart();
    res.status(201).send(newCart);
  } catch (err) {
    res.status(400).send({ err });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const idFilter = await cartManager.getCartById(parseInt(req.params.cid));
    res.status(201).send(idFilter);
  } catch (err) {
    res.status(400).send({ err });
  }
});


cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const add = await cartManager.addToCart(req.params.cid, req.params.pid);
    res.status(201).send(add);
  } catch (err) {
    res.status(400).send({ err });
  }
});


export { cartsRouter };