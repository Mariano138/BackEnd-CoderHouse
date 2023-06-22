import { productModel } from "./models/product.model.js";

export default class ProductManager {
  constructor() {
    this.model = productModel;
  }

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.code ||
      !product.price ||
      !product.status ||
      !product.stock ||
      !product.category
    ) {
      console.log("Te falta completar un campo");
      return "Te falta completar un campo";
    }
    return await this.model.create(product);
  }
  async getProducts(limit, page, query) {
    let options = { limit, page };
    let filter = {};
    if (query.category) {
      filter.category = query.category;
    }
    if (query.status) {
      filter.status = query.status;
      filter.stock = { $gt: 0 };
    }
    if (query.sort) {
      options.sort = { price: query.sort };
    }
    return await this.model.paginate(filter, options);
  }

  async getProductsforView(limit, page, query) {
    let options = { lean: true, limit, page };
    let filter = {};
    if (query.category) {
      filter.category = query.category;
    }
    if (query.status) {
      filter.status = query.status;
      filter.stock = { $gt: 0 };
    }
    if (query.sort) {
      options.sort = { price: query.sort };
    }
    return await this.model.paginate(filter, options);
  }

  async getProductsforSocket() {
    return await this.model.find().lean();
  }

  async getProductById(id) {
    return await this.model.findOne({ _id: id }).lean();
  }

  async updateProduct(id, field) {
    return await this.model.updateOne({ _id: id }, field);
  }

  async deleteProduct(id) {
    return this.model.deleteOne({ _id: id });
  }
}