<template>
  <div class="home-product container">
    <h2 class="home-product__title">
      {{ categoryName }}
    </h2>
    <div class="home-product__list">
      <ProductCard
        v-for="product in products"
        :id="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import ProductCard from "@/components/Home/ProductCard.vue";
import { useHead } from "@vueuse/head";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const props = defineProps({
  productCategory: Object,
});
const products = computed(() => props.productCategory.products.slice(0, 8));
const categoryName = computed(() => {
  return (
    props.productCategory.category_name.charAt(0).toUpperCase() +
    props.productCategory.category_name.slice(1)
  );
});

</script>

<style lang="scss" scoped></style>
