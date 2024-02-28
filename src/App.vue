<template>
  <component :is="layout">
    <router-view :key="$route.fullPath" />
  </component>
</template>

<script setup>
import { onMounted, computed, reactive } from "vue";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";
import { useСategories } from "@/stores/categories";
const home = "home";
const categoriesStore = useСategories();
const route = useRoute();
const siteData = reactive({
  title: "Samarqand Garden",
  description: "Samarqand Garden Commerce Shop",
});

const layout = computed(() => {
  return (route.meta.layout || home) + "-layout";
});
onMounted(() => {
  categoriesStore.getCategories();
});

useHead({
  title: computed(() => siteData.title),
  meta: [
    {
      name: "description",
      content: computed(() => siteData.description),
    },
  ],
});
</script>
