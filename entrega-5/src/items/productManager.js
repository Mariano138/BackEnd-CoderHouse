// FS
import fs from "fs";

// Creo la clase Product Manager
export default class ProductManager {
  #id = 0;
  constructor() {
    this.path = "./src/items/products.json";
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("Cree el archivo vacio");
    }
  }
  // Metodo para agregar productos
  async addProduct({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  }) {
    try {
      const totalProducts = await this.getProducts();
      function isEmpty(str) {
        return !str || str.length === 0;
      }
  
      let codeRepeat = totalProducts.filter((product) => product.code === code);
      if (codeRepeat.length > 0) {
        console.log("El codigo ya existee");
        return "El codigo ya existe";
      } else if (
        isEmpty(title) ||
        isEmpty(description) ||
        isEmpty(code) ||
        isEmpty(price) ||
        isEmpty(status) ||
        isEmpty(stock) ||
        isEmpty(category)
      ) {
        console.log("Por faovor complete todos los campos");
        return "Por faovor complete todos los campos";
      }
      const product = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      };
      if (totalProducts.length > 0) {
        this.#id = totalProducts[totalProducts.length - 1].id;
      }
      product.id = this.#getId();
      product.status = true;
      if (product.thumbnails == undefined) {
        product.thumbnails = [];
      }
      totalProducts.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(totalProducts));
      return product;
    } catch (err) {
      console.log("Error al agregar productos");
    }
  }

  #getId() {
    this.#id++;
    return this.#id;
  }

  // Metodo para traer todos los products de mi archivo.json
  async getProducts() {
    try {
      const totalProducts = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(totalProducts);
    } catch (err) {
      console.log("Error al mostrar los productos");
    }
  }

  // Metodo para filtar productos por ID
  async getProductById(id) {
    try {
      const totalProducts = await this.getProducts();
      const findId = totalProducts.findIndex((eLe) => eLe.id === id);
      if (findId === -1) {
        console.log("ID Not Found");
        return;
      } else {
        console.log("Found ID");
        console.log(totalProducts[findId]);
        return totalProducts[findId];
      }
    } catch (err) {
      console.log("Imposible mostrar el id");
    }
  }

  // Metodo para actualizar productos por id y definiendo las propiedades.
  async updateProduct(id, field) {
    try {
      const totalProducts = await this.getProducts();
      const findId = totalProducts.findIndex((eLe) => eLe.id === id);
      if (findId === -1) {
        console.log("ID Not Found!!!");
        return;
      }
      const product = totalProducts[findId];
      const fieldKeys = Object.keys(field);
      for (let i = 0; i < fieldKeys.length; i++) {
        const key = fieldKeys[i];
        if (key === "id") {
          console.log("Modifying the id is not allowed");
          return;
        } else if (product.hasOwnProperty(key)) {
          product[key] = field[key];
        }
      }
      console.log("Product update:", product);
      await fs.promises.writeFile(this.path, JSON.stringify(totalProducts));
      return product;
    } catch (err) {
      console.log("error");
    }
  }

  async deleteProduct(id) {
    try {
      const totalProducts = await this.getProducts();
      const findId = totalProducts.findIndex((eLe) => eLe.id === id);
      if (findId === -1) {
        console.log("ID Not Found");
        return;
      }
      console.log("Product delete:", totalProducts[findId]);
      totalProducts.splice(findId, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(totalProducts));
      return `Product Delete`;
    } catch (err) {
      console.log("error");
    }
  }
}