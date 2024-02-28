import { defineStore } from "pinia";
import axios from "axios";
import sweetalert from "sweetalert";
import router from "../router";
import {
  baseUrl,
  limit,
  headers_one,
  headers_adm,
  headers_two,
  headers_three,
  headers_def,
} from "@/static";

export const useProducts = defineStore("products", {
  state: () => ({
    products: [],
    productByID: null,
    productByIDName: null,
    productsByCategory: [],
    totalHome: null,
    searchArray: [],
    total: null,
    result: null,
    offset: 0,
    search: "",
    cart: {},
    cartProd: null,
  }),
  actions: {
    async getProducts(offset = 0, category_id = 0) {
      try {
        this.products = null;
        const url = `${baseUrl}products/?offset=${offset}&limit=${limit}&category_id=${category_id}`;
        const result = await axios({
          url: url,
          method: "GET",
          headers: headers_one,
        });
        this.products = await result.data.products;
        this.total = result.data.total;
      } catch (error) {
        console.error(error);
      }
    },
    async getProductById(id) {
      try {
        this.productByID = null;
        const result = await axios({
          url: `${baseUrl}products/${id}`,
          method: "GET",
          headers: headers_one,
        });
        this.productByID = result.data;
        this.productByIDName = result.data.name;
        this.productByID.weight = 0;
      } catch (error) {
        console.error(error);
        router.push({ name: "NotFound" });
      }
    },
    async searchProducts(input) {
      try {
        this.searchArray = [];
        const result = await axios({
          url: `${baseUrl}products/search/?name=${this.search}`,
          method: "GET",
          headers: headers_one,
        });
        this.searchArray = result.data;
        this.total = 0;
      } catch (error) {
        console.error(error);
      }
    },
    async getProductsByCategory(id = 0) {
      try {
        this.productsByCategory = null;
        const url = `${baseUrl}products/by_categories/?category_id=${id}`;
        const result = await axios({
          url: url,
          method: "GET",
          headers: headers_one,
        });
        this.productsByCategory = result.data.products_by_categories.slice(
          0,
          8
        );
      } catch (error) {
        console.error(error);
      }
    },
    async addToCart(weight, id, text) {
      try {
        const result = await axios({
          url: `${baseUrl}products/${id}`,
          method: "GET",
          headers: headers_one,
        });
        this.cartProd = result.data;
        this.cartProd.weight = weight;
        if (this.cart[id]) {
          if (this.cart[id].weight) {
            this.cart[id].weight += weight;
          }
        } else {
          this.cart[id] = this.cartProd;
        }
        sweetalert(`${text}`, {
          icon: "success",
          buttons: false,
          timer: 1500,
          closeOnEsc: false,
          closeOnClickOutside: false,
        });
      } catch (error) {
        console.error(error);
      }
    },
    minusInCart(weight, id, text) {
      this.cart[id].weight -= weight;
      if (this.cart[id].weight < 1) {
        delete this.cart[id];
      }
    },
    plusInCart(weight, id, text) {
      this.cart[id].weight += weight;
    },
    delInCart(id, text) {
      delete this.cart[id];
      sweetalert(`${text}`, {
        icon: "success",
        buttons: false,
        timer: 1500,
        closeOnEsc: false,
        closeOnClickOutside: false,
      });
    },
  },
  getters: {},
  persist: true,
});
