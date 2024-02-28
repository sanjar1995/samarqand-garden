<template>
  <div class="admin">
    <AdminSidebar :links="adminLinks" />
    <main class="admin-main">
      <AdminStatistic />
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>
<script setup>
import AdminSidebar from "@/components/Admin/AdminSidebar.vue";
import AdminStatistic from "@/components/Admin/AdminStatistic.vue";
import { ref, onMounted } from "vue";
import { useAuth } from "@/stores/auth";
import { useAdmCategory } from "@/stores/admCategory";
import { useAdmProduct } from "@/stores/admProduct";
import { useAdmOrder } from "@/stores/admOrder";
const categoriesStore = useAdmCategory();
const productsStore = useAdmProduct();
const orderStore = useAdmOrder();
const authStore = useAuth();
const adminLinks = ref([
  {
    name: "Категории",
    path: "/admin-panel/categories",
    icon: "fal fa-th-large",
  },
  {
    name: "Продукты",
    path: "/admin-panel/products",
    icon: "fal fa-shopping-bag",
  },
  {
    name: "Заказы",
    path: "/admin-panel/orders",
    icon: "fal fa-clipboard-list",
  },
]);
onMounted(() => {
  authStore.checkAdmin();
  productsStore.getProducts();
  categoriesStore.getCategories();
  orderStore.getOrders();
});
</script>
