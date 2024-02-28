<template>
  <Modal type="add" />
</template>
<script setup>
import Modal from "@/components/Admin/AdminModalProd.vue";
import { onBeforeUnmount } from "vue";
import { useAdmProduct } from "@/stores/admProduct.js";
const productsStore = useAdmProduct();
onBeforeUnmount(() => {
  productsStore.productID = null;
});
</script>
