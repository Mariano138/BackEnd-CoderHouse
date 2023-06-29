import { Router } from "express";
import { isAuth, isGuest } from "../middleware/auth.middleware.js";
import ProductManager from "../dao/mongo/product.service.js";
import CartManager from "../dao/mongo/cart.services.js";


const productManager = new ProductManager();

const cartManager = new CartManager();

const viewsRouter = Router();


// Definimos la ruta de /products
viewsRouter.get("/products", isAuth, async (req, res) => {
  const { user } = req.session;
  delete user.password;
  try {
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    let query = req.query;
    const listProducts = await productManager.getProductsforView(
      limit,
      page,
      query
    );
    res.status(201).render("home", {
      listProducts,
      user,
      admin: user.role === "admin",
      title: "Lista de productos",
    });
  } catch (err) {
    res.status(500).send({ err });
  }
});

// Defino la ruta para ver los products por id
viewsRouter.get("/products/:pid", isAuth, async (req, res) => {
  const { user } = req.session;
  delete user.password;
  try {
    let pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    res.status(201).render("productbyid", {
      product,
      user,
      admin: user.role === "admin",
      title: product.title,
    });
  } catch (err) {
    res.status(500).send({ err });
  }
});

// Defino la ruta para ver todo el contenido de un carrito
viewsRouter.get("/carts/:cid", isAuth, async (req, res) => {
  const { user } = req.session;
  delete user.password;
  try {
    let cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
    res.status(201).render("cartbyid", {
      cart,
      user,
      admin: user.role === "admin",
      title: "Carrito ID: " + cid,
    });
  } catch (err) {
    res.status(500).send({ err });
  }
});

// Defino la ruta para ver el index
viewsRouter.get("/", isAuth, (req, res) => {
  const { user } = req.session;
  delete user.password;
  res.render("index", {
    title: "Perfil de Usuario",
    user,
    admin: user.role === "admin",
  });
});

// Defino la ruta para ver el register
viewsRouter.get("/register", isGuest, (req, res) => {
  res.render("register", {
    title: "Registrar Nuevo Usuario",
  });
});

// Defino la ruta para ver el login
viewsRouter.get("/login", isGuest, (req, res) => {
  res.render("login", {
    title: "Inicio de Sesión",
  });
});

// Exporto el router
export { viewsRouter };