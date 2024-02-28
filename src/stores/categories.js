import { defineStore } from "pinia";
import axios from "axios";
import sweetalert from "sweetalert";
import router from "../router";
import {
  baseUrl,
  headers_one,
  headers_adm,
  headers_two,
  headers_three,
  headers_def,
  limit,
} from "@/static";

export const useСategories = defineStore("categories", {
  state: () => ({
    categories: [],
    categoriesAdmin: [],
    categoryById: null,
    categoryByIdName: null,
    categoryByAdmin: null,
    category: null,
    total: null,
  }),
  actions: {
    async getCategories(offset = 0) {
      try {
        this.categories = null;
        const res = await axios({
          url: `${baseUrl}category/?offset=${offset}&limit=${limit}`,
          method: "GET",
          headers: headers_one,
        });
        this.categories = res.data.categories;
        this.total = res.data.total_count;
      } catch (error) {
        console.error(error);
      }
    },
    async getCategoryById(id) {
      try {
        this.categoryById = null;
        const res = await axios({
          url: `${baseUrl}category/${id}`,
          method: "GET",
          headers: headers_one,
        });
        this.categoryById = res.data;
        this.categoryByIdName = res.data.name;

      } catch (error) {
        console.error(error);
        router.push({ name: "NotFound" });
      }
    },
  },
  getters: {},
  persist: true,
});
