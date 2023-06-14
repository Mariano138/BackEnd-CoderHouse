import { cartModel } from "../models/cart.model.js";

export default class CartManager {
  constructor() {
    this.model = cartModel;
  }
  async addCart(newCart) {
    newCart.products = [];
    return await this.model.create(newCart);
  }

  async getCartById(id) {
    return await this.model.findOne({ _id: id });
  }

  async addToCart(cid, pid) {
    const cart = await this.model.findOne({ _id: cid });
    if (cart.products.length === 0) {
      cart.products = [{ product: pid, quantity: 1 }];
    } else {
      const findProduct = cart.products.findIndex((eLe) => eLe.product === pid);
      if (findProduct === -1) {
        cart.products.push({ product: pid, quantity: 1 });
      } else {
        cart.products[findProduct].quantity++;
      }
    }
    return await this.model.findByIdAndUpdate(
      cid,
      { products: cart.products },
      { new: true }
    );
  }
} 