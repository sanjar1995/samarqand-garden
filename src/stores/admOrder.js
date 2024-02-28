import { defineStore } from "pinia";
import axios from "axios";
import sweetalert from "sweetalert";
import router from "../router";
import {
  baseUrl,
  headers_adm,
  headers_def,
  headers_three,
  headers_five,
  limit,
} from "@/static";

export const useAdmOrder = defineStore("admOrder", {
  state: () => ({
    orders: [],
    oredrId: null,
    totalCount: null,
    newOrderCount: null,
    newOrderSum: null,
    completedOrderCount: null,
    completedOrderSum: null,
    cancelledOrderCount: null,
    cancelledOrderSum: null,
  }),
  actions: {
    async getOrders(offset = 0) {
      try {
        const res = await axios({
          url: `${baseUrl}orders/?offset=${offset}&limit=${limit}`,
          method: "GET",
          headers: headers_adm,
        });
        this.orders = res.data.orders;
        this.totalCount = res.data.total_count;
        this.newOrderCount = res.data.new_order_count;
        this.newOrderSum = res.data.new_order_sum;
        this.completedOrderCount = res.data.completed_order_count;
        this.completedOrderSum = res.data.completed_order_sum;
        this.cancelledOrderCount = res.data.cancelled_order_count;
        this.cancelledOrderSum = res.data.cancelled_order_sum;
      } catch (error) {
        console.error(error);
      }
    },
    async completedOrCancelledOrder(id, type) {
      try {
        const res = await axios({
          url: `${baseUrl}orders/status/${id}?new_status=${type}`,
          method: "POST",
          headers: headers_def,
        });
        sweetalert(`Статус Заказа Изменен на: ${type}`, {
          icon: "info",
          buttons: false,
          timer: 1500,
          closeOnEsc: false,
          closeOnClickOutside: false,
        });
        router.replace();
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {},
  persist: true,
});

// Cancelled
// Completed
