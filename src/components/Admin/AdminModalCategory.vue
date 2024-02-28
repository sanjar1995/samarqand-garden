<template>
  <div class="admin-main__modal" v-if="categoryId && !spinnerView">
    <form @submit.prevent="type == 'add' ? addCategory() : editCategory()">
      <h2 class="admin-main__modal-name">
        {{ type == "add" ? "Добавление категории" : "Изменение категории" }}
      </h2>
      <div class="admin-main__modal-list">
        <div class="admin-main__modal-item">
          <label class="form-label">Название Категории (RU)</label>
          <input
            type="text"
            class="form-control"
            placeholder="Название (RU)"
            :required="type == 'add'"
            v-model="categoryId.name"
          />
        </div>
        <div class="admin-main__modal-item">
          <label class="form-label">Название Категории (UZ)</label>
          <input
            type="text"
            class="form-control"
            placeholder="Название (UZ)"
            :required="type == 'add'"
            v-model="categoryId.name_uz"
          />
        </div>
        <div class="admin-main__modal-item">
          <label class="form-label">
            Название Категории (TR) <span style="color: #dc3545">Отключен</span>
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Не заполняеться"
            disabled
          />
        </div>
        <div class="admin-main__modal-item">
          <label class="form-label">Название Категории (EN)</label>
          <input
            type="text"
            class="form-control"
            placeholder="Название (EN)"
            :required="type == 'add'"
            v-model="categoryId.name_en"
          />
        </div>
      </div>
      <div class="admin-main__modal-list">
        <router-link
          to="/admin-panel/categories"
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
  <Spinner v-if="!categoryId && spinnerView" />
</template>
<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";
import { useAdmCategory } from "@/stores/admCategory";
import Spinner from "@/components/UI/Spinner.vue";
const props = defineProps(["type"]);
let spinnerView = ref(false);
const route = useRoute();
const categoriesStore = useAdmCategory();
const categoryId = ref(null);
const id = route.params.id;
const addCategory = () => {
  categoriesStore.addCategory(categoryId);
};
const editCategory = () => {
  categoriesStore.editCategory(categoryId, id);
};
onBeforeMount(async () => {
  if (props.type == "edit") {
    spinnerView.value = true;
    await categoriesStore.getCategoryById(id);
    categoryId.value = await categoriesStore.categoryId;
    spinnerView.value = false;
  } else if (props.type == "add") {
    categoryId.value = {
      name: "",
      name_uz: "",
      name_tr: "",
      name_en: "",
    };
  }
});
</script>
