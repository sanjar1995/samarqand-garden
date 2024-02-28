<template>
  <Loader v-if="showLoader" />
  <div class="cart" v-else>
    <h2 class="cart__title">{{ $t("basket.title") }}</h2>
    <div class="cart__main">
      <div class="cart__left">
        <div class="cart__left-info">
          <h3 class="cart__left-info-title">{{ $t("basket.left-title") }}</h3>
          <div class="cart__left-info-inputs">
            <label>
              <span>{{ $t("basket.lable-name") }}</span>
              <input
                type="text"
                :placeholder="$t('basket.plc-name')"
                v-model="formDate.name"
                :class="{ valid: v$.$error }"
              />
              <span v-if="v$.$error" class="valid-error">{{
                $t("basket.input-name")
              }}</span>
            </label>
            <label>
              <span>{{ $t("basket.lable-phone") }}</span>
              <input
                type="tel"
                v-maska="phoneMasked"
                data-maska="+998 (##) ###-##-##"
                placeholder="+998 (##) ###-##-##"
                v-model="formDate.phone"
                :class="{ valid: v$.$error }"
              />
              <span v-if="v$.$error" class="valid-error">{{
                $t("basket.input-phone")
              }}</span>
            </label>
          </div>
        </div>
        <div class="cart__left-payment">
          <h3 class="cart__left-payment-title">
            {{ $t("basket.payment-title") }}
          </h3>
          <span
            v-if="v$.$error"
            class="valid-error"
            style="margin-bottom: 20px"
            >{{ $t("basket.input-payment") }}</span
          >

          <div class="cart__left-payment-type">
            <div
              class="cart__left-payment-type-item"
              :class="{ active: formDate.payment == 'payme' }"
            >
              <img src="@/assets/img/payme.png" alt="" />
              <label for="payment-payme">
                <input
                  type="radio"
                  name="payme"
                  id="payment-payme"
                  v-model="formDate.payment"
                  value="Payme"
                />
                <span class="payment-chackmark"></span>
              </label>
            </div>
            <div
              class="cart__left-payment-type-item"
              :class="{ active: formDate.payment == 'click' }"
            >
              <img src="@/assets/img/click.png" alt="" />
              <label for="payment-click">
                <input
                  type="radio"
                  name="payme"
                  id="payment-click"
                  v-model="formDate.payment"
                  value="Click"
                />
                <span class="payment-chackmark"></span>
              </label>
            </div>
            <div
              class="cart__left-payment-type-item"
              :class="{ active: formDate.payment == 'cash' }"
            >
              <img src="@/assets/img/cash.png" alt="" />
              <label for="payment-cash">
                <input
                  type="radio"
                  name="payme"
                  id="payment-cash"
                  v-model="formDate.payment"
                  value="Cash"
                />
                <span class="payment-chackmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="cart__left-delivery">
          <h3 class="cart__left-delivery-title">
            {{ $t("basket.delivery-title") }}
          </h3>
          <p class="cart__left-delivery-sub">
            {{ $t("basket.delivery-sub") }}
            <a href="tel:+998933800414">+998 (93) 380-04-14</a>
          </p>
        </div>
      </div>
      <div class="cart__right">
        <div
          class="cart__right-items"
          v-if="Object.keys(productsStore.cart).length"
        >
          <div
            class="cart__right-item"
            v-for="product in productsStore.cart"
            :key="product.id"
          >
            <button
              class="cart__right-item-close"
              @click="delInCart(product.id, product.name)"
            >
              <i class="fal fa-times"></i>
            </button>
            <div class="cart__right-item-info">
              <img
                :src="product.image_url"
                alt=""
                class="cart__right-item-img"
              />
              <div>
                <h4 class="cart__right-item-name">{{ product.name }}</h4>
                <p class="cart__right-item-weight">
                  {{ $t("basket.item-weight", { weight: product.weight }) }}
                </p>
              </div>
            </div>
            <div class="cart__right-item-change">
              <p class="cart__right-item-price">
                {{ (product.price * product.weight).toLocaleString() }}
                <span>{{ $t("product.currency") }}</span>
              </p>
              <div class="cart__right-item-setting" @click.prevent>
                <div class="cart__right-item-count">
                  <input
                    type="number"
                    class="cart__right-item-input"
                    :id="`input-cart-${product.id}`"
                    :value="1"
                  />
                  <span>{{ $t("product.kg") }}</span>
                </div>
                <button
                  class="cart__right-item-button"
                  @click="minusInCart(product.id, product.name)"
                >
                  <i class="fal fa-minus"></i>
                </button>
                <button
                  class="cart__right-item-button"
                  @click="plusInCart(product.id, product.name, product.amount)"
                >
                  <i class="fal fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <h3 v-else class="cart__right-title">{{ $t("basket.empty") }}</h3>
        <div class="cart__right-total">
          <div class="cart__right-total-info">
            <p class="cart__right-total-title">
              {{ $t("basket.total-title") }}
            </p>
            <h4 class="cart__right-total-price">
              {{ totalPrice.toLocaleString() }}
              <span>{{ $t("product.currency") }}</span>
            </h4>
          </div>
          <button class="cart__right-total-button" @click="goVerifi">
            {{ $t("basket.total-button") }}
          </button>
        </div>
      </div>
    </div>
    <div class="cart__verify" v-if="showVerifi">
      <div class="cart__verify-block">
        <button
          class="cart__verify-close"
          @click="authStore.verifyModal = false"
        >
          <i class="fal fa-times"></i>
        </button>
        <h2 class="cart__verify-title">{{ $t("basket.verify-title") }}</h2>
        <p class="cart__verify-text">{{ $t("basket.verify-text") }}</p>
        <span class="cart__verify-span">{{ formDate.phone }}</span>
        <input
          type="number"
          v-model="codeVerification"
          class="cart__verify-input"
          autofocus
        />
        <button class="cart__verify-continue" @click="verifCode">
          {{ $t("basket.verify-continue") }}
        </button>
        <button class="cart__verify-retry" @click="resend">
          {{ $t("basket.verify-retry") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, reactive } from "vue";
import { useHead } from "@vueuse/head";
import { useProducts } from "@/stores/products";
import { useAuth } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { vMaska } from "maska";
import Loader from "@/components/UI/Spinner.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import sweetalert from "sweetalert";
const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const productsStore = useProducts();
const authStore = useAuth();
const phoneMasked = reactive({});
const codeVerification = ref(null);
const formDate = reactive({
  name: "",
  phone: "",
  payment: "",
});
const rules = {
  name: { required },
  phone: { required },
  payment: { required },
};
const v$ = useVuelidate(rules, formDate);
const showVerifi = computed(() => authStore.verifyModal);
const goVerifi = async () => {
  const result = await v$.value.$validate();
  if (result && phoneMasked.completed == true) {
    authStore.sendVerif(
      phoneMasked.unmasked,
      `${t("authJs.sucSendCode")}`,
      `${t("authJs.errSendCode")}`
    );
    authStore.verifyModal = true;
  }
  if (result && !phoneMasked.completed) {
    sweetalert({
      text: "Введите корректный номер телефона!",
      icon: "info",
      timer: 1500,
      closeOnEsc: false,
      closeOnClickOutside: false,
    });
  }
};
const resend = () => {
  authStore.sendVerif(
    phoneMasked.unmasked,
    `${t("authJs.sucSendCode")}`,
    `${t("authJs.errSendCode")}`
  );
};
const verifCode = async () => {
  await authStore.verifAndCreateOrder(
    phoneMasked.unmasked,
    codeVerification.value,
    productsStore.cart,
    formDate.name,
    formDate.payment,
    `${t("authJs.sucOrder")}`,
    `${t("authJs.errCode")}`,
    `${t("authJs.errClient")}`
  );
};
const plusInCart = (prodId, prodName, prodAmount) => {
  let input = document.querySelector(`#input-cart-${prodId}`);

  if (prodAmount >= +input.value) {
    let text = `${prodName} ${t("product.addSuccess")}`;
    productsStore.plusInCart(+input.value, prodId, text);
    input.value = "1";
  } else {
    sweetalert({
      text: `${t("product.notAmount", { product: prodName })}`,
      icon: "error",
      timer: 1500,
    });
  }
};
const minusInCart = (prodId, prodName) => {
  let input = document.querySelector(`#input-cart-${prodId}`);
  let text = `${prodName} ${t("product.addSuccess")}`;
  productsStore.minusInCart(+input.value, prodId, text);
  input.value = "1";
};
const delInCart = (id, prodName) => {
  let text = `${prodName} ${t("product.addDelete")}`;
  productsStore.delInCart(id, text);
};
const totalPrice = computed(() => {
  let totalPrice = 0;
  for (const key in productsStore.cart) {
    totalPrice +=
      productsStore.cart[key].price * productsStore.cart[key].weight;
  }
  return totalPrice;
});
const showLoader = ref(true);
onMounted(() => {
  setTimeout(() => {
    showLoader.value = false;
  }, 500);
});
useHead({
  title: `${t("nav.basket")}`,
  meta: [
    {
      title: "description",
      content: "this basket page",
    },
  ],
});
</script>
