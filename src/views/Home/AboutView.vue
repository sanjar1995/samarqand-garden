<template>
  <Spinner v-if="spinnerView" />
  <section class="about" v-else>
    <swiper
      :spaceBetween="30"
      :loop="true"
      :centeredSlides="true"
      :autoplay="{
        delay: 10000,
      }"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="about-swiper"
    >
      <swiper-slide
        class="about-swiper__slide"
        v-for="slide in companySlides"
        :key="slide.id"
      >
        <div class="about-swiper__slide-content">
          <h1>{{ slide.title }}</h1>
          <p>{{ slide.descr }}</p>
        </div>
        <img class="about-swiper__slide-img" :src="slide.img" alt="" />
      </swiper-slide>
    </swiper>
    <div class="about-products container">
      <h2 class="about-products__title">{{ $t("products.title") }}</h2>
      <ul class="about-products__list">
        <li class="about-products__item">
          <h2>{{ $t("products.fresh") }}</h2>
          <swiper
            :spaceBetween="30"
            :loop="true"
            :centeredSlides="true"
            :autoplay="{
              delay: 5000,
            }"
            :pagination="{
              clickable: true,
            }"
            :modules="modules"
            class="about-products-swiper"
          >
            <swiper-slide
              class="about-products-swiper__slide"
              v-for="slide in productSlides[0].fresh"
              :key="slide.id"
            >
              <p class="about-products-swiper__slide-text">
                {{ slide.product }}
              </p>
              <img class="about-products-swiper__slide-img" :src="slide.img" />
            </swiper-slide>
          </swiper>
        </li>
        <li class="about-products__item">
          <h2>{{ $t("products.frozen") }}</h2>
          <swiper
            :spaceBetween="30"
            :loop="true"
            :centeredSlides="true"
            :autoplay="{
              delay: 5000,
            }"
            :pagination="{
              clickable: true,
            }"
            :modules="modules"
            class="about-products-swiper"
          >
            <swiper-slide
              class="about-products-swiper__slide"
              v-for="slide in productSlides[0].frozen"
              :key="slide.id"
            >
              <p class="about-products-swiper__slide-text">
                {{ slide.product }}
              </p>
              <img class="about-products-swiper__slide-img" :src="slide.img" />
            </swiper-slide>
          </swiper>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useHead } from "@vueuse/head";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper";
