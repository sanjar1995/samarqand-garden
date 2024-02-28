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

export const useAdmProduct = defineStore("admProduct", {
  state: () => ({
    products: [],
    productID: null,
    searchArray: [],
    total: null,
    result: null,
    search: "",
    selectCategory: "",
  }),
  actions: {
    async getProducts(offset = 0) {
      try {
        const url = `${baseUrl}products/?offset=${offset}&limit=${limit}${
          this.selectCategory ? "&category_id=" + this.selectCategory : ""
        }`;
        const result = await axios({
          url: url,
          method: "GET",
          headers: headers_adm,
        });
        this.products = result.data.products;
        this.total = result.data.total;
      } catch (error) {
        console.error(error);
      }
    },
    async getProductId(id) {
      try {
        const result = await axios({
          url: `${baseUrl}products/${id}`,
          method: "GET",
          headers: headers_adm,
        });
        this.productID = await result.data;
      } catch (error) {
        console.error(error);
      }
    },
    async searchProducts() {
      try {
        const result = await axios({
          url: `${baseUrl}products/search/?name=${this.search}`,
          method: "GET",
          headers: headers_def,
        });
        this.searchArray = result.data;
      } catch (error) {
        console.error(error);
      }
    },
    addProduct(obj) {
      sweetalert("Ждите, добавляем продукт!", {
        icon: "info",
        buttons: false,
        timer: 3000,
        closeOnEsc: false,
        closeOnClickOutside: false,
      });
      try {
        const newProduct = {
          name: obj.value.name,
          name_uz: obj.value.name_uz,
          name_tr: "",
          name_en: obj.value.name_en,
          description: obj.value.description,
          description_uz: obj.value.description_uz,
          description_tr: "",
          description_en: obj.value.description_en,
          category_id: obj.value.category_id,
          price: obj.value.price,
          amount: obj.value.amount,
        };
        let fd = new FormData();
        let file = document.querySelector("#pictureInput").files[0];
        fd.append("picture", file);
        axios({
          url: `${baseUrl}products/`,
          method: "POST",
          params: newProduct,
          data: fd,
          headers: headers_two,
        })
          .then((res) => {
            router.push({
              path: "/admin-panel/products",
            }),
              sweetalert({
                text: "Продукт добавлен!",
                icon: "success",
              });
          })
          .catch((err) => {
            sweetalert({
              text: "Для добавление продукта заполните форму!",
              icon: "error",
            });
          });
      } catch (error) {
        sweetalert({
          text: "Продукт не был добавлен, попробуйте заного!",
          icon: "error",
        });
      }
    },
    async editProduct(obj, id) {
      sweetalert({
        text: "Ждите, меняем данные продукта!",
        icon: "info",
        buttons: false,
        timer: 3000,
        closeOnEsc: false,
        closeOnClickOutside: false,
      });
      try {
        const editProduct = {
          name: obj.value.name,
          name_uz: obj.value.name_uz,
          name_tr: obj.value.name_tr,
          name_en: obj.value.name_en,
          description: obj.value.description,
          description_uz: obj.value.description_uz,
          description_tr: obj.value.description_tr,
          description_en: obj.value.description_en,
          category_id: obj.value.category_id,
          price: obj.value.price ? +obj.value.price : null,
          amount: obj.value.amount ? +obj.value.amount : null,
        };
        let fd = new FormData();
        let file = document.querySelector("#pictureInput").files[0];
        file ? fd.append("image_url", file) : fd.append("image_url", "");
        await axios({
          url: `${baseUrl}products/${id}`,
          method: "PUT",
          params: editProduct,
          data: fd,
          headers: headers_two,
        });
        router.push({
          path: "/admin-panel/products",
        }),
          await sweetalert({
            text: "Продукт изменен!",
            icon: "success",
            buttons: "ok",
          });
        router.go();
      } catch (error) {
        sweetalert({
          text: "Не удалось изменить продукт!",
          icon: "error",
        });
      }
    },
    async deleteProduct(id) {
      try {
        await axios({
          url: `${baseUrl}products/${id}`,
          method: "DELETE",
          headers: headers_three,
        });
      } catch (error) {
        sweetalert({
          text: "Не удалось удалить продукт!",
          icon: "error",
        });
      }
    },
  },
  getters: {},
  persist: true,
});
