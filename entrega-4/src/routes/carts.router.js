import { Router } from "express";

// Importo CartManager
import CartManager from "../cartManager.js";


const cartManager = new CartManager();

const cartsRouter = Router();

// Marco la ruta POST para agregar un nuevo carrito
cartsRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.addCart();
    res.status(201).send(newCart);
  } catch (err) {
    res.status(400).send({ err });
  }
});

// Defino la ruta para los productos dentro de un carrito
cartsRouter.get("/:cid", async (req, res) => {
  try {
    const idFilter = await cartManager.getCartById(parseInt(req.params.cid));
    res.status(201).send(idFilter);
  } catch (err) {
    res.status(400).send({ err });
  }
});

// Defino la ruta POST para agregar un nuevo carrito
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const add = await cartManager.addToCart(req.params.cid, req.params.pid);
    res.status(201).send(add);
  } catch (err) {
    res.status(400).send({ err });
  }
});

// Exporto la ruta
export { cartsRouter };