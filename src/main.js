import { createApp } from "vue/dist/vue.esm-bundler";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import router from "./router";
import firebase from "./firebase";
import VueAwesomePaginate from "vue-awesome-paginate";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import i18n from "./i18n";

import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "vue-awesome-paginate/dist/style.css";
import "./assets/scss/main.scss";

import adminLayout from "./layouts/AdminLayout.vue";
import authLayout from "./layouts/AuthLayout.vue";
import homeLayout from "./layouts/HomeLayout.vue";

const pinia = createPinia();
const head = createHead();
pinia.use(piniaPluginPersistedstate);

createApp(App)
  .component("home-layout", homeLayout)
  .component("auth-layout", authLayout)
  .component("admin-layout", adminLayout)
  .use(pinia)
  .use(head)
  .use(router)
  .use(i18n)
  .use(VueAwesomePaginate)
  .mount("#app");
