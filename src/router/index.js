import { createRouter, createWebHistory, RouterView } from "vue-router";

import about from "../views/Home/AboutView.vue";
import Tr from "@/i18n/translation";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/:locale?",
      component: RouterView,
      beforeEnter: Tr.routeMiddleware,
      children: [
        {
          path: "",
          name: "home-about",
          component: about,
        },
        {
          path: "home",
          name: "home-home",
          component: () => import("../views/Home/HomeView.vue"),
        },
        {
          path: "equipment",
          name: "home-equipment",
          component: () => import("../views/Home/OurEquipment.vue"),
        },
        {
          path: "cart",
          name: "home-cart",
          component: () => import("../views/Home/HomeCartView.vue"),
        },
        {
          path: "products/:id",
          name: "home-product-list",
          component: () => import("../views/Home/ProductsList.vue"),
        },
        {
          path: "product/:id",
          name: "home-product-id",
          component: () => import("../views/Home/ProductView.vue"),
        },
        {
          path: ":pathMatch(.*)*",
          name: "NotFound",
          component: () => import("../views/Home/NotFound.vue"),
        },
      ],
    },

    {
      path: "/admin-login",
      name: "Auth",
      component: () => import("../views/Auth/AuthView.vue"),
      meta: {
        layout: "auth",
      },
    },
    {
      path: "/admin-panel",
      name: "Admin-View",
      component: () => import("../views/Admin/AdminView.vue"),
      meta: {
        layout: "admin",
        authAdm: true,
      },
    },
    {
      path: "/admin-panel/:pathMatch(.*)*",
      name: "Admin-NotFound",
      component: () => import("../views/Admin/AdminNotFound.vue"),
      meta: {
        layout: "admin",
        authAdm: true,
      },
    },
    {
      path: "/admin-panel/categories",
      name: "Admin-Categories",
      component: () => import("../views/Admin/AdminCategories.vue"),
      meta: {
        layout: "admin",
        authAdm: true,
      },
    },
    {
      path: "/admin-panel/categories/add",
      name: "Admin-Categories-Add",
      component: () => import("../views/Admin/AdminCategoryAdd.vue"),
      meta: {
        layout: "admin",
        authAdm: true,
      },
    },
    {
      path: "/admin-panel/categories/edit/:id",
      name: "Admin-Categories-Edit",
      component: () => import("../views/Admin/AdminCategoryEdit.vue"),
      meta: {
        layout: "admin",
        authAdm: true,
      },
    },
    {
      path: "/admin-panel/products",
      name: "Admin-Products",
      component: () => import("../views/Admin/AdminProducts.vue"),
      meta: {
        layout: "admin",
        authAdm: true,
      },
    },
    {
      path: "/admin-panel/products/add",
      name: "Admin-Products-Add",
      component: () => import("../views/Admin/AdminProductAdd.vue"),
      meta: {
        layout: "admin",
        authAdm: true,
      },
    },
    {
      path: "/admin-panel/products/edit/:id",
      name: "Admin-Products-Edit",
      component: () => import("../views/Admin/AdminProductEdit.vue"),
      meta: {
        layout: "admin",
        authAdm: true,
      },
    },
    {
      path: "/admin-panel/orders",
      name: "Admin-Orders",
      component: () => import("../views/Admin/AdminOrders.vue"),
      meta: {
        layout: "admin",
        authAdm: true,
      },
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
