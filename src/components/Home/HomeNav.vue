<template>
  <Transition name="fade" v-if="!showMobile">
    <nav class="header-navbar" v-if="!serchView">
      <div class="header-navbar__left">
        <router-link :to="`/${locale}`" class="header-navbar__left-logo">
          <img src="@/assets/img/logo.svg" alt="" />
          <span>Samarqand Garden</span>
        </router-link>
        <div class="header-navbar__languages">
          <select class="form-select" @change="switchLanguage" id="formSelect">
            <option
              v-for="sLocale in supportedLocales"
              :key="`locale-${sLocale}`"
              :value="sLocale"
              :selected="locale === sLocale"
              class="form-select__option"
            >
            {{ $t(`locale.${sLocale}`) }}
            </option>
          </select>
        </div>
      </div>
      <ul class="header-navbar__list">
        <li v-for="list in navList" :key="list.id">
          <router-link
            :to="Tr.i18nRoute({ name: list.name })"
            class="header-navbar__link"
            >{{ $t(list.title) }}</router-link
          >
        </li>
      </ul>
      <div class="header-navbar__right" @mouseleave="cartView = false">
        <button
          class="header-navbar__right-icon"
          @click="(serchView = true), (inputSearch = '')"
        >
          <i class="fal fa-search"></i>
        </button>
        <router-link
          :to="Tr.i18nRoute({ name: 'home-cart' })"
          class="header-navbar__right-button"
          @mousemove="cartView = true"
        >
          {{ $t("nav.basket") }} <i class="fal fa-shopping-bag"></i>
        </router-link>
        <div
          class="header-navbar__right-cart"
          @mousemove="cartView = true"
          v-if="cartView && Object.keys(productsStore.cart).length"
        >
          <template v-for="product in productsStore.cart" :key="product.id">
            <router-link
              :to="`/${locale}/cart`"
              class="header-navbar__right-cart-item"
            >
              <img :src="product.image_url" alt="" />
              <div class="header-navbar__right-cart-info">
                <h3 class="header-navbar__right-cart-title">
                  {{ product.name }}
                </h3>
                <p class="header-navbar__right-cart-price">
                  {{ product.price.toLocaleString() }}
                  <span>{{ $t("product.currencyOneKg") }}</span>
                </p>
                <p class="header-navbar__right-cart-amount">
                  <span>{{ $t("product.total") }}</span>
                  {{ product.weight.toLocaleString() }}
                  <span>{{ $t("product.kg") }}</span>
                </p>
              </div>
            </router-link>
          </template>
        </div>
      </div>
    </nav>
    <div class="header-navbar header-navbar__search" v-else-if="serchView">
      <button
        class="header-navbar__search-button"
        @click="(serchView = false), (inputSearch = '')"
      >
        <i class="fal fa-arrow-left"></i>
      </button>
      <div class="header-navbar__search-item">
        <input
          type="text"
          class="header-navbar__search-item-inp"
          :placeholder="$t('nav.search')"
          v-model="inputSearch"
        />
        <div
          class="header-navbar__search-result"
          v-if="productsStore.searchArray.length"
        >
          <template v-for="item in productsStore.searchArray" :key="item.id">
            <router-link
              :to="`/${locale}/product/${item.id}`"
              class="header-navbar__search-result-item"
              @click="(serchView = false), (inputSearch = '')"
            >
              <img :src="item.image_url" alt="" />
              <div class="header-navbar__search-result-item-info">
                <h2>{{ item.name }}</h2>
                <p class="">
                  {{ item.price.toLocaleString() }}
                  <span>{{ $t("product.currency") }}</span>
                </p>
              </div>
            </router-link>
          </template>
        </div>
      </div>
      <button class="header-navbar__search-button" @click="inputSearch = ''">
        <i class="fal fa-times"></i>
      </button>
    </div>
  </Transition>
  <Transition name="fade2" v-else>
    <nav class="header-mobile" v-if="!serchView">
      <div class="header-mobile__left">
        <router-link :to="`/${locale}`" class="header-mobile__left-logo">
          <img src="@/assets/img/logo.svg" alt="" />
          <span>Samarqand Garden</span>
        </router-link>
      </div>
      <button
        class="header-mobile__menu"
        v-if="showMobile"
        @click="showNav = true"
      >
        <i class="fal fa-bars"></i>
      </button>
      <ul
        class="header-mobile__list"
        :class="{ 'active-mobile-list': showNav }"
      >
        <button class="header-mobile__close" @click="showNav = false">X</button>
        <li v-for="list in navList" :key="list.id">
          <router-link
            :to="Tr.i18nRoute({ name: list.name })"
            class="header-mobile__link"
            @click="showNav = false"
            >{{ $t(list.title) }}</router-link
          >
        </li>
        <li class="header-mobile__bottom">
          <button
            class="header-mobile__bottom-icon"
            @click="(serchView = true), (inputSearch = ''), (showNav = false)"
          >
            <i class="fal fa-search"></i>
          </button>
          <router-link
            :to="Tr.i18nRoute({ name: 'home-cart' })"
            class="header-mobile__bottom-button"
            @click="showNav = false"
          >
            {{ $t("nav.basket") }} <i class="fal fa-shopping-bag"></i>
          </router-link>
          <div class="header-mobile__languages">
            <select
              class="form-select"
              @change="switchLanguage"
              id="formSelect"
            >
              <option
                v-for="sLocale in supportedLocales"
                :key="`locale-${sLocale}`"
                :value="sLocale"
                :selected="locale === sLocale"
              >
                {{ $t(`locale.${sLocale}`) }}
              </option>
            </select>
          </div>
        </li>
      </ul>
    </nav>
    <div class="header-mobile header-mobile__search" v-else-if="serchView">
      <button
        class="header-mobile__search-button"
        @click="(serchView = false), (inputSearch = '')"
      >
        <i class="fal fa-arrow-left"></i>
      </button>
      <form @submit.prevent class="header-mobile__search-item">
        <input
          type="text"
          class="header-mobile__search-item-inp"
          :placeholder="$t('nav.search')"
          v-model="inputSearch"
        />
        <div
          class="header-mobile__search-result"
          v-if="productsStore.searchArray.length"
        >
          <template v-for="item in productsStore.searchArray" :key="item.id">
            <router-link
              :to="`/${locale}/product/${item.id}`"
              class="header-mobile__search-result-item"
              @click="(serchView = false), (inputSearch = '')"
            >
              <img :src="item.image_url" alt="" />
              <div class="header-mobile__search-result-item-info">
                <h2>{{ item.name }}</h2>
                <p class="">
                  {{ item.price.toLocaleString() }}
                  <span>{{ $t("product.currency") }}</span>
                </p>
              </div>
            </router-link>
          </template>
        </div>
      </form>
      <button class="header-mobile__search-button" @click="inputSearch = ''">
        <i class="fal fa-times"></i>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProducts } from "@/stores/products";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Tr from "@/i18n/translation";
const router = useRouter();
const { locale } = useI18n();
const supportedLocales = ref(Tr.supportedLocales);
const switchLanguage = ref(async (event) => {
  const newLocale = event.target.value;
  await Tr.switchLanguage(newLocale);
  try {
    await router.replace({ params: { locale: newLocale } });
    router.go(0);
  } catch (e) {
    console.log(e);
    router.push("/");
  }
});
const productsStore = useProducts();
const inputSearch = computed({
  get: () => productsStore.search,
  set: (val) => {
    val ? (productsStore.search = val) : (productsStore.search = null);
    productsStore.searchProducts();
  },
});
const serchView = ref(false);
const navList = ref([
  { title: `nav.home`, name: "home-home" },
  { title: `nav.about`, name: "home-about" },
  { title: `nav.equipment`, name: "home-equipment" },
]);
const showNav = ref(false);
const showMobile = ref(false);
const cartView = ref(false);
onMounted(() => {
  if (window.innerWidth < 980) {
    showMobile.value = true;
  } else {
    showMobile.value = false;
  }
});
</script>
