import { Router } from "express";
import ProductManager from "../product.service.js";
import CartManager from "../cart.services.js";

const productManager = new ProductManager();

const cartManager = new CartManager();

const viewsRouter = Router();

viewsRouter.get("/products", async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    let query = req.query;
    const listProducts = await productManager.getProductsforView(
      limit,
      page,
      query
    );
    res.status(201).render("home", listProducts);
  } catch (err) {
    res.status(500).send({ err });
  }
});

viewsRouter.get("/products/:pid", async (req, res) => {
  try {
    let pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    res.status(201).render("productbyid", product);
  } catch (err) {
    res.status(500).send({ err });
  }
});

viewsRouter.get("/carts/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
    res.status(201).render("cartbyid", {
      cart,
      title: "Carrito ID: " + cid,
    });
  } catch (err) {
    res.status(500).send({ err });
  }
});

export { viewsRouter };