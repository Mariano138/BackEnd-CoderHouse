import { productModel } from "../models/product.model.js";

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

  async getProducts() {
    return await this.model.find().lean();
  }

  async getProductById(id) {
    return await this.model.findOne({ _id: id });
  }

  async updateProduct(id, field) {
    return await this.model.updateOne({ _id: id }, field);
  }

  async deleteProduct(id) {
    return this.model.deleteOne({ _id: id });
  }
}