class ProductManager {
    static id = 0;
    constructor() {
      this.products = [];
    }
    
    addProduct(title, description, price, thumbail, code, stock) {
      let codeRepeat = this.products.filter((product) => product.code === code);
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
        console.log("Hay espacios sin completar");
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
      
      product.id = this.#getId();
      
      this.products.push(product);
    }
    #getId() {
      this.#id++;
      return this.#id;
    }
    
    getProducts() {
      return this.products;
    }
    getProductById(id) {
      const findId = this.products.findIndex((eLe) => eLe.id === id);
      if (findId === -1) {
        console.log("No se encontro el ID");
        return;
      } else {
        console.log("Se encontro el ID");
        console.log(this.products[findId]);
      }
    }
  }

const pm = new ProductManager();

//Productos

pm.addProduct('lechuga', 'lechuga morada', 700, 'https://cdn.pixabay.com/photo/2016/03/05/22/01/lettuce-1239155_960_720.jpg', 7)
pm.addProduct('tomate', 'redondo', 500, 'https://cdn.pixabay.com/photo/2014/04/10/11/06/tomatoes-320860_960_720.jpg', 15)
pm.addProduct('limón', 'jugoso', 600, 'https://cdn.pixabay.com/photo/2018/06/17/14/30/lime-3480609_960_720.jpg', 9)

console.log(pm.getProducts());
pm.getProductById(3);