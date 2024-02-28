<template>
  <Loader v-if="!productsStore.products" />
  <div class="home-products" v-else>
    <h1 class="header-category__title">
      {{ categoryName }}
    </h1>
    <div class="home-product__list">
      <ProductCard
        v-for="product in products"
        :id="product.id"
        :product="product"
      />
    </div>
    <div class="products-pagination">
      <vue-awesome-paginate
        :total-items="total"
        :items-per-page="limit"
        :max-pages-shown="2"
        v-model="page"
        :on-click="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, reactive } from "vue";
import { useHead } from "@vueuse/head";
import { useRoute, useRouter } from "vue-router";
import { useСategories } from "@/stores/categories";
import { useProducts } from "@/stores/products";
import ProductCard from "@/components/Home/ProductCard.vue";
import Loader from "@/components/UI/Spinner.vue";
import { limit } from "@/static";
const props = defineProps(["id"]);
const route = useRoute();
const router = useRouter();
const categoriesStore = useСategories();
const productsStore = useProducts();
const products = computed(() => productsStore.products);
const total = computed(() => productsStore.total);
let page = ref(+route.query.page || 1);
let offset = ref(limit * page.value - limit);
const changePage = (page_num) => {
  page.value = page_num;
  offset.value = limit * page_num - limit;
  if (page_num == 1) {
    router.push(`${route.path}`);
  } else {
    router.push(`${route.path}?page=${page_num}`);
  }
  productsStore.getProducts(offset.value, +route.params.id);
};
const categoryName = computed(() => {
  return (
    categoriesStore.categoryByIdName.charAt(0).toUpperCase() +
    categoriesStore.categoryByIdName.slice(1)
  );
});
onMounted(() => {
  categoriesStore.getCategoryById(+route.params.id);
  productsStore.getProducts(offset.value, +route.params.id);
});

useHead({
  title: computed(() =>
    categoriesStore.categoryByIdName ? categoriesStore.categoryByIdName : ""
  ),
  meta: [
    {
      title: "description",
      content: `this products page`,
    },
  ],
});
</script>