import Spinner from "@/components/UI/Spinner.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import "swiper/css";
import "swiper/css/pagination";
import {
  sweet_pepper,
  plum,
  cayenne_pepper,
  broccoli,
  brussels_sprouts,
  melon,
  figs,
  onion,
  сarrot,
  cucumbers,
  peach,
  romanesco,
  cauliflower,
  cherry,
  spinach,
} from "@/exportImg/freshImg";
import {
  bulgarian_red,
  bell_pepper_cube,
  bell_pepper_strip,
  broccoliF,
  brussels_sproutsF,
  cherryF,
  corn,
  onionF,
  onion_cube,
  carrot_cube,
  peachF,
  peach_cube,
  sweet_pepperF,
  plumF,
  jandeau_asparagus,
  cauliflowerF,
  cherries,
} from "@/exportImg/frozenImg";
import { uzmap, gardens, cannedFood } from "@/exportImg/companyImg";
const modules = ref([Autoplay, Pagination]);
const productSlides = reactive([
  {
    fresh: [
      {
        id: 1,
        product: `${t("products.fresh_products.sweet_pepper")}`,
        img: sweet_pepper,
      },
      {
        id: 2,
        product: `${t("products.fresh_products.plum")}`,
        img: plum,
      },
      {
        id: 3,
        product: `${t("products.fresh_products.cayenne_pepper")}`,
        img: cayenne_pepper,
      },
      {
        id: 4,
        product: `${t("products.fresh_products.broccoli")}`,
        img: broccoli,
      },
      {
        id: 5,
        product: `${t("products.fresh_products.brussels_sprouts")}`,
        img: brussels_sprouts,
      },
      {
        id: 6,
        product: `${t("products.fresh_products.melon")}`,
        img: melon,
      },
      {
        id: 7,
        product: `${t("products.fresh_products.figs")}`,
        img: figs,
      },
      {
        id: 8,
        product: `${t("products.fresh_products.onion")}`,
        img: onion,
      },
      {
        id: 9,
        product: `${t("products.fresh_products.сarrot")}`,
        img: сarrot,
      },
      {
        id: 10,
        product: `${t("products.fresh_products.cucumbers")}`,
        img: cucumbers,
      },
      {
        id: 11,
        product: `${t("products.fresh_products.peach")}`,
        img: peach,
      },
      {
        id: 12,
        product: `${t("products.fresh_products.romanesco")}`,
        img: romanesco,
      },
      {
        id: 13,
        product: `${t("products.fresh_products.cauliflower")}`,
        img: cauliflower,
      },
      {
        id: 14,
        product: `${t("products.fresh_products.cherry")}`,
        img: cherry,
      },
      {
        id: 15,
        product: `${t("products.fresh_products.spinach")}`,
        img: spinach,
      },
    ],
    frozen: [
      {
        id: 1,
        product: `${t("products.frozen_products.bulgarian_red")}`,
        img: bulgarian_red,
      },
      {
        id: 2,
        product: `${t("products.frozen_products.bell_pepper_cube")}`,
        img: bell_pepper_cube,
      },
      {
        id: 3,
        product: `${t("products.frozen_products.bell_pepper_strip")}`,
        img: bell_pepper_strip,
      },
      {
        id: 4,
        product: `${t("products.frozen_products.broccoli")}`,
        img: broccoliF,
      },
      {
        id: 5,
        product: `${t("products.frozen_products.brussels_sprouts")}`,
        img: brussels_sproutsF,
      },
      {
        id: 6,
        product: `${t("products.frozen_products.cherry")}`,
        img: cherryF,
      },
      {
        id: 7,
        product: `${t("products.frozen_products.corn")}`,
        img: corn,
      },
      {
        id: 8,
        product: `${t("products.frozen_products.onion")}`,
        img: onionF,
      },
      {
        id: 9,
        product: `${t("products.frozen_products.onion_cube")}`,
        img: onion_cube,
      },
      {
        id: 10,
        product: `${t("products.frozen_products.carrot_cube")}`,
        img: carrot_cube,
      },
      {
        id: 11,
        product: `${t("products.frozen_products.peach")}`,
        img: peachF,
      },
      {
        id: 12,
        product: `${t("products.frozen_products.peach_cube")}`,
        img: peach_cube,
      },
      {
        id: 13,
        product: `${t("products.frozen_products.sweet_pepper")}`,
        img: sweet_pepperF,
      },
      {
        id: 14,
        product: `${t("products.frozen_products.plum")}`,
        img: plumF,
      },
      {
        id: 15,
        product: `${t("products.frozen_products.jandeau_asparagus")}`,
        img: jandeau_asparagus,
      },
      {
        id: 16,
        product: `${t("products.frozen_products.cauliflower")}`,
        img: cauliflowerF,
      },
      {
        id: 17,
        product: `${t("products.frozen_products.cherries")}`,
        img: cherries,
      },
    ],
  },
]);
const companySlides = reactive([
  {
    id: 1,
    title: `${t("about.slide_one.title")}`,
    descr: `${t("about.slide_one.descr")}`,
    img: uzmap,
  },
  {
    id: 2,
    title: `${t("about.slide_two.title")}`,
    descr: `${t("about.slide_two.descr")}`,
    img: gardens,
  },
  {
    id: 3,
    title: `${t("about.slide_three.title")}`,
    descr: `${t("about.slide_three.descr")}`,
    img: cannedFood,
  },
]);
const spinnerView = ref(true);
onMounted(() => {
  setTimeout(() => {
    spinnerView.value = false;
  }, 500);
});
useHead({
  title: `${t("nav.about")}`,
  meta: [
    {
      name: "description",
      content: "this about page",
    },
  ],
});
</script>
