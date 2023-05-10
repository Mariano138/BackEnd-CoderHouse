// express
import express from "express";

// Importo ProductManager
import ProductManager from "./ProductManager.js";

// app
const app = express();

// Creamos la clase ProductManager
const productManager = new ProductManager();

// middleware para parsear los datos de la petición
app.use(express.urlencoded({ extended: true }));

// Defino la ruta
app.get("/products", async (req, res) => {
  
  try {
    // guardo en una variable limit el querry
    let limit = req.query.limit;
    // obtengo los productos
    let allProducts = await productManager.getProducts();
    if (limit === undefined) {
      // envio la respuesta con los productos
      res.send(allProducts);
    } else {
      // envio la respuesta con el limite asignado
      let limitProducts = [];
      for (let i = 0; i < parseInt(limit); i++) {
        limitProducts.push(allProducts[i]);
      }
      res.send(limitProducts);
    }
  } catch (err) {
    // en caso de error lo envio
    res.send(err);
  }
});

// Defino la ruta para ver productos por id
app.get("/products/:pid", async (req, res) => {
  
  try {
    // obtengo el producto filtrado por id y parseado para que sea numero
    let idFilter = await productManager.getProductById(
      parseInt(req.params.pid)
    );
    res.send(idFilter);
  } catch (err) {
    // en caso de error lo envio
    res.send(err);
  }
});

// 8080
app.listen(8080, () => {
  console.log("Listen on 8080");
});