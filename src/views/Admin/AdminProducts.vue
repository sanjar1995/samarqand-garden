<template>
  <div class="admin-main__products">
    <div class="admin-main__search">
      <input
        type="text"
        :placeholder="inputPlaceholder"
        v-model="inputSearch"
      />
      <button @click="inputSearch = ''">
        <i class="fal fa-times-square"></i>
      </button>
      <div
        class="admin-main__search-result"
        v-if="productsStore.searchArray.length"
      >
        <template v-for="item in productsStore.searchArray" :key="item.id">
          <div class="admin-main__search-result-item">
            <img :src="item.image_url" alt="" />
            <div class="admin-main__search-result-item-info">
              <h2>{{ item.name }}</h2>
              <p class="">{{ item.price.toLocaleString() }} <span>сум</span></p>
            </div>
            <div class="admin-main__search-result-item-buttons">
              <router-link
                :to="`/admin-panel/products/edit/${item.id}`"
                class="btn btn-primary"
              >
                <i class="fal fa-pencil"></i>
              </router-link>
              <a class="btn btn-danger" @click="deleteProduct(item.id)">
                <i class="fal fa-trash-alt"></i>
              </a>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="admin-main__products-header">
      <select
        v-model="selectOption"
        class="form-select"
        aria-label="Default select example"
      >
        <option selected value="">Все Категории</option>
        <option
          v-for="category in categoriesStore.categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <router-link
        to="/admin-panel/products/add"
        class="admin-main__products-header-button"
        :click="'add'"
      >
        <i class="fal fa-plus"></i>
      </router-link>
    </div>
    <table class="table table-hover mt-5 admin-main__products-main">
      <thead>
        <tr>
          <th scope="col">Название</th>
          <th scope="col">ID</th>
          <th scope="col">Категория</th>
          <th scope="col">Цена</th>
          <th scope="col">Количество (кг)</th>
          <th scope="col">Дата Создание</th>
          <th scope="col">Дата Изменении</th>
        </tr>
      </thead>
      <template v-for="product in productsStore.products" :key="product.id">
        <tbody>
          <tr class="table-tr">
            <th scope="row" class="table-name">
              <img :src="product.image_url" alt="" class="table-img" />
              <span>{{ product.name }}</span>
            </th>
            <td>
              {{ product.id }}
            </td>
            <td scope="col">{{ product.category_name }}</td>
            <td>
              {{ product.price ? product.price.toLocaleString() : 0 }} сум
            </td>
            <td>
              {{ product.amount ? product.amount.toLocaleString() : 0 }} кг
            </td>
            <td>
              {{ new Date(product.created_at).toLocaleDateString() }}
            </td>
            <td>
              {{ new Date(product.updated_at).toLocaleDateString() }}
            </td>
            <td>
              <router-link
                :to="`/admin-panel/products/edit/${product.id}`"
                class="btn btn-primary"
              >
                <i class="fal fa-pencil"></i>
              </router-link>
            </td>
            <td>
              <a class="btn btn-danger" @click="deleteProduct(product.id)">
                <i class="fal fa-trash-alt"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </template>
    </table>
    <div class="admin-pagination">
      <vue-awesome-paginate
        :total-items="productsStore.total"
        :items-per-page="limit"
        :max-pages-shown="2"
        v-model="page"
        :on-click="changePage"
      />
    </div>
  </div>
</template>
<script setup>
import {
  ref,
  watch,
  computed,
  onBeforeUnmount,
  onBeforeMount,
  onMounted,
} from "vue";
import { useAdmCategory } from "@/stores/admCategory.js";
import { useAdmProduct } from "@/stores/admProduct.js";
import { useRouter, useRoute } from "vue-router";
import { limit } from "@/static";
const router = useRouter();
const route = useRoute();
const categoriesStore = useAdmCategory();
const productsStore = useAdmProduct();
let categories = ref([]);
let products = ref([]);
const inputPlaceholder = ref("Поиск...");
const selectOption = computed({
  get: () => productsStore.selectCategory,
  set: (val) => {
    val
      ? (productsStore.selectCategory = val)
      : (productsStore.selectCategory = "");
    productsStore.getProducts(offset.value);
  },
});
let totalItems = ref(null);
let page = ref(+route.query.page || 1);
let offset = ref(limit * page.value - limit);
const inputSearch = computed({
  get: () => productsStore.search,
  set: (val) => {
    val ? (productsStore.search = val) : (productsStore.search = null);
    productsStore.searchProducts();
  },
});
const changePage = (page_num) => {
  page.value = page_num;
  offset.value = limit * page_num - limit;
  if (page_num == 1) {
    router.push(`${route.path}`);
  } else {
    router.push(`${route.path}?page=${page_num}`);
  }
  productsStore.getProducts(offset.value);
};
const deleteProduct = (id) => {
  swal({
    title: "Вы уверены?",
    text: "После удаления вы не сможете восстановить этот продукт!",
    icon: "warning",
    buttons: ["Отменить", "Удалить"],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      productsStore.deleteProduct(id);
      swal("Выбранный продукт был удален!", {
        icon: "success",
        buttons: "ОК",
      }).then((ok) => {
        if (ok) router.go();
      });
    } else {
      swal("Выбранный продукт не был удален!");
    }
  });
};
onBeforeMount(() => {
  productsStore.getProducts(offset.value);
  changePage;
});
onBeforeUnmount(() => {
  productsStore.search = "";
});
</script>

<style lang="scss">
.table-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  object-fit: contain;
  margin-right: 20px;
}
</style>
