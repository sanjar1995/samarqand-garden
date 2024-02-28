<template>
  <div class="header-category">
    <ul class="header-category__list">
      <li v-for="category in categories" :key="category.id" :id="category.id">
        <routerLink
          :to="`/${locale}/products/${category.id}`"
          @click="getCategory(category.id)"
          class="header-category__link"
        >
          <!-- <i class="fal fa-tags"></i> -->
          <span>{{ category.name }}</span>
        </routerLink>
      </li>
      <li>
        <router-link to="/" class="header-category__link">
          <span>
            Еще
            <i class="fal fa-angle-down"></i>
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useСategories } from "@/stores/categories";
import { useProducts } from "@/stores/products";
const categoriesStore = useСategories();
const productsStore = useProducts();
const categories = computed(() => categoriesStore.categories);
const { t, locale } = useI18n();
const getCategory = (id) => {
  categoriesStore.getCategoryById(id);
  productsStore.getProducts(0, id);
};
</script>
