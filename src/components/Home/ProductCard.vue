<template>
  <RouterLink :to="`/${locale}/product/${product.id}`" class="product-cart">
    <img :src="product.image_url" class="product-cart__img" />
    <div class="product-cart__content">
      <h2 class="product-cart__title">
        {{ product.name }}
      </h2>
      <p class="product-cart__amount-null" v-if="!product.amount">
        {{ $t("product.notAvailable") }}
      </p>
      <p class="product-cart__amount-null" v-else>
        {{ $t("product.amountInStock", { amount: product.amount }) }}
      </p>
      <div class="product-cart__content-bottom" @click.prevent>
        <div class="product-cart__content-count">
          <input
            type="number"
            class="product-cart__content-input"
            :value="1"
            :id="`input-${product.id}`"
          />
          <span>{{ $t("product.kg") }}</span>
        </div>
        <button
          class="product-cart__content-button"
          v-if="product.amount"
          @click="addToCart(product.id, product.name, product.amount)"
          :data-art="product.id"
        >
          <i class="fal fa-plus"></i>
        </button>
        <button
          class="product-cart__content-button-null"
          v-if="!product.amount"
        >
          <i class="fal fa-plus"></i>
        </button>
      </div>
      <p class="product-cart__content-price">
        {{ product.price.toLocaleString() }}
        <span>{{ $t("product.currencyOneKg") }}</span>
      </p>
    </div>
  </RouterLink>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useProducts } from "@/stores/products";
import { useI18n } from "vue-i18n";
import sweetalert from "sweetalert";

const { t, locale } = useI18n();
const productsStore = useProducts();
const props = defineProps({
  id: {
    typeof: Number,
    default: null,
  },
  product: Object,
});
const addToCart = (prodId, prodName, prodAmount) => {
  let input = document.querySelector(`#input-${prodId}`);
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
</script>
