<template>
  <Spinner v-if="!productsStore.productByID" />
  <div class="product-view" v-else>
    <img class="product-view__image" :src="productId.image_url" alt="" />
    <div class="product-view__info">
      <h2 class="product-view__info-name">
        {{ productId.name }}
      </h2>
      <p class="product-view__info-weight">
        ({{
          $t("product.priceKg", {
            price: productId.price.toLocaleString(),
          })
        }})
      </p>
      <p class="product-view__info-null" v-if="!productId.amount">
        {{ $t("product.notAvailable") }}
      </p>
      <p class="product-view__info-null" v-else>
        {{ $t("product.amountInStock", { amount: productId.amount }) }}
      </p>
      <p class="product-view__info-descr">
        {{ productId.description }}
      </p>
      <div class="product-view__info-bottom" @click.prevent>
        <div class="product-view__info-count">
          <input
            type="number"
            class="product-view__info-input"
            value="1"
            :id="`input-view-${productId.id}`"
          />
          <span>{{ $t("product.kg") }}</span>
        </div>
        <button
          class="product-view__info-button"
          v-if="productId.amount"
          @click="addToCart(productId.id, productId.name, productId.amount)"
        >
          <i class="fal fa-plus"></i>
        </button>
        <button class="product-view__info-button-null" v-else>
          <i class="fal fa-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import engPDF from "@/assets/pdf/english.pdf";
import rusPDF from "@/assets/pdf/russian.pdf";
import { onMounted, ref, watch, computed } from "vue";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";
import { useProducts } from "@/stores/products";
import Spinner from "@/components/UI/Spinner.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import sweetalert from "sweetalert";

const productsStore = useProducts();
const productId = computed(() => productsStore.productByID);
const route = useRoute();
const addToCart = (prodId, prodName, prodAmount) => {
  let input = document.querySelector(`#input-view-${prodId}`);
  if (prodAmount >= +input.value) {
    let text = `${prodName} ${t("product.addSuccess")}`;
    productsStore.addToCart(+input.value, prodId, text);
    input.value = "1";
  } else {
    sweetalert({
      text: `${t("product.notAmount", { product: prodName })}`,
      icon: "error",
      timer: 1500,
    });
  }
};
let spinnerView = ref(true);
let path = ref(route.fullPath);
watch(
  () => route.fullPath,
  () => {
    if (route.fullPath != path) {
      path.value = route.fullPath;
      spinnerView.value = true;
      if (productsStore.productByID) {
        setTimeout(() => {
          spinnerView.value = false;
        }, 500);
      }
    }
  },
  { deep: true }
);
onMounted(() => {
  productsStore.getProductById(+route.params.id);
  if (productsStore.productByID) {
    setTimeout(() => {
      spinnerView.value = false;
    }, 500);
  }
});

useHead({
  title: computed(() =>
    productsStore.productByIDName ? `${productsStore.productByIDName}` : ""
  ),
  meta: [
    {
      title: "description",
      content: `this product page`,
    },
  ],
});
</script>
