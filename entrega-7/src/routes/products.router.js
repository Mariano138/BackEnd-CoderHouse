import { Router } from "express";
import { io } from "../app.js";


import ProductManager from "../services/product.service.js";


const productManager = new ProductManager();



const productsRouter = Router();

// Defino la ruta para ver productos
productsRouter.get("/", async (req, res) => {

  try {
    let limit = req.query.limit;
    let allProducts = await productManager.getProducts();
    if (limit === undefined) {
      res.status(201).render("home", { allProducts, filtered: false });
    } else {
      let limitProducts = [];
      for (let i = 0; i < parseInt(limit); i++) {
        limitProducts.push(allProducts[i]);
      }
      res.status(201).render("home", { limitProducts, filtered: true });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    let idFilter = await productManager.getProductById(
      parseInt(req.params.pid)
    );
    res.status(201).send(idFilter);
  } catch (err) {
    res.status(400).send({ err });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).send(newProduct);
  } catch (err) {
    res.status(400).send({ err });
  }
});

// PUT
productsRouter.put("/:pid", async (req, res) => {
  try {
    const updateProduct = await productManager.updateProduct(
      parseInt(req.params.pid),
      req.body
    );
    res.status(201).send(updateProduct);
  } catch (err) {
    res.status(400).send({ err });
  }
});

// DELETE
productsRouter.delete("/:pid", async (req, res) => {
  try {
    const deleteProduct = await productManager.deleteProduct(
      parseInt(req.params.pid)
    );
    res.status(201).send(deleteProduct);
  } catch (err) {
    res.status(400).send({ err });
  }
});

// Exporto la ruta
export { productsRouter };