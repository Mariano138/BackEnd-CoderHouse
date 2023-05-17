import { Router } from "express";

// Importo ProductManager
import ProductManager from "../productManager.js";


const productManager = new ProductManager();

// Hago mi ruta de productos

const productsRouter = Router();

// Defino la ruta para ver productos
productsRouter.get("/", async (req, res) => {
  
  try {
    let limit = req.query.limit;
    let allProducts = await productManager.getProducts();
    if (limit === undefined) {
      res.status(201).send(allProducts);
    } else {
      let limitProducts = [];
      for (let i = 0; i < parseInt(limit); i++) {
        limitProducts.push(allProducts[i]);
      }
      res.status(201).send(limitProducts);
    }
  } catch (err) {
    res.status(400).send({ err });
  }
});

// Marco la ruta para ver productos por id
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

// Marco la ruta POST para agregar un nuevo producto
productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).send(newProduct);
  } catch (err) {
    res.status(400).send({ err });
  }
});

// Marco la ruta PUT para actualizar un producto
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

// Marco la ruta DELETE para eliminar un producto
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