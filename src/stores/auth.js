import { defineStore } from "pinia";
import axios from "axios";
import sweetalert from "sweetalert";
import router from "../router";
import { useProducts } from "./products";

import {
  baseUrl,
  headers_def,
  headers_def_two,
  headers_three,
  headers_five,
  limit,
} from "@/static";

export const useAuth = defineStore("auth", {
  state: () => ({
    access_token: "",
    user: null,
    verifyModal: false,
  }),
  actions: {
    async loginAdmin(username, password) {
      try {
        if (username && password) {
          const authInfo = {
            username: username,
            password: password,
          };
          const res = await axios({
            url: `${baseUrl}login`,
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            data: authInfo,
          });
          this.access_token = await res.data.access_token;
          sessionStorage.setItem("access_token", this.access_token);
          router.push({ path: "/admin-panel" });
          sweetalert({
            text: "Привет Администратор",
            icon: "success",
          });
        } else {
          sweetalert({
            text: "Для входа введите Логин и Пароль",
            icon: "error",
          });
        }
      } catch (error) {
        router.push({ path: "/admin-login" });
        sweetalert({
          text: "Для входа введите Логин и Пароль",
          icon: "error",
        });
      }
    },
    async checkAdmin() {
      const res = await axios({
        url: `${baseUrl}users/`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
        .then((res) => {
          this.user = res.data;
        })
        .catch((err) => {
          this.user = err.response;
        });
      const requireAuth = router.currentRoute.value.meta.authAdm;
      if (requireAuth && this.user.status == 401) {
        router.push({ path: "/admin-login" });
        sweetalert({
          text: "Для работы пройдите Авторизацию",
          icon: "error",
        });
      } else {
        router.forward();
      }
    },
    async sendVerif(phone, successInfo, errorInfo) {
      try {
        const res = await axios({
          url: `${baseUrl}send_verification?number=%2B998${phone}`,
          method: "POST",
          headers: headers_def,
        });
        sweetalert({
          text: `${successInfo}`,
          icon: "success",
          timer: 1500,
          closeOnEsc: false,
          closeOnClickOutside: false,
        });
        console.log(res);
      } catch (error) {
        sweetalert({
          text: `${errorInfo}`,
          icon: "info",
          timer: 1500,
          closeOnEsc: false,
          closeOnClickOutside: false,
        });
        console.error(error);
      }
    },
    async verifAndCreateOrder(
      phone,
      code,
      products,
      name,
      payment,
      successOrder,
      errorCode,
      errClient
    ) {
      let sendProducts = [];
      let total = 0;
      for (const key in products) {
        let prodObj = {
          id: products[key].id,
          amount: products[key].weight,
        };
        sendProducts.push(prodObj);
        let totalSum = products[key].price * products[key].weight;
        total += totalSum;
      }
      try {
        const res = await axios({
          url: `${baseUrl}verify_code?number=%2B998${phone}`,
          method: "POST",
          headers: headers_def_two,
          data: {
            code: code,
          },
        });

        if (res.data.status == "approved") {
          const res2 = await axios({
            url: `${baseUrl}clients`,
            method: "POST",
            headers: headers_def_two,
            data: {
              name: name,
              phone: "+998" + phone,
            },
          });
          if (res2.data.id) {
            const res3 = await axios({
              url: `${baseUrl}orders`,
              method: "POST",
              headers: headers_def_two,
              data: {
                products: sendProducts,
                client_id: res2.data.id,
                total: total,
                payment_type: payment,
              },
            });
            sweetalert({
              text: `${successOrder}`,
              icon: "success",
            });
            router.push({ name: "home-home" });
            this.verifyModal = false;
            useProducts().cart = {};
            localStorage.removeItem("products.cart");
          } else {
            sweetAlert({
              text: `${errClient}`,
              icon: "error",
              timer: 1500,
              closeOnEsc: false,
              closeOnClickOutside: false,
            });
          }
        } else {
          sweetalert({
            text: `${errorCode}`,
            icon: "info",
            timer: 1500,
            closeOnEsc: false,
            closeOnClickOutside: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {},
  persist: true,
});
