// Importo FS
import fs from "fs";

// Creo la clase Product Manager y la exporto
export default class ProductManager {
  #id = 0;
  constructor() {
    // this.path para definir la ruta del archivo
    this.path = "./src/products.json";
    if (!fs.existsSync(this.path)) {
      // si no existe lo escribo con un array vacio
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("Cree el archivo vacio");
    }
  }
  // Metodo para agregar productos
  async addProduct(title, description, price, thumbail, code, stock) {
    try {
      // traigo mi array y lo guardo en una constante
      const totalProducts = await this.getProducts();
      let codeRepeat = totalProducts.filter((product) => product.code === code);
      if (codeRepeat.length > 0) {
        console.log("El codigo ya existe");
        return;
      }
      if (
        title &&
        description &&
        price &&
        thumbail &&
        code &&
        stock == undefined
      ) {
        console.log("Faltan datos");
        return;
      }
      const product = {
        title,
        description,
        price,
        thumbail,
        code,
        stock,
      };
      // agrego un id al product
      product.id = this.#getId();
      // push al array
      totalProducts.push(product);
      // Escribo de nuevo el archivo del array en mi json
      await fs.promises.writeFile(this.path, JSON.stringify(totalProducts));
    } catch (err) {
      // en caso de error lo envio
      console.log("No puedo agregar el producto");
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
      console.log("error");
    }
  }

  // Metodo para filtar productos
  async getProductById(id) {
    try {
      const totalProducts = await this.getProducts();
      // compruebo que el id exista en el array
      const findId = totalProducts.findIndex((eLe) => eLe.id === id);
      if (findId === -1) {
        console.log("ID no encontrada");
        return;
      } else {
        console.log("ID encontrada");
        console.log(totalProducts[findId]);
        // retorno el ip encontrado para imprimir en express
        return totalProducts[findId];
      }
    } catch (err) {
      console.log("error");
    }
  }

  // Metodo para actualizar productos
  async updateProduct(id, field) {
    try {
      // traigo mi array y lo guardo en una constante
      const totalProducts = await this.getProducts();
      // compruebo que el id exista en el array
      const findId = totalProducts.findIndex((eLe) => eLe.id === id);
      if (findId === -1) {
        console.log("ID no encontrada");
        return;
      }
      // guardo el objeto que quiero modificar
      const product = totalProducts[findId];
      // guardo las propiedades que quiero modificar
      const fieldKeys = Object.keys(field);
      // recorro el array con las propiedades que quiero modificar
      for (let i = 0; i < fieldKeys.length; i++) {
        const key = fieldKeys[i];
        // compruebo que el id no se pueda modificar
        if (key === "id") {
          console.log("No se puede modificar el ID");
          return;
        } else if (product.hasOwnProperty(key)) {
          product[key] = field[key];
        }
      }
      console.log("Product update:", product);
      // escribo de nuevo el archivo del array en mi json
      await fs.promises.writeFile(this.path, JSON.stringify(totalProducts));
    } catch (err) {
      // si hay error lo muestro en consola
      console.log("error");
    }
  }

  async deleteProduct(id) {
    try {
      // traigo mi array y lo guardo en una constante
      const totalProducts = await this.getProducts();
      // compruebo que el id exista en el array
      const findId = totalProducts.findIndex((eLe) => eLe.id === id);
      if (findId === -1) {
        console.log("ID no encontrada");
        return;
      }
      // imprimo un mensaje con el objeto borrado y con el motodo splice lo saco del array.
      console.log("Product delete:", totalProducts[findId]);
      totalProducts.splice(findId, 1);
      // escribo de nuevo el archivo del array en mi json
      await fs.promises.writeFile(this.path, JSON.stringify(totalProducts));
    } catch (err) {
      // si hay error lo muestro en consola
      console.log("error");
    }
  }
}

const pm = new ProductManager();

const Start = async () => {
    try {
      await pm.addProduct(
        "lechuga",
        "lechuga morada",
        700,
        "https://cdn.pixabay.com/photo/2016/03/05/22/01/lettuce-1239155_960_720.jpg",
        101,
        7
      );
      await pm.addProduct(
        "tomate",
        "redondo",
        500,
        "https://cdn.pixabay.com/photo/2014/04/10/11/06/tomatoes-320860_960_720.jpg",
        102,
        15
      );
      await pm.addProduct(
        "limón",
        "jugoso",
        600,
        "https://cdn.pixabay.com/photo/2018/06/17/14/30/lime-3480609_960_720.jpg",
        103,
        9
      );
      console.log(await pm.getProducts());
      await pm.getProductById(1);
      await pm.updateProduct(1, { title: "lechugaupdate" });
      await pm.deleteProduct(1);
    } catch (err) {
      console.log("Error en el Test");
    }
  };
  
