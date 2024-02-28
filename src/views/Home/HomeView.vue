<template>
  <Loader v-if="!productsStore.productsByCategory" />
  <section class="home" v-else>
    <swiper
      :spaceBetween="30"
      :loop="true"
      :centeredSlides="true"
      :autoplay="{
        delay: 3000,
      }"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="home-swiper"
    >
      <swiper-slide
        class="home-swiper__slide"
        v-for="slide in companySlides"
        :key="slide.id"
      >
        <div class="home-swiper__slide-content">
          <h1>{{ slide.title }}</h1>
          <p>{{ slide.descr }}</p>
        </div>
        <img class="home-swiper__slide-img" :src="slide.img" alt="" />
      </swiper-slide>
    </swiper>
    <template v-for="productCategory in products" :key="productCategory.id">
      <HomeProducts
        :productCategory="productCategory"
        v-if="products.length > 0"
      />
    </template>
  </section>
</template>
<script setup>
import HomeProducts from "@/views/Home/HomeProducts.vue";
import Loader from "@/components/UI/Spinner.vue";
import { ref, onMounted, computed, reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper";
import { useProducts } from "@/stores/products";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import "swiper/css";
import "swiper/css/pagination";
import { fruits, vegetables, driedFruits } from "@/exportImg/companyImg";
const modules = ref([Autoplay, Pagination]);
const productsStore = useProducts();
const products = computed(() => productsStore.productsByCategory);
const companySlides = reactive([
  {
    id: 1,
    title: `${t("slider.slide_one.title")}`,
    descr: `${t("slider.slide_one.descr")}`,
    img: fruits,
  },
  {
    id: 2,
    title: `${t("slider.slide_two.title")}`,
    descr: `${t("slider.slide_two.descr")}`,
    img: vegetables,
  },
  {
    id: 3,
    title: `${t("slider.slide_three.title")}`,
    descr: `${t("slider.slide_three.descr")}`,
    img: driedFruits,
  },
]);
onMounted(() => {
  productsStore.getProductsByCategory();
});
</script>
