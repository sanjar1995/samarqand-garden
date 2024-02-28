import { defineStore } from "pinia";
import axios from "axios";
import sweetalert from "sweetalert";
import router from "../router";
import {
  baseUrl,
  headers_adm,
  headers_three,
  headers_five,
  limit,
} from "@/static";

export const useAdmCategory = defineStore("admCategoy", {
  state: () => ({
    categories: [],
    categoryId: null,
    category: null,
    total: null,
  }),
  actions: {
    async getCategories(offset = 0) {
      try {
        const res = await axios({
          url: `${baseUrl}category/?offset=${offset}&limit=${limit}`,
          method: "GET",
          headers: headers_adm,
        });
        this.categories = res.data.categories;
        this.total = res.data.total_count;
      } catch (error) {
        console.error(error);
      }
    },
    async getCategoryById(id) {
      try {
        const res = await axios({
          url: `${baseUrl}category/${id}`,
          method: "GET",
          headers: headers_adm,
        });
        this.categoryId = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addCategory(obj) {
      try {
        const newCategory = {
          name: obj.value.name,
          name_uz: obj.value.name_uz,
          name_tr: obj.value.name_tr,
          name_en: obj.value.name_en,
        };
        await axios({
          method: "POST",
          url: `${baseUrl}category/`,
          headers: headers_five,
          data: newCategory,
        });
        router.push({ path: "/admin-panel/categories" });
        await sweetalert({
          text: "Категория добавлена!",
          icon: "success",
        });
        router.go();
      } catch (error) {
        sweetalert({
          text: "Категория не быда добавлена, попробуйте заного!",
          icon: "error",
        });
      }
    },
    async editCategory(obj, id) {
      try {
        const editCategory = {
          name: obj.value.name,
          name_uz: obj.value.name_uz,
          name_tr: obj.value.name_tr,
          name_en: obj.value.name_en,
        };
        await axios({
          url: `${baseUrl}category/${id}`,
          method: "PUT",
          data: editCategory,
          headers: headers_five,
        });
        router.push({ path: "/admin-panel/categories" });
        await sweetalert({
          text: "Категория изменена!",
          icon: "success",
        });
        router.go();
      } catch (error) {
        sweetalert({
          text: "Не удалось изменить категорию!",
          icon: "error",
        });
      }
    },
    async deleteCategory(id) {
      try {
        await axios({
          url: `${baseUrl}category/${id}`,
          method: "DELETE",
          headers: headers_three,
        });
      } catch (error) {
        sweetalert({
          text: "Не удалось удалить категорию!",
          icon: "error",
        });
      }
    },
  },
  getters: {},
  persist: true,
});
