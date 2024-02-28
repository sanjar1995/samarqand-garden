<template>
  <Spinner v-if="spinnerView" />
  <section class="equipment" v-else>
    <h1 class="equipment__title">{{ $t("equipment.title") }}</h1>
    <ul class="equipment__list">
      <li class="equipment__item">
        <h3 class="equipment__item-title">{{ $t("equipment.octafrost") }}</h3>
        <div class="equipment__item-swiper">
          <swiper
            :style="{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }"
            :spaceBetween="10"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper.octafrost }"
            :modules="modules"
            class="mySwiper2"
          >
            <swiper-slide v-for="slide in octafrost">
              <img :src="slide.img" />
            </swiper-slide>
          </swiper>
          <swiper
            @swiper="setThumbsSwiper2"
            :spaceBetween="10"
            :slidesPerView="4"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide v-for="slide in octafrost">
              <img :src="slide.img" />
            </swiper-slide>
          </swiper>
        </div>
      </li>
      <li class="equipment__item">
        <h3 class="equipment__item-title">{{ $t("equipment.unitech") }}</h3>
        <div class="equipment__item-swiper">
          <swiper
            :style="{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }"
            :spaceBetween="10"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper.unitech }"
            :modules="modules"
            class="mySwiper2"
          >
            <swiper-slide v-for="slide in unitech">
              <img :src="slide.img" />
            </swiper-slide>
          </swiper>
          <swiper
            @swiper="setThumbsSwiper4"
            :spaceBetween="10"
            :slidesPerView="4"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide v-for="slide in unitech">
              <img :src="slide.img" />
            </swiper-slide>
          </swiper>
        </div>
      </li>
      <li class="equipment__item">
        <h3 class="equipment__item-title">{{ $t("equipment.tomra") }}</h3>
        <div class="equipment__item-swiper">
          <swiper
            :style="{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }"
            :spaceBetween="10"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper.tomra }"
            :modules="modules"
            class="mySwiper2"
          >
            <swiper-slide v-for="slide in tomra">
              <img :src="slide.img" />
            </swiper-slide>
          </swiper>
          <swiper
            @swiper="setThumbsSwiper3"
            :spaceBetween="10"
            :slidesPerView="4"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide v-for="slide in tomra">
              <img :src="slide.img" />
            </swiper-slide>
          </swiper>
        </div>
      </li>
      <li class="equipment__item">
        <h3 class="equipment__item-title">{{ $t("equipment.frostcam") }}</h3>
        <div class="equipment__item-swiper">
          <swiper
            :style="{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }"
            :spaceBetween="10"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper.frostcam }"
            :modules="modules"
            class="mySwiper2"
          >
            <swiper-slide v-for="slide in frostcam">
              <img :src="slide.img" />
            </swiper-slide>
          </swiper>
          <swiper
            @swiper="setThumbsSwiper1"
            :spaceBetween="10"
            :slidesPerView="4"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide v-for="slide in frostcam">
              <img :src="slide.img" />
            </swiper-slide>
          </swiper>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useHead } from "@vueuse/head";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Navigation, Thumbs } from "swiper";
import Spinner from "@/components/UI/Spinner.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import {
  frostcam1,
  frostcam2,
  octafrost1,
  octafrost2,
  octafrost3,
  octafrost4,
  tomra1,
  tomra2,
  unitech1,
  unitech2,
  unitech3,
} from "@/exportImg/eqipmentImg";

let thumbsSwiper = reactive({
  frostcam: null,
  octafrost: null,
  tomra: null,
  unitech: null,
});
const modules = reactive([FreeMode, Navigation, Thumbs]);
const setThumbsSwiper1 = (swiper) => {
  thumbsSwiper.frostcam = swiper;
};
const setThumbsSwiper2 = (swiper) => {
  thumbsSwiper.octafrost = swiper;
};
const setThumbsSwiper3 = (swiper) => {
  thumbsSwiper.tomra = swiper;
};
const setThumbsSwiper4 = (swiper) => {
  thumbsSwiper.unitech = swiper;
};
const spinnerView = ref(true);
const frostcam = reactive([{ img: frostcam1 }, { img: frostcam2 }]);
const octafrost = reactive([
  { img: octafrost1 },
  { img: octafrost2 },
  { img: octafrost3 },
  { img: octafrost4 },
]);
const tomra = reactive([{ img: tomra1 }, { img: tomra2 }]);
const unitech = reactive([
  { img: unitech1 },
  { img: unitech2 },
  { img: unitech3 },
]);

onMounted(() => {
  setTimeout(() => {
    spinnerView.value = false;
  }, 500);
});

useHead({
  title: `${t("nav.equipment")}`,
  meta: [
    {
      title: "description",
      content: "this equipment page",
    },
  ],
});
</script>
