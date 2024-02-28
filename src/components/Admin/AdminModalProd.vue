<template>
  <div class="admin-main__modal" v-if="productId && !spinnerView">
    <form @submit.prevent="type == 'add' ? addProduct() : editProduct()">
      <h2 class="admin-main__modal-name">
        {{ type == "add" ? "Добавление Продукта" : "Изменение Продукта" }}
      </h2>
      <div class="admin-main__modal-preview" v-if="type == 'edit'">
        <img :src="productId.image_url" alt="" />
        <div class="admin-main__modal-preview-info">
          <h2>
            Название: <span>{{ productId.name }}</span>
          </h2>
          <h3>
            Категория:
            <span>{{ productId.category_name }}</span>
          </h3>
          <p>
            Описание:
            <span>{{ productId.description }}</span>
          </p>
          <p>
            Цена:
            <span>{{ productId.price.toLocaleString() }} <span>сум</span></span>
          </p>
        </div>
      </div>
      <div class="admin-main__modal-category">
        <label for="validationServer04" class="form-label"
          >Выберите Категорию</label
        >
        <select
          class="form-select"
          id="validationServer04"
          :required="type == 'add'"
          v-model="productId.category_id"
        >
          <option
            v-for="category in categoriesStore.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="admin-main__modal-list">
        <div class="admin-main__modal-item">
          <label class="form-label">Название продукта (RU)</label>
          <input
            type="text"
            class="form-control"
            placeholder="Имя"
            v-model="productId.name"
            :required="type == 'add'"
          />
        </div>
        <div class="admin-main__modal-item">
          <label class="form-label">Название продукта (UZ)</label>
          <input
            type="text"
            class="form-control"
            placeholder="Имя"
            v-model="productId.name_uz"
            :required="type == 'add'"
          />
        </div>
        <div class="admin-main__modal-item">
          <label class="form-label">
            Название продукта (TR) <span style="color: #dc3545">Отключен</span>
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Не заполняеться"
            disabled
          />
        </div>
        <div class="admin-main__modal-item">
          <label class="form-label">Название продукта (EN)</label>
          <input
            type="text"
            class="form-control"
            placeholder="Имя"
            v-model="productId.name_en"
            :required="type == 'add'"
          />
        </div>
      </div>
      <div class="admin-main__modal-list">
        <div class="admin-main__modal-item">
          <label class="form-label">Описание (RU)</label>
          <textarea
            type="text"
            class="form-control"
            placeholder="Описание"
            v-model="productId.description"
            :required="type == 'add'"
          />
        </div>
        <div class="admin-main__modal-item">
          <label class="form-label">Описание (UZ)</label>
          <textarea
            type="text"
            class="form-control"
            placeholder="Описание"
            v-model="productId.description_uz"
            :required="type == 'add'"
          />
        </div>
        <div class="admin-main__modal-item">
          <label class="form-label">
            Описание (TR) <span style="color: #dc3545">Отключен</span>
          </label>
          <textarea
            type="text"
            class="form-control"
            placeholder="Не заполняеться"
            disabled
          />
        </div>
        <div class="admin-main__modal-item">
          <label class="form-label">Описание (EN)</label>
          <textarea
            type="text"
            class="form-control"
            placeholder="Описание"
            v-model="productId.description_en"
            :required="type == 'add'"
          />
        </div>
      </div>
      <div class="admin-main__modal-file">
        <label class="form-label" for="picture">Выберие фото</label>
        <label>
          <input
            type="file"
            class="form-control"
            id="pictureInput"
            name="picture"
            accept=".png, .jpg, .jpeg, .webp"
            :required="type == 'add'"
          />
        </label>
      </div>
      <div class="admin-main__modal-list">
        <div class="admin-main__modal-item">
          <label class="form-label">Цена (сум)</label>
          <input
            type="number"
            class="form-control"
            placeholder="20000"
            v-model="productId.price"
            step="0.001"
            :required="type == 'add'"
          />
        </div>
        <div class="admin-main__modal-item">
          <label class="form-label">Количество (кг)</label>
          <input
            type="number"
            class="form-control"
            placeholder="100"
            v-model="productId.amount"
            :required="type == 'add'"
          />
        </div>
      </div>
      <div class="admin-main__modal-list">
        <router-link
          to="/admin-panel/products"
          type="submit"
          class="mt-5 btn btn-danger"
          >Назад</router-link
        >
        <button v-if="type == 'add'" type="submit" class="mt-5 btn btn-primary">
          Сохранить
        </button>
        <button v-else type="submit" class="mt-5 btn btn-primary">
          Изменить
        </button>
      </div>
    </form>
  </div>
  <Spinner v-if="!productId && spinnerView" />
</template>
<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import { useRoute } from "vue-router";
import { useAdmCategory } from "@/stores/admCategory.js";
import { useAdmProduct } from "@/stores/admProduct.js";
import Spinner from "@/components/UI/Spinner.vue";

const props = defineProps(["type"]);
let spinnerView = ref(false);
const route = useRoute();
const categoriesStore = useAdmCategory();
const productsStore = useAdmProduct();
let productId = ref(null);
const id = route.params.id;
const addProduct = () => {
  productsStore.addProduct(productId);
};
const editProduct = () => {
  productsStore.editProduct(productId, id);
};

onBeforeMount(async () => {
  if (props.type == "edit") {
    spinnerView.value = true;
    await productsStore.getProductId(id);
    productId.value = await productsStore.productID;
    spinnerView.value = false;
  } else if (props.type == "add") {
    productId.value = {
      amount: null,
      category_id: null,
      category_name: "",
      created_at: "",
      description: "",
      description_en: "",
      description_uz: "",
      name: "",
      name_en: "",
      name_uz: "",
      price: null,
    };
  }
});
</script>
