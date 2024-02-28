<template>
  <div class="admin-main__statistic">
    <div class="admin-main__statistic-item">
      <p class="admin-main__statistic-item-num">
        {{ categoriesStore.total }}
      </p>
      <p class="admin-main__statistic-item-name">Общее количество категории</p>
    </div>
    <div class="admin-main__statistic-item">
      <p class="admin-main__statistic-item-num">{{ productsStore.total }}</p>
      <p class="admin-main__statistic-item-name">Общее количество продуктов</p>
    </div>
    <div class="admin-main__statistic-item">
      <p class="admin-main__statistic-item-num">{{ orderStore.totalCount }}</p>
      <p class="admin-main__statistic-item-name">Общее количество заказов</p>
    </div>
  </div>
</template>

<script setup>
import { useAdmCategory } from "@/stores/admCategory";
import { useAdmProduct } from "@/stores/admProduct";
import { useAdmOrder } from "@/stores/admOrder";
const categoriesStore = useAdmCategory();
const productsStore = useAdmProduct();
const orderStore = useAdmOrder();
</script>
